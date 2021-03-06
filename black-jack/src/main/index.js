export default function script() {
  try {
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
    let hasStand = false;
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

    newCardBtn.disabled = true;
    holdBtn.disabled = true;

    submitName.addEventListener("click", function addPlayerName() {
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
      hasStand = false;
      const firstCard = getRandomCard();
      const secondCard = getRandomCard();
      cards = [firstCard, secondCard];
      sum = firstCard + secondCard;
      const firstDealerCard = getRandomCard();
      const secondDealerCard = getRandomCard();
      dealCards = [firstDealerCard, secondDealerCard];
      dealSum = firstDealerCard + secondDealerCard;
      dealSumTxt.textContent = "";
      renderGame();
    });

    function renderGame() {
      cardsEl.textContent = "Your Cards: ";
      cards.forEach((card) => {
        cardsEl.textContent += card + " ";
      });
      dealCardTxt.textContent = "Dealer cards: ";
      if (hasStand === true) {
        renderDealCards();
      } else if (hasStand === false) {
        dealCardTxt.textContent =
          "Deal Cards: " + dealCards[1]
            ? "Dealer Cards:  Hidden " + dealCards[1]
            : "waiting for game to start";
      }
      sumEl.textContent = "Sum: " + sum;
      newCardBtn.disabled = false;
      holdBtn.disabled = false;
      switch (true) {
        case dealSum === 21:
          message = "House wins";
          hasStand = true;
          isAlive = false;
          newGameBtn.textContent = "NEW GAME";
          renderDealCards();
          chipsCount();
          break;
        case sum === 21:
          message = "You've got Blackjack!";
          hasBlackJack = true;
          isAlive = false;
          newGameBtn.textContent = "NEW GAME";
          renderDealCards();
          chipsCount();
          break;
        case sum < 21 && dealSum < 17:
          message = "Do you want to draw a new card?";
          chipsCount();
          break;
        case dealSum === sum:
          hasStand = true;
          message = "Push!";
          isAlive = false;
          newGameBtn.textContent = "NEW GAME";
          renderDealCards();
          break;
        case dealSum > 21:
          message = "You win";
          isAlive = false;
          hasBlackJack = true;
          newGameBtn.textContent = "NEW GAME";
          chipsCount();
          break;
        case sum > 21:
          hasStand = false;
          message = "House wins";
          isAlive = false;
          newGameBtn.textContent = "NEW GAME";
          renderDealCards();
          chipsCount();
          break;
        case dealSum < 22 && dealSum > 16 && sum > 21:
          message = "House wins";
          isAlive = false;
          newGameBtn.textContent = "NEW GAME";
          renderDealCards();
          chipsCount();
          break;
        default:
          return;
      }
      if (isAlive === false) {
        newCardBtn.disabled = true;
        holdBtn.disabled = true;
      }
      messageEl.textContent = message;
      if (player.chips === 0) {
        isAlive = false;
        messageEl.textContent = "Game Over! Refresh to start again";
        newGameBtn.disabled = true;
      }
    }

    newCardBtn.addEventListener("click", function newCard() {
      if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
      }
    });

    holdBtn.addEventListener("click", function standCards() {
      hasStand = true;
      renderDealCards();
      if (isAlive === true && dealSum < 17) {
        let newDealerCard = getRandomCard();
        dealSum += newDealerCard;
        dealCards.push(newDealerCard);
        renderGame();
      } else if (dealSum >= 17 && sum < 22 && dealSum > sum) {
        message = "House wins";
        isAlive = false;
        newGameBtn.textContent = "NEW GAME";
        chipsCount();
      } else if (dealSum >= 17 && sum < 22 && dealSum < sum) {
        message = "You win";
        isAlive = false;
        hasBlackJack = true;
        newGameBtn.textContent = "NEW GAME";
        chipsCount();
      } else {
        renderGame();
      }
      if (isAlive === false) {
        holdBtn.disabled = true;
        newCardBtn.disabled = true;
      }
      messageEl.textContent = message;
      console.log("has stand", hasStand);
    });

    function chipsCount() {
      if (hasBlackJack === true) {
        player.chips += 5;
        chipsEl.textContent = "Chips: " + player.chips;
      } else if (hasBlackJack === false) {
        player.chips -= 5;
        chipsEl.textContent = "Chips: " + player.chips;
      }
    }
    function renderDealCards() {
      dealCardTxt.textContent = "Dealer Cards: ";
      dealCards.forEach((dealCard) => {
        dealCardTxt.textContent += dealCard + " ";
      });
      dealSumTxt.textContent = "Dealer sum: " + dealSum;
    }
  } catch (err) {
    console.log(err);
  }
}
