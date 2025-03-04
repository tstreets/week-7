import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

class GeneratePdf {
  pdfDoc;
  position = {
    y: 20,
    x: 10,
  };
  margin = {
    y: 20,
    x: 10,
  };
  pageCounter = 1;
  domRef = "";

  constructor(domRefId) {
    this.pdfDoc = new jsPDF();
    if (domRefId) {
      this.domRef = document.querySelector(`#${domRefId}`);
    }
  }

  downloadPdf() {
    this.pdfDoc.save("mydoc.pdf");
  }

  getPdfUrl() {
    return this.pdfDoc.output("bloburl");
  }

  addHeader(text) {
    this.pdfDoc.setFontSize(16);
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.position.y += 8;
    this.pdfDoc.setFontSize(11);
  }

  addText(text) {
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.position.y += 5.5;
  }

  resetPdf() {
    for (let i = this.pageCounter; i > 0; i--) {
      this.pdfDoc.deletePage(i);
    }
    this.pageCounter = 1;
    this.pdfDoc.addPage();

    if (this.domRef) {
      this.domRef.src = this.getPdfUrl();
    }
  }

  newPage() {
    this.position = { ...this.margin };
    this.pdfDoc.addPage();
    this.pageCounter++;
  }

  showPdf() {
    if (this.domRef) {
      this.domRef.src = this.getPdfUrl();
    }
  }
}

const myPdf = new GeneratePdf("pdf-preview");

myPdf.addHeader("Title");
myPdf.addText("Something else is amidst");

myPdf.newPage();
myPdf.addHeader("Second Page!!!");

myPdf.showPdf();

console.log("hi", myPdf.getPdfUrl());
