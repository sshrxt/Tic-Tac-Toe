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
      console.log(player);
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
  const playerTurnTitle = document.querySelector(".player-turn-title");
  playerTurnTitle.textContent = `${player1.name}'s turn`;

  let currPlayer = player1;

  console.log(player1);

  const changePlayerName = (whichPlayer, newName) => {
    if(whichPlayer === "one") {
      player1.name = newName;
      if(getCurrPlayer() === player1){
        updatePlayerTitle(player1);
      }
    }
    else {
      player2.name = newName;
      if(getCurrPlayer() === player2){
        updatePlayerTitle(player2);
      }
    }
  }

  const updatePlayerTitle = (player) => {
    playerTurnTitle.textContent = `${player.name}'s turn`;
  }

  const getBoard = () => {
    return board.getBoard();
  };

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
    playerTurnTitle.textContent = `${getCurrPlayer().name}'s turn`;
    updateBoard(board.getBoard());
    printNewRound();
  }

  printNewRound();

  return { 
    getBoard,
    playRound, 
    changePlayerName
  };
}

function updateBoard(board) {
  // Get the parent div
  const parentDiv = document.querySelector(".board");

  // Get all child elements
  const children = parentDiv.children;

  // Optionally convert HTMLCollection to an array
  const childrenArray = Array.from(children);

  const flatBoard = board.flat();

  
  for(let i = 0; i < childrenArray.length; i++) {
    if(flatBoard[i].getValue() !== 0) {
      childrenArray[i].textContent = flatBoard[i].getValue();
    }
  }
}


function playerCreater(name, playerValue, tokenValue) {
   this.name = name;
   this.playerValue = playerValue;
   this.tokenValue = tokenValue;
}

function addPlayerListeners(game){
  const playerOne = document.querySelector("#player-title-one");
  playerOne.addEventListener("input", ()=> {
    game.changePlayerName("one", playerOne.value);
  });

  const playerTwo = document.querySelector("#player-title-two");
  playerTwo.addEventListener("input", ()=> {
    game.changePlayerName("two", playerTwo.value);
  });
}



(function game() {
    const game = gameController('Shrut', 'Oksana');
    const board = game.getBoard();
    addPlayerListeners(game);
    console.log(board);

    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    const mainContainer = document.querySelector(".main-container");

    board.map((row, rowIndex) => {
        row.map((cell, cellIndex) => {
            const cellDiv = document.createElement("div");
            cellDiv.textContent = " ";
            cellDiv.classList.add("cell");
            cellDiv.dataset.row = rowIndex; 
            cellDiv.dataset.cell = cellIndex;
            cellDiv.dataset.movedPlace = "false";
            cellDiv.addEventListener("click", ()=> {
              const currRow = event.target.dataset.row;
              const currCell = event.target.dataset.cell;
              if(event.target.dataset.movedPlace === "false") {
                game.playRound(currRow, currCell);
                event.target.dataset.movedPlace = "true";
              }
            });
            boardDiv.appendChild(cellDiv);
        });
    });
    mainContainer.insertBefore(boardDiv, document.querySelector(".restart"));

    // game.playRound(1, 1);
    // game.playRound(1, 0);
    // game.playRound(0, 0);
    // game.playRound(0, 1);
    // game.playRound(2, 2);
})();
