// script.js

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const turnText = document.getElementById('turn');
const resetButton = document.getElementById('reset');
const winnerText = document.getElementById('winner');
const drawText = document.getElementById('draw'); // Draw Modal
const newGameButtons = document.querySelectorAll('.new-game-btn');  // New Game Buttons

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cellId = event.target.id.split('-')[1];
    if (gameBoard[cellId] || !gameActive) return;

    gameBoard[cellId] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.style.color = currentPlayer === 'X' ? '#3498db' : '#e74c3c';

    if (checkWinner()) {
        gameActive = false;
        winnerText.textContent = `Player ${currentPlayer} Wins!`;
        winnerText.style.display = 'block';
        return;
    }

    if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        drawText.style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    winnerText.style.display = 'none';
    drawText.style.display = 'none';
    turnText.textContent = `Player X's Turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#333';
    });
}

function startNewGame() {
    resetGame();
    winnerText.style.display = 'none';  // Hide winner modal
    drawText.style.display = 'none';    // Hide draw modal
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButtons.forEach(btn => btn.addEventListener('click', startNewGame));  // New game button action
