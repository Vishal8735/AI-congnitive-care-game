// ======================================
// MEMORY MATCH GAME
// ======================================

const cardsData = [
    "🍎", "🍎",
    "🍌", "🍌",
    "⭐", "⭐",
    "❤️", "❤️"
];

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;
let score = 0;
let attempts = 0;

let seconds = 0;
let timer = null;

let gameStarted = false;


// ======================================
// CREATE GAME
// ======================================

function createMemoryGame() {

    const board =
        document.getElementById("gameBoard");

    if (!board) {
        return;
    }

    board.innerHTML = "";

    firstCard = null;
    secondCard = null;

    lockBoard = false;

    matchedPairs = 0;
    score = 0;
    attempts = 0;

    seconds = 0;

    gameStarted = false;

    clearInterval(timer);


    // Reset screen
    document.getElementById("gameScore").textContent = "0";

    document.getElementById("attempts").textContent = "0";

    document.getElementById("gameAccuracy").textContent = "0";

    document.getElementById("timer").textContent = "0";


    const result =
        document.getElementById("result");

    if (result) {
        result.style.display = "none";
    }


    // ==================================
    // SHUFFLE CARDS
    // ==================================

    const shuffledCards =
        [...cardsData];

    shuffledCards.sort(function () {

        return Math.random() - 0.5;

    });


    // ==================================
    // CREATE CARDS
    // ==================================

    shuffledCards.forEach(function (symbol) {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className = "card";

        card.textContent = "❓";

        card.dataset.symbol = symbol;


        card.onclick = function () {

            flipCard(card);

        };


        board.appendChild(card);

    });
}


// ======================================
// TIMER
// ======================================

function startTimer() {

    if (gameStarted) {
        return;
    }

    gameStarted = true;

    timer = setInterval(function () {

        seconds++;

        const timerElement =
            document.getElementById("timer");

        if (timerElement) {

            timerElement.textContent =
                seconds;

        }

    }, 1000);
}


// ======================================
// FLIP CARD
// ======================================

function flipCard(card) {

    if (lockBoard) {
        return;
    }


    if (card === firstCard) {
        return;
    }


    if (card.disabled) {
        return;
    }


    startTimer();


    // Show symbol
    card.textContent =
        card.dataset.symbol;


    card.classList.add("flipped");


    // First card
    if (firstCard === null) {

        firstCard = card;

        return;

    }


    // Second card
    secondCard = card;

    attempts++;


    const attemptsElement =
        document.getElementById("attempts");

    if (attemptsElement) {

        attemptsElement.textContent =
            attempts;

    }


    checkMatch();
}


// ======================================
// CHECK MATCH
// ======================================

function checkMatch() {

    if (!firstCard || !secondCard) {
        return;
    }


    const isMatch =
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol;


    // ==================================
    // MATCH
    // ==================================

    if (isMatch) {

        matchedPairs++;

        score += 10;


        firstCard.disabled = true;

        secondCard.disabled = true;


        firstCard.classList.add("matched");

        secondCard.classList.add("matched");


        document.getElementById(
            "gameScore"
        ).textContent = score;


        updateAccuracy();


        firstCard = null;

        secondCard = null;


        // ==================================
        // GAME COMPLETE
        // ==================================

        if (matchedPairs === 4) {

            setTimeout(function () {

                finishGame();

            }, 500);

        }

    }


    // ==================================
    // NOT MATCH
    // ==================================

    else {

        lockBoard = true;


        setTimeout(function () {

            if (firstCard) {

                firstCard.textContent =
                    "❓";

                firstCard.classList.remove(
                    "flipped"
                );

            }


            if (secondCard) {

                secondCard.textContent =
                    "❓";

                secondCard.classList.remove(
                    "flipped"
                );

            }


            firstCard = null;

            secondCard = null;

            lockBoard = false;


            updateAccuracy();

        }, 800);

    }
}


// ======================================
// ACCURACY
// ======================================

function updateAccuracy() {

    if (attempts === 0) {

        document.getElementById(
            "gameAccuracy"
        ).textContent = "0";

        return;
    }


    const accuracy =
        Math.round(
            (matchedPairs / attempts) * 100
        );


    document.getElementById(
        "gameAccuracy"
    ).textContent =
        Math.min(accuracy, 100);
}


// ======================================
// FINISH GAME
// ======================================

function finishGame() {

    clearInterval(timer);

    gameStarted = false;


    let accuracy = 0;


    if (attempts > 0) {

        accuracy =
            Math.round(
                (matchedPairs / attempts) * 100
            );

    }


    accuracy =
        Math.min(accuracy, 100);


    // ==================================
    // SHOW RESULT
    // ==================================

    const finalScore =
        document.getElementById(
            "finalScore"
        );

    const finalTime =
        document.getElementById(
            "finalTime"
        );

    const finalAttempts =
        document.getElementById(
            "finalAttempts"
        );

    const finalAccuracy =
        document.getElementById(
            "finalAccuracy"
        );


    if (finalScore) {

        finalScore.textContent =
            score;

    }


    if (finalTime) {

        finalTime.textContent =
            seconds;

    }


    if (finalAttempts) {

        finalAttempts.textContent =
            attempts;

    }


    if (finalAccuracy) {

        finalAccuracy.textContent =
            accuracy + "%";

    }


    const result =
        document.getElementById("result");


    if (result) {

        result.style.display =
            "block";

    }


    // ==================================
    // SAVE MEMORY GAME DATA
    // ==================================

    localStorage.setItem(
        "memoryScore",
        score
    );

    localStorage.setItem(
        "memoryAccuracy",
        accuracy
    );

    localStorage.setItem(
        "memoryTime",
        seconds
    );

    localStorage.setItem(
        "memoryAttempts",
        attempts
    );

    localStorage.setItem(
        "memoryCompleted",
        "true"
    );


    // ==================================
    // COMMON DATA
    // ==================================

    localStorage.setItem(
        "lastGame",
        "Memory Match"
    );

    localStorage.setItem(
        "lastActivity",
        new Date().toLocaleString()
    );
}


// ======================================
// RESTART GAME
// ======================================

function restartGame() {

    clearInterval(timer);

    createMemoryGame();

}


// ======================================
// START GAME
// ======================================

createMemoryGame();