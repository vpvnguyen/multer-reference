const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const { urlencoded } = require("body-parser");

const PORT = 5000;

// express middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));

// multer
// set storage
// The next thing will be to define a storage location
// for our files. Multer gives the option of storing
// files to disk, as shown below. Here, we set up a directory
// where all our files will be saved, and we'll also give
// the files a new identifier.
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    const acceptedFiles = ["application/pdf"];
    console.log("FILE FILTER FILE", file);
    console.log(file);

    // accept file
    if (acceptedFiles.includes(file.mimetype)) cb(null, true);
    // reject file
    cb(null, false);

    // // pass an error if something goes wrong:
    // cb(new Error("I don't have a clue!"));
  },
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Handling File Uploads
// Uploading a Single File
// In the index.html file, we defined an action attribute
// that performs a POST request. Now we need to create an
// endpoint in the Express application. Open the server.js file
app.post("/uploadFile", upload.single("myFile"), async (req, res, next) => {
  const { file } = req;
  console.log("DO SOMETHING ELSE");
  if (upload.single("myFile")) console.log(upload.single("myFile"));
  // if (!file) {
  //   const error = new Error("Please upload a file");
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }

  res.send({ createIssue: "success" });
});

// Uploading Multiple Files
// Uploading multiple files with Multer is similar
// to a single file upload, but with a few changes.
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
