const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});
const quizData = [

    {
        question: "Qual é a principal causa dos alagamentos urbanos em São Paulo?",
        options: ["A) Chuvas intensas", "B) Descarte irregular de lixo", "C) Falta de drenagem adequada", "D) Todas as anteriores"],
        answer: "D) Todas as anteriores"
    },
    {
        question: "Qual medida ajuda a reduzir enchentes em áreas urbanas?",
        options: ["A) Plantação de árvores", "B) Construção de piscinões", "C) Melhor planejamento urbano", "D) Todas as anteriores"],
        answer: "D) Todas as anteriores"
    }
];

let currentQuestionIndex = 0;

const questionText = document.getElementById("question-text");
const quizOptions = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-button");

// Exibir pergunta inicial
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    quizOptions.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
        li.appendChild(button);
        quizOptions.appendChild(li);
    });

    nextButton.disabled = true;
}

// Verificar resposta e avançar
function selectAnswer(selectedButton, correctAnswer) {
    const buttons = document.querySelectorAll("#quiz-options button");
    buttons.forEach(btn => btn.disabled = true);

    if (selectedButton.textContent === correctAnswer) {
        selectedButton.style.backgroundColor = "green";
    } else {
        selectedButton.style.backgroundColor = "red";
    }

    nextButton.disabled = false;
}

// Passar para a próxima pergunta
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        questionText.textContent = "Quiz finalizado! Obrigado por participar.";
        quizOptions.innerHTML = "";
        nextButton.style.display = "none";
    }
});

loadQuestion();
