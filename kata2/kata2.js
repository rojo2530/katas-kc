function validatorRomanNumber(RomanNumber) {
    return /(?=^.+$)^M{0,3}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[VX]|V?I{0,3})$/.test(RomanNumber);
}

function decimalToRoman (number) {
    
    if (number < 1 || number > 3999) {
        return 'El número introducido no es valido, tiene que estar entre 1 y 3999';
    }

    let result = '';

    const RomanSymbols = { M:1000,CM:900, D:500,CD:400, C:100, XC:90,L:50, XV: 40, X:10, IX:9, V:5, IV:4, I:1 };
       
    for (let key in RomanSymbols) {
        while (number % RomanSymbols[key] < number) {
            result += key; 
            number -= RomanSymbols[key];
        }
    }

    return result; 

}

function romanToDecimal(romanNumber) {
    
    if (!validatorRomanNumber(romanNumber)) {
        return 'El numero romano no es valido o se sale del rango 1-3999';
    }

    let output = 0;

    const romanSymbols = { M:1000,CM:900, D:500,CD:400, C:100, XC:90, XL: 40, L:50, IX:9, X:10, IV:4, V:5, I:1 };

    for (let key in romanSymbols) {
        while (romanNumber.indexOf(key) != -1) {
            output += parseInt(romanSymbols[key]);
            romanNumber = romanNumber.replace(key,"*");
        }   
    }

    return output;
}

console.log(romanToDecimal('LXXXVII'));
console.log(romanToDecimal('XLIV'));
console.log(romanToDecimal('XXII'));
console.log(romanToDecimal('XXXIX'));


console.log(decimalToRoman(3999));
console.log(decimalToRoman(431));