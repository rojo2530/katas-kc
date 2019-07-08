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
            console.log ('Empate con ' + this.hand1.calculateRankHand());
          //Escalera de color  
        } else if (rank === 10 || rank === 5) {
            const HighCard1 = this.hand1.getHighCard();
            const HighCard2 = this.hand2.getHighCard();
            if (pokerCards.S.indexOf(HighCard1) > pokerCards.S.indexOf(HighCard2)) {
                console.log('Gana Jugador 1 con mano ' + this.hand1.calculateRankHand() + ' more high');
            } else if (pokerCards.S.indexOf(HighCard1) < pokerCards.S.indexOf(HighCard2)) {
                console.log('Gana Jugador 2 con mano ' + this.hand2.calculateRankHand() + ' more high');
            } else {
                console.log('Empate ambos jugadores con ' + this.hand1.calculateRankHand());
            }

        } 
    }

 
    play() {
        this.printCards();
        //Guardamos el indice del array de rangos para compararlo
        const rankNumberHand1 = ranks.indexOf(this.hand1.calculateRankHand()); 
        const rankNumberHand2 = ranks.indexOf(this.hand2.calculateRankHand()); 
        console.log(rankNumberHand1, rankNumberHand2);
        
        if (rankNumberHand1 > rankNumberHand2) {
            console.log('Gana Jugador 1 con mano ' +  this.hand1.calculateRankHand());
        } else if (rankNumberHand1 < rankNumberHand2) {
            console.log('Gana Jugador 2 con mano '+ this.hand2.calculateRankHand());
          
            //En caso de que tengan la misma jugada  
        } else {
            this.calculateTie(rankNumberHand1);    

        }






    }
}