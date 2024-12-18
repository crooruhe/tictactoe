/*
import tictactoe from '@/composables/tictactoe.ts'

Object.defineProperty(window, "tictactoe", {
    get: () => {
        tictactoe();
    }
}); 
*/

function tictactoe() {

  console.clear();
  console.log("Shall we play a game?\n");

  const gameBoard = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8']
  ];

  let gameOver: boolean = false;
  let userCancel: boolean = false;

  gameBegin();

  function printTable(): void {
    console.log(
      gameBoard[0][0] + " | " + gameBoard[0][1] + " | " + gameBoard[0][2] + "\n" +
                  "_" + " | " + "_" + " | " + "_" + "\n" +
      gameBoard[1][0] + " | " + gameBoard[1][1] + " | " + gameBoard[1][2] + "\n" +
                  "_" + " | " + "_" + " | " + "_" + "\n" +
      gameBoard[2][0] + " | " + gameBoard[2][1] + " | " + gameBoard[2][2] + "\n" + 
      "\n");
  }

  function randoNum(): number {
      return Math.floor(Math.random() * 3);
  }

  function computerTurn(): void {
    let x: number = randoNum();
    let y: number = randoNum();

    while(isNaN(Number(gameBoard[x][y]))) {
      x = randoNum();
      y = randoNum();
    }

    gameBoard[x][y] = "O";
  }

  function checkStatus(): void {
    let noMoreMoves = 0;

    for (let row = 0; row < 3; row++) {
      if (gameBoard[row].every(cell => cell === 'X')) {
        gameOver = true;
        playerWins();
        return;
      }
      else if (gameBoard[row].every(cell => cell === 'O')) {
        gameOver = true;
        computerWins();
        return;
      }
    }

    for (let col = 0; col < 3; col++) {
      if (gameBoard.every(row => row[col] === 'X')) {
        gameOver = true;
        playerWins();
        return;
      }
      else if (gameBoard.every(row => row[col] === 'O')) {
        gameOver = true;
        computerWins();
        return;
      }
    }

    if(gameBoard[0][0] == "X" && gameBoard[1][1] == "X" && gameBoard[2][2] == "X"){
      gameOver = true;
        playerWins();
        return;
    }

    else if(gameBoard[0][2] == "X" && gameBoard[1][1] == "X" && gameBoard[2][0] == "X"){
      gameOver = true;
        playerWins();
        return;
    }

    if(gameBoard[0][0] == "O" && gameBoard[1][1] == "O" && gameBoard[2][2] == "O"){
      gameOver = true;
        computerWins();
        return;
    }

    else if(gameBoard[0][2] == "O" && gameBoard[1][1] == "O" && gameBoard[2][0] == "O"){
      gameOver = true;
        computerWins();
        return;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] === "X" || gameBoard[i][j] === "O"){
            noMoreMoves++;
        }
      }
    }

    if (noMoreMoves == 9) {
      noWinner();
      gameOver = true;
      return;
    }
  }

  function gameBegin(): void {
    console.log("Your move first. You are 'X'.\n");
    printTable();
    while(gameOver == false) {
      userInput();
      if(userCancel == false){
        printTable();
        checkStatus();
        console.clear();
        computerTurn();
        printTable();
        checkStatus();
      }
      else if(userCancel == true){
        console.clear();
        console.log("Thanks for playing");
      }
    }
  }

  function validMove(currentPosition: string): boolean {
    if(currentPosition == "X" || currentPosition == "O"){
      return false;
    }
    return true;
  }

  function userInputPrompt(): string | undefined {
    let userinput = prompt("Enter your position 0 - 8");
    if (userinput == null){
      gameOver = true;
      userCancel = true;
      return;
    }

    while(isNaN(Number(userinput)) || userinput.trim() === "" || userinput.length > 1){
      userinput = prompt("Enter a valid number: 0 - 8");
      if (userinput == null){
        gameOver = true;
        userCancel = true;
        return;
      }
    }

    while(Number(userinput) < 0 || Number(userinput) > 8){
      userinput = prompt("Enter a valid number: 0 - 8");
      if (userinput == null){
        gameOver = true;
        userCancel = true;
        return;
      }
    }
    return userinput;
  }

  function userInput(): void {
    let uinput = userInputPrompt();
    if(userCancel == false){
      switch (uinput) {
        case '0':
          if (validMove(gameBoard[0][0])) {
            gameBoard[0][0] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '1':
          if (validMove(gameBoard[0][1])) {
            gameBoard[0][1] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '2':
          if (validMove(gameBoard[0][2])) {
            gameBoard[0][2] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '3':
          if (validMove(gameBoard[1][0])) {
            gameBoard[1][0] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '4':
          if (validMove(gameBoard[1][1])) {
            gameBoard[1][1] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '5':
          if (validMove(gameBoard[1][2])) {
            gameBoard[1][2] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '6':
          if (validMove(gameBoard[2][0])) {
            gameBoard[2][0] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '7':
          if (validMove(gameBoard[2][1])) {
            gameBoard[2][1] = "X";
          }
          else {
            console.log("Invalid Selection.\n")
            userInput();
          }
          break;
        case '8':
          if (validMove(gameBoard[2][2])) {
            gameBoard[2][2] = "X";
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

  function playAgain(): void {
    let userPlayAgain = prompt("Would you like to play again? [y]es or [n]o");
    if (userPlayAgain === null) {
      console.log("Thanks for playing.");
      return;
    }
    userPlayAgain = userPlayAgain?.toLowerCase();
    if (userPlayAgain == "yes" || userPlayAgain == "y") {
      gameBegin();
    }
    else{
      console.clear();
      console.log("Thanks for playing.")
    }
  }
}

export default tictactoe;