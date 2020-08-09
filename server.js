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
const storage = multer.diskStorage({
  // define a storage location on disk for files
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  // give files a new identifier
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 6,
    fileSize: 7340032, // 7 MB
  },
  fileFilter: (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    const acceptedFiles = ["application/pdf", "text/plain"];
    // accept file
    if (acceptedFiles.includes(file.mimetype)) {
      return cb(null, true);
    }

    // reject file; will allow endpoint to execute
    cb(null, false);

    // pass an error; will halt from executing endpoint
    // cb(new Error("I don't have a clue!"));
  },
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// single file upload
app.post("/uploadFile", upload.single("myFile"), async (req, res, next) => {
  const { file } = req;

  // catch file
  // if (!file) {
  //   const error = new Error("Please upload a file");
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }

  console.log("DO SOMETHING ELSE");

  res.send(file);
});

// multiple file upload
app.post("/uploadMulti", upload.array("myFiles", 12), (req, res, next) => {
  const { files } = req;
  const minimumFiles = 2;
  if (files.length < minimumFiles) {
    const error = new Error("There was an issue uploading files");
    error.httpStatusCode = 400;
    return next(error);
  }

  console.log("DO SOMETHING ELSE");

  res.send(files);
});

app.listen(PORT, () => console.log(`App running on ${PORT}`));
