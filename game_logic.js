const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return null;
};

const checkDraw = () => {
  return gameState.every(cell => cell !== '');
};

const handleCellClick = (index) => {
  if (gameState[index] === '' && gameActive) {
    gameState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    const winner = checkWinner();
    if (winner) {
      status.innerText = `${winner} wins!`;
      gameActive = false;
    } else if (checkDraw()) {
      status.innerText = 'It\'s a draw!';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.innerText = `Player ${currentPlayer}'s turn`;
    }
  }
};

const handleRestartClick = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.innerText = '');
  status.innerText = `Player ${currentPlayer}'s turn`;
};

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

restartBtn.addEventListener('click', handleRestartClick);
