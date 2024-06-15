// Quiz-specific JavaScript code
const questionsContainer = document.getElementById('questions');
const quizResultsContainer = document.getElementById('quizResults');

const level1Questions = [
    {
        question: 'What is singly linked list?',
        options: {
            A: 'A list that contains only one element',
            B: 'A list in which each node points to the previous and next nodes',
            C: 'A list in which each node points to the next node',
            D: 'A list with no elements'

        },
        correctAnswer: 'C'
    },
    {
        question: 'In a singly linked list, what is the first node called?',
        options: {
            A: 'Head',
            B: 'Tail',
            C: 'Root',
            D: 'Leaf'

        },
        correctAnswer: 'A'
    },
    {
        question: 'What is the time complexity for searching an element in a singly linked list?',
        options: {
            A: 'O(1)',
            B: 'O(log n)',
            C: 'O(n)',
            D: 'O(n^2)'
        },
        correctAnswer: 'C'
    },
    {
        question: ' How is the last node of a singly linked list identified?',
        options: {
            A: 'It points to NULL',
            B: 'It has a special flag',
            C: 'It points to the first node',
            D: 'It has a unique value',

        },
        correctAnswer: 'A'
    },
    {
        question: ' What is the process of adding a new node at the end of a singly linked list called?',
        options: {
            A: 'Insertion',
            B: 'Deletion',
            C: 'Concatenation',
            D: 'Appending',

        },
        correctAnswer: 'A'
    },
    {
        question: 'Which operation is not supported by singly linked lists?',
        options: {
            A: 'Insertion at the beginning',
            B: 'Deletion from the end',
            C: 'Random access of elements',
            D: 'Traversal',

        },
        correctAnswer: 'C'
    },
    {
        question: 'What is a disadvantage of singly linked lists compared to arrays?',
        options: {
            A: 'Constant time for random access',
            B: 'Dynamic size',
            C: 'Difficulty in insertion and deletion',
            D: 'Memory efficiency',

        },
        correctAnswer: 'C'
    },
    {
        question: 'In a singly linked list, how can you remove the first node?',
        options: {
            A: 'Setting the head to NULL',
            B: 'Updating the head to point to the second node',
            C: 'Removing the last node',
            D: 'Using a special flag',

        },
        correctAnswer: 'B'
    },
    {
        question: 'Which of the following is true about the space complexity of a singly linked list?',
        options: {
            A: 'It is always O(1)',
            B: 'It is proportional to the number of nodes',
            C: 'It is independent of the number of nodes',
            D: 'It is logarithmic'

        },
        correctAnswer: 'B'
    },
    {
        question: 'What is the primary advantage of using a singly linked list over an array?',
        options: {
            A: 'Constant time for random access',
            B: 'Dynamic size',
            C: 'Efficient memory usage',
            D: 'Simplicity in implementation',
            
        },
        correctAnswer: 'B'
    },
    // Add more questions...
];

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

    quizResultsContainer.innerHTML = `<strong>Results:</strong> Your score is ${score}/${totalQuestions}`;

    const correctAnswersText = correctAnswers.map((ans, index) => `Question ${index + 1}: ${ans}`).join('<br>');
    quizResultsContainer.innerHTML += `<br><br><strong>Correct Answers:</strong><br>${correctAnswersText}`;

    questionContainers[0].scrollIntoView({ behavior: 'smooth' });
}




// Load the quiz when the page is loaded
window.onload = loadQuiz;
