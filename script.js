const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
        });
    };

    const isBoardFull = () => board.every(square => square !== "");

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const getBoard = () => [...board];

    const makeMove = (index, playerMark) => {
        if (board[index] === "" && !checkWin() && !isBoardFull()) {
            board[index] = playerMark;
            return true;
        }
        return false;
    };

    return {
        getBoard,
        makeMove,
        resetBoard,
        checkWin,
        isBoardFull
    };
})();

const Player = (mark) => {
    return { mark };
};

const GameController = (() => {
    let currentPlayer;
    let gameOn = true;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
    };

    const handlePlayerClick = (index) => {
        if (gameOn) {
            if (Gameboard.makeMove(index, currentPlayer.mark)) {
                updateBoard();
                if (Gameboard.checkWin()) {
                    displayWinner(`${currentPlayer.mark} WINS!!`);
                    gameOn = false;
                } else if (Gameboard.isBoardFull()) {
                    displayWinner("IT'S A TIE!!");
                } else {
                    switchPlayer();
                }
            }
        }
    };

    const updateBoard = () => {
        const board = Gameboard.getBoard();
        squares.forEach((square, index) => {
            square.textContent = board[index];
        });
    };

    const displayWinner = (message) => {
        winner.textContent = message;
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        gameOn = true;
        currentPlayer = playerX;
        winner.textContent = "";
        updateBoard();
    };

    const playerX = Player("X");
    const playerO = Player("O");

    currentPlayer = playerX;

    return {
        handlePlayerClick,
        resetGame
    };
})();

// Event listeners
const squares = document.querySelectorAll(".square");
const reset = document.querySelector("#reset");
const winner = document.getElementById("winner");

squares.forEach((square, index) => {
    square.addEventListener("click", () => {
        GameController.handlePlayerClick(index);
    });
});

reset.addEventListener("click", () => {
    GameController.resetGame();
});
