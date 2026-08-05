import { questions as originalQuestions } from "./questions.js";

const questionElement = document.getElementById("question");
const questionCounter = document.getElementById("questionCounter");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const feedbackElement = document.getElementById("feedback");
const answerButtons = [...document.querySelectorAll(".answer-btn")];
const nextButton = document.getElementById("nextBtn");

const QUESTION_TIME = 30;

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
let timerInterval = null;
let timeLeft = QUESTION_TIME;
let answerSubmitted = false;

function shuffleArray(items) {
    const copiedItems = [...items];

    for (let index = copiedItems.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));

        [copiedItems[index], copiedItems[randomIndex]] = [
            copiedItems[randomIndex],
            copiedItems[index]
        ];
    }

    return copiedItems;
}

function prepareQuestions() {
    questions = shuffleArray(originalQuestions).map((item) => {
        const answerObjects = item.answers.map((answer, index) => ({
            answer,
            isCorrect: index === item.correct
        }));

        const shuffledAnswers = shuffleArray(answerObjects);

        return {
            question: item.question,
            answers: shuffledAnswers.map((item) => item.answer),
            correct: shuffledAnswers.findIndex((item) => item.isCorrect)
        };
    });
}

function updateProgress() {
    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1}/${questions.length}`;
}

function updateTimerDisplay() {
    timerElement.textContent = `Time: ${timeLeft}`;
    timerElement.classList.toggle("warning", timeLeft <= 10);
}

function startTimer() {
    clearInterval(timerInterval);

    timeLeft = QUESTION_TIME;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAnswer(true);
        }
    }, 1000);
}

function resetAnswerButtons() {
    answerButtons.forEach((button) => {
        button.className = "answer-btn";
        button.disabled = false;
    });
}

function loadQuestion() {
    answerSubmitted = false;
    selectedAnswerIndex = null;

    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";

    nextButton.textContent = "Next Question";
    nextButton.disabled = true;

    resetAnswerButtons();
    updateProgress();

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];

        button.onclick = () => {
            if (answerSubmitted) {
                return;
            }

            selectedAnswerIndex = index;

            answerButtons.forEach((answerButton) => {
                answerButton.classList.remove("selected");
            });

            button.classList.add("selected");
            nextButton.disabled = false;
        };
    });

    startTimer();
}

function submitAnswer(timeExpired = false) {
    if (answerSubmitted) {
        return;
    }

    answerSubmitted = true;
    clearInterval(timerInterval);

    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;

    answerButtons.forEach((button) => {
        button.disabled = true;
    });

    answerButtons[correctIndex].classList.add("correct");

    if (selectedAnswerIndex === correctIndex) {
        score++;

        feedbackElement.textContent = "Correct!";
        feedbackElement.className = "feedback correct-text";
    } else {
        if (selectedAnswerIndex !== null) {
            answerButtons[selectedAnswerIndex].classList.add("wrong");
        }

        feedbackElement.textContent = timeExpired
            ? "Time is up!"
            : "Incorrect!";

        feedbackElement.className = "feedback wrong-text";
    }

    nextButton.disabled = false;

    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "View Result"
            : "Next Question";
}

function finishQuiz() {
    const attemptId =
        typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`;

    localStorage.setItem("score", String(score));
    localStorage.setItem("total", String(questions.length));
    localStorage.setItem("quizName", "One Piece");
    localStorage.setItem("attemptId", attemptId);

    window.location.href = "result.html";
}

nextButton.addEventListener("click", () => {
    if (!answerSubmitted) {
        if (selectedAnswerIndex === null) {
            return;
        }

        submitAnswer(false);
        return;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    loadQuestion();
});

prepareQuestions();
loadQuestion();