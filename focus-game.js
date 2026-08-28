// ======================================
// FOCUS CHALLENGE GAME
// ======================================

let score = 0;
let timeLeft = 30;

let gameRunning = false;

let timerInterval = null;

let totalClicks = 0;
let missedClicks = 0;


// ======================================
// GET HTML ELEMENTS
// ======================================

const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");

const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");

const startButton = document.getElementById("start-btn");
const message = document.getElementById("message");


// ======================================
// START GAME
// ======================================

function startGame() {

    // Reset values
    score = 0;
    timeLeft = 30;

    totalClicks = 0;
    missedClicks = 0;

    gameRunning = true;


    // Reset display
    timerText.textContent = "30";
    scoreText.textContent = "0";

    message.textContent =
        "🎯 Find and click the target as quickly as you can!";


    // Hide start button
    startButton.style.display = "none";


    // Show target
    target.style.display = "block";


    // Move target
    moveTarget();


    // Remove old timer
    clearInterval(timerInterval);


    // Start timer
    timerInterval = setInterval(function () {

        timeLeft--;

        timerText.textContent = timeLeft;


        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);
}


// ======================================
// TARGET CLICK
// ======================================

target.addEventListener("click", function (event) {

    // Stop click from reaching game area
    event.stopPropagation();


    if (!gameRunning) {
        return;
    }


    // Successful target click
    score++;

    totalClicks++;


    scoreText.textContent = score;


    // Move target
    moveTarget();

});


// ======================================
// GAME AREA CLICK
// ======================================

gameArea.addEventListener("click", function () {

    if (!gameRunning) {
        return;
    }


    // User clicked somewhere other than target
    missedClicks++;

});


// ======================================
// MOVE TARGET
// ======================================

function moveTarget() {

    if (!gameRunning) {
        return;
    }


    const areaWidth =
        gameArea.clientWidth;

    const areaHeight =
        gameArea.clientHeight;


    const targetWidth =
        target.offsetWidth;

    const targetHeight =
        target.offsetHeight;


    // Keep target completely inside game area
    const maxX =
        Math.max(
            0,
            areaWidth - targetWidth
        );


    const maxY =
        Math.max(
            0,
            areaHeight - targetHeight
        );


    const randomX =
        Math.floor(
            Math.random() * (maxX + 1)
        );


    const randomY =
        Math.floor(
            Math.random() * (maxY + 1)
        );


    target.style.left =
        randomX + "px";


    target.style.top =
        randomY + "px";
}


// ======================================
// END GAME
// ======================================

function endGame() {

    if (!gameRunning) {
        return;
    }


    gameRunning = false;


    // Stop timer
    clearInterval(timerInterval);

    timerInterval = null;


    // Hide target
    target.style.display = "none";


    // Show button
    startButton.style.display =
        "inline-block";

    startButton.textContent =
        "Play Again";


    // ==================================
    // ACCURACY
    // ==================================

    const totalAttempts =
        totalClicks + missedClicks;


    let accuracy = 0;


    if (totalAttempts > 0) {

        accuracy =
            Math.round(
                (totalClicks / totalAttempts) * 100
            );

    }


    // ==================================
    // MESSAGE
    // ==================================

    message.textContent =
        "🎉 Time's up! Your score is " +
        score +
        " | Accuracy: " +
        accuracy +
        "%";


    // ==================================
    // SAVE DATA
    // ==================================

    localStorage.setItem(
        "focusScore",
        score
    );


    localStorage.setItem(
        "focusAccuracy",
        accuracy
    );


    localStorage.setItem(
        "focusTime",
        "30"
    );


    localStorage.setItem(
        "focusClicks",
        totalClicks
    );


    localStorage.setItem(
        "focusMisses",
        missedClicks
    );


    localStorage.setItem(
        "focusCompleted",
        "true"
    );


    localStorage.setItem(
        "lastGame",
        "Focus Challenge"
    );


    localStorage.setItem(
        "lastActivity",
        new Date().toLocaleString()
    );
}


// ======================================
// START BUTTON
// ======================================

startButton.addEventListener(
    "click",
    startGame
);


// ======================================
// INITIAL STATE
// ======================================

timerText.textContent = "30";

scoreText.textContent = "0";

target.style.display = "none";

message.textContent =
    "Click Start Game to begin!";