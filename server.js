const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");

let buzzWords = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  const { method } = req;

  res.send("hello yo mama");
});

app
  .route("/buzzwords")
  .get((req, res) => {
    res.send(buzzWords);
  })
  .post((req, res) => {
    let buzz = req.body;
    let word = buzz.buzzWord;

    if (buzzWords.includes(word) === false) {
      buzzWords.push(word);
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
    console.log(buzzWords);
  });

app.listen(PORT, () => {
  console.log("COOL RUNNNINGS MON");
});
