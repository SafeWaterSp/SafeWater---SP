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
    },
    {
        question: "Quais são os impactos ambientais dos alagamentos urbanos?",
        options: ["A) Contaminação de rios e solos", "B) Redução da biodiversidade", "C) Poluição do ar", "D) Apenas A e B"],
        answer: "D) Apenas A e B"
    },
    {
        question: "Qual é uma solução sustentável para prevenir alagamentos em áreas urbanas?",
        options: ["A) Construção de mais ruas asfaltadas", "B) Instalação de sistemas de drenagem eficientes", "C) Redução de áreas verdes", "D) Aumento do descarte de lixo em aterros"],
        answer: "B) Instalação de sistemas de drenagem eficientes"
    },
    {
        question: "Como o descarte irregular de lixo contribui para os alagamentos?",
        options: ["A) Obstruindo bueiros e canais de drenagem", "B) Aumentando a quantidade de água da chuva", "C) Reduzindo a capacidade de absorção do solo", "D) Melhorando o fluxo de água nos rios"],
        answer: "A) Obstruindo bueiros e canais de drenagem"
    },
    // Novas perguntas adicionadas
    {
        question: "O que significa 'inundação' e 'alagamento' no contexto urbano?",
        options: ["A) São sinônimos", "B) Inundação é de rios, alagamento é de ruas", "C) Inundação é maior e mais prolongada que alagamento", "D) Não há diferença prática"],
        answer: "C) Inundação é maior e mais prolongada que alagamento"
    },
    {
        question: "Qual a importância da permeabilidade do solo para evitar alagamentos?",
        options: ["A) Não tem importância", "B) Ajuda a água a ser absorvida, reduzindo o escoamento superficial", "C) Aumenta a velocidade da enxurrada", "D) Dificulta o crescimento de plantas"],
        answer: "B) Ajuda a água a ser absorvida, reduzindo o escoamento superficial"
    },
    {
        question: "Em caso de alagamento, qual a primeira medida de segurança a ser tomada?",
        options: ["A) Tentar passar de carro pela água", "B) Entrar em contato com familiares em áreas alagadas", "C) Procurar abrigo em local alto e seguro, longe da água", "D) Voltar para casa o mais rápido possível"],
        answer: "C) Procurar abrigo em local alto e seguro, longe da água"
    },
    {
        question: "Qual o papel da população na prevenção de alagamentos?",
        options: ["A) Apenas esperar pelas ações do governo", "B) Descartar lixo corretamente e não jogar entulho em rios", "C) Construir muros para conter a água", "D) Limpar apenas a própria calçada"],
        answer: "B) Descartar lixo corretamente e não jogar entulho em rios"
    },
    {
        question: "Além dos danos materiais, quais outros problemas os alagamentos podem causar?",
        options: ["A) Aumento de doenças transmitidas pela água", "B) Interrupção de serviços essenciais (energia, água)", "C) Prejuízos à mobilidade urbana", "D) Todas as anteriores"],
        answer: "D) Todas as anteriores"
    }
];

let currentQuestionIndex = 0;
let score = 0; // Nova variável para armazenar a pontuação
const questionText = document.getElementById("question-text");
const quizOptions = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-button");
const quizTitle = document.getElementById("quiz-title"); // Referência ao título do quiz

/**
 * Loads the current question and its options into the quiz interface.
 */
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    quizOptions.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
        li.appendChild(button);
        quizOptions.appendChild(li);
    });
    nextButton.disabled = true; // Disable "Next" button until an answer is selected
}

/**
 * Checks the selected answer against the correct answer and updates button styles.
 * Increments score if the answer is correct.
 * @param {HTMLElement} selectedButton - The button element that was clicked.
 * @param {string} correctAnswer - The correct answer for the current question.
 */
function selectAnswer(selectedButton, correctAnswer) {
    const buttons = document.querySelectorAll("#quiz-options button");
    buttons.forEach(btn => btn.disabled = true); // Disable all option buttons after selection

    if (selectedButton.textContent === correctAnswer) {
        selectedButton.style.backgroundColor = "green";
        score++; // Incrementa a pontuação se a resposta estiver correta
    } else {
        selectedButton.style.backgroundColor = "red";
        // Highlight the correct answer if the user got it wrong
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = "darkgreen";
            }
        });
    }
    nextButton.disabled = false; // Enable "Next" button
}

/**
 * Event listener for the "Next Question" button.
 * Advances to the next question or ends the quiz.
 */
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        // Quiz finalizado - exibe a pontuação
        quizTitle.textContent = "Quiz Finalizado!";
        questionText.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;
        quizOptions.innerHTML = ""; // Clear options
        nextButton.style.display = "none"; // Hide the "Next" button
    }
});

// Initial call to load the first question when the script runs
loadQuestion();