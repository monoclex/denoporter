/**
 * @author SirJosh3917
 * @copyright 2020 SirJosh3917
 * @license MIT
 * @description Main entrypoint. Requires manual intervention. Not fancy or good or clean at all, but it's good enough:tm:.
 */

// TODO: completely deprecate node-express and other infrastructure in favor of a service worker only approach.
// could use something like cloudworker when we're not available

// uncomment this line if using cloudflare workers.dev
import "./cloudflare-worker.ts";

// uncomment this line if using node and express
// import "./node-express.ts";

// throw new Error('see index.ts and uncomment one of the lines');
