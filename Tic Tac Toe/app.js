let mainBoard;
let human = '0';
let computer = 'X';
let winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let cells = document.querySelectorAll('td');

window.onload = function () {
    startGame();
};

function startGame() {
    // Show the modal
    $('#gameModal').modal('show');
    // Initialize the mainBoard from 0-8
    mainBoard = Array.from(Array(9).keys());
    // hide endgame message
    document.querySelector('.endgame').style.display = 'none';
    // remove background color and text from each cell
    // also add an onClickListener
    for (let cell of cells) {
        cell.style.removeProperty('background-color');
        cell.innerText = '';
        cell.addEventListener('click', takeTurn, false);
    }
}

// gets called when a cell is clicked
// calls turn function with appropriate cell id and player
function takeTurn() {
    // if the clicked cell is not already played
    if (typeof mainBoard[this.id] === 'number') {
        turn(this.id, human);
        // If the game is not tied then call turn for computer
        if (!checkTiedGame()) {
            let bestMove = miniMax(mainBoard, computer);
            console.log(bestMove);
            turn(bestMove.index, computer);
        }
    }
}

// Set the given cell to X or 0
function turn(cellID, player) {
    mainBoard[cellID] = player;
    cells[cellID].innerText = player;
    // check if the game is won
    let gameWon = checkWin(mainBoard, player);
    if (gameWon)
        gameOver(gameWon);
}

// returns an object consisting winning combination
// and player who won the game
function checkWin(board, player) {
    // go through every winning combination and 
    // check if every index in winning combination is played
    for (let comb of winningComb) {
        if (comb.every((index) => board[index] === player)) {
            return {
                index: comb,
                player: player
            };
        }
    }
    return null;
}

// gets called when game is Over
// change bg-color of winning comb and removes the onClickListener
function gameOver(winObj) {
    // choose color for player
    let color = (winObj.player === human) ? 'blue' : 'red';
    for (let cellID of winObj.index) {
        cells[cellID].style.backgroundColor = color;
    }
    // remove onClickListener from every cell
    for (let cell of cells) {
        cell.removeEventListener('click', takeTurn, false);
    }
}

// returns an array of empty cells
function emptyCells(board) {
    return board.filter(element => typeof element === 'number');
}

// returns true if game is Tied
function checkTiedGame() {
    if (emptyCells(mainBoard).length === 0) {
    // change the bg of every cell and remove onClickListern
        for (let cell of cells) {
            cell.style.backgroundColor = 'green';
            cell.removeEventListener('click', takeTurn, false);
        }
        return true;
    }
    return false;
}

// returns the best cell index after
// applying minimax on board

function miniMax(newBoard, player) {
    // get empty cells
    let availCells = emptyCells(newBoard);

    // check for terminal state and return score
    if (checkWin(newBoard, human)) {
        return {
            score: -10
        };
    }
    if (checkWin(newBoard, computer)) {
        return {
            score: 10
        };
    }
    if (availCells.length === 0) {
        return {
            score: 0
        };
    }

    // array to store all moves
    let moves = [];

    // for every empty cell call miniMax for 
    // opponent and store index and score in a move object
    // and push that to moves array
    for (let cell of availCells) {
        let move = {};
        move.index = cell;
        // Fill the emtpy cell by player
        newBoard[cell] = player;
        if (player === human) {
            let result = miniMax(newBoard, computer);
            move.score = result.score;
        } else {
            let result = miniMax(newBoard, human);
            move.score = result.score;
        }

        // restore the board
        newBoard[cell] = move.index;
        // push the move to moves array
        moves.push(move);
    }

    // index of the cell for bestMove
    let bestMove = moves[0];
    // Find the move with highest score if its computer
    if (player === computer) {
        let highest = moves[0].score;
        for (let move of moves) {
            if (move.score > highest) {
                highest = move.score;
                bestMove = move;
            }
        }
    } else {
    // choose the move with lowest score
        let lowest = moves[0].score;
        for (let move of moves) {
            if (move.score < lowest) {
                lowest = move.score;
                bestMove = move;
            }
        }
    }
    return bestMove;
}

// sets the player's symbol and then starts the game
function setSymbol(id) {
    if (id === 'X') {
        human = 'X';
        computer = '0';
    } else {
        human = '0';
        computer = 'X';
    }

    startGame();
}