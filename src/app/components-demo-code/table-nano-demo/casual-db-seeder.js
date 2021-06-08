// 1) $ npm install casual (a quick databse ".json" seeder)
// Check https://www.codementor.io/ayushgupta/how-to-use-json-server-to-create-mock-apis-0-lci958ear

// To create a "nano-db.json" file, simulating your back end Database, run the following command in your terminal:
// $ node src/app/table-demo-nano/casual-db-seeder.js > src/app/table-demo-nano/nano-db.json
var casual = require('casual');

// Create an object for config file
var db = { books: [] };

for (var i = 1; i <= 1000; i++) {
    var book = {};
    book.id = i;

    // Create a random 1-6 word title
    book.title = casual.words(casual.integer(1, 6));
    book.author = casual.first_name + ' ' + casual.last_name;

    // Randomly rate the book between 0 and 5
    book.rating = Math.floor(Math.random() * 100 + 1) / 20;

    // Assign a publishing year between 1700 and 2016
    book.year_published = casual.integer(1700, 2016)
    db.books.push(book);
}

console.log(JSON.stringify(db));