import { PDFDocument } from "pdf-lib";
import fs from "node:fs";
import path from "node:path";

const filename = process.argv[2];

console.log("Berem ", filename);
const od_strani = parseInt(process.argv[3]);
const do_strani = parseInt(process.argv[4]);

const inputPdfBytes = fs.readFileSync(filename);
const inputPdfDoc = await PDFDocument.load(inputPdfBytes);

const pages = inputPdfDoc.getPageCount();
const folder_name = filename.replace(".pdf", "_od_do");
fs.mkdirSync("./" + folder_name, { recursive: true });

const out_filename = path.basename(filename);

const pdfDoc = await PDFDocument.create();
for (let index = 0; index < pages; index++) {
  const page_no = index + 1;
  if (page_no >= od_strani && page_no <= do_strani) {
    console.log("stran:", page_no);
    const [inputPage] = await pdfDoc.copyPages(inputPdfDoc, [index]);
    pdfDoc.addPage(inputPage);
  }
}

const pdfBytes = await pdfDoc.save();
fs.writeFileSync(
  "./" + folder_name + "/" + od_strani + "_" + do_strani + "_" + out_filename,
  pdfBytes
);
