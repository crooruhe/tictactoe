# console-tictactoe
> `npm i console-tictactoe`

Tic-tac-toe game written in Typescript.

After including this into your index.html/index.js or something similar:

```
import { tictactoe } from '@/composables/tictactoe.ts'

Object.defineProperty(window, "tictactoe", {
    get: () => {
       tictactoe();
    }
});
```

you can then open the developer console and run
- `> tictactoe`

have fun
