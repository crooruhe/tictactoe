# console-tictactoe
> `npm i console-tictactoe`

Tic-tac-toe game written in Typescript.

After including this into your index.html/index.js or something similar:

```
<script type="module">
import { tictactoe } from 'console-tictactoe'

Object.defineProperty(window, "tictactoe", {
    get: () => {
       tictactoe();
    }
});
</script>
```

you can then open the developer console and run
- `> tictactoe`

have fun
