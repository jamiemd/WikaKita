const passport = require("passport");
const jwt = require("jwt-simple");
const Flashcards = require("../models/FlashcardModel");

const routes = app => {
  // get all flashcards
  app.get("/api/flashcards", (req, res) => {
    // let currentDate = new Date();
    console.log("entered flashcards");
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

  app.get("/api/getStats", (req, res) => {
    Flashcards.find({})
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
    const { id, newBucket } = req.body;
    // console.log('id', id, 'newbucket', newBucket);

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

    // console.log('datenow no +1', newDate);

    Flashcards.findByIdAndUpdate(id, {
      currentBucket: newBucket,
      ReviewDate: newDate
    })
      .then(bucket => {
        res.status(200).json(bucket);
      })
      .catch(() => {
        res.status(500).json({ error: "The information could not be updated" });
      });
  });
};

module.exports = routes;
