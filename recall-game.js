// ======================================
// OBJECT RECALL GAME
// ======================================

const allObjects = [
    "🍎", "🔑", "📕", "☕", "🌸",
    "🐶", "🚗", "⭐", "🍌", "🎈",
    "📱", "🏠", "🐱", "⚽", "🌳"
];

let correctObjects = [];
let selectedObjects = [];

let score = 0;
let correctCount = 0;
let wrongCount = 0;

let startTime = 0;
let gameTimer = null;


// ======================================
// RANDOM OBJECTS
// ======================================

function generateObjects() {

    let shuffled = [...allObjects];

    shuffled.sort(() => Math.random() - 0.5);

    correctObjects = shuffled.slice(0, 5);

    const objects = document.getElementById("objects");

    if (objects) {
        objects.textContent = correctObjects.join(" ");
    }
}


// ======================================
// RANDOM OPTIONS
// ======================================

function createOptions() {

    const options = document.getElementById("options");

    if (!options) return;

    options.innerHTML = "";

    let wrongObjects = allObjects.filter(function (object) {

        return !correctObjects.includes(object);

    });

    wrongObjects.sort(() => Math.random() - 0.5);

    let optionsList = [
        ...correctObjects,
        ...wrongObjects.slice(0, 3)
    ];

    optionsList.sort(() => Math.random() - 0.5);


    optionsList.forEach(function (object) {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = object;
        button.className = "option";

        button.onclick = function () {

            selectObject(object, button);

        };

        options.appendChild(button);

    });
}


// ======================================
// START GAME
// ======================================

function startRecallGame() {

    clearTimeout(gameTimer);

    score = 0;
    correctCount = 0;
    wrongCount = 0;
    selectedObjects = [];

    const result = document.getElementById("result");
    const question = document.getElementById("question");
    const objects = document.getElementById("objects");
    const countdown = document.getElementById("countdown");
    const instruction = document.getElementById("instruction");

    if (result) result.style.display = "none";

    if (question) question.style.display = "none";

    if (objects) objects.style.display = "block";

    if (countdown) countdown.style.display = "block";

    if (instruction) instruction.style.display = "block";

    if (countdown) {
        countdown.textContent =
            "Remember these objects for 5 seconds...";
    }


    generateObjects();

    createOptions();


    // Start time after objects are shown
    startTime = Date.now();


    // Hide objects after 5 seconds
    gameTimer = setTimeout(function () {

        if (instruction) {
            instruction.style.display = "none";
        }

        if (objects) {
            objects.style.display = "none";
        }

        if (countdown) {
            countdown.style.display = "none";
        }

        if (question) {
            question.style.display = "block";
        }

    }, 5000);
}


// ======================================
// SELECT ANSWER
// ======================================

function selectObject(object, clickedButton) {

    if (selectedObjects.includes(object)) {
        return;
    }

    selectedObjects.push(object);


    if (correctObjects.includes(object)) {

        correctCount++;

        score += 10;

        if (clickedButton) {
            clickedButton.classList.add("correct");
        }

    } else {

        wrongCount++;

        if (clickedButton) {
            clickedButton.classList.add("wrong");
        }
    }


    // Disable selected button
    if (clickedButton) {
        clickedButton.disabled = true;
    }


    // After 5 selections
    if (selectedObjects.length === 5) {

        setTimeout(function () {

            finishGame();

        }, 500);
    }
}


// ======================================
// FINISH GAME
// ======================================

function finishGame() {

    clearTimeout(gameTimer);


    const question = document.getElementById("question");
    const result = document.getElementById("result");

    if (question) {
        question.style.display = "none";
    }

    if (result) {
        result.style.display = "block";
    }


    // Time taken
    let endTime = Date.now();

    let timeTaken = Math.round(
        (endTime - startTime) / 1000
    );


    // Accuracy
    let accuracy = Math.round(
        (correctCount / 5) * 100
    );


    accuracy = Math.min(accuracy, 100);


    // Performance
    let performance = "Needs Practice 💪";

    if (accuracy === 100) {

        performance = "Excellent 🏆";

    } else if (accuracy >= 80) {

        performance = "Very Good ⭐";

    } else if (accuracy >= 60) {

        performance = "Good 👍";
    }


    // ==================================
    // SHOW RESULT
    // ==================================

    const recallScore =
        document.getElementById("recallScore");

    const recallAccuracy =
        document.getElementById("recallAccuracy");

    const correctElement =
        document.getElementById("correctCount");

    const wrongElement =
        document.getElementById("wrongCount");

    const rememberedElement =
        document.getElementById("rememberedCount");

    const performanceElement =
        document.getElementById("performance");


    if (recallScore) {
        recallScore.textContent = score;
    }

    if (recallAccuracy) {
        recallAccuracy.textContent = accuracy;
    }

    if (correctElement) {
        correctElement.textContent = correctCount;
    }

    if (wrongElement) {
        wrongElement.textContent = wrongCount;
    }

    if (rememberedElement) {
        rememberedElement.textContent = correctCount;
    }

    if (performanceElement) {
        performanceElement.textContent = performance;
    }


    // ==================================
    // SAVE DATA FOR DASHBOARD
    // ==================================

    localStorage.setItem(
        "recallScore",
        score
    );

    localStorage.setItem(
        "recallAccuracy",
        accuracy
    );

    localStorage.setItem(
        "recallTime",
        timeTaken
    );

    localStorage.setItem(
        "recallCorrect",
        correctCount
    );

    localStorage.setItem(
        "recallWrong",
        wrongCount
    );

    localStorage.setItem(
        "recallCompleted",
        "true"
    );

    localStorage.setItem(
        "lastGame",
        "Object Recall"
    );

    localStorage.setItem(
        "lastActivity",
        new Date().toLocaleString()
    );
}


// ======================================
// PLAY AGAIN
// ======================================

const playAgainBtn =
    document.getElementById("playAgainBtn");

if (playAgainBtn) {

    playAgainBtn.onclick = function () {

        startRecallGame();

    };
}


// ======================================
// START FIRST GAME
// ======================================

startRecallGame();