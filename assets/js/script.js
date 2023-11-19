var timerElement = document.querySelector('.timer-count');
var quizSection = document.querySelector('#question-block');
var gameOverScreen = document.querySelector('#game-over');
var userInitials = document.querySelector('#initial-input');
var scoreScreen = document.querySelector('#score-page');
var viewHighscores = document.querySelector('#highscores');
var resultFooter = document.querySelector('#result');

var timerCount = 20;
var timer;
var questionNumber = 0;
var score = 0;
var highScores = [];

clearScreen();

// A recurring function that clears the screen between questions
function clearScreen() {
    gameOverScreen.style.display = "none";
    scoreScreen.style.display = "none";
    resultFooter.innerHTML = "";

    while (quizSection.firstChild) {
        quizSection.removeChild(quizSection.firstChild);
    };
   
    while (document.querySelector('#names').firstChild) {
        document.querySelector('#names').removeChild(document.querySelector('#names').firstChild);
    };
};

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

// Setting the timer penalty to reduce by 10 seconds if a wrong answer is selected
function timerDeduction() {
    if (timerCount > 10) {
        timerCount -= 10;
    } else {
        clearInterval(timer);
        gameOver(); //if ten second reduction reduces time below 0 seconds, timer stops and game over occurs
    }
};

// Array of questions for the quiz
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
    },
    
];

// Function to render the question and four answers; loops through the entire question/answer array
function renderQuestion() {
    
    if (questionNumber < questionAnswerArray.length) {
    quizSection.textContent = questionAnswerArray[questionNumber].question;
    // Initialize four buttons and add a possible answer to each
    for (i=0; i<4; i++) {
        const newButton = document.createElement('button');
        newButton.textContent = questionAnswerArray[questionNumber].choices[i];
        quizSection.appendChild(newButton);
        }
    questionNumber++; // Increase question counter so next question gets pulled from question/answer array
    quizSection.addEventListener("click", answerCheck); // If user clicks the mouse when a question is displayed, run the answerCheck function
    }
    else {
        gameOver(); // Go to game over screen if all questions have been asked
};
}

// Function checks that user selected an answer and whether or not this was correct
function answerCheck(event) {
        var element = event.target;
          
        // Checks if element is a button
        if (element.matches("button") === true) {
            // adds the button's text to the selectedAnswer variable
            selectedAnswer = element.textContent;
            if (selectedAnswer == questionAnswerArray[questionNumber-1].answer) {
                resultFooter.innerHTML = "Correct!"
                score ++ ;
            } else {
                resultFooter.innerHTML = "Incorrect!"
                timerDeduction();
            }
        }
                renderQuestion();
};

// Game Over screen initializes and shows user score; prompts user to enter initials
function gameOver() {
    
    while (quizSection.firstChild) {
        quizSection.removeChild(quizSection.firstChild);
    };
   
    clearInterval(timer);

    document.querySelector("#game-over").style.display = "block";
    document.querySelector("#score").textContent = "Your final score is: "+score;
    document.querySelector("#submit").addEventListener("click",addHighScore);
   
};

function addHighScore() {

    var newScore = [];
    if(userInitials.value.length == 2) {
        newScore.push(userInitials.value.trim());
        newScore.push(score);
        highScores.push(newScore);
    };

    displayHighScores();
   
};

function displayHighScores() {
  document.querySelector('.initial-body').style.display = "none";
  clearScreen();

  scoreScreen.style.display = "block";
  document.querySelector('#names').style.display = "block";
  
  
  for (i=0; i<highScores.length; i++) {
    const initialsScore = document.createElement('row');
    initialsScore.textContent = highScores[i][0]+" - "+highScores[i][1]
    document.querySelector('#names').appendChild(initialsScore);
  };

  document.querySelector('#go-back-button').addEventListener("click",init)
  document.querySelector('#clear-scores').addEventListener("click",eraseScores)
    
};

function init() {
    clearScreen();
    document.querySelector(".initial-body").style.display = "block";
    questionNumber = 0;
    timerCount = 20;
    score = 0;
}

function eraseScores() {
    highScores = [];
    displayHighScores();
}

viewHighscores.addEventListener("click",displayHighScores);

// If user hits 'Start Quiz' button, start startQuiz function
document.querySelector('#start-button').addEventListener("click", startQuiz);
