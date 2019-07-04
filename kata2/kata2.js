// const RomanSymbols = {
//     I: 1,
//     V: 5,
//     X: 10,
//     L: 50,
//     C: 100,
//     D: 500,
//     M: 1000
// };

// function testEntryString (RomanNumber) {
//     return (typeof (RomanNumber) == 'string');
// }

// function validatorRomanNumber (RomanNumber) {

//     if (!testEntryString(RomanNumber)) {
//         return 'La entrada no es un string';
//     }

//     let contIXCM = 0;
//     let contVLD = 0;
//     let ArrayRomanNumber = Array.from(RomanNumber);
//     console.log(ArrayRomanNumber);

//     /* Comprobamos si el numero Romano contiene algun simbolo no permitido */
//     for (let i = 0; i < ArrayRomanNumber.length; i++) {
//         if (!(ArrayRomanNumber[i] in RomanSymbols)) {
//             return false;
//         }
//         if (contIXCM > 3) return false;
//         if (contVLD > 1 ) return false;

//         if (['I', 'X', 'C', 'M'].includes(ArrayRomanNumber[i]) {
//             contIXCM++;
//             console.log(contIXCM);
//         }
//     }


    
// }

function validatorRomanNumber(RomanNumber) {
    return /(?=^.+$)^M{0,3}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[VX]|V?I{0,3})$/.test(RomanNumber);
}

function decimalToRoman (number) {
    
    let result = '';

    if (number < 1 || number > 3999) {
        return 'El número introducido no es valido, tiene que estar entre 1 y 3999';
    }

    const RomanSymbols = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1
    };

    for (let key in RomanSymbols) {
        while (number % RomanSymbols[key] < number) {
            result += key; 
            number -= RomanSymbols[key];
        }
    }

    return result; 

}

console.log(decimalToRoman(4));