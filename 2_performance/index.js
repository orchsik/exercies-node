console.log("Im a child, Im going to act like a server and do nothing else");
const crypto = require("crypto");
const express = require("express");
const app = express();

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 51, "sha512", () => {
    res.send("Hi there");
  });
});

app.get("/doWork", (req, res) => {
  doWork(1000 * 5);
  res.send("This was done work!");
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3000);

/**
 * pm2 start index.js -i 0
 * pm2 delete index
 */
