document.addEventListener("DOMContentLoaded", () => {
    const categories = ["Storia", "Geografia", "Sport", "Scienze", "Cultura Generale", "Musica"];
    const points = [1000, 2000, 3000, 4000, 8000];
    const questions = [...]; // Importa le domande dal file JSON

    const gameContainer = document.getElementById("categories");

    // Creazione dinamica della griglia di categorie e punteggi
    categories.forEach((category, colIndex) => {
        const categoryHeader = document.createElement("div");
        categoryHeader.classList.add("category");
        categoryHeader.textContent = category;
        gameContainer.appendChild(categoryHeader);

        points.forEach((point, rowIndex) => {
            const questionCell = document.createElement("div");
            questionCell.classList.add("question-cell");
            questionCell.textContent = point;
            questionCell.dataset.category = colIndex;
            questionCell.dataset.point = point;
            questionCell.addEventListener("click", handleQuestionClick);
            gameContainer.appendChild(questionCell);
        });
    });

    function handleQuestionClick(event) {
        const category = event.target.dataset.category;
        const point = event.target.dataset.point;
        const questionData = getQuestion(category, point);

        if (questionData) {
            showQuestionModal(questionData);
        }
    }

    function getQuestion(category, point) {
        return questions.find(q => q.category === parseInt(category) && q.point === parseInt(point));
    }

    function showQuestionModal(questionData) {
        const modal = document.getElementById("question-modal");
        const questionText = document.getElementById("question-text");
        const answersContainer = document.getElementById("answers");

        questionText.textContent = questionData.text;
        answersContainer.innerHTML = "";

        questionData.answers.forEach((answer, index) => {
            const answerButton = document.createElement("button");
            answerButton.textContent = answer;
            answerButton.addEventListener("click", () => handleAnswerClick(index, questionData.correct));
            answersContainer.appendChild(answerButton);
        });

        modal.classList.remove("hidden");
    }

    function handleAnswerClick(selectedIndex, correctIndex) {
        const modal = document.getElementById("question-modal");

        if (selectedIndex === correctIndex) {
            alert("Risposta corretta!");
        } else {
            alert("Risposta sbagliata.");
        }

        modal.classList.add("hidden");
    }

    document.getElementById("close-question").addEventListener("click", () => {
        document.getElementById("question-modal").classList.add("hidden");
    });
});
