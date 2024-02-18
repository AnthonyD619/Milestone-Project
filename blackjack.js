// listing variables 
var dealerTotal = 0; // total count for dealer
var playerTotal = 0; // total count for player

var dealerAceTotal = 0;
var playerAceTotal = 0;

var backOfCard;
var deck;

var hit = true;

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
  console.log(deck);
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

function startGame() {
  backOfCard = deck.pop(); // removes the last card of the array
  dealerTotal += getValue(backOfCard);
  dealerAceTotal += checkAce(backOfCard)
  console.log(hidden);
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
