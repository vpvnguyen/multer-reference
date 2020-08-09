const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const { urlencoded } = require("body-parser");

const PORT = 5000;

// express middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));

// set multer storage
var storage = multer.diskStorage({
  // define a storage location on disk for files
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, "uploads");
  },
  // give files a new identifier
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

var upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    const acceptedFiles = ["application/pdf"];
    console.log("FILE FILTER FILE", file);

    // accept file
    if (acceptedFiles.includes(file.mimetype)) return cb(null, true);
    // reject file
    cb(null, false);

    // // pass an error if something goes wrong:
    // cb(new Error("I don't have a clue!"));
  },
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// single file upload
app.post("/uploadFile", upload.single("myFile"), async (req, res, next) => {
  console.log("/uploadFile");
  const { file } = req;
  console.log("DO SOMETHING ELSE");

  // if (!file) {
  //   const error = new Error("Please upload a file");
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }
  console.log("JIRA CLIENT");

  res.send({ createIssue: "success" });
});

// multiple file upload
app.post("/uploadMulti", upload.array("myFiles", 12), (req, res, next) => {
  const { files } = req;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(files);
});

app.listen(PORT, () => console.log(`App running on ${PORT}`));
