import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import type { IncomingMessage } from 'node:http';
import { loadEnv, type Plugin } from 'vite';
import { handleContactGet, handleContactPost, type ContactEnv } from './src/lib/contact-handler';

function readRequestBody(request: IncomingMessage) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    request.on('data', (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    request.on('end', () => resolve(Buffer.concat(chunks)));
    request.on('error', reject);
  });
}

function contactApiDevPlugin(env: ContactEnv): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (request, response) => {
        const method = request.method?.toUpperCase() || 'GET';
        const headers = new Headers();

        Object.entries(request.headers).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => headers.append(key, item));
          } else if (value) {
            headers.set(key, value);
          }
        });

        const rawBody = method === 'GET' || method === 'HEAD' ? undefined : await readRequestBody(request);
        const contactRequest = new Request(`http://localhost/api/contact`, {
          method,
          headers,
          body: rawBody ? new Uint8Array(rawBody) : undefined,
        });
        const contactResponse =
          method === 'POST' ? await handleContactPost(contactRequest, env) : handleContactGet();

        response.statusCode = contactResponse.status;
        contactResponse.headers.forEach((value, key) => response.setHeader(key, value));
        response.end(Buffer.from(await contactResponse.arrayBuffer()));
      });
    },
  };
}

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  site: 'https://teddschreiner.de',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss(), contactApiDevPlugin(env)],
  },
});
