////////////////////////////////////////////////////////////CLASS OBJECT OF TIC TAC TOE...SEE FACTORY FUNCTION VERSION BELOW
class Gameboard {
    constructor() {
        this.board = ["", "", "", "", "", "", "", "", ""];
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] !== "" && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }

    isBoardFull() {
        return this.board.every(square => square !== "");
    }

    resetBoard() {
        this.board = ["", "", "", "", "", "", "", "", ""];
    }

    getBoard() {
        return [...this.board];
    }

    makeMove(index, playerMark) {
        if (this.board[index] === "" && !this.checkWin() && !this.isBoardFull()) {
            this.board[index] = playerMark;
            return true;
        }
        return false;
    }
}

class Player {
    constructor(mark) {
        this.mark = mark;
    }
}

class GameController {
    constructor() {
        this.currentPlayer = null;
        this.gameOn = true;
        this.playerX = new Player("X");
        this.playerO = new Player("O");
        this.currentPlayer = this.playerX;
    }

    switchPlayer() {
        this.currentPlayer = (this.currentPlayer === this.playerX) ? this.playerO : this.playerX;
    }

    handlePlayerClick(index) {
        if (this.gameOn) {
            if (gameBoard.makeMove(index, this.currentPlayer.mark)) {
                this.updateBoard();
                if (gameBoard.checkWin()) {
                    this.displayWinner(`${this.currentPlayer.mark} WINS!!`);
                    this.gameOn = false;
                } else if (gameBoard.isBoardFull()) {
                    this.displayWinner("IT'S A TIE!!");
                } else {
                    this.switchPlayer();
                }
            }
        }
    }

    updateBoard() {
        const board = gameBoard.getBoard();
        squares.forEach((square, index) => {
            square.textContent = board[index];
        });
    }

    displayWinner(message) {
        winner.textContent = message;
    }

    resetGame() {
        gameBoard.resetBoard();
        this.gameOn = true;
        this.currentPlayer = this.playerX;
        winner.textContent = "";
        this.updateBoard();
    }
}

// Event listeners
const squares = document.querySelectorAll(".square");
const reset = document.querySelector("#reset");
const winner = document.getElementById("winner");

const gameBoard = new Gameboard();
const gameController = new GameController();

squares.forEach((square, index) => {
    square.addEventListener("click", () => {
        gameController.handlePlayerClick(index);
    });
});

reset.addEventListener("click", () => {
    gameController.resetGame();
});

/////////////////////////////////////////////////////////////////////////FACTORY FUNCTION AND IIFE'S

// const Gameboard = (() => {
//     let board = ["", "", "", "", "", "", "", "", ""];

//     const checkWin = () => {
//         const winPatterns = [
//             [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//             [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//             [0, 4, 8], [2, 4, 6]             // Diagonals
//         ];

//         return winPatterns.some(pattern => {
//             const [a, b, c] = pattern;
//             return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
//         });
//     };

//     const isBoardFull = () => board.every(square => square !== "");

//     const resetBoard = () => {
//         board = ["", "", "", "", "", "", "", "", ""];
//     };

//     const getBoard = () => [...board];

//     const makeMove = (index, playerMark) => {
//         if (board[index] === "" && !checkWin() && !isBoardFull()) {
//             board[index] = playerMark;
//             return true;
//         }
//         return false;
//     };

//     return {
//         getBoard,
//         makeMove,
//         resetBoard,
//         checkWin,
//         isBoardFull
//     };
// })();

// const Player = (mark) => {
//     return { mark };
// };

// const GameController = (() => {
//     let currentPlayer;
//     let gameOn = true;

//     const switchPlayer = () => {
//         currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
//     };

//     const handlePlayerClick = (index) => {
//         if (gameOn) {
//             if (Gameboard.makeMove(index, currentPlayer.mark)) {
//                 updateBoard();
//                 if (Gameboard.checkWin()) {
//                     displayWinner(`${currentPlayer.mark} WINS!!`);
//                     gameOn = false;
//                 } else if (Gameboard.isBoardFull()) {
//                     displayWinner("IT'S A TIE!!");
//                 } else {
//                     switchPlayer();
//                 }
//             }
//         }
//     };

//     const updateBoard = () => {
//         const board = Gameboard.getBoard();
//         squares.forEach((square, index) => {
//             square.textContent = board[index];
//         });
//     };

//     const displayWinner = (message) => {
//         winner.textContent = message;
//     };

//     const resetGame = () => {
//         Gameboard.resetBoard();
//         gameOn = true;
//         currentPlayer = playerX;
//         winner.textContent = "";
//         updateBoard();
//     };

//     const playerX = Player("X");
//     const playerO = Player("O");

//     currentPlayer = playerX;

//     return {
//         handlePlayerClick,
//         resetGame
//     };
// })();

// // Event listeners
// const squares = document.querySelectorAll(".square");
// const reset = document.querySelector("#reset");
// const winner = document.getElementById("winner");

// squares.forEach((square, index) => {
//     square.addEventListener("click", () => {
//         GameController.handlePlayerClick(index);
//     });
// });

// reset.addEventListener("click", () => {
//     GameController.resetGame();
// });
