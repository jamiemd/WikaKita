const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/wikikita");

const FlashcardSchema = new mongoose.Schema({
  english: {
    type: String,
    required: true
  },
  tagalog: {
    type: String,
    required: true
  },
  currentBucket: {
    type: Number,
    required: true
  },
  ReviewDate: {
    type: Date,
    required: false,
    default: Date.now
  }
});

module.exports = mongoose.model("Flashcards", FlashcardSchema);
