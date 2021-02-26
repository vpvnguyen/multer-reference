const PDFDocument = require("pdfkit");
const fs = require("fs");
const moment = require("moment");

class DisclaimerTemplates {
  static acknowledgementDate = (confirmDate) =>
    `Acknowledgement Date: ${moment(confirmDate).format("MM-DD-YYYY")}`;

  static defaultFile = (vin, confirmDate) => [
    'I am submitting to Mazda Motor Corporation ("Mazda") a claim for reimbursement for repair or replacement of the part containing the safety or noncompliance defect performed to date. The vehicle identification number (VIN) is:',
    vin,
    "In exchange for Mazda's payment of that claim, I hereby release Mazda, its agents, and its related entities from all claims for such inspection/repair costs. This release shall benefit Mazda and its authorized agent Mazda Motor of America, Inc. dba Mazda North American Operations, its regions/distributors (foreign and domestic), its authorized dealerships, and all their respective directors, officers, agents, employees, divisions, subsidiaries, and affiliated companies. This release shall bind my heirs, successors and assigns.",
    this.acknowledgementDate(confirmDate),
  ];

  static CSP09 = (confirmDate) => [
    `I hereby release any and all claims, demands, actions, or causes of action, either known or unknown, against Mazda North American Operations and Mazda Motor Corporation, as well as all of their respective officers, directors, employees, subsidiaries, authorized dealers, predecessors, successors, heirs, and assigns (“Released Parties”) arising out of or in any way related to the failure of the original equipment manufacturer (“OEM”) clutch disc and any of the following OEM parts: (a) clutch cover/pressure plate; (b) clutch lever; (c) clutch fork; (d) clutch release collar/throwout bearing; (e) pivot pin clutch release fork; or (f) flywheel (“Covered Clutch Assembly Parts”) within 60,000 miles and 60-months from the vehicle’s in-service date in 2010-2013 Mazda3 vehicles equipped with a 2.5L DOHC I-4 Engine. This Release does not apply to any claims I may have for personal injury, wrongful death, or damage to other property as a result of the failure of Covered Clutch Assembly Parts within 60,000 miles and 60-months from the vehicle’s in-service date.`,
    `I acknowledge that there may be information or facts that are different from, in addition to, and/or contrary to those that I now know or understand to be true, and that there may be damages, losses, costs, and expenses of which I am not currently aware or which are unanticipated at this time. By signing this Release, I acknowledge that I forever waive and discharge any rights which I may have against the Released Parties for any such claim which may arise in the future and that this Release shall be and remain effective in all respects, notwithstanding any such additional, and/or contrary information or facts.`,
    `I hereby waive any and all rights under California Civil Code Section 1542 notwithstanding any provision to the contrary. Section 1542 provides as follows:`,
    `A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party.`,
    this.acknowledgementDate(confirmDate),
  ];
}

class Disclaimer {
  static getTemplate = (disclaimerTemplateType, vin, confirmDate) => {
    switch (disclaimerTemplateType) {
      case "CSP09":
        return DisclaimerTemplates.CSP09(confirmDate);
      default:
        return DisclaimerTemplates.defaultFile(vin, confirmDate);
    }
  };

  static generateFile = (disclaimerTemplate, res) => {
    // Create a document
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    // doc.pipe(fs.createWriteStream(`output-${Date.now()}.pdf`));
    // doc.pipe(res);

    // Embed a font, set the font size, and render some text
    disclaimerTemplate.map((text) => {
      doc.font("fonts/arial.ttf").fontSize(10).text(text).moveDown(0.5);
    });

    // Finalize PDF file
    doc.end();

    return doc;
  };
}

module.exports = Disclaimer;
