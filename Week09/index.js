class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    getValue() {
        return this.value; //Gives each card a get function to retrieve the value for comparing later 
    }
}

class Deck {
    constructor() {
        this.deck = [];
        this.createDeck();
    }

    // Iterates once per suit per value, creates a Card of that suit of each value and adds it to the deck array
    createDeck() {
        let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
        let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // 11-J, 12-Q, 13-K, 14-A
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(value, suit));
            }
        }
    }

    // Fisher Yates method of randomizing, taking the size of the deck and counting down for the loop
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); //Rounding down to make sure we stay level
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]; //This assigns the new random index to each index throughout the loop.
        }
    }

    // Note that this won't scale well with more than 2 players
    dealCards() {
        return this.deck.splice(0, 26); //Removes the first 26 cards in the deck (If it has already been ran, 26 cards remain to be spliced again to the second player)
    }
}

//This will let us simplify the game loop into 3 outcomes regardless of difference in card values, 1 for a player 1 victory, -1 for a player 2 victory, 0 for a tie. Trusting you always give card1 as player 1's card.
function compareCards(card1, card2) {
    if (card1.getValue() > card2.getValue()) {
        return 1;
    } else if (card1.getValue() < card2.getValue()) {
        return -1;
    } else {
        return 0;
    }
}

function playWar() {
    let deck = new Deck(); //Creates the deck then shuffles
    deck.shuffleDeck();

    let player1Deck = deck.dealCards(); //Player 1 gets the first 26 cards in the deck
    let player2Deck = deck.dealCards(); //Player 2 gets the remaining 26 cards.

    let player1Score = 0, player2Score = 0; //Initializing scores.

    for (let i = 0; i < 26; i++) { //Loops through the decks 26 times, note, not friendly for variable deck sizes or different amount of players.
        let card1 = player1Deck[i];
        let card2 = player2Deck[i];
        let result = compareCards(card1, card2);

        if (result === 1) {
            player1Score++;
            console.log(`Player 1 Flips a ${card1.getValue()} to win against ${card2.getValue()}`);
        } else if (result === -1) {
            player2Score++;
            console.log(`Player 2 Flips a ${card2.getValue()} to win against ${card1.getValue()}`);
        } else {
            console.log(`This round ties, both players having flipped a ${card1.getValue()}`);
        }
    }

    console.log(`Final Score - Player 1: ${player1Score}, Player 2: ${player2Score}`);

    if (player1Score > player2Score) {
        console.log("Player 1 wins the game!");
    } else if (player1Score < player2Score) {
        console.log("Player 2 wins the game!");
    } else {
        console.log("The game is a tie!");
    }
}

playWar();
