const questions = [
    [
        { text: "Chi ha scoperto l'America?", answers: ["Cristoforo Colombo", "Amerigo Vespucci", "Marco Polo", "Vasco da Gama"], correct: 0 },
        { text: "Anno della caduta di Roma?", answers: ["476", "1453", "1492", "1815"], correct: 0 },
        // Altre domande di Storia...
    ],
    [
        { text: "Qual è la capitale d'Italia?", answers: ["Roma", "Milano", "Napoli", "Torino"], correct: 0 },
        { text: "Qual è il monte più alto?", answers: ["Everest", "K2", "Monte Bianco", "Annapurna"], correct: 0 },
        // Altre domande di Geografia...
    ]
];

let currentQuestion = null;
let selectedTeam = null;
const teams = [1000, 1000, 1000, 1000];

document.querySelectorAll('.question').forEach(button => {
    button.addEventListener('click', () => {
        currentQuestion = {
            category: button.dataset.category,
            points: parseInt(button.dataset.points)
        };
        showTeamModal();
    });
});

document.querySelectorAll('.teamButton').forEach(button => {
    button.addEventListener('click', () => {
        selectedTeam = parseInt(button.dataset.team) - 1;
        showQuestion();
    });
});

document.getElementById('closeModal').addEventListener('click', () => {
    closeQuestion();
});

function showTeamModal() {
    document.getElementById('teamModal').classList.remove('hidden');
}

function showQuestion() {
    document.getElementById('teamModal').classList.add('hidden');
    const questionData = questions[currentQuestion.category][0]; // Simulazione
    document.getElementById('question-text').textContent = questionData.text;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer');
        button.textContent = answer;
        button.addEventListener('click', () => {
            handleAnswer(index === questionData.correct);
        });
        answersContainer.appendChild(button);
    });
    document.getElementById('modal').classList.remove('hidden');
}

function handleAnswer(isCorrect) {
    const points = currentQuestion.points;
    teams[selectedTeam] += isCorrect ? points : -points;
    alert(isCorrect ? 'Corretto!' : 'Sbagliato!');
    closeQuestion();
    updateGameState();
}

function closeQuestion() {
    document.getElementById('modal').classList.add('hidden');
}

function updateGameState() {
    const questionButton = document.querySelector(`.question[data-category="${currentQuestion.category}"][data-points="${currentQuestion.points}"]`);
    if (questionButton) {
        questionButton.classList.add('answered');
        questionButton.textContent = currentQuestion.points;
    }
}
