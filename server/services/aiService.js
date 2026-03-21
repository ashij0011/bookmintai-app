const axios = require("axios");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateImages(topic, pages) {
  const prompts = Array.from({ length: pages }, (_, i) => {
    return `black and white coloring book page, thick bold outlines, no shading, clean line art, kid-friendly, simple shapes, white background, ${topic}, same style, page ${i + 1}`;
  });

  const requests = prompts.map((prompt) =>
    axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        size: "1024x1024"
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    )
  );

  const responses = await Promise.all(requests);

  return responses.map((res) => res.data.data[0].url);
}

module.exports = { generateImages };