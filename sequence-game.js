// ======================================
// NUMBER SEQUENCE GAME
// ======================================

let difficulty = "";
let score = 0;
let correct = 0;
let wrong = 0;
let questionNumber = 0;

let currentAnswer = 0;

let seconds = 0;
let timer = null;

const totalQuestions = 10;


// ======================================
// START GAME
// ======================================

function startGame(level) {

    difficulty = level;

    score = 0;
    correct = 0;
    wrong = 0;
    questionNumber = 0;

    document.getElementById("levelBox").style.display = "none";
    document.getElementById("resultBox").style.display = "none";
    document.getElementById("gameBox").style.display = "block";

    updateStats();

    startTimer();

    generateQuestion();
}


// ======================================
// TIMER
// ======================================

function startTimer() {

    clearInterval(timer);

    seconds = 0;

    document.getElementById("timer").innerText = "00:00";

    timer = setInterval(function () {

        seconds++;

        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;

        document.getElementById("timer").innerText =
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0");

    }, 1000);
}


function stopTimer() {

    clearInterval(timer);
    timer = null;
}


// ======================================
// GENERATE QUESTION
// ======================================

function generateQuestion() {

    questionNumber++;

    let numbers = [];

    let start;
    let difference;


    // EASY
    if (difficulty === "easy") {

        start = Math.floor(Math.random() * 10) + 1;

        difference =
            Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < 4; i++) {

            numbers.push(
                start + difference * i
            );
        }

        currentAnswer =
            start + difference * 4;
    }


    // MEDIUM
    else if (difficulty === "medium") {

        start = Math.floor(Math.random() * 10) + 1;

        difference =
            Math.floor(Math.random() * 8) + 3;

        for (let i = 0; i < 4; i++) {

            numbers.push(
                start + difference * i
            );
        }

        currentAnswer =
            start + difference * 4;
    }


    // HARD
    else {

        start =
            Math.floor(Math.random() * 4) + 2;

        let multiplier =
            Math.floor(Math.random() * 2) + 2;

        for (let i = 0; i < 4; i++) {

            numbers.push(
                start * Math.pow(multiplier, i)
            );
        }

        currentAnswer =
            start * Math.pow(multiplier, 4);
    }


    document.getElementById("sequence").innerText =
        numbers.join(" → ") + " → ?";

    document.getElementById("questionNo").innerText =
        questionNumber + "/" + totalQuestions;

    document.getElementById("message").innerText = "";

    document.getElementById("nextBtn").disabled = true;

    createOptions();
}


// ======================================
// CREATE OPTIONS
// ======================================

function createOptions() {

    let options = [
        currentAnswer,
        currentAnswer + 1,
        currentAnswer - 1,
        currentAnswer + 2
    ];


    // Remove duplicates
    options = [...new Set(options)];


    // Shuffle
    options.sort(function () {

        return Math.random() - 0.5;

    });


    let box =
        document.getElementById("options");

    box.innerHTML = "";


    options.forEach(function (number) {

        let button =
            document.createElement("button");

        button.type = "button";

        button.innerText = number;


        button.onclick = function () {

            checkAnswer(number, button);

        };


        box.appendChild(button);

    });
}


// ======================================
// CHECK ANSWER
// ======================================

function checkAnswer(answer, clickedButton) {

    let buttons =
        document.querySelectorAll(
            "#options button"
        );


    // Prevent multiple clicks
    buttons.forEach(function (button) {

        button.disabled = true;

    });


    if (answer === currentAnswer) {

        score += 10;

        correct++;

        document.getElementById("message").innerText =
            "✅ Correct!";

    }

    else {

        wrong++;

        document.getElementById("message").innerText =
            "❌ Wrong! Correct answer: " +
            currentAnswer;

    }


    updateStats();


    document.getElementById("nextBtn").disabled =
        false;
}


// ======================================
// UPDATE STATS
// ======================================

function updateStats() {

    document.getElementById("score").innerText =
        score;

    document.getElementById("correct").innerText =
        correct;

    document.getElementById("wrong").innerText =
        wrong;


    let attempted =
        correct + wrong;

    let accuracy = 0;


    if (attempted > 0) {

        accuracy =
            Math.round(
                (correct / attempted) * 100
            );

    }


    document.getElementById("accuracy").innerText =
        accuracy + "%";
}


// ======================================
// NEXT QUESTION
// ======================================

function nextQuestion() {

    if (questionNumber >= totalQuestions) {

        finishGame();

    }

    else {

        generateQuestion();

    }
}


// ======================================
// FINISH GAME
// ======================================

function finishGame() {

    stopTimer();


    document.getElementById("gameBox").style.display =
        "none";

    document.getElementById("resultBox").style.display =
        "block";


    let attempted =
        correct + wrong;

    let accuracy = 0;


    if (attempted > 0) {

        accuracy =
            Math.round(
                (correct / attempted) * 100
            );

    }


    accuracy = Math.min(accuracy, 100);


    let finalMinutes =
        Math.floor(seconds / 60);

    let finalSeconds =
        seconds % 60;


    let finalTime =
        String(finalMinutes).padStart(2, "0") +
        ":" +
        String(finalSeconds).padStart(2, "0");


    // ==================================
    // SHOW FINAL RESULT
    // ==================================

    document.getElementById("finalScore").innerText =
        score;

    document.getElementById("finalTime").innerText =
        finalTime;

    document.getElementById("finalCorrect").innerText =
        correct;

    document.getElementById("finalWrong").innerText =
        wrong;

    document.getElementById("finalAccuracy").innerText =
        accuracy + "%";


    // ==================================
    // SAVE DATA
    // ==================================

    localStorage.setItem(
        "sequenceScore",
        score
    );

    localStorage.setItem(
        "sequenceAccuracy",
        accuracy
    );

    localStorage.setItem(
        "sequenceTime",
        seconds
    );

    localStorage.setItem(
        "sequenceCorrect",
        correct
    );

    localStorage.setItem(
        "sequenceWrong",
        wrong
    );

    localStorage.setItem(
        "sequenceDifficulty",
        difficulty
    );

    localStorage.setItem(
        "sequenceCompleted",
        "true"
    );

    localStorage.setItem(
        "lastGame",
        "Number Sequence"
    );

    localStorage.setItem(
        "lastActivity",
        new Date().toLocaleString()
    );
}


// ======================================
// PLAY AGAIN
// ======================================

function playAgain() {

    stopTimer();


    document.getElementById("resultBox").style.display =
        "none";

    document.getElementById("levelBox").style.display =
        "block";
}