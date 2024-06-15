 //version 1 *************************************
 // Quiz-specific JavaScript code
 /*const questionsContainer = document.getElementById('questions');
 const quizResultsContainer = document.getElementById('quizResults');
 
 //var level1Questions2 = `<%-JSON.stringify(data)%>`
 
 
 const level1Questions = JSON.parse(level1Questions2)
 console.log(level1Questions);
 function loadQuiz() {
     level1Questions.forEach((question, index) => {
         const questionContainer = document.createElement('div');
         questionContainer.classList.add('question-container');
         questionContainer.innerHTML = `
             <strong>Question ${index + 1}:</strong> ${question.question}
             <br>
             <label>
                 <input type="radio" name="q${index}" value="A">
                 ${question.options.A}
             </label>
             <br>
             <label>
                 <input type="radio" name="q${index}" value="B">
                 ${question.options.B}
             </label>
             <br>
             <label>
                 <input type="radio" name="q${index}" value="C">
                 ${question.options.C}
             </label>
             <br>
             <label>
                 <input type="radio" name="q${index}" value="D">
                 ${question.options.D}
             </label>
             <br>
         `;
         console.log(questionContainer);
         questionsContainer.appendChild(questionContainer);
     });
 }
 
 function checkAnswers() {
     const selectedOptions = [];
     const questionContainers = document.querySelectorAll('.question-container');
 
     questionsContainer.querySelectorAll('input[type="radio"]:checked').forEach((input) => {
         selectedOptions.push(input.value);
     });
 
     const correctAnswers = level1Questions.map((question) => question.answer);
     const score = calculateScore(selectedOptions, correctAnswers);
 
     displayResults(score, level1Questions.length, questionContainers);
 }
 
 function calculateScore(selectedOptions, correctAnswers) {
     let score = 0;
 
     selectedOptions.forEach((selected, index) => {
         const isCorrect = selected == correctAnswers[index];
         highlightAnswer(index, isCorrect);
         if (isCorrect) {
             score++;
         }
     });
 
     return score;
 }
 function highlightAnswer(questionIndex, isCorrect) {
     const questionContainers = document.querySelectorAll('.question-container');
     const selectedOption = document.querySelector(`input[name="q${questionIndex}"]:checked`);
 
     if (selectedOption) {
         const label = selectedOption.closest('label');
 
         if (isCorrect) {
             label.style.backgroundColor = '#c8e6c9'; // Light green for correct answers
         } else {
             label.style.backgroundColor = '#ffcdd2'; // Light red for incorrect answers
 
             // Display correct answer below the question
             const correctAnswer = level1Questions[questionIndex].correctAnswer;
             const correctAnswerLabel = document.createElement('p');
             correctAnswerLabel.style.color = '#4caf50'; // Green for correct answer text
             correctAnswerLabel.innerHTML = `Correct Answer: ${correctAnswer}`;
             questionContainers[questionIndex].appendChild(correctAnswerLabel);
         }
     }
 }
 
 
 function displayResults(score, totalQuestions, questionContainers) {
     console.log('Score:', score);
     console.log('Total Questions:', totalQuestions);
 
     quizResultsContainer.innerHTML = `<strong>Results:</strong> Your score is ${score}/${totalQuestions}. Great job!`;
 
     const correctAnswersText = correctAnswers.map((ans, index) => `Question ${index + 1}: ${ans}`).join('<br>');
     quizResultsContainer.innerHTML += `<br><br><strong>Correct Answers:</strong><br>${correctAnswersText}`;
 
     questionContainers[0].scrollIntoView({ behavior: 'smooth' });
 }
 
 
 
 
 // Load the quiz when the page is loaded
 window.onload = loadQuiz;
 */




 //version 2 *****************************************************
 // Quiz-specific JavaScript code
