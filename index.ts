/*
import tictactoe from 'console-tictactoe'

*/

function tictactoe(): void {
  console.clear();
  console.log("%cShall we play a game?\n", 'font-weight: bold; font-size: 1.5em; color: rgb(0,265,265); font-family: "Lucida Console", "Courier New", monospace;');
  let gameBoard = [
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8']
  ];
  let gameOver: boolean = false;
  let userCancel: boolean = false;
  let restartedGame: boolean = false;

  gameBegin();

  function printTable() {
    const getColor = (value: string) => {
        if (Number.isFinite(Number(value))) {
            return 'color: rgb(190,205,205); font-size: x-large; font-weight: bold';
        }
        switch(value) {
            case 'X': return 'color: rgb(0, 153, 204); font-size: x-large; font-weight: bold';
            case 'O': return 'color: rgb(255, 51, 0); font-size: x-large; font-weight: bold';
            case '_': return 'color: rgb(0,265,265); font-size: x-large; font-weight: bold';
            case '|': return 'color: rgb(0,265,265); font-size: x-large; font-weight: bold';
            default: return 'color: rgb(0,265,265); font-size: x-large; font-weight: bold';
        }
    };
    
    const formatRow = (row: string[]) => {
        const formattedCells: string[] = [];
        const styles: string[] = [];

        row.forEach((cell, index) => {
            formattedCells.push('%c' + cell);
            styles.push(getColor(cell));
            
            if (index < row.length - 1) {
                formattedCells.push('%c|');
                styles.push(getColor('|'));
            }
        });
        
        return {
            text: formattedCells.join(' '),
            styles
        };
    };
    
    let formatString = '';
    let styles = [];

    for (let i = 0; i < 3; i++) {
        const rowFormat = formatRow(gameBoard[i]);
        
        const underlineRow = [];
        const underlineStyles = [];
        if (i < 2) {
          underlineRow.push('%c_________');
          underlineStyles.push(getColor('|'));
        }
        
        formatString += rowFormat.text + '\n' + underlineRow.join(' ') + '\n';
        styles.push(...rowFormat.styles, ...underlineStyles);
    }
    
    formatString = formatString.slice(0, -2);
    console.log(formatString, ...styles);
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

  function gameBegin() {
    if (restartedGame === true) {
        console.clear();
    }
    console.log("%cYour move first. You are '%cX%c'. Computer is '%cO%c'\n", 'font-weight: bold; font-size: 1.2em; color: rgb(0,265,265); font-family: "Lucida Console", "Courier New", monospace;', 'font-weight: bold; font-size: 1.4em; color: rgb(0, 153, 204); font-family: "Lucida Console", "Courier New", monospace;', 'font-weight: bold; font-size: 1.2em; color: rgb(0,265,265); font-family: "Lucida Console", "Courier New", monospace;', 'font-weight: bold; font-size: 1.4em; color: rgb(255, 51, 0); font-family: "Lucida Console", "Courier New", monospace;', 'font-weight: bold; font-size: 1.2em; color: rgb(0,265,265); font-family: "Lucida Console", "Courier New", monospace;');

    printTable();
    while (gameOver === false) {
      userInput();
      if (userCancel === false) {
        printTable();
        checkStatus();
        if (gameOver) {
          return;
        }
        console.clear();
        computerTurn();
        printTable();
        checkStatus();
      }
      else {
        console.clear();
        console.log("%cThanks for playing", 'color: rgb(255 91 36); font-size: 1.8em; font-weight: bold; font-family: "Lucida Handwriting", "Apple Chancery", fantasy;');
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
    console.log("%c--------", 'font-weight: bold; font-size: 1.4em; color: rgb(0, 153, 204); font-family: "Lucida Console", "Courier New", monospace;');
    console.log("%cYou Win!", 'font-weight: bold; font-size: 1.4em; color: rgb(0, 153, 204); font-family: "Lucida Console", "Courier New", monospace;');
    console.log("%c--------", 'font-weight: bold; font-size: 1.4em; color: rgb(0, 153, 204); font-family: "Lucida Console", "Courier New", monospace;');
    playAgain();
  }

  function computerWins() {
    console.clear();
    printTable();
    console.log("%c--------",'font-weight: bold; font-size: 1.4em; color: rgb(255, 51, 0); font-family: "Lucida Console", "Courier New", monospace;');
    console.log("%cYou lose. 👎", 'font-weight: bold; font-size: 1.4em; color: rgb(255, 51, 0); font-family: "Lucida Console", "Courier New", monospace;');
    console.log("%c--------",'font-weight: bold; font-size: 1.4em; color: rgb(255, 51, 0); font-family: "Lucida Console", "Courier New", monospace;');
    playAgain();
  }

  function noWinner() {
    console.clear();
    printTable();
    console.log("%c--------", 'font-weight: bold; font-size: 1.4em; color: color: rgb(190,205,205); font-family: "Lucida Console", "Courier New", monospace;');
    console.log("%cA strange game. The only winning move is not to play.", 'font-weight: bold; font-size: 1.4em; color: color: rgb(190,205,205); font-family: "Lucida Console", "Courier New", monospace;');
    console.log("%c--------", 'font-weight: bold; font-size: 1.4em; color: color: rgb(190,205,205); font-family: "Lucida Console", "Courier New", monospace;');
    playAgain();
  }

  function playAgain() {
    let userPlayAgain = prompt("Would you like to play again? [y]es or [n]o");
    if (userPlayAgain !== null && userPlayAgain !== undefined) {
      userPlayAgain = userPlayAgain.toLowerCase();
    }
    if (userPlayAgain == "yes" || userPlayAgain == "y") {
        restartedGame = true;
        gameOver = false;
        gameBoard = [
            ['0', '1', '2'],
            ['3', '4', '5'],
            ['6', '7', '8']
        ];
        gameBegin();
    }
    else {
        console.clear();
        console.log("%cThanks for playing", 'color: rgb(255 91 36); font-size: 1.8em; font-weight: bold; font-family: "Lucida Handwriting", "Apple Chancery", fantasy;');
    }
  }
}

Object.defineProperty(window, "tictactoe", {
  get: () => {
      tictactoe();
  }
});

export default tictactoe;