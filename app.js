function gameboard() {
 const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

 const getBoard = function() {
  return board;
 }

 return { getBoard };
}

function players() {

  const playerInfo = [{
    name: "Player One",
    token: "x"
  }, {
    name: "Player Two",
    token: "o"
  }];

  let activePlayer = playerInfo[0];
  let inactivePlayer = playerInfo[1];

  const getActivePlayer = function() {return activePlayer};
  const getInactivePlayer = function() {return inactivePlayer};

  const switchActivePlayer = function() {
    if (activePlayer === playerInfo[0]) {
      activePlayer = playerInfo[1];
    } else {
      activePlayer = playerInfo[0];
    }
  }

  return { getActivePlayer, switchActivePlayer, getInactivePlayer };

}

function gameController() {
  const board = gameboard().getBoard();
  let player = players();

  function checkForWinner() {
    //Check rows
    for (i = 0; i < 3; i++) {
      if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return true;
      }
    }

    //Check columns
    for (i = 0; i < 3; i++) {
      if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return true;
      }
    }

    //Check cross
      if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
      }

    //Check reverse-cross
      if (board[2][0] !== 0 && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        return true;
      }
  }

 function checkForTie() {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

 function checkForEnd() {
  if (checkForWinner()) {
    ui.printWinner(player.getActivePlayer().name); // <-- called immediately
    setTimeout(() => {
      ui.resetUI();
      resetGame();
      ui.printActivePlayer();
    }, 2000);
  } else if (checkForTie()) {
    ui.printTie(); // <-- called immediately
    setTimeout(() => {
      ui.resetUI();
      resetGame();
      ui.printActivePlayer();
    }, 2000);
  }
}

  const dropToken = function(y, x) {
    if (board[y][x] === 0) {
      board[y][x] = player.getActivePlayer().token;
      return true;
    } 
  }

 function playRound(y, x) {
  if (!dropToken(y, x)) return;

  const winner = checkForWinner();
  const tie = checkForTie();

  const activeName = player.getActivePlayer().name;

  player.switchActivePlayer();

  if (winner) return { winner: activeName };
  if (tie) return { tie: true };
  return { next: true };
}

  function resetGame() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        board[y][x] = 0;
      }
    }

    player = players();

  }

  return { dropToken, checkForWinner, checkForTie, playRound, getActivePlayer: () => player.getActivePlayer(), getInactivePlayer: () => player.getInactivePlayer(), resetGame }
}

function gameUI(game) {
  const buttons = document.querySelectorAll(".game-cell");
  const info = document.querySelector(".game-info");
  const startBtn = document.querySelector(".start");
  const gameboard = document.querySelector(".gameboard");
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");

  startBtn.addEventListener("click", () => {
    gameboard.style.display = "grid";
    startBtn.style.display = "none";
    if (player1.value !== "") {
      game.getActivePlayer().name = player1.value;
    }
    if (player2.value !== "") {
      game.getInactivePlayer().name = player2.value;
    }
    printActivePlayer();
  })


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.textContent !== "") return;

    const y = parseInt(button.dataset.y);
    const x = parseInt(button.dataset.x);

    button.textContent = game.getActivePlayer().token;

    const result = game.playRound(y, x); 

    if (result?.winner) {
      printWinner(result.winner);
      setTimeout(() => {
        resetUI();               
        game.resetGame();
        startBtn.style.display = "flex";
        info.textContent = "Fill in names and click Start Game!";
      }, 2000);
    } else if (result?.tie) {
      printTie();
      setTimeout(() => {
        resetUI();
        game.resetGame();
        startBtn.style.display = "flex";
        info.textContent = "Fill in names and click Start Game!";
      }, 2000);
    } else {
      printActivePlayer();
    }
  });
});

  function printActivePlayer() {
    info.textContent = `${game.getActivePlayer().name}'s turn`;
  }

  function printWinner(name) {
    info.textContent = `${name} wins!`;
  }

  function printTie() {
    info.textContent = `It's a tie!`;
  }

  function resetUI() {
    buttons.forEach((button) => {
      button.textContent = "";
    })
  }

  return { printActivePlayer, printWinner, printTie, resetUI };
}

const game = gameController();
const ui = gameUI(game);