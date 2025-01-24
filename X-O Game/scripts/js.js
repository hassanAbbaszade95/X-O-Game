const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes(null) ? null : 'Tie';
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(board.children).indexOf(cell);

    if (gameState[cellIndex] || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        winnerDisplay.style.display = 'block';
        winnerDisplay.textContent = winner === 'Tie' ? 'It\'s a Tie!' : `${winner} Wins!`;
        resetButton.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameState.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    board.innerHTML = '';
    winnerDisplay.style.display = 'none';
    resetButton.style.display = 'none';
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

resetButton.addEventListener('click', resetGame);

createBoard();