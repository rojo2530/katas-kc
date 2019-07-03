/* Verifica que el numero introducido esta en 1 y 100 */
function testEntry (number) {
    return (number >=1 && number <=100);
}

/* Verifica que el numero es un entero y no un decimal */
function digitsNumber (number) {
    return Array.from(number.toString(), Number);
}

function FooBarQuix (number) {

    if (!testEntry(number)) {
        return 'El numero ' + number +  ' introducido no es correcto, tiene que estar entre 1 y 100';
    }

    if (!Number.isInteger(number)) {
        return 'El numero ' + number + ' pasado no es un entero';
    }

    let output = '';
    let arrayNumber = digitsNumber(number);
    const numberRelationString = {
        3: 'Foo',
        5: 'Bar',
        7: 'Quix'
    };

    Object.keys(numberRelationString).forEach((element) => {
        if (number % element == 0) {
            output += numberRelationString[element]; 
        }
    });

    arrayNumber.forEach((element) => {
        if (element in numberRelationString) {
            output += numberRelationString[element];
        }
    });
    
    output = (output === '' ? number : output);
    return (number + ' -> ' + output);
}

for (let i = 0; i<= 100; i++) {
    console.log(FooBarQuix(i));
}