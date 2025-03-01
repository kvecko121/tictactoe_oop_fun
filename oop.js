class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.boxes = document.querySelectorAll('.box');
        this.functionalButton = document.querySelector('button');
        
        this.init();
    }
    
    init() {
        // Add click event to each box
        this.boxes.forEach((box, index) => {
            box.addEventListener('click', () => this.handleCellClick(box, index));
        });
        
        // Add click event to the functional button
        if (this.functionalButton) {
            this.functionalButton.addEventListener('click', () => {
                window.location.href = 'fun.html'; 
            });
        }
        
        // Create status element
        this.statusDisplay = document.createElement('div');
        this.statusDisplay.classList.add('center');
 
        this.statusDisplay.style.fontSize = 'large';
        this.statusDisplay.style.fontWeight = 'bold';
        this.statusDisplay.style.margin = '20px auto';
        this.updateStatusMessage();
        
        // Insert status display after game board
        const gameBoard = document.querySelector('.game-board');
        gameBoard.parentNode.insertBefore(this.statusDisplay, gameBoard.nextSibling);
        
        // Create restart button
        this.restartButton = document.createElement('button');
        this.restartButton.textContent = 'Restart Game';
        this.restartButton.style.margin = '10px auto';
        this.restartButton.addEventListener('click', () => this.restartGame());
        
        // Create a div to center the restart button
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('center');
        buttonContainer.appendChild(this.restartButton);
        
        // Insert restart button after status display
        this.statusDisplay.parentNode.insertBefore(buttonContainer, this.statusDisplay.nextSibling);
    }
    
    updateStatusMessage() {
        if (this.gameActive) {
            this.statusDisplay.textContent = `It's ${this.currentPlayer}'s turn`;
        }
    }
    
    handleCellClick(box, index) {
        if (this.gameState[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.gameState[index] = this.currentPlayer;
        box.textContent = this.currentPlayer;
        
        
        
        this.checkResult();
    }
    
    checkResult() {
        let roundWon = false;
        
        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            const position1 = this.gameState[a];
            const position2 = this.gameState[b];
            const position3 = this.gameState[c];
            
            if (position1 === '' || position2 === '' || position3 === '') {
                continue;
            }
            
            if (position1 === position2 && position2 === position3) {
                roundWon = true;
                
                // Highlight winning combination
                this.boxes[a].style.background = '#90EE90'; // Light green
                this.boxes[b].style.background = '#90EE90';
                this.boxes[c].style.background = '#90EE90';
                break;
            }
        }
        
        if (roundWon) {
            this.statusDisplay.textContent = `Player ${this.currentPlayer} has won!`;
            this.gameActive = false;
            return;
        }
        
        // Check for draw
        if (!this.gameState.includes('')) {
            this.statusDisplay.textContent = 'Game ended in a draw!';
            this.gameActive = false;
            return;
        }
        
        // Continue game with next player
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatusMessage();
    }
    
    restartGame() {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.updateStatusMessage();
        
        // Clear the board
        this.boxes.forEach(box => {
            box.textContent = '';
            box.style.background = 'beige';
        });
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe();
});