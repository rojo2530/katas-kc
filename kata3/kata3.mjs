import { Hand }  from './Hand.mjs';
import { Game }  from './Game.mjs';







let player1Hand = new Hand(['JS','JD', '5D', '5H', '6C']);
let player2Hand = new Hand(['JH','JC', '4H', '4S', '9C']);
// console.log(player2Hand.calculateRankHand());

console.log(player1Hand.sortByNumberOcurrences());

// console.log(player2Hand.valueOfDuplicateCards());
console.log(new Game(player1Hand,player2Hand));

// console.log(player1Hand.calculateRankHand());
// player2Hand = new Hand();
// game = new Game(player1Hand, player2Hand);


