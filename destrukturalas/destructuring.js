1// 1.
let car = ['Ford', 'Mustang', 2022, 'blue'];
let [brand, model, year, color] = car;
console.log(`${brand}, ${model}, ${year}, ${color}`)

// Milyen változóneveket lehet használni tömb esetén destrukturálás esetén?
// bármilyen megengedett változónév lehet (pl a "this" nem megengedett)

// A változók sorrendje fontos-e?
// Igen


// 2.
let book = {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    publicationYear: 2008,
    language: 'English'
};

let { title: bookTitle, author: bookAuthor, publicationYear, language } = book;
console.log(`${bookTitle}, ${bookAuthor}, ${publicationYear}, ${language}`);

// Milyen változóneveket lehet használni objektum esetén destrukturálás esetén?
// bármely megengedett változónevet lehet használni ha megadjuk a hozzáfűződő "key"-t az objektumban.

// A változók sorrendje fontos-e?
// Nem



// 3.
function printStudentInfo({name, age, grade, subjects}) {
    console.log(`${name}, ${age}, ${grade}, ${subjects}`);
    }

    let student = {
        name: 'John Doe',
        age: 20,
        grade: 'B',
        subjects: ['Math', 'English', 'History']
        };

printStudentInfo(student);
