/**
 * @author SirJosh3917
 * @copyright 2020 SirJosh3917
 * @license MIT
 * @description This is an entrypoint to the service specifically for cloudflare workers. Initially, the project was built to make use of
 * docker and custom scripts, but cloudflare workers looked like a great, free alternative to how I originally planned on hosting this.
 */

import { handleRequest } from "./request-handler";

addEventListener('fetch', (event) => {
  //@ts-ignore
  const request: Request = event.request;
  if (request.method !== 'GET') return new Response('Expected GET', { status: 500 });

  //@ts-ignore
  event.respondWith(workerHandleRequest(request));
});

async function workerHandleRequest(request: Request): Promise<Response> {

  const baseUrl = new URL(request.url).origin;

  const result = await handleRequest(request.url.slice(baseUrl.length));
  
  let response: Response;

  if (typeof result === 'string') {
    response = new Response(result);
  }
  else {
    response = new Response(`ERROR: ${result}`, {
      status: 500
    });
  }
  
  response.headers.set('Content-Type', 'text/plain');

  return response;
}