// listing variables 
var dealerTotal = 0; // total count for dealer
var playerTotal = 0; // total count for player

var dealerAceTotal = 0;
var playerAceTotal = 0;

var hide;
var deck;

var canHit = true;

window.onload = function() {
  createDeck();
  shuffleDeck();
  startGame();

}

function createDeck() { // creating the deck 
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let suits = ["C", "D", "H", "S"];
  deck = [];

  for (let x  = 0; x < suits.length; x++) {
    for (let y = 0; y < values.length; y++) {
      deck.push(values[y] + "-" + suits[x]); // loops through each suits first, and for each suit we loop through all the values
    }
  }
  // console.log(deck);
}
/*********************************************************
 * Title: black-jack
 * Author: ImKennyYip
 * Year: 2022
 * Code version: Programming code
 * Availability: https://github.com/ImKennyYip/black-jack
 *********************************************************/
function shuffleDeck() {
  for (let x = 0; x < deck.length; x++) {
    let y = Math.floor(Math.random() * deck.length); 
    let temp = deck[x];
    deck[x] = deck[y];
    deck[y] = temp;
  }
  console.log(deck);
}
/*********************************************************
 * Title: black-jack
 * Author: ImKennyYip
 * Year: 2022
 * Code version: Programming code
 * Availability: https://github.com/ImKennyYip/black-jack
 *********************************************************/

function startGame() {
  hide = deck.pop(); // removes the last card of the array
  dealerTotal += getValue(hide);
  dealerAceTotal += checkAce(hide);
  //console.log(hide);
  //console.log(hide);
  while (dealerTotal < 17) {
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    dealerTotal += getValue(card);
    dealerAceTotal += checkAce(card); // created the Ace count for dealer
    document.getElementById("dealer-cards").append(cardImg); //adding an img to dealer-cards div until dealer has 17 or greater
  }
  console.log(dealerTotal);

  for (let x = 0; x < 2; x++) {
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    playerTotal += getValue(card);
    playerAceTotal += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

  }

  console.log(playerTotal)
  document.getElementById("hit-button").addEventListener("click", hit);
  document.getElementById("stand-button").addEventListener("click", stand);
}

function hit() {
  if (!canHit) {
    return;
  }

    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    playerTotal += getValue(card);
    playerAceTotal += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerTotal, playerAceTotal) > 21) { // takes into consideration the Ace count, whether its 1 or 11
      canHit = false;
    }
}

function stand() {
  dealerTotal = reduceAce(dealerTotal, dealerAceTotal);
  playerTotal = reduceAce(playerTotal, playerAceTotal);

  canHit = false;
  document.getElementById("hide").src = "./images/" + hide + ".png";

  let message = "";
  if (playerTotal > 21) {
    message = "You Lost!";
  }
  else if (dealerTotal > 21) {
    message = "You Win!";
  }
  else if (playerTotal == dealerTotal) {
    message = "Push!"; // push in blackjack means tie
  }
  else if (playerTotal > dealerTotal) {
    message = "You Win!";
  }
  else if (playerTotal < dealerTotal) {
    message = "You Lose!";
  }

  document.getElementById("dealer-total").innerText = dealerTotal;
  document.getElementById("player-total").innerText = playerTotal;
  document.getElementById("result").innerText = message;
}


function getValue(card) {
  let data = card.split("-"); // Example: "10-S" would be ["10", "S"]
  let value = data[0];

  /*********************************************************
 * Title: black-jack
 * Author: ImKennyYip
 * Year: 2022
 * Code version: Programming code
 * Availability: https://github.com/ImKennyYip/black-jack
 *********************************************************/
  if (isNaN(value)) {
    if (value == "A") {
        return 11;
    }
    return 10;
  }

  return parseInt(value); // parseInt() method parses a string and returns first integer
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerTotal, playerAceTotal) {
  while (playerTotal > 21 && playerAceTotal > 0) {
    playerTotal -= 10;
    playerAceTotal -= 1;
  }
  return playerTotal;
}