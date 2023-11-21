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
var timerCount = 20;
var questionNumber = 0;
var score = 0;
var timer = null;

// Array of questions for the quiz
var questionAnswerArray = [
    {
        question: "Which of the following best describes a Web API?",
        choices: ["Web APIs are low level code (say C or C++) that directly control the computer's GPU or other graphics functions.",
        "Web APIs are not built into the browser by default, and you generally have to retrieve their code and information from somewhere on the Web.",
        "Web APIs are built into your web browser and contain methods that allow us to manipulate a web page via JavaScript.",
        "Web APIs are a part of the JavaScript language itself and are built into your browser."],
        answer: ["Web APIs are built into your web browser and contain methods that allow us to manipulate a web page via JavaScript."],
    },
    {
        question: "Which of the following would change an element's background to red?",
        choices: ['element.setAttribute("style", "background-color: red");',
        'element.setAttribute("red");',
        'element.setAttribute("class", "background: red");',
        'element.setAttribute("style", "red");'],
        answer: ['element.setAttribute("style", "background-color: red");'],
    },
    {
        question: "How would you append the following to the DOM? var myDiv = document.createElement('div');",
        choices: ['myDiv.appendChild.document.body;',
        'document.body.appendChild(myDiv);',
        'document.body.appendChild("div");',
        'document.body.appendChild = myDiv;'],
        answer: ["document.body.appendChild(myDiv);"],
    },
    {
        question: "What value would we add to setInterval() if we want a function called, myTimer() to run every 3 seconds?",
        choices: ['setInterval(myTimer, 3)',
        'setInterval(myTimer, 300)',
        'setInterval(myTimer, 30)',
        'setInterval(myTimer, 3000)'],
        answer: ["setInterval(myTimer, 3000)"],
    },
    {
        question: "Which attribute would we use to send an alert to the user when they click a specific element?",
        choices: ["onchange='alert('You clicked me.')'",
        "onclose='alert('You clicked me.')",
        "ontoggle='alert('You clicked me.')",
        "onclick='alert('You clicked me.')"],
        answer: ["onclick='alert('You clicked me.')"],
    },
    {
        question: "While creating a form for a client, you decide that you do not want the corresponding browser actions to happen, and you want to implement another behavior instead. What would you use to make this possible?",
        choices: ['event.preventDefault()',
        'event.dispatchEvent()',
        'event.stopPropagation()',
        'event.stopAction()'],
        answer: ["event.preventDefault()"],
    },
    {
        question: "You need to add an event listener to an element, pressEl, that checks to see if the element has been clicked and then runs myFunction(). Which of the following would you add to your code?",
        choices: ['addEventListener(pressEL, "click", myFunction)',
        'pressEl.addEventListener("click", myFunction)',
        'pressEl.addEventListener("keydown", myFunction())',
        'addEventListener(pressEL, "mouseover", myFunction())'],
        answer: ['pressEl.addEventListener("click", myFunction)'],
    },
    {
        question: "Your colleague notices that when she clicks on a <p> element on her page, handlers run on <p> and on <p>'s parent elements as well. She asks you to help her debug. Which of the following is most likely?",
        choices: ['The parent node of <p> is triggering a bubbling event that is bubbling down towards <p> when it is clicked.',
        'She forgot to add event.preventDefault() in her script.js file.',
        'She added an event listener in the wrong place in her html file.',
        "A bubbling event is occurring that starts with the target element, <p>, and is then running handlers on <p>'s parent and other ancestors."],
        answer: ["A bubbling event is occurring that starts with the target element, <p>, and is then running handlers on <p>'s parent and other ancestors."],
    },
    {
        question: "Which statement best describes what is happening to data when it is persisted to local storage.",
        choices: ['The data is stored in the client or browser.',
        'The data is stored in the database in the backend.',
        'The data is stored under the Applications tab in Chrome Dev Tools.',
        'The data is stored in the window called localStorage.'],
        answer: ["The data is stored in the client or browser."],
    },
    {
        question: "Why do we need to convert an object into JSON in order for it to properly persist to local storage?",
        choices: ['Local storage cannot read JavaScript, so we convert JavaScript into JSON.',
        'Local storage only accepts JSON objects.',
        'It is convention to store objects using JSON, and we must follow that pattern so that our code is easy to read.',
        'Local storage can only store strings, so we convert the object to JSON to store it properly.'],
        answer: ["Local storage can only store strings, so we convert the object to JSON to store it properly."],
    },
    {
        question: "You would like to set var classAttribute equal to an element's class attribute so that you can use the variable later in your code. Which of the following would accomplish this?",
        choices: ['var classAttribute = element.removeAttribute("class);',
        'var classAttribute = element.setAttribute("class");',
        'var classAttribute = element.setAttribute("class", "classAttribute);',
        'var classAttribute = element.getAttribute("class");'],
        answer: ['var classAttribute = element.getAttribute("class");'],
    },
    {
        question: 'You need to retrieve data with the key name of "formData" from local storage and convert it into an object. How would you accomplish this?',
        choices: ['var formData = JSON.parse("formData");',
        'var formData = JSON.parse(localStorage.getItem("formData"));',
        'var formData = JSON.stringify(localStorage.getItem("formData"));',
        'var formData = JSON.parse(localStorage.setItem("formData"));'],
        answer: ['var formData = JSON.parse(localStorage.getItem("formData"));'],
    },
    {
        question: "You just finished the feature that you've been working on a successfully merged your branch, feature-52. How would you delete branch, feature-52?",
        choices: ["git branch feature-52",
            "git branch -d feature-52",
            "git merge feature-52",
            "git checkout feature-52"],
        answer: ["git branch -d feature-52"],
    },
    {
        question: "Which of the following is NOT an example of why we use client-side storage?",
        choices: ["It is best practice to use client-side storage to store sensitive information, like a user's payment information.",
        "It allows us to store the contents of a user's shopping cart from a previous session.",
        "We can use it to remember a user's preferences.",
        'It can allow a user to use a site without a network connection.'],
        answer: ["It is best practice to use client-side storage to store sensitive information, like a user's payment information."],
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
        gameOver(); //if ten second reduction reduces time below 0 seconds, timer stops and game over occurs
    };
};

