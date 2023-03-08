const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard == true)
    {
        return;
    }

    if(this === firstCard)
    {
        return;
    }

    this.classList.add('flip');

    if(hasFlippedCard == false)
    {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    }
    else
    {
        //second click
        hasFlippedCard = false;
        secondCard = this;

        //do card match?
        checkForMatch();
    }
}

function checkForMatch() {
    if(firstCard.dataset.img === secondCard.dataset.img) {
        //its a match
        disableCards();
    }
    else {
        //not a match
        unFlipCards();            
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", firstCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = lockBoard = false;
    firstCard = secondCard = null;    
}

(function shuffle() {
    for(let i = 0; i < cards.length; i++)
    {
        let randomPos = Math.floor(Math.random() * 16);
        cards[i].style.order = randomPos;
    }
})();

function start()
{
    let board = document.querySelector(".memory-board");
    let start_button = document.querySelector("#start-screen");
    
    start_button.style.display = "none";
    board.style.display = "flex";

    for(var i = 0; i < cards.length; i++)
    {
        cards[i].addEventListener("click", flipCard);
    }
}

(function startGame() {
    let start_button = document.querySelector("#start-screen");
    start_button.addEventListener("click", start);
})();