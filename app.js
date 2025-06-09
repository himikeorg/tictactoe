const gameboard = {
    board: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
}

const players = {
    player1: "Mike",
    player2: "Michael",
    player1Token: "x",
    player2Token: "o"
}

const playGame = {
    currentPlayer: players.player1,

    switchPlayer: function () {
        if (this.currentPlayer === players.player1) {
            this.currentPlayer = players.player2;
        } else {
            this.currentPlayer = players.player1;
        }
    },

    selectSpace: function(row, column) {
        if (gameboard.board[row][column] !== "x" && gameboard.board[row][column] !== "o") {
        if (this.currentPlayer === players.player1) {
            gameboard.board[row][column] = players.player1Token;
            this.switchPlayer();
            this.checkForEnd();
        } else {
            gameboard.board[row][column] = players.player2Token;
            this.switchPlayer();
            this.checkForEnd();
        }
        } else {
            console.log("Space already taken. Select another space.");
        }
            console.log(gameboard.board);
        },

        checkForEnd: function () {
            if (gameboard.board[0][0] === gameboard.board[1][0] && gameboard.board[1][0] === gameboard.board[2][0] ||
                gameboard.board[0][1] === gameboard.board[1][1] && gameboard.board[1][1] === gameboard.board[2][1] ||
                gameboard.board[0][2] === gameboard.board[1][2] && gameboard.board[1][2] === gameboard.board[2][2] ||
                gameboard.board[0][0] === gameboard.board[0][1] && gameboard.board[0][1] === gameboard.board[0][2] ||
                gameboard.board[1][0] === gameboard.board[1][1] && gameboard.board[1][1] === gameboard.board[1][2] ||
                gameboard.board[2][0] === gameboard.board[2][1] && gameboard.board[2][1] === gameboard.board[2][2] ||
                gameboard.board[0][0] === gameboard.board[1][1] && gameboard.board[1][1] === gameboard.board[2][2] ||
                gameboard.board[0][2] === gameboard.board[1][1] && gameboard.board[1][1] === gameboard.board[2][0]
        ) {
            console.log("You win!");
        } else if ((gameboard.board[0][0] === "x" || gameboard.board[0][0] === "o") &&
                    (gameboard.board[1][0] === "x" || gameboard.board[1][0] === "o") &&
                    (gameboard.board[2][0] === "x" || gameboard.board[2][0] === "o") &&
                    (gameboard.board[0][1] === "x" || gameboard.board[0][1] === "o") &&
                    (gameboard.board[1][1] === "x" || gameboard.board[1][1] === "o") &&
                    (gameboard.board[2][1] === "x" || gameboard.board[2][1] === "o") &&
                    (gameboard.board[0][2] === "x" || gameboard.board[0][2] === "o") &&
                    (gameboard.board[1][2] === "x" || gameboard.board[1][2] === "o") &&
                    (gameboard.board[2][2] === "x" || gameboard.board[2][2] === "o") 
        ) {
            console.log("Tie!")
            }
        }
}






