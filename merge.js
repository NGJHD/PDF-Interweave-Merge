const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function mergeADF() {
  const [, , file1, file2] = process.argv;
  
  if (!file1 || !file2) {
    console.error("Usage: node merge.js <pdf1> <pdf2>");
    process.exit(1);
  }

  // Load input PDFs
  const pdf1Bytes = fs.readFileSync(file1);
  const pdf2Bytes = fs.readFileSync(file2);

  const pdf1 = await PDFDocument.load(pdf1Bytes);
  const pdf2 = await PDFDocument.load(pdf2Bytes);

  const totalPages = pdf1.getPageCount();
  const totalPages2 = pdf2.getPageCount();

  if (totalPages !== totalPages2) {
    console.error("Error: Both PDFs must have the same number of pages.");
    return;
  }

  const merged = await PDFDocument.create();

  for (let i = 0; i < totalPages; i++) {
    // PDF 1: normal order
    const [p1] = await merged.copyPages(pdf1, [i]);
    merged.addPage(p1);

    // PDF 2: reverse order
    const [p2] = await merged.copyPages(pdf2, [totalPages - 1 - i]);
    merged.addPage(p2);
  }

  // Save merged PDF
  const finalPdf = await merged.save();
  fs.writeFileSync("merged.pdf", finalPdf);

  console.log("Merged PDF created successfully: merged.pdf");
}

mergeADF().catch(err => console.error(err));
