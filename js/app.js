/*---------------------------- Variables (state) ----------------------------*/
let board; 
let turn; 
let winner; 
let tie; 

const winningCombos = [
  [6, 7, 8], [3, 4, 5], [0, 1, 2], // Horizontal wins
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical wins
  [0, 4, 8], [2, 4, 6]  // Diagonal wins
];

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.square'); 
const messageEl = document.querySelector('#message'); 

console.log(squareEls, messageEl); // Confirm the elements were cached correctly

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ['', '', '', '', '', '', '', '', '']; 
  turn = 'X'; 
  winner = false; 
  tie = false;
  render(); 
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((value, index) => {
    squareEls[index].textContent = value; // Display X, O, or empty
  });
}

function updateMessage() {
  if (winner) {
    messageEl.textContent = `Player ${turn} wins! Congratulations!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `It's ${turn}'s turn!`;
  }
}

function handleClick(event) {
  const squareIndex = parseInt(event.target.id.replace('square-', ''));
  
  if (board[squareIndex] || winner) return; // Return if square is taken or game over
  
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn; // Update the board with the current player's symbol
}

function checkForWinner() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
  });
}

function checkForTie() {
  if (!winner && !board.includes('')) {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (!winner) {
    turn = (turn === 'X') ? 'O' : 'X';
  }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => square.addEventListener('click', handleClick));

const resetBtnEl = document.querySelector('#reset');
resetBtnEl.addEventListener('click', init);

// Initialize the game when the page loads
init();


