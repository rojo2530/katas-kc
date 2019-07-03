function testEntry (number) {
    return (number >=1 && number <=100);
}

// function digitsNumber (number) {
//     let output = [];
//     stringNumber = number.toString();
//     for (let i = 0; i< stringNumber.length; i++) {
//         output.push(parseInt(stringNumber[i]));
//     }

//     return output;

// }

function digitsNumber (number) {
    return Array.from(number.toString(), Number);
}



function FooBarQuix (number) {

    if (!testEntry(number)) {
        return 'El numero introducido no es correcto, tiene que estar entre 1 y 100';
    }

    if (!Number.isInteger(number)) {
        return 'El numero pasado no es un entero';
    }

    let output = '';
    let arrayNumber = digitsNumber(number);
    console.log(arrayNumber);
    const numberRelationString = {
        3: 'Foo',
        5: 'Bar',
        7: 'Quix'
    };

    Object.keys(numberRelationString).forEach(function(element) {
        if (number % element == 0) {
            output += numberRelationString[element]; 
        }
    });

    arrayNumber.forEach(function(element) {
        if (element in numberRelationString) {
            output += numberRelationString[element];
        }
    });
    
    return (number + ' -> ' + output);
}

console.log(FooBarQuix(21));
