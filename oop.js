

class Game {
    #boardObj
    constructor(board) {
        this.#boardObj = board
    }

    makeMove(x,y,value){
        this.#boardObj.getBoard[x][y] = value; 
    }
    
}

class Board {
    #board;
    constructor(sqrs) {
        this.#board = [[" "," "," "],[" "," "," "],[" "," "," "]];
        this.sqrs = sqrs
        sqrs.forEach((sqr) => {
            sqr.addEventListener('click', function () {
                if (turnO) {
                    sqr.innerText = 'O';
                    turnO = false;
                    sqr.disabled = true;
                    checkWinner();
                } else {
                    sqr.innerText = 'X';
                    turnO = true;
                    sqr.disabled = true;
                    checkWinner();
                }
            });
        });
    }

    getBoard() {return this.#board}
    
    
    checkWin(){ return this.horizontalCheck(this.#board) || this.diagonalCheck(this.#board) || this.verticalCheck(this.#board); }

    horizontalCheck(board){
        for (let i = 0; i < board.length; i++) {
            if(board[i][0] !== " " && board[i][0] === board[i][1] && board[i][1] === board[i][2])
                return true;
            }
        return false;
    }

    verticalCheck(board){
        for (let i = 0; i < board.length; i++) {
            if(board[0][i] !== " " && board[0][i] === board[1][i] && board[1][i] === board[2][i])
                return true;
            }
        return false;
    }

    diagonalCheck(board){
        return (board[0][0] !== " " && board[0][0] === board[1][1] && board[1][1] === board[2][2])
            || (board[2][0] !== " " && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    }


    getPositionFromNumber(x){
        if(x < 3)
            return [0, x % 3];
        else if(x >= 3 && x < 6)
            return [1, x % 3];
        else if(x >= 6)
            return [2, x % 3]
    };
    getCellContents(x,y){
        return this.b[x][y];
    }

    resetBoard(){ this.#board = [[" "," "," "],[" "," "," "],[ " "," "," "]] }

    toString(){
        return  "[" + this.getBoard()[0][0] + "][" + this.getBoard()[0][1] + "][" + this.getBoard()[0][2] + "]\n" +
                "[" + this.getBoard()[1][0] + "][" + this.getBoard()[1][1] + "][" + this.getBoard()[1][2] + "]\n" +
                "[" + this.getBoard()[2][0] + "][" + this.getBoard()[2][1] + "][" + this.getBoard()[2][2] + "]";
    }

}

let boxes = document.querySelectorAll(".box")
