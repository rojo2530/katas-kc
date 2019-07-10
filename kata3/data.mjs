export const pokerCards = {
    S: [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
    H: [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
    C: [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
    D: [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
};

export const ranks = [
    'High Card',
    'Pair',
    'Two Pairs',
    'Three of a Kind',
    'Ace Straigth to 5',
    'Straigth',
    'Flush',
    'Full house',
    'Four of a kind or Poker',
    'Ace flush Straight to 5',
    'Straigth flush',
    'Royal flush'
]
//Ordena de forma númerica solo los dos primeros elementos de un array
export function sortArrayOnly2FirstElements (arrayElements) {
    for (let i = 0; i < arrayElements.length; i++) {
        if (arrayElements[0] < arrayElements[1]) {
            let aux = arrayElements[0];
            arrayElements[0] = arrayElements[1];
            arrayElements[1] = aux;
        }
    }

    return arrayElements;
}