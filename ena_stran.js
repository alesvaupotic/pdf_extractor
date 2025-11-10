import { PDFDocument } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";

const filename = process.argv[2];

console.log("Berem ", filename);

const inputPdfBytes = fs.readFileSync(filename);
const inputPdfDoc = await PDFDocument.load(inputPdfBytes);
const pages = inputPdfDoc.getPageCount();
const folder_name = filename.replace(".pdf", "_posamicno");
fs.mkdirSync("./" + folder_name, { recursive: true, replace: true });

const out_filename = path.basename(filename);

for (let index = 0; index < pages; index++) {
  console.log("index:", index);

  const pdfDoc = await PDFDocument.create();
  const [inputPage] = await pdfDoc.copyPages(inputPdfDoc, [index]);
  pdfDoc.addPage(inputPage);
  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(
    "./" + folder_name + "/" + (index + 1) + "_" + out_filename,
    pdfBytes
  );
}
