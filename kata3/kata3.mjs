import { Hand }  from './Hand.mjs';
import { Game }  from './Game.mjs';


let player1Hand = new Hand(['JH','KH', 'AH', 'TH', '6H']);
let player2Hand = new Hand(['5C','7C', 'QC', 'KC', 'AC']);

new Game(player1Hand,player2Hand);

player1Hand = new Hand(['8S','8D', 'AC', 'KD', 'JC']);
player2Hand = new Hand(['8C','8H', 'KS', 'AH', 'JH']);

let game1 = new Game(player1Hand,player2Hand);


