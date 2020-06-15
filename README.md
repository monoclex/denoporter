# denoporter
Deno requires imports of projects to explicitly include the file extension. Whilst a welcome change, it also brings about a severe backwords compatibility problem. This tool solves that problem, by rewriting all imports to have their proper ending.

*Pull requests welcome!*

# Usage
**WARNING:** this tool is in an early stage.

![Modification Example](https://rawcdn.githack.com/SirJosh3917/denoporter/master/example.png)

```
https://denoporter.sirjosh.workers.dev/v1/<URL without `http(s)://` prefix>
```

## Example: [pure-rand](https://github.com/dubzzz/pure-rand)
This project is the perfect example of a project that is compatible with denoporter. It is 100% typescript, dependency free, and deno agnostic (meaning it doesn't explicitly support deno). It just so happens we can use denoporter for this project!
```ts
import * as prand from 'https://denoporter.sirjosh.workers.dev/v1/raw.githubusercontent.com/dubzzz/pure-rand/master/src/pure-rand.ts'

const seed = 42;
const gen1 = prand.mersenne(seed);
const [number, gen2] = gen1.next();
console.log(number);
```

# Build
```shell
yarn install
yarn build
```

# Dude that URL
Yep the URL is huge. If this project gets enough traction, I wouldn't mind buying a domain so that the URL is a bit shorter. Consider starring the project! (Or if you're feeling fancy, how about [supporting me on Patreon](https://www.patreon.com/sirjosh3917)?)

# Misc
License: [MIT](https://github.com/SirJosh3917/denoporter/LICENSE)
This project is not affiliated with pure-rand. It just happened to be a great example.