function Gameboard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const markSpot = (Xpos, Ypos, player) => {

    if (board[Xpos][Ypos].getValue() === 0) {
      board[Xpos][Ypos].addToken(player);
    } else {
      return;
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  const checkWin = () => {
    // checking by row
    for (let i = 0; i < rows; i++) {
      if (
        board[i][0].getValue() !== 0 &&
        board[i][0].getValue() === board[i][1].getValue() &&
        board[i][1].getValue() === board[i][2].getValue()
      ) {
        return board[i][1].getValue();
      }
    }

    //checking by column
    for (let i = 0; i < cols; i++) {
      if (
        board[0][i].getValue() !== 0 &&
        board[0][i].getValue() === board[1][i].getValue() &&
        board[1][i].getValue() === board[2][i].getValue()
      ) {
        return board[1][i].getValue();
      }
    }

    //checking diagnols
    if (
      board[0][0].getValue() !== 0 &&
      board[0][0].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][2].getValue()
    ) {
      return board[0][0].getValue();
    }
    if (
      board[0][2].getValue() !== 0 &&
      board[0][2].getValue() === board[1][1].getValue() &&
      board[1][1].getValue() === board[2][0].getValue()
    ) {
      return board[0][2].getValue();
    }

    return null;
  };

  return {
    getBoard,
    markSpot,
    printBoard,
    checkWin
  };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function gameController(playerName1, playerName2) {
  const board = Gameboard();

  const player1 = new playerCreater(playerName1, 1, 'X');
  const player2 = new playerCreater(playerName2, 2, 'O');

  let currPlayer = player1;

  const switchPlayer = () => {
    if(currPlayer === player1) {
        currPlayer = player2;
    }
    else {
        currPlayer = player1;
    }
  };

  const getCurrPlayer = () => {
    return currPlayer;
  }; 

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getCurrPlayer().name}'s turn.`)
  };

  const playRound = (Xpos, Ypos) => {
    console.log(`Writing an ${getCurrPlayer().playerValue} to the position ${Xpos}, ${Ypos} `);
    board.markSpot(Xpos, Ypos, getCurrPlayer().tokenValue);
    if(board.checkWin() !== null) {
        console.log(`${getCurrPlayer().name} WINSSSS`);
    }
    switchPlayer();
    printNewRound();
  }

  printNewRound();

  return { 
    playRound
  };
}


function playerCreater(name, tokenValue, playerValue) {
   this.name = name;
   this.playerValue = playerValue;
   this.tokenValue = tokenValue;
}

(function game() {
    const game = gameController('Player1', 'Player2');
})();
