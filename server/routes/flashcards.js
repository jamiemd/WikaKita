const passport = require("passport");
const jwt = require("jwt-simple");
const Flashcards = require("../models/FlashcardModel");

module.exports = app => {
  // get all flashcards
  app.get("/api/flashcards", (req, res) => {
    // let currentDate = new Date();
    Flashcards.find({})
      // .find({ ReviewDate: { $lte: currentDate } })
      .then(flashcards => {
        res.status(200).json(flashcards);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "The information could not be retrieved" });
      });
  });

  // update bucket
  app.put("/api/updateBucket", function(req, res) {
    const { id, grade } = req.body;
    console.log("req.body", req.body);
    // find flashcard by id
    Flashcards.findById(id, function(err, flashcard) {
      if (err) throw err;

      if (flashcard) {
        // update bucket
        const currentBucket = flashcard.currentBucket;
        let newBucket = "";

        if (grade === "no") {
          newBucket = 1;
        } else if (grade === "yes") {
          if (currentBucket >= 5) {
            newBucket = 5;
          } else {
            newBucket = currentBucket + 1;
          }
        }

        // update review date
        let dateNow = new Date();
        let newDate = new Date();
        if (newBucket === 1) {
          newDate.setDate(dateNow.getDate() + 0);
        } else if (newBucket === 2) {
          newDate.setDate(dateNow.getDate() + 1);
        } else if (newBucket === 3) {
          newDate.setDate(dateNow.getDate() + 3);
        } else if (newBucket === 4) {
          newDate.setDate(dateNow.getDate() + 10);
        } else if (newBucket === 5) {
          newDate.setDate(dateNow.getDate() + 15);
        }

        console.log("newbucket right before update", newBucket);
        console.log("currentBucket", currentBucket);

        Flashcards.findByIdAndUpdate(id, {
          $set: {
            currentBucket: newBucket
            // ReviewDate: newDate
          }
        })
          .then(newBucket => {
            console.log("newBucket", newBucket);
            res.status(200).json(newBucket);
          })
          .catch(error => {
            console.log("error", error);
            res
              .status(500)
              .json({ message: "The information could not be updated" });
          });
      }
    });
  });

  app.get("/api/getStats", (req, res) => {
    Flashcards.find({})
      .then(flashcards => {
        res.status(200).json(flashcards);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The information could not be retrieved" });
      });
  });
};
