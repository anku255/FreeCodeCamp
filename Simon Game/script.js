// An array to store sequence of boxes that user has to click
let memoryArr = [];
// Maximum size of sequence for user to win
let winSize = 2;
// boolean for strict mode
let strictMode = false;
// memoryArr[userIndex] gives the box that user has to click
let userIndex = 0;
// current count
let count = 0;
// DOM element for count
let countDOM = document.getElementById('countDOM');
// An Object to store all the sounds
const SOUNDS = {
    '0': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    '1': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    '2': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    '3': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    'ERROR': new Audio('http://soundbible.com/grab.php?id=1127&type=mp3')
};
// an array of all color boxes
const BOXES = document.querySelectorAll('.box');

// complementary colors
const CompColors = {
    '0': '#004d40',
    '1': '#b71c1c',
    '2': '#1a237e',
    '3': '#827717'
};

function startGame() {
    // reset the memoryArray, userIndex and title
    memoryArr = [];
    userIndex = 0;
    // reset title
    resetTitle();
    // set onclick listener on each box
    for (let box of BOXES) {
        box.addEventListener('click', boxClicked, false);
    }
    // call nextRound
    nextRound();
}

function nextRound() {
    if (!checkWin()) {
    // reset userIndex for next round
        userIndex = 0;
        memoryArr.push(randomBlock());
        //update count
        updateCount();
        show();
    }
}

// shows the current sequence to user
function show() {
    let i = 0;
    let id = setInterval(function () {
        playSound(memoryArr[i]);
        i++;
        if (i >= memoryArr.length) {
            clearInterval(id);
        }
    }, 1000);
}

// onClickListener for box
function boxClicked() {
    let boxId = this.id;
    if (memoryArr[userIndex] == boxId) {
        playSound(boxId);
        userIndex++;
        // if user has clicked all the boxes, call nextRound
        if (userIndex === memoryArr.length) {
            // wait for 1 second before calling nextRound
            setTimeout(function () {
                nextRound();
            }, 1000);
        }
    } else {
    // user clicked the wrong box
    // display _ in count
        countDOM.innerText = '_';
        // Play error sound
        SOUNDS['ERROR'].play();
        setTimeout(function () {
            // check for strict mode
            if (strictMode)
                startGame();
            else
                repeat();
        }, 1000);

    }
}

// repeats the last sequence
function repeat() {
    updateCount();
    userIndex = 0;
    show();
}

// returns true if user has won also changes the title message
function checkWin() {
    if (userIndex === winSize) {
    // remove onClickLister from every box
        for (let box of BOXES)
            box.removeEventListener('click', boxClicked, false);
        // change title message
        $('h1').html('YOU WON! <span id="message"></span>');
        $('#message').text('Click START to play again');
        return true;
    }
    return false;
}

function playSound(boxId) {
    boxId = Number(boxId);
    SOUNDS[boxId].play();
    let prevColor = jQuery(BOXES[boxId]).css('backgroundColor');
    jQuery(BOXES[boxId]).animate({
        backgroundColor: CompColors[boxId]
    }, 500, function () {
        $(this).animate({
            backgroundColor: prevColor
        }, 500);
    });
}

// Returns a random color block (0-3)
function randomBlock() {
    return Math.floor(Math.random() * 4);
}

// onClickLister for strict mode
function toggleStrict(button) {
    if (strictMode) {
        strictMode = false;
        button.classList.remove('selected');
    } else {
        strictMode = true;
        button.classList.add('selected');
    }
}

// updates the count variable and countDOM
function updateCount() {
    count = memoryArr.length;
    countDOM.innerText = count;
}

// reset the title
function resetTitle() {
    $('h1').html('Simon Game <span id="message"></span>');
    $('#message').text('');
}