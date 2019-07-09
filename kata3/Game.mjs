import { Hand } from './Hand.mjs';
import { ranks } from './data.mjs';
import { pokerCards } from './data.mjs';

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

        this.play();

    }

    isValidGame() {
        //Unimos los 2 arrays de cartas
        const twoHands = this.hand1.cards.concat(this.hand2.cards)
        const uniqueCards = [...new Set(twoHands)];
        
        return (uniqueCards.length === 10);
    }   

    printCards() {
        console.log(`Jugador 1 tiene las siguientes cartas ${this.hand1.cards}`);
        console.log(`Jugador 2 tiene las siguientes cartas ${this.hand2.cards}`);
    }

    //Llamamos a esta función en caso de que tengan el mismo rango de mano cada jugador
    calculateTie(rank) {
        //Escalera real, o escalera del A al 5 de color o escalera normal del A al 5    
        if (rank === 11 || rank === 9 || rank === 4  ) {
            return ('Empate con ' + this.hand1.calculateRankHand());
          //Escalera de color o Escalera
        } else if (rank === 10 || rank === 5) {
            const HighCard1 = this.hand1.getHighCard();
            const HighCard2 = this.hand2.getHighCard();
            if (pokerCards.S.indexOf(HighCard1) > pokerCards.S.indexOf(HighCard2)) {
                return ('Gana Jugador 1 con mano ' + this.hand1.calculateRankHand() + ' more high');
            } else if (pokerCards.S.indexOf(HighCard1) < pokerCards.S.indexOf(HighCard2)) {
                return ('Gana Jugador 2 con mano ' + this.hand2.calculateRankHand() + ' more high');
            } else {
                return ('Empate ambos jugadores con ' + this.hand1.calculateRankHand());
            }
        //Ambos jugadores con Poker     
        } else if (rank === 8 || rank === 7 || rank === 3 ) {
            //Sacamos el valor del Poker, o Full o Trio
            let numberPokerHand1 = this.hand1.sortByNumberOcurrences()[0][0];
            let numberPokerHand2 = this.hand2.sortByNumberOcurrences()[0][0]; 

            if (pokerCards.S.indexOf(numberPokerHand1) > pokerCards.S.indexOf(numberPokerHand2)) {
                return ('Gana Jugador 1 con mano ' + this.hand1.calculateRankHand() + ' more high');
            } else {
                return ('Gana Jugador 2 con mano ' + this.hand2.calculateRankHand() + ' more high');
            }
         //Ambos jugadores con Dobles parejas   
        } else if (rank === 2 || rank === 1) {
           const numbersOcurrencesHand1 = this.hand1.sortByNumberOcurrences();
           const numbersOcurrencesHand2 = this.hand2.sortByNumberOcurrences();
           //Lo convertimos a un array dimesional con las cartas, las repetidas solo aparecen ordenadas por número de repetición 
           const numbersHand1 = numbersOcurrencesHand1.map ( (element) => element[0]);
           const numbersHand2 = numbersOcurrencesHand2.map ( (element) => element[0]);
           
           const indexNumbersHand1 = numbersHand1.map ( (card) => pokerCards.S.indexOf(card));
           const indexNumbersHand2 = numbersHand2.map ( (card) => pokerCards.S.indexOf(card));
          
           //Tenemos que ordenador solo los 2 primeros elementos que son las parejas y por ultimo la carta individual o kicker 
           for (let i = 0; i < indexNumbersHand1.length; i++) {
               if (indexNumbersHand1[0] < indexNumbersHand1[1]) {
                   let aux = indexNumbersHand1[0];
                   indexNumbersHand1[0] = indexNumbersHand1[1];
                   indexNumbersHand1[1] = aux;
               }
           }

           for (let i = 0; i < indexNumbersHand2.length; i++) {
                if (indexNumbersHand2[0] < indexNumbersHand2[1]) {
                    let aux = indexNumbersHand2[0];
                    indexNumbersHand2[0] = indexNumbersHand2[1];
                    indexNumbersHand2[1] = aux;
                }
           }

            for (let i = 0; i < indexNumbersHand1.length; i++) {
                if (indexNumbersHand1[i] > indexNumbersHand2[i]) {
                    return ('Gana Jugador 1 con mano ' + this.hand1.calculateRankHand() + ' with better kicker');
                } else if (indexNumbersHand1[i] < indexNumbersHand2[i]) {
                    return ('Gana Jugador 2 con mano ' + this.hand2.calculateRankHand() + ' with better kicker');
                }
            }

            return 'Empate con Carta Alta';

        }


        //Carta alta
        else if (rank === 0) {
            console.log('Entra');
            const numbersHand1 = this.hand1.getNumberHandArray();
            const numbersHand2 = this.hand2.getNumberHandArray();

            const indexNumbersHand1 = numbersHand1.map ( (card) => pokerCards.S.indexOf(card));
            const indexNumbersHand2 = numbersHand2.map ( (card) => pokerCards.S.indexOf(card));
            //Ordenamos los arrays en orden descendente
            const sortIndexNumbersHand1 = indexNumbersHand1.sort((a, b) => b - a);
            const sortIndexNumbersHand2 = indexNumbersHand2.sort((a, b) => b - a);
            
            
            for (let i = 0; i < sortIndexNumbersHand1.length; i++) {
                if (sortIndexNumbersHand1[i] > sortIndexNumbersHand2[i]) {
                    return ('Gana Jugador 1 con mano ' + this.hand1.calculateRankHand() + ' with better kicker');
                } else if (sortIndexNumbersHand1[i] < sortIndexNumbersHand2[i]) {
                    return ('Gana Jugador 2 con mano ' + this.hand2.calculateRankHand() + ' with better kicker');
                }
            }

            return 'Empate con Carta Alta';

        }
    }

 
    play() {
        this.printCards();
        //Guardamos el indice del array de rangos para compararlo
        const rankNumberHand1 = ranks.indexOf(this.hand1.calculateRankHand()); 
        const rankNumberHand2 = ranks.indexOf(this.hand2.calculateRankHand()); 
        console.log(rankNumberHand1, rankNumberHand2);
        
        if (rankNumberHand1 > rankNumberHand2) {
            return ('Gana Jugador 1 con mano ' +  this.hand1.calculateRankHand());
        } else if (rankNumberHand1 < rankNumberHand2) {
            return ('Gana Jugador 2 con mano '+ this.hand2.calculateRankHand());
          
            //En caso de que tengan la misma jugada  
        } else {
            console.log(this.calculateTie(rankNumberHand1));    

        }
    }
}