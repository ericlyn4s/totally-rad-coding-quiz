// Create variables from main HTML elements using their IDs
var viewHighscores = document.querySelector('#highscores');
var timerElement = document.querySelector('#timer-count');
var startingPage = document.querySelector('#initial-body')
var startButton = document.querySelector('#start-button');
var quizSection = document.querySelector('#question-block');
var gameOverScreen = document.querySelector('#game-over');
var userInitials = document.querySelector('#initial-input');
var initialsList = document.querySelector('#names');
var scoreScreen = document.querySelector('#score-page');
var submitButton = document.querySelector("#submit");
var scoreTotal = document.querySelector('#score')
var goBack = document.querySelector('#go-back-button');
var clearScores = document.querySelector('#clear-scores')
var resultFooter = document.querySelector('#result');

// Create global variables and set their defaults
var timerCount = 60;
var questionNumber = 0;
var score = 0;
var highScores = [];

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

// Ensure only the landing page loads at page initiation
clearScreen();

// A recurring function that clears the screen between quiz components
function clearScreen() {
    gameOverScreen.style.display = "none";
    scoreScreen.style.display = "none";

    // Deletes any answer buttons that remain
    while (quizSection.firstChild) {
        quizSection.removeChild(quizSection.firstChild);
    };
   
    // Deletes any entries that still exist in the high scores list
    while (initialsList.firstChild) {
        initialsList.removeChild(initialsList.firstChild);
    };
};



// At quiz start, clear the main greeting and the start button
var startQuiz = function () {
    startingPage.style.display = "none";
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
            gameOver(); //if time has run out, go to gameOver function
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
    };
};

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
    } else {
        gameOver(); // Go to game over screen if all questions have been asked
    };
};

// Function checks that user selected an answer and whether or not this was correct
function answerCheck(event) {
        var element = event.target;  
        // Checks if element is a button
        if (element.matches("button") === true) {
            // adds the button's text to the selectedAnswer variable
            selectedAnswer = element.textContent;
            if (selectedAnswer == questionAnswerArray[questionNumber-1].answer) {
                resultFooter.innerHTML = "Correct!"
                score ++;
            } else {
                resultFooter.innerHTML = "Incorrect!"
                timerDeduction();
            }
        };
    renderQuestion();
};

// Game Over screen initializes and shows user score; prompts user to enter initials
function gameOver() {
    clearScreen();
    clearInterval(timer);
    gameOverScreen.style.display = "block";
    scoreTotal.textContent = "Your final score is: "+score;
    submitButton.addEventListener("click",addHighScore); //Once user submits initials and hits submit button, start the addHighScore function
};

// addHighScore ensure the user has typed in two characters, creates a new array for this, then pushes that array to the global highscore array
function addHighScore() {
    // Reset local array to be empty
    var newScore = [];
    // Check that input is 2 characters exactly
    if(userInitials.value.length == 2) {
        newScore.push(userInitials.value.trim());
        newScore.push(score);
        highScores.push(newScore);
    };
    // Initials and score are added to the high scores list, run the function to display the list
    displayHighScores();
};

// High scores are displayed on a new screen
function displayHighScores() {
  // Hide header and footer elements and clear the scree
  startingPage.style.display = "none";
  timerElement.style.display = "none";
  viewHighscores.style.display = "none";
  resultFooter.innerHTML = "";
  clearScreen();
  // Activate the score screen that was pulled from HTML
  scoreScreen.style.display = "block";
  initialsList.style.display = "block";
  // Build the high scores list using a loop through the global high scores array
  for (i=0; i<highScores.length; i++) {
    const initialsScore = document.createElement('row');
    initialsScore.textContent = highScores[i][0]+" - "+highScores[i][1]
    initialsList.appendChild(initialsScore);
  };
  // Functionality for the two buttons on this page
  goBack.addEventListener("click",reset);
  clearScores.addEventListener("click",eraseScores);
};

// Reset the quiz 
function reset() {
    clearScreen();
    // Display all header elements
    timerElement.style.display = "block";
    viewHighscores.style.display = "block";
    startingPage.style.display = "block";
    // Reset the questions and timer to defaults
    questionNumber = 0;
    timerCount = 60;
    score = 0;
}

// Erases the global scores array
function eraseScores() {
    highScores = [];
    displayHighScores();
}

// If user hits 'View Highscores' button, go to high scores list
viewHighscores.addEventListener("click",displayHighScores);

// If user hits 'Start Quiz' button, start startQuiz function
startButton.addEventListener("click", startQuiz);
