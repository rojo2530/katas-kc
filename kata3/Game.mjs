import { Hand } from './Hand.mjs';
import { ranks } from './data.mjs';
import { pokerCards, sortArrayOnly2FirstElements } from './data.mjs';

export class Game {
    constructor(hand1, hand2) {
        if (arguments.length != 2) {
            throw new Error('Tienes que pasar 2 manos para jugar');
        }
        if (!(hand1 instanceof Hand) || !(hand2 instanceof Hand)) {
            throw new Error('Algunas de las manos pasadas no es una instancia de la clase Hand');
        }

        this.hand1 = hand1;
        this.hand2 = hand2;
        //No hace Comprobar que las cartas y la mano son validas ya que son comprueban en el constructor de la clase Hand
       
        //Ahora comprobamos que no existan cartas repetidas entre las dos manos
        if (!this.isValidGame()) {
            throw new Error ('Existen cartas repetidas entre las dos manos');
        }

        console.log(this.play());
    }

    isValidGame() {
        const twoHands = this.hand1.cards.concat(this.hand2.cards)
        const uniqueCards = [...new Set(twoHands)];
        
        return (uniqueCards.length === 10);
    }   

    printCards() {
        console.log('*************************************************************************************************');
        console.log(`Player 1 with the following cards ${this.hand1.cards} with rank: ${this.hand1.calculateRankHand()}`);
        console.log(`Player 2 with the following cards ${this.hand2.cards} with rank: ${this.hand2.calculateRankHand()}`);
    }

    //Nos devuelve un array ordenado por el índice que ocupa cada carta de mayor a menor, acepta como entrada un array de cartas
    sortCardsByIndex(cards) {
        const cardsIndex = cards.map ( (card) => pokerCards.S.indexOf(card));
         
        return cardsIndex.sort((a, b) => b - a);
    }
    //Calcula el ganador cuando las dos manos son escalera o escalera de color
    tieStraigth() {
        const HighCard1 = this.hand1.getHighCard();
        const HighCard2 = this.hand2.getHighCard();

        if (pokerCards.S.indexOf(HighCard1) > pokerCards.S.indexOf(HighCard2)) {
            return ('Player 1 wins with ' + this.hand1.calculateRankHand() + ' more high');
        } else if (pokerCards.S.indexOf(HighCard1) < pokerCards.S.indexOf(HighCard2)) {
            return ('Player 2 wins with ' + this.hand2.calculateRankHand() + ' more high');
        } else {
            return ('Tie, with ' + this.hand1.calculateRankHand());
        }
    }

    tiePokerOrFullOrThree () {
        let numberPokerHand1 = this.hand1.sortByNumberOcurrences()[0][0];
        let numberPokerHand2 = this.hand2.sortByNumberOcurrences()[0][0]; 

        if (pokerCards.S.indexOf(numberPokerHand1) > pokerCards.S.indexOf(numberPokerHand2)) {
            return ('Player 1 wins with ' + this.hand1.calculateRankHand() + ' more high');
        } else {
            return ('Player 2 wins with ' + this.hand2.calculateRankHand() + ' more high');
        }
    }

    tieDoublePair() {
        const numbersOcurrencesHand1 = this.hand1.sortByNumberOcurrences();
        const numbersOcurrencesHand2 = this.hand2.sortByNumberOcurrences();
        //Lo convertimos a un array dimensional con las cartas, las repetidas solo aparecen ordenadas por número de repetición 
        const numbersHand1 = numbersOcurrencesHand1.map ( (element) => element[0]);
        const numbersHand2 = numbersOcurrencesHand2.map ( (element) => element[0]);
        
        let indexNumbersHand1 = numbersHand1.map ( (card) => pokerCards.S.indexOf(card));
        let indexNumbersHand2 = numbersHand2.map ( (card) => pokerCards.S.indexOf(card));
       
        //Tenemos que ordenador solo los 2 primeros elementos que son las parejas y por ultimo la carta individual o kicker
        indexNumbersHand1 = sortArrayOnly2FirstElements(indexNumbersHand1);
        indexNumbersHand2 = sortArrayOnly2FirstElements(indexNumbersHand2);
        
        for (let i = 0; i < indexNumbersHand1.length; i++) {
            if (indexNumbersHand1[i] > indexNumbersHand2[i]) {
                 return ('Player 1 wins with ' + this.hand1.calculateRankHand() + ' more high');
            } else if (indexNumbersHand1[i] < indexNumbersHand2[i]) {
                 return ('Player 2 wins with ' + this.hand2.calculateRankHand() + ' more high');
            }
        }

         return 'Empate con ' + this.hand1.calculateRankHand();

    }

