var timerElement = document.querySelector('.timer-count');

var timerCount = 3;
var timer;

// At initialization, clear the main greeting and the start button
var startQuiz = function () {
    document.querySelector('#main-greeting').style.display = "none";
    document.getElementById('start-button').style.display = "none";
    startTimer();
};

// Setting the timer to decrease each second
function startTimer() {
    timer = setInterval(function() { 
        timerCount --;
        timerElement.textContent = "Time: "+timerCount;
        
        if (timerCount === 0) {
            clearInterval(timer);
        };
    }, 1000);
};

var questionNumber = 0;

/*
var questionAnswerArray = [
    {
        question: "What color is the sky?",
        choices: ["Orange", "Blue", "Yellow", "Black"],
        answer: ["Blue"],
    },
    { 
        question:
    
];



var renderQuestion = () {
    var questionRender = document.createElement("h2").
};
*/

document.querySelector('#start-button').addEventListener("click", startQuiz);
