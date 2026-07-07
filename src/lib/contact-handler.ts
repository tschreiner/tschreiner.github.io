import { parseAndValidateAttachments } from './contact-attachments';
import { isLocale, type Locale } from './i18n';

export interface ContactEnv {
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_API_KEY?: string;
}

const defaultRecipient = 'info@teddschreiner.de';

function getContactCopy(locale: Locale) {
  return locale === 'de'
    ? {
        successMessage: 'Danke, die Anfrage wurde gesendet. Ich melde mich zeitnah zurück.',
        genericErrorMessage: 'Die Anfrage konnte gerade nicht gesendet werden. Bitte nutze alternativ die direkte E-Mail.',
        required: 'Bitte fülle alle Pflichtfelder aus.',
        invalidEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
        privacy: 'Bitte bestätige die Datenschutzhinweise.',
        method: 'Method not allowed.',
        subjectPrefix: 'Kontaktformular',
        attachmentLabel: 'Anhänge',
        title: 'Neue Kontaktanfrage',
        name: 'Name',
        email: 'E-Mail',
        organization: 'Organisation',
        subject: 'Betreff',
      }
    : {
        successMessage: 'Thanks, your inquiry was sent. I will get back to you shortly.',
        genericErrorMessage: 'Your inquiry could not be sent right now. Please use direct email as an alternative.',
        required: 'Please fill out all required fields.',
        invalidEmail: 'Please enter a valid email address.',
        privacy: 'Please confirm the privacy notice.',
        method: 'Method not allowed.',
        subjectPrefix: 'Contact form',
        attachmentLabel: 'Attachments',
        title: 'New contact inquiry',
        name: 'Name',
        email: 'Email',
        organization: 'Organization',
        subject: 'Subject',
      };
}

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

function getRequestLocale(request: Request) {
  const referer = request.headers.get('referer');

  if (referer) {
    try {
      return isLocale(new URL(referer).pathname.split('/')[1] || '') ? 'en' : 'de';
    } catch {
    }
  }

  return 'de';
}

function redirectToContact(request: Request, state: 'sent' | 'error') {
  const locale = getRequestLocale(request);
  const url = new URL(locale === 'en' ? '/en/contact/' : '/contact/', request.url);
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

export async function handleContactPost(request: Request, env: ContactEnv) {
  try {
    const formData = await request.formData();
    const localeValue = normalize(formData.get('locale'), 8);
    const locale: Locale = isLocale(localeValue) ? localeValue : 'de';
    const copy = getContactCopy(locale);

    if (normalize(formData.get('website'), 120)) {
      return respond(request, { ok: true, message: copy.successMessage });
    }

    const name = normalize(formData.get('name'), 120);
    const email = normalize(formData.get('email'), 180);
    const organization = normalize(formData.get('organization'), 160);
    const subject = normalize(formData.get('subject'), 180);
    const message = normalizeMessage(formData.get('message'));
    const privacy = normalize(formData.get('privacy'), 40);

    if (!name || !email || !subject || !message) {
      return respond(request, { ok: false, message: copy.required }, 400);
    }

    if (!isValidEmail(email)) {
      return respond(request, { ok: false, message: copy.invalidEmail }, 400);
    }

    if (privacy !== 'accepted') {
      return respond(request, { ok: false, message: copy.privacy }, 400);
    }

    const { attachments, error: attachmentError } = await parseAndValidateAttachments(formData, locale);

    if (attachmentError) {
      return respond(request, { ok: false, message: attachmentError }, 400);
    }

    const apiKey = env.RESEND_API_KEY;
    const from = env.CONTACT_FROM_EMAIL;
    const to = env.CONTACT_TO_EMAIL || defaultRecipient;

    if (!apiKey || !from) {
      console.warn('Contact form environment is incomplete', {
        hasContactFromEmail: Boolean(from),
        hasContactToEmail: Boolean(env.CONTACT_TO_EMAIL),
        hasResendApiKey: Boolean(apiKey),
      });
      return respond(request, { ok: false, message: copy.genericErrorMessage }, 503);
    }

    const emailSubject = `${copy.subjectPrefix}: ${subject}`.replace(/[\r\n]+/g, ' ');
    const attachmentNames = attachments.map((attachment) => attachment.filename);
    const attachmentLine = attachmentNames.length ? `${copy.attachmentLabel}: ${attachmentNames.join(', ')}` : null;
    const text = [
      `${copy.name}: ${name}`,
      `${copy.email}: ${email}`,
      organization ? `${copy.organization}: ${organization}` : null,
      attachmentLine,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');
    const html = `
      <h1>${copy.title}</h1>
      <p><strong>${copy.name}:</strong> ${escapeHtml(name)}</p>
      <p><strong>${copy.email}:</strong> ${escapeHtml(email)}</p>
      ${organization ? `<p><strong>${copy.organization}:</strong> ${escapeHtml(organization)}</p>` : ''}
      <p><strong>${copy.subject}:</strong> ${escapeHtml(subject)}</p>
      ${attachmentLine ? `<p><strong>${copy.attachmentLabel}:</strong> ${escapeHtml(attachmentNames.join(', '))}</p>` : ''}
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    `;

    const resendPayload: Record<string, unknown> = {
      from,
      to,
      reply_to: email,
      subject: emailSubject,
      text,
      html,
    };

    if (attachments.length > 0) {
      resendPayload.attachments = attachments;
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      console.error('Resend contact email failed', resendResponse.status, detail);
      return respond(request, { ok: false, message: copy.genericErrorMessage }, 502);
    }

    return respond(request, { ok: true, message: copy.successMessage });
  } catch (error) {
    console.error('Contact form failed', error);
    const locale = getRequestLocale(request);
    return respond(request, { ok: false, message: getContactCopy(locale).genericErrorMessage }, 500);
  }
}

export function handleContactGet() {
  return jsonResponse({ ok: false, message: getContactCopy('en').method }, 405);
}
