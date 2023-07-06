/* add this to the component where want the game to be played or App.vue for application-wide access
import { tictactoe } from '@/composables/tictactoe.ts'

Object.defineProperty(window, "tictactoe", {
    get: () => {
        tictactoe();
    }
}); */

import { ref } from 'vue'

export function tictactoe() {

    console.clear();
    console.log("Shall we play a game?\n");

    const table = ref([
        ['0', 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]);

    const gameOver = ref(false);
    const userCancel = ref(false);

    gameBegin();

    function printTable(): void {
        console.log(table.value[0][0] + " | " + table.value[0][1] + " | " + table.value[0][2] + "\n" +
                    "_" + " | " + "_" + " | " + "_" + "\n" +
                    table.value[1][0] + " | " + table.value[1][1] + " | " + table.value[1][2] + "\n" +
                    "_" + " | " + "_" + " | " + "_" + "\n" +
                    table.value[2][0] + " | " + table.value[2][1] + " | " + table.value[2][2] + "\n" + "\n");
    }

    function randoNum(): number {
        return Math.floor(Math.random() * 3);
    }

    function computerTurn(): void {
        let x = randoNum();
        let y = randoNum();

        while(typeof table.value[x][y] == 'string'){
            x = randoNum();
            y = randoNum();
        }

        table.value[x][y] = "O";
    }

    function checkStatus(): void {
        let noMoreMoves = 0;

        for (let row = 0; row < 3; row++) {
            if (table.value[row].every(cell => cell === 'X')) {
                gameOver.value = true;
                playerWins();
                return;
            }
            else if (table.value[row].every(cell => cell === 'O')) {
                gameOver.value = true;
                computerWins();
                return;
            }
        }

        for (let col = 0; col < 3; col++) {
            if (table.value.every(row => row[col] === 'X')) {
                gameOver.value = true;
                playerWins();
                return;
            }
            else if (table.value.every(row => row[col] === 'O')) {
                gameOver.value = true;
                computerWins();
                return;
            }
        }

        if(table.value[0][0] == "X" && table.value[1][1] == "X" && table.value[2][2] == "X"){
            gameOver.value = true;
                playerWins();
                return;
        }

        else if(table.value[0][2] == "X" && table.value[1][1] == "X" && table.value[2][0] == "X"){
            gameOver.value = true;
                playerWins();
                return;
        }

        if(table.value[0][0] == "O" && table.value[1][1] == "O" && table.value[2][2] == "O"){
            gameOver.value = true;
                computerWins();
                return;
        }

        else if(table.value[0][2] == "O" && table.value[1][1] == "O" && table.value[2][0] == "O"){
            gameOver.value = true;
                computerWins();
                return;
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < table.value[i].length; j++) {
                if (table.value[i][j] === "X" || table.value[i][j] === "O"){
                    noMoreMoves++;
                }
            }
        }

        if (noMoreMoves == 9) {
            noWinner();
            gameOver.value = true;
            return;
        }
    }

    function gameBegin(): void {
        table.value[0][0] = 0;
        console.log("You move first. You are 'X'.\n");
        printTable();
        while(gameOver.value == false) {
            userInput();
            if(userCancel.value == false){
                printTable();
                checkStatus();
                console.clear();
                computerTurn();
                printTable();
                checkStatus();
            }
            else if(userCancel.value == true){
                console.clear();
                console.log("Enjoy the site 👾👽🤗");
            }
        }
    }

    function validMove(tpos: string | number): boolean {
        if(tpos == "X" || tpos == "O"){
            return false;
        }
        return true;
    }

    function userInputPrompt(): string | undefined {
        let userinput: any = prompt("Enter your position 0 - 8");
        if (userinput == null){
            gameOver.value = true;
            userCancel.value = true;
            return;
        }

        while(isNaN(userinput) || userinput.trim() === "" || userinput.length > 1){
            userinput = prompt("Enter a valid number: 0 - 8");
            if (userinput == null){
                gameOver.value = true;
                userCancel.value = true;
                return;
            }
        }

        while(userinput < 0 || userinput > 8){
            userinput = prompt("Enter a valid number: 0 - 8");
            if (userinput == null){
                gameOver.value = true;
                userCancel.value = true;
                return;
            }
        }
        return userinput;
    }

    function userInput(): void {
        let uinput = userInputPrompt();
        if(userCancel.value == false){
            switch (uinput) {
                case '0':
                    if (validMove(table.value[0][0])) {
                        table.value[0][0] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '1':
                    if (validMove(table.value[0][1])) {
                        table.value[0][1] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '2':
                    if (validMove(table.value[0][2])) {
                        table.value[0][2] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '3':
                    if (validMove(table.value[1][0])) {
                        table.value[1][0] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '4':
                    if (validMove(table.value[1][1])) {
                        table.value[1][1] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '5':
                    if (validMove(table.value[1][2])) {
                        table.value[1][2] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '6':
                    if (validMove(table.value[2][0])) {
                        table.value[2][0] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '7':
                    if (validMove(table.value[2][1])) {
                        table.value[2][1] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                case '8':
                    if (validMove(table.value[2][2])) {
                        table.value[2][2] = "X";
                    }
                    else {
                        console.log("Invalid Selection.\n")
                        userInput();
                    }
                    break;
                }
        }
    }

    function playerWins(): void {
        console.clear();
        printTable();
        console.log("-------");
        console.log("You win");
        console.log("-------");
        playAgain();
    }

    function computerWins(): void {
        console.clear();
        printTable();
        console.log("-------");
        console.log("You lose. 👎");
        console.log("-------");
        playAgain();
    }

    function noWinner(): void {
        console.clear();
        printTable();
        console.log("-------");
        console.log("A strange game. The only winning move is not to play.");
        console.log("-------");
        playAgain();
    }

    function playAgain(): void{
        let userPlayAgain: any = prompt("Would you like to play again? yes or no");
        if (userPlayAgain === null) {
            //console.clear();
            console.log("Enjoy the site 👾👽🤗");
            return;
        }
        userPlayAgain = userPlayAgain?.toLowerCase();
        if (userPlayAgain == "yes" || userPlayAgain == "y") {
            gameBegin();
        }
        else{
            console.clear();
            console.log("Enjoy the site 👾👽🤗")
        }
    }

    //return {  }
}