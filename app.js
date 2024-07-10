let cardCount = 0;
let card_deck_id;
const getCardButton = document.querySelector(".get-card");

getCardButton.addEventListener('click', function() {
    if (card_deck_id) {
        axios.get(`https://deckofcardsapi.com/api/deck/${card_deck_id}/draw/?count=1`)
            .then(res => {
                let value = res.data.cards[0].value;
                let suit = res.data.cards[0].suit;
                console.log(`You drew the ${value} of ${suit} from deck ${card_deck_id}`);
                if (res.data.remaining == 0) {
                    console.log("There are no more cards left in this deck!");
                }
            })
    } else {
        axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
            .then(res => {
                let value = res.data.cards[0].value;
                let suit = res.data.cards[0].suit;
                card_deck_id = res.data.deck_id;
                console.log(`You drew the ${value} of ${suit} from deck ${card_deck_id}`);
            })
            .catch(err => console.log(err));
    }
});