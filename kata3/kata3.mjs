import { Hand }  from './Hand.mjs';
import { Game }  from './Game.mjs';







let player1Hand = new Hand(['TS','KD', '2D', '4S', '9H']);
let player2Hand = new Hand(['7H','8C', 'TD', 'KS', '2H']);
// console.log(player2Hand.calculateRankHand());

// console.log(player2Hand.valueOfDuplicateCards());
console.log(new Game(player1Hand,player2Hand));

// console.log(player1Hand.calculateRankHand());
// player2Hand = new Hand();
// game = new Game(player1Hand, player2Hand);


