
    // Quiz-specific JavaScript code
const questionsContainer = document.getElementById('questions');
const quizResultsContainer = document.getElementById('quizResults');




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


