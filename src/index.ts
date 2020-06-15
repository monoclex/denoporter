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

  // if we're on the /v1 path, rewrite the imports and return the rewritten stuff
  if (path.startsWith('/v1/')) {
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
  else {

    // otherwise, redirect to the github page
    return Response.redirect('https://github.com/SirJosh3917/denoporter/');
  }
}