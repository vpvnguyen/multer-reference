const express = require("express");
const app = express();
const cors = require("cors");
const Disclaimer = require("./pdf-docuemnt");
const PDFDocument = require("pdfkit");
const multer = require("multer");
const fs = require("fs");

const PORT = 1234;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const standardUploadTypes = ["application/pdf"];

const uploads = multer({
  limits: {
    files: 7,
    fileSize: 1000 * 7,
  },
  fileFilter: (req, file, cb) => {
    if (standardUploadTypes.includes(file.mimetype)) {
      console.log("mimetype good");
      cb(null, true);
    } else {
      cb(new InvalidFileError(file.originalname, file.mimetype), false);
    }
  },
});

app.get("/", (req, res) => {
  res.send(`API SERVER RUNNING on ${PORT}`);
});

app.get("/pdf", async (req, res) => {
  const disclaimerTemplateType = "default";
  const vin = "12345";
  const confirmDate = new Date();

  const disclaimerTemplate = Disclaimer.getTemplate(
    disclaimerTemplateType,
    vin,
    confirmDate
  );
  const disclaimerFrom = await Disclaimer.generateFile(disclaimerTemplate);
  console.log(disclaimerFrom);
  res.sendFile(disclaimerFrom);
});

app.post("/store", async (req, res) => {
  //   fs.createWriteStream(`disclaimer-${Date.now()}.pdf`);
  console.log(req.body);

  res.json("file stored");
});

app.post("/profile", uploads.single("avatar"), function (req, res, next) {
  console.log(req.file);
  console.log(req.body);
  res.json("got profile");

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.listen(PORT, (req, res) => console.log(`API SERVER RUNNING on ${PORT}`));
