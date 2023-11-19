var timerElement = document.querySelector('.timer-count');
var answerButtons = document.querySelectorAll('button');
var quizSection = document.querySelector('#question-block');
var gameOverScreen = document.querySelector('#game-over');

var timerCount = 20;
var timer;
var questionNumber = 0;
var score = 0;
var highScores = {};

function clearScreen() {
    document.querySelector("#game-over").style.display = "none";
    while (quizSection.firstChild) {
        quizSection.removeChild(quizSection.firstChild);
    };
   
};

clearScreen();

// At quiz start, clear the main greeting and the start button
var startQuiz = function () {
    document.querySelector('.initial-body').style.display = "none";
    startTimer();
    renderQuestion();
};

// Setting the timer to decrease each second
function startTimer() {
    timerElement.textContent = "Time: "+timerCount;
    timer = setInterval(function() { 
        timerCount --;
        timerElement.textContent = "Time: "+timerCount; 
        if (timerCount === 0) {
            clearInterval(timer);
            gameOver();
        };
    }, 1000);
};

function timerDeduction() {
    if (timerCount > 10) {
        timerCount -= 10;
        console.log(timerCount);
    } else {
        clearInterval(timer);
        gameOver();
    }
};

var questionNumber = 0;


var questionAnswerArray = [
    {
        question: "What color is the sky?",
        choices: ["Orange", "Blue", "Yellow", "Black"],
        answer: ["Blue"],
    },
    {
        question: "Who duh President is?",
        choices: ["Tubby", "Kit", "Biden", "Trump"],
        answer: ["Biden"],
    }
];


// Render the question segment 
function renderQuestion() {
    
    
    if (questionNumber < questionAnswerArray.length) {
    quizSection.textContent = questionAnswerArray[questionNumber].question;
    // Initialize four buttons and add a possible answer to each
    for (i=0; i<4; i++) {
        const newButton = document.createElement('button');
        newButton.textContent = questionAnswerArray[questionNumber].choices[i];
        quizSection.appendChild(newButton);
        }
    questionNumber++;
    console.log(questionNumber);
    quizSection.addEventListener("click", answerCheck);
    }
    else {
        gameOver();
};
}

function answerCheck(event) {
        var element = event.target;
          
        // Checks if element is a button
        if (element.matches("button") === true) {
            // adds the button's text to the selectedAnswer variable
            selectedAnswer = element.textContent;
            if (selectedAnswer == questionAnswerArray[questionNumber-1].answer) {
                score ++ ;
            } else {
                timerDeduction();
            }
        }
                renderQuestion();
};

function gameOver() {

    clearScreen();
    clearInterval(timer);

    document.querySelector("#game-over").style.display = "block";
    document.querySelector("#score").textContent = "Your final score is: "+score;
    document.querySelector("#submit").addEventListener("click", addHighScore);

};

function addHighScore() {
    if (document.querySelector('input').textContent == "e")
    {
        clearScreen();
    };
}

function displayHighScores() {
    document.querySelector("#game-over").style.display = "none";
    highScores;
}

document.querySelector('#start-button').addEventListener("click", startQuiz);
