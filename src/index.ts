/**
 * @author SirJosh3917
 * @copyright 2020 SirJosh3917
 * @license MIT
 * @description Handles incoming requests as if it were a service worker. Primarily setup this way to be compatible with Cloudflare Workers,
 * a service that will host my code for free if I make them look like service workers.
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

  const url = new URL(request.url);
  const baseUrl = url.origin;
  const path = url.pathname;

  if (path.startsWith('/v1/')) {
    return await handleV1(request, url);
  }
  else {
    // if the proper path isn't met, we should return them to the github homepage.
    return Response.redirect('https://github.com/SirJosh3917/denoporter/');
  }
}

async function handleV1(request: Request, requestUrl: URL): Promise<Response> {

  // cut the path from `https://asdf.com/v1/...` to `/v1/...`
  const path = request.url.slice(requestUrl.origin.length);
  const result = await handleRequest(path);

  const response = (typeof result === 'string'
    ? new Response(result)
    : new Response(`ERROR: ${result}`, { status: 500 }));
  response.headers.set('Content-Type', 'text/plain');

  return response;
}