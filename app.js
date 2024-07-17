let cardCount = 0;
let card_deck_id;
const getCardButton = document.querySelector(".get-card");
const cards = document.querySelector(".cards");
const noMoreSign = document.querySelector(".no-more-sign");

getCardButton.addEventListener('click', async function() {
    if (card_deck_id) {
        try {
            let res = await axios.get(`https://deckofcardsapi.com/api/deck/${card_deck_id}/draw/?count=1`);
            let value = res.data.cards[0].value;
            let suit = res.data.cards[0].suit;
            let image = res.data.cards[0].images.png;
            console.log(`You drew the ${value} of ${suit} from deck ${card_deck_id}`);

            //display card picture in cards div
            const newCard = document.createElement("img");
            newCard.setAttribute('src', image);
            newCard.setAttribute('alt', `${value} of ${suit}`);
            cards.append(newCard);

            //if we run out of cards, don't allow user to generate another one.
            if (res.data.remaining == 0) {
                getCardButton.style.display = "none";
                noMoreSign.innerText = "There are no more cards to draw!";
            }
        }
        catch(e) {
            console.log(e);
        }

    } else {
        try {
            let res = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
            card_deck_id = res.data.deck_id;

            let value = res.data.cards[0].value;
            let suit = res.data.cards[0].suit;
            let image = res.data.cards[0].images.png;
            console.log(`You drew the ${value} of ${suit} from deck ${card_deck_id}`);

            //display card picture in cards div
            const newCard = document.createElement("img");
            newCard.setAttribute('src', image);
            newCard.setAttribute('alt', `${value} of ${suit}`);
            cards.append(newCard);
        }
        catch(e) {
            console.log(e);
        }
    }
});