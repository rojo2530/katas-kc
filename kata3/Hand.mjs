import { pokerCards } from './data.mjs';
import { ranks } from './data.mjs';

export class Hand {
    constructor(cards) {
        if (!(cards instanceof Array)) {
            throw new Error('You have to pass the cards in an Array as a parameter');
        }

        if (cards.length < 5) {
            throw new Error('You have to enter 5 cards and you have only enter ' + cards.length);
        }

        this.cards = cards;
        this.isValidCard();
        this.isValidHand();
    }

    isValidCard() {
        this.cards.forEach((card) => {
            //Comprobamos si la carta tiene 2 carácteres
            if (card.length != 2) {
                throw new Error(`The card ${card} that you passed doesn't have a valid format`);
            }
            //Comprobamos si el palo de la carta es correcto
            if (!(card[1] in pokerCards)) {
                throw new Error(`The card ${card} that you passed doesn't have a valid format, wrong suit`);
            }
            //Comprobamos si el número de la carta es correcto
         
            if (pokerCards.S.indexOf(card[0]) == -1) {
                throw new Error(`The card ${card} that you passed doesn't have a valid format, wrong number`);
            }
        });
    }

    isValidHand() {
        // Comprobamos si existen 2 cartas iguales, para ello creamos un nuevo array con elementos únicos a partir de la mano
        const uniqueCards = [...new Set(this.cards)];
        if (uniqueCards.length != 5) {
            throw new Error('There are repeated cards in the hand');
        }
    }

    //Devuelve un array solo con el número de cada carta, sin el palo
    getNumberHandArray() {
        return this.cards.map(card => card[0]);
    }

    //Devuelve un array solo con el palo de cada carta, sin el numero
    getSuitHandArray() {
        return this.cards.map(card => card[1]);
    }

    //Para ver si todas las cartas de la mano son del mismo Palo, es decir color
    isColor() {
        const suitedCards = this.getSuitHandArray();
        const uniqueSuitedCards = [...new Set(suitedCards)];
        return (uniqueSuitedCards.length == 1);
    }

    //Devuelve un diccionario con el número de cartas iguales algo asi como {'K':3, 'J':2}
    getNumberOcurrences() {
        const numbersHandArray = this.getNumberHandArray();
        let output = {};

        numbersHandArray.forEach((card) => {
            if (pokerCards.S.indexOf(card) != -1) {
                typeof output[card] === 'undefined' ? output[card] = 1 : output[card]++;

            }
        });

        return output;
    }
    //Nos devuelve un array bidimensional ordenado por número de ocurrencias, usando el diccionario como numero de ocurrencias, 
    //algo asi como [ [ '5', 2 ], [ 'J', 2 ], [ '6', 1 ] ]
    sortByNumberOcurrences() {
        let numberOcurrences = this.getNumberOcurrences();
        let sortable = [];

        for (let card in numberOcurrences) {
            if (numberOcurrences.hasOwnProperty(card)) {
                sortable.push([card, numberOcurrences[card]]);
            }
        }

        return sortable.sort((a, b) => b[1] - a[1]);
    }

    //Devuelve la carta mas Alta de la mano
    getHighCard() {
        let output = 0;
        const numbersHandArray = this.getNumberHandArray();

        numbersHandArray.forEach((card) => {
            if (pokerCards.S.indexOf(card) > output) {
                output = pokerCards.S.indexOf(card);
            }
        });

        return pokerCards.S[output];
    }

    //Acepta un array como parámetro de numeros de cartas y nos dice sin son consecutivos
    hasConsecutiveNumbers(numbersHand) {
        let indexNumbers = [];

        numbersHand.forEach((card) => {
            indexNumbers.push(pokerCards.S.indexOf(card));
        });

        const sortIndexNumbers = indexNumbers.sort((a, b) => a - b);

        for (let i = 1; i < sortIndexNumbers.length; i++) {
            if (sortIndexNumbers[i - 1] != sortIndexNumbers[i] - 1) {
                return false;
            }
        }

        return true;
    }

    isStraigth() {
        let numbersHandArray = this.getNumberHandArray();
        //Si entre las cartas estan en el As y el 2, podría ser escalera como mucho del As al 5, que lo vemos en un caso particular
        if (numbersHandArray.indexOf('A') != -1 && numbersHandArray.indexOf('2') != -1) {
            return false;
        }

        return (this.hasConsecutiveNumbers(numbersHandArray));
    }
    //Caso especial, la escalera mas baja del A al 5
    isAceFiveStrigth() {
        let numbersHandArray = this.getNumberHandArray();

        if (numbersHandArray.indexOf('A') != -1 && numbersHandArray.indexOf('2') != -1) {
            const numbersHandArrayWithOutAs = numbersHandArray.filter((card) => card != 'A');
            return (this.hasConsecutiveNumbers(numbersHandArrayWithOutAs));
        }

        return false;
    }
    //Devuelve el rango de la mano
    calculateRankHand() {
        let numbersHandArray = this.getNumberHandArray();
        //Escalera real o royal flush
        if (numbersHandArray.indexOf('A') != -1 && this.isStraigth() && this.isColor()) {
            return ranks[11];
        }

        //Escalera de color
        if (this.isStraigth() && this.isColor()) {
            return ranks[10];
        }
        //Escalera de color mas baja, A al 5
        if (this.isAceFiveStrigth() && this.isColor()) {
            return ranks[9];
        }

        //Poker
        const duplicates = this.sortByNumberOcurrences();
        if (duplicates[0][0] === 4) {
            return ranks[8];
        }
        //Full house
        if (duplicates[0][1] === 3 && duplicates[1][1] === 2) {
            return ranks[7];
        }

        if (this.isColor()) {
            return ranks[6];
        }

        if (this.isStraigth()) {
            return ranks[5];
        }

        if (this.isAceFiveStrigth()) {
            return ranks[4];
        }
        //Trio
        if (duplicates[0][1] === 3) {
            return ranks[3];
        }
        //Dobles parejas
        if (duplicates[0][1] === 2 && duplicates[1][1] === 2) {
            return ranks[2];
        }
        //Pareja
        if (duplicates[0][1] === 2) {
            return ranks[1];
        }
        //Carta Alta
        return ranks[0];
    }
}



