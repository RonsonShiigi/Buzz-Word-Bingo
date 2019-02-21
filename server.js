const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

let buzzWords = {};
let totalScore = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello yo mama");
});

app
  .route("/buzzwords")
  .get((req, res) => {
    res.send(buzzWords);
  })
  .post((req, res) => {
    console.log(req);
    let buzz = req.body;
    let word = buzz.buzzWord;
    let pointers = buzz.points;
    let keys = Object.keys(buzzWords);

    if (keys.includes(word) === false) {
      buzzWords[word] = pointers;
      console.log(buzzWords);
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
    console.log(buzzWords);
  })
  .put((req, res) => {
    let buzz = req.body;
    let word = buzz.buzzWord;
    let pointers = buzz.points;
    let keys = Object.keys(buzzWords);
    if (keys.includes(word) === true) {
      buzzWords[word] = pointers;
      res.send({ sucess: true });
    } else {
      res.send({ success: false });
    }
  })
  .delete((req, res) => {
    let buzz = req.body;
    let word = buzz.buzzWord;
    let keys = Object.keys(buzzWords);
    if (keys.includes(word)) {
      delete buzzWords[word];
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });

app.route("/reset").post((req, res) => {
  buzzWords = {};
  totalScore = 0;
  res.send({ sucess: true });
  console.log(buzzWords);
  return buzzWords, totalScore;
});

app.route("/heard").post((req, res) => {
  let word = req.body.buzzWord;
  console.log(word);
  totalScore += buzzWords[word];
  res.send({ totalScore: totalScore });
});

app.listen(PORT, () => {
  console.log("COOL RUNNNINGS MON");
});
