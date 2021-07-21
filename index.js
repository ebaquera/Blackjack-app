let player = {
  name: "",
  chips: 100,
};

let cards = [];
let dealCards = [];
let sum = 0;
let dealSum = 0;
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
const enterName = document.getElementById("enter-name");
const dealCardTxt = document.getElementById("dealer-card");
const dealSumTxt = document.getElementById("sum-deal");
const holdBtn = document.getElementById("hold-btn");

newGameBtn.textContent = "START GAME";

submitName.addEventListener("click", function addPlayerName() {
  isAlive = true;
  player.name = inputEl.value;
  playerEl.textContent = `Player name: ${player.name}`;
  chipsEl.textContent = `Chips: ${player.chips}`;
  inputEl.style.visibility = "hidden";
  enterName.style.visibility = "hidden";
  submitName.style.visibility = "hidden";
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
  message = "";
  hasBlackJack = false;
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  const firstDealerCard = getRandomCard();
  const secondDealerCard = getRandomCard();
  dealCards = [firstDealerCard, secondDealerCard];
  dealSum = firstDealerCard + secondDealerCard;
  renderGame();
});

function renderGame() {
  cardsEl.textContent = "Your Cards: ";
  cards.forEach((card) => {
    cardsEl.textContent += card + " ";
  });
  dealCardTxt.textContent = "Dealer cards: ";
  dealCards.forEach((dealCards) => {
    dealCardTxt.textContent += dealCards + " ";
  });
  sumEl.textContent = "Sum: " + sum;
  switch (true) {
    case dealSum === 21:
      message = "House wins";
      isAlive = false;
      newGameBtn.textContent = "NEW GAME";
      chipsCount();
      break;
    case sum < 22 && dealSum < 17:
      message = "Do you want to draw a new card?";
      chipsCount();
      break;
    case sum === 21:
      message = "You've got Blackjack!";
      hasBlackJack = true;
      isAlive = false;
      newGameBtn.textContent = "NEW GAME";
      chipsCount();
      break;
    case dealSum > 21:
      message = "You win";
      isAlive = false;
      hasBlackJack = true;
      newGameBtn.textContent = "NEW GAME";
      chipsCount();
      break;
    case sum > 21:
      message = "House wins";
      isAlive = false;
      newGameBtn.textContent = "NEW GAME";
      chipsCount();
      break;
    case dealSum < 22 && dealSum > 16 && sum > 21:
      message = "House wins";
      isAlive = false;
      newGameBtn.textContent = "NEW GAME";
      chipsCount();
      break;
  }
  messageEl.textContent = message;
  dealSumTxt.textContent = "Dealer sum: " + dealSum;
}

holdBtn.addEventListener("click", function standCards() {
  if (isAlive === true && dealSum < 17) {
    let newDealerCard = getRandomCard();
    dealSum += newDealerCard;
    dealCards.push(newDealerCard);
    renderGame();
  } else if (isAlive === true && dealSum < sum) {
    messageEl.textContent = "You win";
    isAlive = false;
    hasBlackJack = true;
    newGameBtn.textContent = "NEW GAME";
    renderGame();
  }
});

newCardBtn.addEventListener("click", function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
});

function chipsCount() {
  if (hasBlackJack === true) {
    player.chips += 5;
    chipsEl.textContent = player.chips;
  } else if (hasBlackJack === false) {
    player.chips -= 5;
    chipsEl.textContent = player.chips;
  }
  if (player.chips === 0) {
    messageEl.textContent = "You're out of chips!";
  }
}
