interface ContactEnv {
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_API_KEY?: string;
}

interface ContactContext {
  request: Request;
  env: ContactEnv;
}

const defaultRecipient = 'info@teddschreiner.de';
const successMessage = 'Danke, die Anfrage wurde gesendet. Ich melde mich zeitnah zurück.';
const genericErrorMessage = 'Die Anfrage konnte gerade nicht gesendet werden. Bitte nutze alternativ die direkte E-Mail.';

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function wantsJson(request: Request) {
  return request.headers.get('accept')?.includes('application/json') ?? false;
}

function redirectToContact(request: Request, state: 'sent' | 'error') {
  const url = new URL('/contact/', request.url);
  url.searchParams.set('kontakt', state);
  return Response.redirect(url, 303);
}

function respond(request: Request, body: Record<string, unknown>, status = 200) {
  if (wantsJson(request)) {
    return jsonResponse(body, status);
  }

  return redirectToContact(request, status < 400 ? 'sent' : 'error');
}

function normalize(value: FormDataEntryValue | null, maxLength: number) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizeMessage(value: FormDataEntryValue | null) {
  return String(value ?? '').trim().slice(0, 4000);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function onRequestPost({ request, env }: ContactContext) {
  try {
    const formData = await request.formData();

    if (normalize(formData.get('website'), 120)) {
      return respond(request, { ok: true, message: successMessage });
    }

    const name = normalize(formData.get('name'), 120);
    const email = normalize(formData.get('email'), 180);
    const organization = normalize(formData.get('organization'), 160);
    const subject = normalize(formData.get('subject'), 180);
    const message = normalizeMessage(formData.get('message'));
    const privacy = normalize(formData.get('privacy'), 40);

    if (!name || !email || !subject || !message) {
      return respond(request, { ok: false, message: 'Bitte fülle alle Pflichtfelder aus.' }, 400);
    }

    if (!isValidEmail(email)) {
      return respond(request, { ok: false, message: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, 400);
    }

    if (privacy !== 'accepted') {
      return respond(request, { ok: false, message: 'Bitte bestätige die Datenschutzhinweise.' }, 400);
    }

    const apiKey = env.RESEND_API_KEY;
    const from = env.CONTACT_FROM_EMAIL;
    const to = env.CONTACT_TO_EMAIL || defaultRecipient;

    if (!apiKey || !from) {
      return respond(request, { ok: false, message: genericErrorMessage }, 503);
    }

    const emailSubject = `Kontaktformular: ${subject}`.replace(/[\r\n]+/g, ' ');
    const text = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      organization ? `Organisation: ${organization}` : null,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');
    const html = `
      <h1>Neue Kontaktanfrage</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      ${organization ? `<p><strong>Organisation:</strong> ${escapeHtml(organization)}</p>` : ''}
      <p><strong>Betreff:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: emailSubject,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      console.error('Resend contact email failed', resendResponse.status, detail);
      return respond(request, { ok: false, message: genericErrorMessage }, 502);
    }

    return respond(request, { ok: true, message: successMessage });
  } catch (error) {
    console.error('Contact form failed', error);
    return respond(request, { ok: false, message: genericErrorMessage }, 500);
  }
}

export function onRequestGet() {
  return jsonResponse({ ok: false, message: 'Method not allowed.' }, 405);
}
