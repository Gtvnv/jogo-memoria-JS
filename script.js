// ===== Jogo da Memória com Emojis =====

// Conjunto de emojis usados nos pares (8 pares = 16 cartas)
const EMOJIS = ["🐶", "🐱", "🦊", "🐼", "🦁", "🐸", "🐙", "🦄"];

// Elementos da interface
const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const pairsEl = document.getElementById("pairs");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const overlay = document.getElementById("overlay");
const playAgainBtn = document.getElementById("play-again");
const winMessage = document.getElementById("win-message");

// Estado do jogo
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let timerInterval = null;
let seconds = 0;
let timerStarted = false;

const TOTAL_PAIRS = EMOJIS.length;

// Embaralha um array (algoritmo de Fisher-Yates)
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Monta o deck duplicando os emojis e embaralhando
function createDeck() {
    return shuffle([...EMOJIS, ...EMOJIS]);
}

// Cria o elemento visual de uma carta
function createCardElement(emoji) {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.dataset.emoji = emoji;
    card.setAttribute("aria-label", "Carta virada para baixo");

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-front">❓</div>
            <div class="card-face card-back">${emoji}</div>
        </div>
    `;

    card.addEventListener("click", () => flipCard(card));
    return card;
}

// Renderiza o tabuleiro
function renderBoard() {
    board.innerHTML = "";
    const deck = createDeck();
    deck.forEach((emoji) => board.appendChild(createCardElement(emoji)));
}

// Formata segundos em MM:SS
function formatTime(totalSeconds) {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
}

// Inicia o cronômetro na primeira jogada
function startTimer() {
    if (timerStarted) return;
    timerStarted = true;
    timerInterval = setInterval(() => {
        seconds++;
        timerEl.textContent = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Vira uma carta
function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;
    if (card.classList.contains("flipped")) return;

    startTimer();
    card.classList.add("flipped");
    card.setAttribute("aria-label", `Emoji ${card.dataset.emoji}`);

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    registerMove();
    checkForMatch();
}

function registerMove() {
    moves++;
    movesEl.textContent = moves;
}

// Verifica se as duas cartas viradas formam um par
function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    if (isMatch) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

function handleMatch() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    pairsEl.textContent = `${matchedPairs} / ${TOTAL_PAIRS}`;

    resetTurn();

    if (matchedPairs === TOTAL_PAIRS) {
        endGame();
    }
}

function handleMismatch() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.setAttribute("aria-label", "Carta virada para baixo");
        secondCard.setAttribute("aria-label", "Carta virada para baixo");
        resetTurn();
    }, 900);
}

// Limpa o estado do turno atual
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Finaliza o jogo e exibe o modal de vitória
function endGame() {
    stopTimer();
    winMessage.textContent =
        `Você venceu em ${moves} jogadas e ${formatTime(seconds)}!`;
    setTimeout(() => {
        overlay.hidden = false;
    }, 600);
}

// Reinicia todo o jogo
function resetGame() {
    stopTimer();
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;
    seconds = 0;
    timerStarted = false;

    movesEl.textContent = "0";
    pairsEl.textContent = `0 / ${TOTAL_PAIRS}`;
    timerEl.textContent = "00:00";
    overlay.hidden = true;

    renderBoard();
}

// Eventos
restartBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);

// Inicializa
resetGame();
