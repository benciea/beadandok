// 1. feladat Sum of array singles
function sumOfArraySingles(arr){
    const count = {};
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if (count[element]) {
            count[element] += 1;
        } else {
            count[element] = 1;
        }
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if (count[element] === 1) {
            sum += element;
        }
    }

    return sum;
}

console.log('1. feladat\n')
console.log(sumOfArraySingles([4, 5, 7, 5, 4, 8]), 15)
console.log(sumOfArraySingles([9, 10, 19, 13, 19, 13]), 19)
console.log(sumOfArraySingles([16, 0, 11, 4, 8, 16, 0, 11]), 12)
console.log(sumOfArraySingles([5, 17, 18, 11, 13, 18, 11, 13]), 22)
console.log(sumOfArraySingles([5, 10, 19, 13, 10, 13]), 24)


// 2. feladat Sort Arrays (Ignoring Case)
function sortArraysIgnoringCase(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].toLowerCase() > arr[j + 1].toLowerCase()) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
}

console.log('\n\n2. feladat\n')
console.log(sortArraysIgnoringCase(["Hello", "there", "I'm", "fine"]), ["fine", "Hello", "I'm", "there"])
console.log(sortArraysIgnoringCase(["C", "d", "a", "B"]), ["a", "B", "C", "d"])
console.log(sortArraysIgnoringCase(["CodeWars"]), ["CodeWars"])
console.log(sortArraysIgnoringCase([]), [])


// 3. feladat Insert dashes
function insertDash(input) {
    const str = input.toString();
    let result = '';

    for (let i = 0; i < str.length; i++) {
        result += str[i];
        if (i < str.length - 1 && parseInt(str[i]) % 2 !== 0 && parseInt(str[i + 1]) % 2 !== 0) {
            result += '-';
        }
    }

    return result;
}

console.log('\n\n3. feladat\n')
console.log(insertDash(454793), '4547-9-3')
console.log(insertDash(123456), '123456')
console.log(insertDash(1003567), '1003-567')
console.log(insertDash(13570), '1-3-5-70')
console.log(insertDash(0), '0')