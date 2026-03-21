const { PDFDocument } = require("pdf-lib");
const axios = require("axios");

async function createPDF(imageUrls) {
  const pdfDoc = await PDFDocument.create();

  for (let url of imageUrls) {
    const imgBytes = await axios.get(url, {
      responseType: "arraybuffer"
    });

    const image = await pdfDoc.embedJpg(imgBytes.data);
    const page = pdfDoc.addPage([612, 792]);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: 612,
      height: 792
    });
  }

  return await pdfDoc.save();
}

module.exports = { createPDF };