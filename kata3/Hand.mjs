import { pokerCards } from './data.mjs';
import { ranks } from './data.mjs';

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
    getNumberHandArray() {
        return this.cards.map( card => card[0]);
    }

    //Devuelve un array solo con el palo de cada carta, sin el numero
    getSuitHandArray() {
        return this.cards.map( card => card[1]);
    }

    //Para ver si todas las cartas de la mano son del mismo Palo, es decir color
    isColor() {
        const suitedCards = this.getSuitHandArray();
        const uniqueSuitedCards = [...new Set(suitedCards)];
        return (uniqueSuitedCards.length == 1);
    }

    //Devuelve un diccionario con el número de cartas iguales
    getNumberOcurrences() {
        const numbersHandArray = this.getNumberHandArray();
        let output = {};

        numbersHandArray.forEach( (card) => {
            if (pokerCards.S.indexOf(card) != -1) {
                typeof output[card] === 'undefined' ? output[card] = 1: output[card]++;
              
            }
        });

        return output;
    }
    //Nos devuelve un array bidimensional ordenado por número de ocurrencias, usando el diccionario como numero de ocurrencias 
    sortByNumberOcurrences() {
        let numberOcurrences = this.getNumberOcurrences();
        let sortable = [];

        for( let card in numberOcurrences ) {
		    if(numberOcurrences.hasOwnProperty(card)) {
			    sortable.push([card, numberOcurrences[card]]);
            }
        }
	    sortable.sort((a, b) => b[1] - a[1]);
	    return sortable; 

    }

   
    //Devuelve la carta mas Alta de la mano
    getHighCard() {
        let output = 0;
        const numbersHandArray = this.getNumberHandArray();
      
        numbersHandArray.forEach( (card ) => {
            if (pokerCards.S.indexOf(card) > output ) {
                output = pokerCards.S.indexOf(card);
            }
        });

        return pokerCards.S[output];
    }

    //Acepta un array como parámetro de numeros de cartas y nos dice sin son consecutivos
    hasConsecutiveNumbers (numbersHand) {
        let indexNumbers = [];

        numbersHand.forEach( (card) => {
            indexNumbers.push(pokerCards.S.indexOf(card));
        });

        const sortIndexNumbers =  indexNumbers.sort((a, b) => a - b);

        for (let i = 1; i < sortIndexNumbers.length; i++) {
            if (sortIndexNumbers[i -1] != sortIndexNumbers[i] -1) {
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

      if (numbersHandArray.indexOf('A')  != -1 && numbersHandArray.indexOf('2') != -1) {
        const numbersHandArrayWithOutAs = numbersHandArray.filter( (card) => card != 'A');
        return (this.hasConsecutiveNumbers(numbersHandArrayWithOutAs));
      }

      return false;
    }

    //Nos devuelve un array con el valor de la jugada, por ejemplo en un poker de 7 y un 2, nos devuelve un ['7', '2'], 
    //en un Full house de 8 y 4, nos devolvería ['8', '4'] , 
    valueOfDuplicateCards() {
        let rank = ranks.indexOf(this.calculateRankHand());
        const numberOcurrences = this.getNumberOcurrences();
        let output = [];
        console.log(numberOcurrences);
        console.log(rank);

        for (let card in numberOcurrences) {
            if (rank === 8) {
                if (numberOcurrences[card] === 4) {
                    output[0] = card;
                } else {
                    output[1] = card;
                }
            } else if (rank === 7) {
                if (numberOcurrences[card] === 3){
                    output[0] = card;
                } else {
                    output[1] = card;
                }
            } else if (rank === 3) {
                if (numberOcurrences[card] === 3) {
                    output[0] = card;
                } else {
                    output.push(card);
                } 
            //Doble pareja
            } else if (rank === 2) {
                if (numberOcurrences[card] === 2) {
                    output.push(card);
                } else if (numberOcurrences[card] === 1) {
                    output[2] = card;
                }
            }

        }

        return output;
   }

    calculateRankHand() {
        
        //Devolvemos un diccionario con el rango de la mano ,y con el valor del rango, es decir si tiene poker pues poker de A, o de 7,
        //Si tiene escalera pues el valor de la carta mas alta de la escalera, 
       

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
        const duplicates = []; //Array axiliar para ordenadar las cartas duplicadas por numero de ocurrencias
        const numberOcurrences = this.getNumberOcurrences();
        
        for (let ocurrence in numberOcurrences)  {
           duplicates.push(numberOcurrences[ocurrence]);
        }

        const sortedUuplicates = duplicates.sort((a, b) => b - a);

        if (duplicates[0] === 4) {
            return ranks[8];
           
        } 

        if (duplicates[0] === 3 && duplicates[1] === 2) {
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

        if (duplicates[0] === 3) {
            return ranks[3];
        }

        if (duplicates[0] === 2 && duplicates[1] === 2) {
            return ranks[2];
        }

        if (duplicates[0] === 2) {
            return ranks[1];
        }

        return ranks[0];
    }
}



