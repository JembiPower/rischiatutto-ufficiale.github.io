document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("categories");
    const questionModal = document.getElementById("questionModal");
    const teamModal = document.getElementById("teamModal");
    const questionText = document.getElementById("questionText");
    const answersContainer = document.getElementById("answers");
    const closeModalButton = document.getElementById("closeModal");

    let currentTeam = null;
    let currentScore = [1000, 1000, 1000, 1000];
    let selectedCategory = null;

    const data = {
        categories: ["Storia", "Geografia", "Sport", "Scienze", "Cultura Generale", "Arte"],
        questions: [/* Inserire qui il contenuto JSON */]
    };

    const renderBoard = () => {
        data.categories.forEach((category, categoryIndex) => {
            const column = document.createElement("div");
            column.classList.add("category");

            const header = document.createElement("div");
            header.classList.add("header");
            header.textContent = category;
            column.appendChild(header);

            data.questions[categoryIndex].questions.forEach((question, questionIndex) => {
                const button = document.createElement("button");
                button.classList.add("question");
                button.dataset.category = categoryIndex;
                button.dataset.question = questionIndex;
                button.textContent = question.points;
                button.addEventListener("click", () => selectTeam(categoryIndex, questionIndex));
                column.appendChild(button);
            });

            gameBoard.appendChild(column);
        });
    };

    const selectTeam = (categoryIndex, questionIndex) => {
        selectedCategory = { categoryIndex, questionIndex };
        teamModal.classList.remove("hidden");
    };

    const showQuestion = () => {
        const { categoryIndex, questionIndex } = selectedCategory;
        const questionData = data.questions[categoryIndex].questions[questionIndex];

        questionText.textContent = questionData.text;
        answersContainer.innerHTML = "";

        questionData.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.classList.add("answer");
            button.textContent = answer;
            button.addEventListener("click", () => checkAnswer(index, questionData.correct, questionData.points));
            answersContainer.appendChild(button);
        });

        questionModal.classList.remove("hidden");
    };

    const checkAnswer = (selected, correct, points) => {
        if (selected === correct) {
            currentScore[currentTeam - 1] += points;
            alert("Risposta corretta!");
        } else {
            currentScore[currentTeam - 1] -= points;
            alert("Risposta sbagliata!");
        }

        closeQuestion();
    };

    const closeQuestion = () => {
        questionModal.classList.add("hidden");

        const { categoryIndex, questionIndex } = selectedCategory;
        const button = document.querySelector(`button[data-category='${categoryIndex}'][data-question='${questionIndex}']`);
        button.disabled = true;
        button.classList.add("answered");
    };

    teamModal.addEventListener("click", (event) => {
        if (event.target.classList.contains("teamButton")) {
            currentTeam = parseInt(event.target.dataset.team);
            teamModal.classList.add("hidden");
            showQuestion();
        }
    });

    closeModalButton.addEventListener("click", () => {
        questionModal.classList.add("hidden");
    });

    renderBoard();
});
