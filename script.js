const quizData = [
    { domanda: "Chi era il dio del mare?", opzioni: ["Poseidone", "Zeus", "Apollo"], risposta: "Poseidone" },
    { domanda: "Come Ulisse ha sconfitto Polifemo?", opzioni: ["Con un inganno", "Con un'arma divina", "Con la diplomazia"], risposta: "Con un inganno" },
    { domanda: "Quale divinità ha aiutato Ulisse?", opzioni: ["Atena", "Era", "Dioniso"], risposta: "Atena" },
    { domanda: "Dove si trovava Troia?", opzioni: ["Italia", "Turchia", "Grecia"], risposta: "Turchia" },
    { domanda: "Quanti anni durò il viaggio di Ulisse?", opzioni: ["10 anni", "20 anni", "5 anni"], risposta: "20 anni" }
    // Puoi aggiungere altre domande qui...
];

// Mischia le domande
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(quizData);

let currentQuestionIndex = 0;
let punti = 0;
let timer;
let timeLeft = 15;

// Elementi del DOM
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');
const timerContainer = document.getElementById('timer');

// Mostra una domanda
function mostraDomanda() {
    clearInterval(timer);
    timeLeft = 15;
    submitButton.style.display = "block";
    nextButton.style.display = "none";

    const domandaCorrente = quizData[currentQuestionIndex];
    const output = `
        <div class="domanda">
            <h3>${domandaCorrente.domanda}</h3>
            <div class="opzioni">
                ${domandaCorrente.opzioni.map((opzione, index) => `
                    <label class="option" for="opzione-${index}">
                        <input id="opzione-${index}" type="radio" name="risposta" value="${opzione}"> ${opzione}
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    quizContainer.innerHTML = output;

    timerContainer.innerHTML = `Tempo rimasto: ${timeLeft} secondi`;
    timer = setInterval(() => {
        timeLeft--;
        timerContainer.innerHTML = `Tempo rimasto: ${timeLeft} secondi`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerContainer.innerHTML = "⏰ Tempo scaduto!";
            mostraRisposta(false);
        }
    }, 1000);
}

// Controlla la risposta e invia
function mostraRisposta(isUserTriggered = true) {
    clearInterval(timer);
    const rispostaSelezionata = document.querySelector('input[name="risposta"]:checked');
    const domandaCorrente = quizData[currentQuestionIndex];

    if (isUserTriggered && rispostaSelezionata && rispostaSelezionata.value === domandaCorrente.risposta) {
        punti++;
        gsap.to(".domanda", { duration: 1, scale: 1.2, backgroundColor: "#c8f7c5" });
    } else {
        gsap.to(".domanda", { duration: 1, scale: 0.9, backgroundColor: "#f5bcbc" });
        quizContainer.innerHTML += `<p style="color: red; font-weight: bold;">❌ Sbagliato! La risposta corretta era: ${domandaCorrente.risposta}</p>`;
    }

    submitButton.style.display = "none";
    nextButton.style.display = "block";
}

// Passa alla prossima domanda
function prossimaDomanda() {
    nextButton.style.display = "none";
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        mostraDomanda();
    } else {
        mostraRisultati();
    }
}

// Mostra i risultati finali
function mostraRisultati() {
    quizContainer.innerHTML = "";
    timerContainer.innerHTML = "";
    resultsContainer.innerHTML = `Quiz completato! Hai ottenuto ${punti} su ${quizData.length} punti.`;
    gsap.from("#results", { duration: 1.5, opacity: 0, y: -50 });
}

// Eventi
mostraDomanda();
submitButton.addEventListener('click', () => mostraRisposta(true));
nextButton.addEventListener('click', prossimaDomanda);