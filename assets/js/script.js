// Create variables from main HTML elements using their IDs
var highScoresLink = document.querySelector('#highscores-link');
var initialPage = document.querySelector('#initial-page');
var timerElement =  document.querySelector('#timer-text');
var quizSection = document.querySelector('#question-page');
var questionResult = document.querySelector('#question-result');
var gameOverPage = document.querySelector('#game-over-page');
var scorePage = document.querySelector('#score-page');

// Create global variables and set their defaults
timerCount = 120;
questionNumber = 0;
score = 0;

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

// A recurring function that clears the screen by removing all child elements
function clearScreen() {
    while (initialPage.firstChild) {
        initialPage.removeChild(initialPage.firstChild);
    };

    while (quizSection.firstChild) {
        quizSection.removeChild(quizSection.firstChild);
    };

    while (gameOverPage.firstChild) {
        gameOverPage.removeChild(gameOverPage.firstChild);
    };

    while (scorePage.firstChild) {
        scorePage.removeChild(scorePage.firstChild);
    }
}

// Add link to 'view highscores' header element
highScoresLink.addEventListener("click",displayHighScores);

// Load the landing page first via the inializeScreen function
initializeScreen();
function initializeScreen() {
    var greeting = document.createElement("h1");
    var subGreeting = document.createElement("h3");
    var buttonGreeting = document.createElement("button");

    greeting.textContent = "Coding Quiz Challenge";
    subGreeting.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    buttonGreeting.textContent = "Start Quiz";

    initialPage.appendChild(greeting);
    initialPage.appendChild(subGreeting);
    initialPage.appendChild(buttonGreeting);

    buttonGreeting.addEventListener("click", startQuiz);
}

// At quiz start, load the question/answer section and start timer
function startQuiz() {
    clearScreen();
    startTimer();
    renderQuestion();
}

// Setting the timer to decrease every second
function startTimer() {

    timer = setInterval(function() {
        if (timerCount > 0) {
            timerCount --;
            timerElement.textContent = "Time: "+timerCount;
        } else {
            clearInterval(timer);
            gameOver(); // if time has run out, go to gameOver function
        };
    }, 1000);
}

// Setting the timer penalty to reduce by 10 seconds if a wrong answer is selected
function timePenalty() {
    if (timerCount > 10) {
        timerCount -= 10;
    } else {
        questionNumber = questionAnswerArray.length;
        timerElement.textContent = "Time: 0"; // Reset timer if wrong answer is selected when timer is less than 10 seconds
    };
};

// Function to render the question and four answers; loops through the entire question/answer array
function renderQuestion() {
    if (questionNumber < questionAnswerArray.length) {
        clearScreen();
        // Create new 'h1' element and display next question
        var quizSectionQuestion = document.createElement("h1");
        quizSectionQuestion.textContent = questionAnswerArray[questionNumber].question;
        quizSection.appendChild(quizSectionQuestion);
        // Create four buttons and add an answer to each
        for (i=0; i<4; i++) {
            const answerButton = document.createElement('button');
            answerButton.textContent = questionAnswerArray[questionNumber].choices[i];
            quizSection.appendChild(answerButton);
        }
        // Increase question number and check user answer
        questionNumber++;
        quizSection.addEventListener('click', answerCheck);
    } else {
        gameOver(); // Go to game over screen if all questions have been asked/answered
    };
};

// Function checks that user selected an answer and whether or not this was correct
function answerCheck(event) {
    var element = event.target;
    // Checks if element is a button
    if (element.matches('button') === true) {
        // adds the button's text to the selectedAnswer variable
        selectedAnswer = element.textContent;
        if (selectedAnswer == questionAnswerArray[questionNumber -1].answer) {
            questionResult.innerHTML = "Correct!";
            score ++;
        } else {
            questionResult.innerHTML = "Incorrect!"
            timePenalty();
        }
    };
    renderQuestion();
};

// Game Over screen initializes and shows user score; prompts user to enter initials
function gameOver() {
    clearScreen();
    clearInterval(timer);
    
    // Create a message, an input section, and a button and append it to the game over section of the HTML
    var gameOverText = document.createElement('h1');
    var gameOverInput = document.createElement('input');
    var gameOverButton = document.createElement('button');

    gameOverText.textContent = "Your final score is: "+score;
    gameOverButton.textContent = "Submit";

    gameOverPage.appendChild(gameOverText);
    gameOverPage.appendChild(gameOverInput);
    gameOverPage.appendChild(gameOverButton);

    // If user hits the 'submit' button, check that they entered two characters, then add this to local storage
    gameOverButton.addEventListener('click',function() {
        var highScores = JSON.parse(localStorage.getItem("highScores"))||[];
        var newScore = {};
    
        if(gameOverInput.value.length == 2) {
            newScore.initials = gameOverInput.value;
            newScore.score = score;
            highScores.push(newScore);
            localStorage.setItem("highScores",JSON.stringify(highScores));
        } else {
            questionResult.innerHTML = "Initials must be two characters in length";
            return;
        };
        // Initials and score are added to the high scores list, run the function to display the list
        displayHighScores();
    });
}

// Function to display all high scores in local storage
function displayHighScores() {
    clearScreen();
    questionResult.innerHTML = "";
    timerElement.textContent = "";

    // create a message and two buttons and define their contents
    var highScoresMessage = document.createElement('h1');
    var highScoresBackButton = document.createElement('button');
    var highScoresClearButton = document.createElement('button');
    highScoresMessage.textContent = "High Scores";
    highScoresBackButton.textContent = "Go Back";
    highScoresClearButton.textContent = "Clear Scores";

    // Put the message at the top of this section
    scorePage.appendChild(highScoresMessage);
    

    // Redefine the highScores array by pulling data from the "highScores" array in local storage
    var highScores = JSON.parse(localStorage.getItem("highScores"))||[];
   
    // Build the high scores list using a loop through this array
    for (i=0; i<highScores.length; i++) {
    const initialsScore = document.createElement('row');
    initialsScore.textContent = highScores[i].initials+" - "+highScores[i].score;
    scorePage.appendChild(initialsScore);
    };

    // Functionality for the two buttons on this page
    highScoresBackButton.addEventListener("click",reset);
    highScoresClearButton.addEventListener("click",eraseScores);

    // Append the 'back' and 'clear' buttons to the bottom of the list
    scorePage.appendChild(highScoresBackButton);
    scorePage.appendChild(highScoresClearButton);
}

// Reset the quiz 
function reset() {
    clearScreen();
    // Reset the questions and timer to defaults
    questionNumber = 0; 
    timerCount = 120;
    score = 0;
    initializeScreen();
}

// Erases the global scores array
function eraseScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
}