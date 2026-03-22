import OpenAI from 'openai';

// Lazy-initialize the OpenAI client so the module can be imported
// without crashing at build time when the env var isn't set.
let _client = null;

function getClient() {
  if (!_client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set.');
    }
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

/**
 * Build the prompt for a single coloring page.
 * @param {string} topic  - User-supplied topic (e.g. "dinosaurs")
 * @param {number} pageNum - 1-based page index
 * @param {number} total   - Total pages in the book
 * @returns {string}
 */
export function buildPagePrompt(topic, pageNum, total) {
  const styles = [
    'intricate details',
    'simple bold shapes',
    'flowing organic lines',
    'geometric patterns',
    'whimsical cartoon style',
  ];
  // Rotate style hints so pages feel distinct but share the same coloring-page DNA
  const styleTip = styles[(pageNum - 1) % styles.length];

  return (
    `black and white coloring book page, thick bold outlines, no shading, no gray fills, ` +
    `clean line art, white background, ${topic}, ${styleTip}, ` +
    `kid-friendly illustration, simple distinct shapes, ` +
    `page ${pageNum} of ${total}, same consistent style throughout, ` +
    `printable coloring page, high contrast, no text, no watermark`
  );
}

/**
 * Generate a single coloring-book image.
 * Returns the image as a Buffer (PNG binary).
 *
 * @param {string} prompt
 * @returns {Promise<Buffer>}
 */
export async function generateColoringPageImage(prompt) {
  const client = getClient();

  const response = await client.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
    quality: 'standard',
    style: 'natural',
  });

  const b64 = response.data[0].b64_json;
  if (!b64) {
    throw new Error('OpenAI returned an empty image response.');
  }
  return Buffer.from(b64, 'base64');
}

/**
 * Generate all pages for the book with concurrency control.
 * To avoid hammering the OpenAI rate limits we process pages in small
 * batches (CONCURRENCY pages at a time).
 *
 * @param {string} topic
 * @param {number} pageCount
 * @param {function(number):void} [onProgress]  - called with the number of pages done so far
 * @returns {Promise<Buffer[]>}  Array of PNG buffers, one per page
 */
export async function generateAllPages(topic, pageCount, onProgress) {
  const CONCURRENCY = 2; // DALL-E 3 rate limit is ~5 images/min on Tier 1
  const buffers = new Array(pageCount);
  let completed = 0;

  for (let i = 0; i < pageCount; i += CONCURRENCY) {
    const batch = [];
    for (let j = i; j < Math.min(i + CONCURRENCY, pageCount); j++) {
      const pageNum = j + 1;
      const prompt = buildPagePrompt(topic, pageNum, pageCount);
      batch.push(
        generateColoringPageImage(prompt).then((buf) => {
          buffers[j] = buf;
          completed++;
          if (typeof onProgress === 'function') onProgress(completed);
        })
      );
    }
    // Wait for this batch before starting the next
    await Promise.all(batch);
  }

  return buffers;
}