/*const questionsContainer = document.getElementById('questions');
const quizResultsContainer = document.getElementById('quizResults');

// Define level1Questions array (assuming it's defined elsewhere in your code)
const level1Questionsnew = [
    {
        question: "What is 2 + 2?",
        options: {
            A: "3",
            B: "4",
            C: "5",
            D: "6"
        },
        answer: "B"
    },
    {
        question: "What is the capital of France?",
        options: {
            A: "London",
            B: "Berlin",
            C: "Paris",
            D: "Rome"
        },
        answer: "C"
    }
    // Add more questions as needed
];

const level1Questions = JSON.parse(level1Questions2)
function loadQuiz() {
    level1Questions.forEach((question, index) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');
        questionContainer.innerHTML = `
            <strong>Question ${index + 1}:</strong> ${question.question}
            <br>
            <label>
                <input type="radio" name="q${index}" value="A">
                ${question.options.A}
            </label>
            <br>
            <label>
                <input type="radio" name="q${index}" value="B">
                ${question.options.B}
            </label>
            <br>
            <label>
                <input type="radio" name="q${index}" value="C">
                ${question.options.C}
            </label>
            <br>
            <label>
                <input type="radio" name="q${index}" value="D">
                ${question.options.D}
            </label>
            <br>
        `;
        questionsContainer.appendChild(questionContainer);
    });
}

function checkAnswers() {
    const selectedOptions = [];
    const questionContainers = document.querySelectorAll('.question-container');

    questionsContainer.querySelectorAll('input[type="radio"]:checked').forEach((input) => {
        selectedOptions.push(input.value);
    });

    const correctAnswers = level1Questions.map((question) => question.correctAnswer);
    const score = calculateScore(selectedOptions, correctAnswers);

    displayResults(score, level1Questions.length, questionContainers, correctAnswers);
}

function calculateScore(selectedOptions, correctAnswers) {
    let score = 0;

    selectedOptions.forEach((selected, index) => {
        const isCorrect = selected == correctAnswers[index];
        if (isCorrect) {
            score++;
        }
    });

    return score;
}

function displayResults(score, totalQuestions, questionContainers, correctAnswers) {
    quizResultsContainer.innerHTML = `<strong>Results:</strong> Your score is ${score}/${totalQuestions}. Great job!`;

    correctAnswers.forEach((correctAnswer, index) => {
        const questionIndex = index;
        const selectedOption = document.querySelector(`input[name="q${questionIndex}"]:checked`);
        const label = selectedOption.closest('label');
        
        if (selectedOption) {
            if (selectedOption.value === correctAnswer) {
                label.style.backgroundColor = '#c8e6c9'; // Light green for correct answers
            } else {
                label.style.backgroundColor = '#ffcdd2'; // Light red for incorrect answers

                // Display correct answer below the question
                const correctAnswerLabel = document.createElement('p');
                correctAnswerLabel.style.color = '#4caf50'; // Green for correct answer text
                correctAnswerLabel.innerHTML = `Correct Answer: ${correctAnswer}`;
                questionContainers[questionIndex].appendChild(correctAnswerLabel);
            }
        }
    });

    questionContainers[0].scrollIntoView({ behavior: 'smooth' });
}

// Load the quiz when the page is loaded
window.onload = loadQuiz;
*/


//**version 3 *************************************************************** */
// Quiz-specific JavaScript code
const questionContainer = document.getElementById('questionContainer');
const navigationButtons = document.getElementById('navigationButtons');
const submitButton = document.getElementById('submitButton');
const quizResultsContainer = document.getElementById('quizResults');

let currentQuestionIndex = 0;
let answers = [];

// Assuming level1Questions2 is defined in your server-side code and injected into this script
const level1Questions = JSON.parse(level1Questions2);

function displayQuestion(questionIndex) {
    const question = level1Questions[questionIndex];
    const questionHTML = `
        <div class="question-container">
            <div class="questiont"><b>Question ${questionIndex + 1}:</b> ${question.question}</div>
            <br>
            ${Object.keys(question.options).map(option => `
                <div class="optionsv"><button class="option-button" onclick="selectOption(${questionIndex}, '${option}')">${question.options[option]}</button></div>
            `).join('')}
        </div>
    `;
    questionContainer.innerHTML = questionHTML;

    // Highlight selected option if already answered
    const selectedOptionIndex = answers[questionIndex] ? Object.keys(question.options).indexOf(answers[questionIndex]) : -1;
    if (selectedOptionIndex !== -1) {
        const buttons = questionContainer.querySelectorAll('.option-button');
        buttons[selectedOptionIndex].classList.add('selected');
    }

    // Show/hide navigation buttons based on question index
    if (questionIndex === 0) {
        navigationButtons.querySelector('#prevButton').style.display = 'none';
    } else {
        navigationButtons.querySelector('#prevButton').style.display = 'inline-block';
    }

    if (questionIndex === level1Questions.length - 1) {
        submitButton.style.display = 'inline-block';
        navigationButtons.querySelector('#nextButton').style.display = 'none';
    } else {
        submitButton.style.display = 'none';
        navigationButtons.querySelector('#nextButton').style.display = 'inline-block';
    }
}

function selectOption(questionIndex, option) {
    answers[questionIndex] = option;

    // Highlight the selected option
    const buttons = questionContainer.querySelectorAll('.option-button');
    buttons.forEach(button => button.classList.remove('selected'));
    const selectedButton = event.target;
    selectedButton.classList.add('selected');
}

function showNextQuestion() {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
}

function showPreviousQuestion() {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
}

function checkAnswers() {
    const score = calculateScore(answers);
    displayResults(score, level1Questions.length);
}

function calculateScore(answers) {
    let score = 0;
    answers.forEach((selected, index) => {
        if (selected === level1Questions[index].correctAnswer) {
            score++;
        }
    });
    return score;
}

function displayResults(score, totalQuestions) {
    quizResultsContainer.innerHTML = `<strong>Results:</strong> Your score is ${score}/${totalQuestions}. `;
}

// Load the first question when the page is loaded
window.onload = function () {
    displayQuestion(0);
};
