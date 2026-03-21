import React, { useState } from "react";
import axios from "axios";

const Generator = () => {
  const [topic, setTopic] = useState("");
  const [pages, setPages] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/generate-book",
        {
          topic,
          pages,
        },
        {
          responseType: "blob", // IMPORTANT for PDF download
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `${topic}-coloring-book.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error(error);
      alert("Failed to generate book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>AI Coloring Book Generator</h1>

      <input
        type="text"
        placeholder="Enter topic (e.g. dinosaurs)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
      />

      <br />

      <input
        type="number"
        min="10"
        max="50"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        style={{ padding: "10px", width: "100px", marginBottom: "20px" }}
      />

      <br />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Coloring Book"}
      </button>
    </div>
  );
};

export default Generator;