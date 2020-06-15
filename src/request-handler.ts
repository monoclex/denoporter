/**
 * @author SirJosh3917
 * @copyright 2020 SirJosh3917
 * @license MIT
 */

import { rewrite } from "./rewriter";

/**
 * Handles external requests in a way abstract from any implementation.
 * @param url The URL to fetch and rewrite imports on.
 * @example
 * const result = await handleRequest(`/v1/raw.githubusercontent.com/dubzzz/pure-rand/master/src/pure-rand.ts`);
 */
export function handleRequest(url: string): Promise<string | Error> {

  // request.url begins with /, so let's just prepend https:/ before it. i'm sure we can't possibly be vulnerable to any sort of url
  // vulnerability!
  const codeUrl = 'https:/' + url.slice('/v1'.length);

  // TODO: cache 'fetch' results
  return fetch(codeUrl)
    .then(codeResponse => codeResponse.text())
    .then(code => {
      return `// imports rewritten with <3 from denoporter - https://github.com/SirJosh3917/denoporter

${rewrite(code)}`;
    })
    .catch(err => {
      return err;
    });
}
