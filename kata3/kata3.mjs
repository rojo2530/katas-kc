import { Hand }  from './Hand.mjs';
import { Game }  from './Game.mjs';







let player1Hand = new Hand(['JS','JD', '5D', '5H', '7H']);
let player2Hand = new Hand(['JH','JC', '5C', '5S', '7C']);

new Game(player1Hand,player2Hand);



