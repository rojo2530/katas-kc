import { Hand }  from './Hand.mjs';
import { Game }  from './Game.mjs';







let player1Hand = new Hand(['4S','5S', '8S', '7S', '6S']);
let player2Hand = new Hand(['7H','5H', '4H', '8H', '6H']);

let newGame = new Game(player1Hand,player2Hand);
newGame.jugar();

console.log(player1Hand.calculateRankHand());
// player2Hand = new Hand();
// game = new Game(player1Hand, player2Hand);


