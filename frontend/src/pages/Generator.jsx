import { useState } from "react";
import axios from "axios";

export default function Generator() {
  const [topic, setTopic] = useState("");
  const [pages, setPages] = useState(10);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/generate-book",
        { topic, pages },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${topic}.pdf`;
      a.click();

    } catch (err) {
      alert("Error generating book");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>AI Coloring Book Generator</h1>

      <input
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        min="10"
        max="50"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
      />

      <br /><br />

      <button onClick={generate}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}