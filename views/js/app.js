import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

class GeneratePdf {
  // Pdf doc will hold an instance of jsPDF (our pdf document)
  pdfDoc;
  // Position used for controlling where elements are on the pdf
  position = {
    y: 20,
    x: 10,
  };
  // Margin used for adding fluff away from page borders
  margin = {
    y: 20,
    x: 10,
  };
  // Page counter used for tracking how many pages exist in the pdf
  pageCounter = 1;
  // Dom ref is used be able to update the DOM with the pdf
  domRef = "";

  /**
   *
   * @param {string} domRefId The id of the iframe used for rendering the pdf
   */
  constructor(domRefId) {
    this.pdfDoc = new jsPDF();
    this.pdfDoc.setFontSize(11);
    if (domRefId) {
      this.domRef = document.querySelector(`#${domRefId}`);
    }
  }

  /**
   * Used to download the pdf onto the client's device
   */
  downloadPdf() {
    this.pdfDoc.save("This file.pdf");
  }

  /**
   *
   * @returns A string value with a domain local url for the pdf
   */
  getPdfUrl() {
    return this.pdfDoc.output("bloburl") + "#toolbar=1";
  }

  /**
   *
   * @param {string} text Content displayed in header
   */
  addHeader(text, color = "black") {
    this.pdfDoc.setFontSize(16);
    this.pdfDoc.setTextColor(color);
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.position.y += 8;
    this.pdfDoc.setTextColor("black");
    this.pdfDoc.setFontSize(11);
  }

  /**
   *
   * @param {string} text Content for the paragraph
   */
  addText(text, color = "black") {
    this.pdfDoc.setTextColor(color);
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.pdfDoc.setTextColor("black");
    this.position.y += 5.5;
  }

  /**
   * Looping through the pages from last to first then deleting them. After all pages are deleted, it resets the pageCounter and adds a new blank page.
   */
  resetPdf() {
    for (let i = this.pageCounter; i > 0; i--) {
      this.pdfDoc.deletePage(i);
    }
    this.pageCounter = 1;
    this.pdfDoc.addPage();

    this.showPdf();
  }

  /**
   * Resets the x/y position, based on the margin, then adds a new blank page, increasing the pageCounty
   */
  newPage() {
    this.position = { ...this.margin };
    this.pdfDoc.addPage();
    this.pageCounter++;
  }

  /**
   * Updates the dom to show the pdf in the iframe
   */
  showPdf() {
    if (this.domRef) {
      this.domRef.src = this.getPdfUrl();
    }
  }

  addBackground({ color = "black", fontSize = 11 } = {}) {
    const offset = fontSize / 2;
    // S - stroke / border of rect
    // F - fill / background of rect
    // font size = 16; offset = 8; y change = 6;
    // font size = 11; offset = 5.5; y 5.5 * 3 / 4
    this.pdfDoc.setFillColor(color);
    this.pdfDoc.rect(
      this.position.x,
      this.position.y - (offset * 3) / 4,
      100,
      offset,
      "F"
    );
    this.pdfDoc.setFillColor("white");
  }
}

const myPdf = new GeneratePdf("pdf-preview");

myPdf.addBackground({ fontSize: 16, color: "blue" });
myPdf.addHeader("Title", "white");
myPdf.addBackground();
myPdf.addText("Something else is amidst", "white");

myPdf.newPage();
myPdf.addHeader("Second Page!!!");

myPdf.showPdf();

console.log("hi", myPdf.getPdfUrl());