// Function to render the question and four answers; loops through the entire question/answer array
function renderQuestion() {
    gameOverScreen.style.display = "none";
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
  
    gameOverScreen.style.display = "block";
    clearScreen();
    clearInterval(timer);

    scoreTotal.textContent = "Your final score is: "+score;
    submitButton.addEventListener("click",addHighScore); //Once user submits initials and hits submit button, start the addHighScore function
};

// addHighScore ensure the user has typed in two characters, creates a new array for this, then pushes that array to the global highscore array
function addHighScore() {
    // Reset local array to be empty
    var highScores = JSON.parse(localStorage.getItem("highScores"))||[];
    var newScore = {};
    // Check that input is 2 characters exactly
    if(userInitials.value.length == 2) {
        newScore.initials = userInitials.value;
        newScore.score = score;
        highScores.push(newScore);
        localStorage.setItem("highScores",JSON.stringify(highScores));
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
  var highScores = JSON.parse(localStorage.getItem("highScores"))||[];
  if (highScores.length == 0) {
    return;
    };
  // Build the high scores list using a loop through the global high scores array
  for (i=0; i<highScores.length; i++) {
    const initialsScore = document.createElement('row');
    initialsScore.textContent = highScores[i].initials+" - "+highScores[i].score;
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
    timerCount = 20;
    score = 0;
}

// Erases the global scores array
function eraseScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
}

// If user hits 'View Highscores' button, go to high scores list
viewHighscores.addEventListener("click",displayHighScores);

// If user hits 'Start Quiz' button, start startQuiz function
startButton.addEventListener("click", startQuiz);
