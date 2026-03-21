require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { generateImages } = require("./services/aiService");
const { createPDF } = require("./utils/pdfGenerator");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.post("/api/generate-book", async (req, res) => {
  try {
    const { topic, pages } = req.body;

    if (!topic || !pages) {
      return res.status(400).json({ error: "Missing topic or pages" });
    }

    console.log("Generating images...");

    const images = await generateImages(topic, pages);

    console.log("Creating PDF...");

    const pdfBytes = await createPDF(images);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${topic}-coloring-book.pdf`
    );

    res.send(pdfBytes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate book" });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});