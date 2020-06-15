/**
 * @author SirJosh3917
 * @copyright 2020 SirJosh3917
 * @license MIT
 * @description This is an entrypoint to the service specifically for the express webserver with node. This is a great way to run the
 * service locally, incase not invented here syndrome is rampant.
 */

import express from "express";
import { handleRequest } from "./request-handler";
const app = express();

// i don't know if you actually need to `return response.xxx`, but i'm doing it here to explicitly end control flow.

app.get('/', (request, response) => {
  return response.redirect('https://github.com/SirJosh3917/denoporter');
})

// to properly simulate URL imports, we have to have the target URL in question an actual URL of the page
// we have 'v1' on the URL so that if more features need to be added in the future, we can add them without breaking compatibility.
app.get(/v1\/.*/, (request, response) => {

  const result = handleRequest(request.url);

  if (typeof result === 'string') {
    return response.type('text/plain')
      .send(result);
  }

  return response.status(500)
    .send(`error: ${result}`);
});

app.listen(80, () => {
  console.log(`denoporter started`);
});