    tiePair() {
        const numbersOcurrencesHand1 = this.hand1.sortByNumberOcurrences();
        const numbersOcurrencesHand2 = this.hand2.sortByNumberOcurrences();

        const numbersHand1 = numbersOcurrencesHand1.map ( (element) => element[0]);
        const numbersHand2 = numbersOcurrencesHand2.map ( (element) => element[0]);
        //extraemos el pimer elemento del array que es justo el par
        const pairHand1 = numbersHand1.shift();
        const pairHand2 = numbersHand2.shift();

        if (pokerCards.S.indexOf(pairHand1) > pokerCards.S.indexOf(pairHand2)) {
            return ('Player 1 wins with ' + this.hand1.calculateRankHand() + ' more high');
        } else if (pokerCards.S.indexOf(pairHand1) < pokerCards.S.indexOf(pairHand2)) {
            return ('Player 2 wins with ' + this.hand2.calculateRankHand() + ' more high');
        } else {
            const sortIndexNumbersHand1 = this.sortCardsByIndex(numbersHand1);
            const sortIndexNumbersHand2 = this.sortCardsByIndex(numbersHand2);
           
            console.log(sortIndexNumbersHand1,sortIndexNumbersHand2);

            for (let i = 0; i < sortIndexNumbersHand1.length; i++) {
                if (sortIndexNumbersHand1[i] > sortIndexNumbersHand2[i]) {
                    return ('Player 1 wins with ' + this.hand1.calculateRankHand() + ' with better kicker');
                } else if (sortIndexNumbersHand1[i] < sortIndexNumbersHand2[i]) {
                    return ('Player 2 wins with ' + this.hand2.calculateRankHand() + ' with better kicker');
                }
            }

            return 'Empate con Carta Alta';
        }
    }

    tieHighCard() {
        //Ordenamos los arrays en orden descendente
        const sortIndexNumbersHand1 = this.sortCardsByIndex(this.hand1.getNumberHandArray());
        const sortIndexNumbersHand2 = this.sortCardsByIndex(this.hand2.getNumberHandArray());
        
        for (let i = 0; i < sortIndexNumbersHand1.length; i++) {
            if (sortIndexNumbersHand1[i] > sortIndexNumbersHand2[i]) {
                return ('Player 1 wins with ' + this.hand1.calculateRankHand() + ' with better kicker');
            } else if (sortIndexNumbersHand1[i] < sortIndexNumbersHand2[i]) {
                return ('Player 2 wins with ' + this.hand2.calculateRankHand() + ' with better kicker');
            }
        }

        return 'Empate con Carta Alta';
    }

    //Llamamos a esta función en caso de que tengan el mismo rango de mano cada jugador
    calculateTie(rank) {
        //Escalera real, o escalera del A al 5 de color o escalera normal del A al 5    
        if (rank === 11 || rank === 9 || rank === 4  ) {
            return ('Empate con ' + this.hand1.calculateRankHand());
          //Escalera de color o Escalera
        
        } else if (rank === 10 || rank === 5) {
            return (this.tieStraigth());
        //Ambos jugadores con Poker     
        
        } else if (rank === 8 || rank === 7 || rank === 3 ) {
            return this.tiePokerOrFullOrThree();
        
            //Ambos jugadores con Dobles parejas o solo pareja 
        } else if (rank === 2) {
            return this.tieDoublePair();
        //Par
        } else if (rank === 1) {
            return this.tiePair();
        }

        //Carta alta
        else if (rank === 0) {
            return this.tieHighCard();
        }
    }

 
    play() {
        this.printCards();
        //Guardamos el indice del array de rangos para compararlo
        const rankNumberHand1 = ranks.indexOf(this.hand1.calculateRankHand()); 
        const rankNumberHand2 = ranks.indexOf(this.hand2.calculateRankHand()); 
        
        if (rankNumberHand1 > rankNumberHand2) {
            return ('Player 1 wins with ' +  this.hand1.calculateRankHand());
        } else if (rankNumberHand1 < rankNumberHand2) {
            return ('Player 2 wins with '+ this.hand2.calculateRankHand());
          
            //En caso de que tengan la misma jugada  
        } else {
            console.log(this.calculateTie(rankNumberHand1));    

        }
    }

   
}