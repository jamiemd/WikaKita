const fs = require("fs"); // read files on computer

let savedCards = null;

const Flashcards = require("./flashcards.js");
const User = require("./user.js");

Flashcards.remove({}, function(err) {
  console.log("flashcard collection removed");
});

User.remove({}, function(err) {
  console.log("users collection removed");
});

// read flashcards from json file
const readCards = () => {
  if (!savedCards) {
    const contents = fs.readFileSync("../flashcards.json", "utf8");
    savedCards = JSON.parse(contents); // turns file into object
  }
  return savedCards;
};

// save to database
const populateCards = () => {
  const allCards = readCards();
  const promises = allCards.map(p => new Flashcards(p).save());
  return Promise.all(promises); // wait for save to be done
};

// run node populate.js to populate initial data
populateCards();
