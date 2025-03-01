// fun.js - Functional Tic Tac Toe implementation with game status and restart button

document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let gameState = {
      board: Array(9).fill(''),
      currentPlayer: 'X',
      gameActive: true,
      status: 'Player X\'s turn'
    };
  
    // DOM elements
    const boxes = document.querySelectorAll('.box');
    const button = document.querySelector('button');
    
    // Create game status element
    const gameStatusDiv = document.createElement('div');
    gameStatusDiv.classList.add('game-status', 'center');
    document.querySelector('.game-board').parentNode.insertBefore(
      gameStatusDiv, 
      document.querySelector('.game-board')
    );
    
    // Create restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.classList.add('restart-btn');
    document.querySelector('.game-board').parentNode.appendChild(restartButton);
  
    // Initialize game
    initGame();
  
    function initGame() {
      // Add event listeners to boxes
      boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(index));
      });
  
      // Add event listener to button for redirection
      if (button) {
        button.addEventListener('click', () => {
          window.location.href = 'oop.html';
        });
      }
      
      // Add event listener to restart button
      restartButton.addEventListener('click', resetGame);
  
      // Reset the game state
      gameState = {
        board: Array(9).fill(''),
        currentPlayer: 'X',
        gameActive: true,
        status: 'Player X\'s turn'
      };
  
      // Clear the board
      boxes.forEach(box => {
        box.textContent = '';
      });
      
      // Update status display
      updateStatusDisplay();
    }
  
    // Handle box click
    function handleBoxClick(index) {
      // If the box is already filled or game is not active, return
      if (gameState.board[index] !== '' || !gameState.gameActive) {
        return;
      }
  
      // Update the game state
      gameState = makeMove(gameState, index);
  
      // Update the UI
      updateUI();
  
      // Check for game over conditions
      checkGameOver();
      
      // Update status display
      updateStatusDisplay();
    }
  
    // Pure function to make a move
    function makeMove(state, index) {
      // Create a copy of the board
      const newBoard = [...state.board];
      
      // Update the board with the current player's mark
      newBoard[index] = state.currentPlayer;
      
      // Switch player and update status
      const nextPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      const newStatus = `Player ${nextPlayer}'s turn`;
      
      // Return new state with updated board and toggled player
      return {
        ...state,
        board: newBoard,
        currentPlayer: nextPlayer,
        status: newStatus
      };
    }
  
    // Update the UI based on the game state
    function updateUI() {
      boxes.forEach((box, index) => {
        box.textContent = gameState.board[index];
      });
    }
    
    // Update status display
    function updateStatusDisplay() {
      gameStatusDiv.textContent = gameState.status;
    }
  
    // Check for win or draw
    function checkGameOver() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      // Check for win
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState.board[a] && 
            gameState.board[a] === gameState.board[b] && 
            gameState.board[a] === gameState.board[c]) {
          
          announceWinner(gameState.board[a]);
          return;
        }
      }
  
      // Check for draw
      if (!gameState.board.includes('')) {
        announceDraw();
      }
    }
  
    // Announce winner
    function announceWinner(player) {
      gameState = {
        ...gameState,
        gameActive: false,
        status: `Player ${player} wins!`
      };
      
      updateStatusDisplay();
    }
  
    // Announce draw
    function announceDraw() {
      gameState = {
        ...gameState,
        gameActive: false,
        status: 'Game ended in a draw!'
      };
      
      updateStatusDisplay();
    }
  
    // Reset the game
    function resetGame() {
      initGame();
    }
  });