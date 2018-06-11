const fs = require("fs"); // read files on computer

let savedCards = null;

const Flashcards = require("./models/FlashcardModel.js");
const User = require("./models/UserModel.js");

Flashcards.remove({}, function(err) {
  console.log("flashcard collection removed");
});

User.remove({}, function(err) {
  console.log("users collection removed");
});

// read flashcards from json file
const readCards = () => {
  console.log("readcards called");
  if (!savedCards) {
    const contents = fs.readFileSync("./flashcards.json", "utf8");
    savedCards = JSON.parse(contents); // turns file into object
  }
  return savedCards;
};

// save to database
const populateCards = () => {
  console.log("populate cards called");
  const allCards = readCards();
  console.log("allcards", allCards);
  const promises = allCards.map(p => new Flashcards(p).save());
  console.log("promises", promises);
  return Promise.all(promises); // wait for save to be done
};

// run node populate.js to populate initial data
populateCards();
