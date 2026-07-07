import { handleContactGet, handleContactPost, type ContactEnv } from '../../src/lib/contact-handler';

interface ContactContext {
  request: Request;
  env: ContactEnv;
}

export function onRequestGet() {
  return handleContactGet();
}

export async function onRequestPost({ request, env }: ContactContext) {
  return handleContactPost(request, env);
}
