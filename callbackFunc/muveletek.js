function osszeadas(a, b) {
    return a + b;
}

function kivonas(a, b) {
    return a - b;
}

function szorzas(a, b) {
    return a * b;
}

function osztas(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        console.error("Nem lehet nullával osztani");
        return undefined;
    }
}

function szamol(muvelet, a, b) {
    switch (muvelet.toString()) {
        case 'osszeadas':
            return osszeadas(a, b);
        case 'kivonas':
            return kivonas(a, b);
        case 'szorzas':
            return szorzas(a, b);
        case 'osztas':
            return osztas(a, b);
        default:
            console.error("Invalid operation");
            return undefined;
    }
}

// Ellenőrzés:
let result = szamol('osszeadas', 5, 3);
console.log('Az összeadás eredménye: 8, a számolt érték: ' + result);

result = szamol('kivonas', 8, 2);
console.log('A kivonás eredménye: 6, a számolt érték: ' + result);

result =  szamol('szorzas', 4, 6);
console.log('A szorzás eredménye: 24, a számolt érték: ' + result);

result =  szamol('osztas', 9, 3);
console.log('Az osztás eredménye: 3, a számolt érték: ' + result);
