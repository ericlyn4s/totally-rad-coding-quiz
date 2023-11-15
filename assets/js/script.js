var startQuiz = function () {
    document.querySelector('#main-greeting').style.display = "none";
    document.getElementById('start-button').style.display = "none";
};

var questionNumber = 0;

var questionAnswerArray = [
    {
        question: "What color is the sky?",
        choices: ["Orange", "Blue", "Yellow", "Black"],
        answer: ["Blue"],
    },
    { 
        question:
    }
];

var renderQuestion = () {
    var questionRender = document.createElement("h2").
}

document.querySelector('#start-button').addEventListener("click", startQuiz);

console.dir