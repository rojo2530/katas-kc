import { Hand }  from './Hand.mjs';
import { Game }  from './Game.mjs';







let player1Hand = new Hand(['2H','3D', '5S', '9C', 'KD']);
let player2Hand = new Hand(['2C','3H', '4S', '8C', 'AH']);

new Game(player1Hand,player2Hand);

player1Hand = new Hand(['8S','8D', 'AC', 'JD', 'TH']);
player2Hand = new Hand(['8C','8H', 'QS', 'AH', '9H']);

new Game(player1Hand,player2Hand);

