import { pokerCards } from './data.mjs';

export class Hand {
    constructor(cards) {
        if (!(cards instanceof Array)) {
            throw new Error ('Tienes que pasar las cartas en un Array como parámetro');
        }

        if (cards.length < 5) {
            throw new Error ('Tienes que pasar 5 cartas y solo has pasado ' + cards.length);
        }

        this.cards = cards;
        this.isValidCard();
        this.isValidHand();
        console.log(this.isSuited());

    }

    isValidCard() {
        this.cards.forEach( (card) => {
            if (card.length != 2 ) {
                throw new Error (`La carta ${card} que has pasado no tiene un formato valido`); 
            }
            //Comprobamos si el palo de la carta es correcto
            if (!(card[1] in pokerCards)) {
                throw new Error (`La carta ${card} que has pasado no tiene un formato valido, el palo es incorrecto`); 
            }
            //Comprobamos si el número de la carta es correcto
            if (pokerCards.S.indexOf(card[0]) == -1) {
                throw new Error (`La carta ${card} que has pasado no tiene un formato valido, el número es incorrecto`); 
            }
        
        });
        
    }

    isValidHand () {
        // Comprobamos si existen 2 cartas iguales, para ello creamos un nuevo array con elementos únicos a partir de la mano
        const uniqueCards = [...new Set(this.cards)];
        if (uniqueCards.length != 5) {
            throw new Error ('Existen cartas repetidas en la mano');
        }
    }

    //Devuelve un array solo con el número de cada carta, sin el palo
    getNumberCardsArray() {
        return this.cards.map( card => card[0]);
    }

    //Devuelve un array solo con el palo de cada carta, sin el numero
    getSuitCardsArray() {
        return this.cards.map( card => card[1]);
    }

    //Para ver si todas las cartas de la mano son del mismo Palo
    isSuited() {
        const suitedCards = this.getSuitCardsArray();
        const uniqueSuitedCards = [...new Set(suitedCards)];
        return (uniqueSuitedCards.length == 1);
    }

    //Devuelve un diccionario con el número de cartas iguales
    getNumberOcurrences() {
        const numbersCardArray = this.getNumberCardsArray();

    }




}



