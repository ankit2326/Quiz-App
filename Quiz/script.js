// import questions from './questions.js'

var questions = [
    {
        question: "What is 10/2?",
        answers: {
            a: "3",
            b: "5",
            c: "115",
        },
        correctAnswer: "b",
    },
    {
        question: "What is 30/3?",
        answers: {
            a: "3",
            b: "5",
            c: "10",
        },
        correctAnswer: "c",
    },
    {
        question: "What is Javascript?",
        answers: {
            a: "Programming Language",
            b: "Scripting language",
        },
        correctAnswer: "a",
    },
];

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
var isSubmitted = false;

const output = [];

questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (option in currentQuestion.answers) {
        answers.push(
            `<label onclick="selectOption()">
            <input type="radio" name="question${questionNumber}" value="${option}">
            ${option}) ${currentQuestion.answers[option]}
            </label>`
        );
    }
    output.push(
        `<div class="slide flex-col flex-center">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers flex-col flex-center"> ${answers.join("")} </div>
    </div>`
    );
});

quizContainer.innerHTML = output.join("");

function showResults() {
    isSubmitted = true;
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const correctAnswer = `input[value="${currentQuestion.correctAnswer}"]`;
        const userAnswer = (answerContainer.querySelector(selector) || {})
            .value;
        if (userAnswer === currentQuestion.correctAnswer) {
            answerContainer
                .querySelector(selector)
                .closest("label")
                .classList.remove("checked");
            numCorrect++;
        } else {
            if (answerContainer.querySelector(selector) != undefined) {
                answerContainer
                    .querySelector(selector)
                    .closest("label")
                    .classList.remove("checked");
                answerContainer
                    .querySelector(selector)
                    .closest("label")
                    .classList.add("red");
            }
        }
        answerContainer
            .querySelector(correctAnswer)
            .closest("label")
            .classList.add("green");
    });

    resultsContainer.innerHTML = `Total Score: ${numCorrect}/${questions.length}`;
}

function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    numberOfQuestions.innerHTML = n + 1 + " / " + questions.length;
    if (currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

function selectOption() {
    if (isSubmitted == false){
		const optionContainer = document.querySelectorAll(
			`input[name=question${currentSlide}]`
		);
		const selected = document.querySelector(
			`input[name=question${currentSlide}]:checked`
		);
		optionContainer.forEach((option) => {
			if(option.closest("label").classList.contains("checked")==true)
				option.closest("label").classList.remove("checked")
		});
		selected.closest("label").classList.add("checked");
	}
}

const submitButton = document.getElementById("submit");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const numberOfQuestions = document.getElementById("no_of_ques");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
