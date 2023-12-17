const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let moved = false;
let lockBoard = false;
let firstCard, secondCard;
let winMessage = document.getElementById('win-message');
let winText = document.getElementById('win-text');
let countdownDisplay = document.getElementById('countdown');
let countdown = 5;
let seconds = 0;
let minutes = 0;


function flipCard() {
    if (lockBoard) return;
    if(!moved)
    {
        moved = true;
        startTimer();
    }
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    secondCard = this;
    checkForMatch();
}
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    const formattedTime = formatTime(minutes, seconds);
    document.getElementById('timer').innerText = formattedTime;
}

function formatTime(minutes, seconds) {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}


function checkForMatch() {
    let isMatch = firstCard.dataset.lang === secondCard.dataset.lang;
    isMatch ? disableCards() : unflipCards();
}


function disableCards() {
    firstCard.style.transform = "scale(0)";
    secondCard.style.transform = "scale(0)";
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
        winText.textContent = `${formatTime(minutes, seconds)} : Nyertél!`;
        winMessage.style.display = 'block';
        document.getElementById("timer-message").style.display = "none";
        startCountdown();
        stopTimer();
        document.body.classList.add('rainbow-background');
    }
    
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 750);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    [hasFlippedCard, lockBoard] = [false, false];
}

function startCountdown() {
    let countdownInterval = setInterval(() => {
        countdownDisplay.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            location.reload();
        } else {
            countdown--;
    }
}, 1000);
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));