document.addEventListener('DOMContentLoaded', () => {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = shuffle(data);
            loadQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showScore();
            return;
        }

        const questionData = questions[currentQuestionIndex];
        const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
        const questionCount = document.getElementById('question-count');
        const currentScore = document.getElementById('current-score');
        const progressBar = document.getElementById('progress-bar');

        questionContainer.textContent = questionData.question;
        optionsContainer.innerHTML = '';
        questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        currentScore.textContent = `Score: ${score}`;
        progressBar.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;

        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');

            const optionIndex = document.createElement('div');
            optionIndex.classList.add('option-index');
            optionIndex.textContent = String.fromCharCode(65 + index);

            const optionText = document.createElement('div');
            optionText.classList.add('option-text');
            optionText.textContent = option;

            optionElement.appendChild(optionIndex);
            optionElement.appendChild(optionText);

            optionElement.addEventListener('click', () => {
                if (option === questionData.correct) {
                    optionElement.classList.add('correct');
                    score++;
                } else {
                    optionElement.classList.add('incorrect');
                }
                setTimeout(() => {
                    currentQuestionIndex++;
                    loadQuestion();
                }, 500);
            });
            optionsContainer.appendChild(optionElement);
        });
    }

    function showScore() {
        localStorage.setItem('score', score);
        window.location.href = 'score.html';
    }
});
