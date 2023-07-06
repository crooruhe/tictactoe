# tictactoe
Tic-tac-toe game written in Typescript. This game is designed to be a composable for Vue.

After including this into your component/root component:

```import { tictactoe } from '@/composables/tictactoe.ts'
Object.defineProperty(window, "tictactoe", {
    get: () => {
       tictactoe();
    }
});```

you can then open the developer console and run
- > tictactoe

have fun
