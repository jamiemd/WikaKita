const mongoose = require("mongoose");

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
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Flashcard", FlashcardSchema);
