const player = {
  name: "",
  chips: 100,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const newGameBtn = document.getElementById("start-btn");
const submitName = document.getElementById("add-name");
const inputEl = document.getElementById("player-name");
const chipsEl = document.getElementById("chips-el");
const newCardBtn = document.getElementById("new-card");

//playerEl.textContent = player.name + ": $" + player.chips
newGameBtn.textContent = "START GAME";

submitName.addEventListener("click", function () {
  //   player.name = inputEl.value;
  //   playerEl.textContent = `Player name: ${player.name}`;
  chipsEl.textContent = `Chips: ${player.chips}`;
});

function getRandomCard() {
  const randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

newGameBtn.addEventListener("click", function startGame() {
  isAlive = true;
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  hasBlackJack = false;
  renderGame();
});

/* const renderGame2 = () => {
  console.log("bu");
}; */
function renderGame() {
  cardsEl.textContent = "Cards: ";

  cards.forEach((card) => {
    cardsEl.textContent += card + " ";
  });

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
    chipsCount();
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    chipsCount();
  } else {
    message = "You're out of the game!";
    isAlive = false;
    newGameBtn.textContent = "NEW GAME";
    chipsCount();
  }
  messageEl.textContent = message;
}

newCardBtn.addEventListener("click", function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
});

function chipsCount() {
  if (sum === 21) {
    player.chips += 5;
    chipsEl.textContent = player.chips;
  } else if (sum > 21) {
    player.chips -= 5;
    chipsEl.textContent = player.chips;
  } else if (sum <= 20) {
    player.chips = player.chips;
  }
}
