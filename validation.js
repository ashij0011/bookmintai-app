/**
 * Validate the generate-book request body.
 *
 * @param {{ topic: any, pageCount: any }} body
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateGenerateRequest(body) {
  const errors = [];

  // ── Topic ────────────────────────────────────────────────────────────────
  if (!body.topic || typeof body.topic !== 'string') {
    errors.push('Topic is required and must be a string.');
  } else {
    const topic = body.topic.trim();
    if (topic.length === 0) {
      errors.push('Topic cannot be empty.');
    } else if (topic.length < 2) {
      errors.push('Topic must be at least 2 characters long.');
    } else if (topic.length > 100) {
      errors.push('Topic must be 100 characters or fewer.');
    } else if (!/^[a-zA-Z0-9 ,.'-]+$/.test(topic)) {
      errors.push('Topic contains invalid characters. Use letters, numbers, spaces and basic punctuation.');
    }
  }

  // ── Page count ───────────────────────────────────────────────────────────
  const rawPages = body.pageCount;
  if (rawPages === undefined || rawPages === null || rawPages === '') {
    errors.push('Page count is required.');
  } else {
    const n = Number(rawPages);
    if (!Number.isInteger(n)) {
      errors.push('Page count must be a whole number.');
    } else if (n < 10) {
      errors.push('Page count must be at least 10.');
    } else if (n > 50) {
      errors.push('Page count cannot exceed 50.');
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sanitize a topic string.
 * @param {string} topic
 * @returns {string}
 */
export function sanitizeTopic(topic) {
  return topic.trim().replace(/\s+/g, ' ');
}
