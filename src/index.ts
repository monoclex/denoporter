import fetch from "node-fetch";
import express from "express";
import { rewrite } from "./rewriter";
const app = express();

// i don't know if you actually need to `return response.xxx`, but i'm doing it here to explicitly end control flow.

app.get('/', (request, response) => {
  return response.redirect('https://github.com/SirJosh3917/denoporter');
})

// to properly simulate URL imports, we have to have the target URL in question an actual URL of the page
// we have 'v1' on the URL so that if more features need to be added in the future, we can add them without breaking compatibility.
app.get(/v1\/.*/, (request, response) => {

  // request.url begins with /, so let's just prepend https:/ before it. i'm sure we can't possibly be vulnerable to any sort of url
  // vulnerability!
  const codeUrl = 'https:/' + request.url.slice('/v1'.length);

  // TODO: cache 'fetch' results
  return fetch(codeUrl)
    .then(codeResponse => codeResponse.text())
    .then(code => {
      return response.type('text/plain')
        .send(rewrite(code));
    })
    .catch(err => {
      return response.status(500)
        .send(`error fetching '${codeUrl}': ${err}`);
    });
});

app.listen(80, () => {
  console.log(`denoporter started`);
});