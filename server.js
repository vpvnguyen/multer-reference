const express = require("express");
const app = express();
const multer = require("multer");

const PORT = 5000;

app.get("/", (req, res) => res.json({ message: "server" }));

app.get("/multer", (req, res) => {
  console.log(multer);
  console.log(multer.diskStorage);
  res.json({ message: "multer" });
});

app.listen(PORT, () => console.log(PORT));
