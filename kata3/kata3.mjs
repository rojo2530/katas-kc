import { Hand }  from './Hand.mjs';
import { Game }  from './Game.mjs';


let player1Hand = new Hand(['JH','KH', 'AH', 'TH', '6H']);
let player2Hand = new Hand(['5C','7C', 'QC', 'KC', 'AC']);

new Game(player1Hand,player2Hand);

player1Hand = new Hand(['8S','8D', '8C', '8H', 'JC']);
player2Hand = new Hand(['9C','9H', 'KS', 'AH', 'JH']);

let game1 = new Game(player1Hand,player2Hand);


