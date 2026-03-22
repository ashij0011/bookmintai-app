import { NextResponse } from 'next/server';
import { validateGenerateRequest, sanitizeTopic } from '../../../lib/validation';
import { generateAllPages } from '../../../lib/openai';
import { buildColoringBookPDF } from '../../../lib/pdf';
import { getRateLimiter, getClientIp } from '../../../lib/rateLimit';
import { logger } from '../../../lib/logger';

// Increase the Next.js route handler timeout for long-running generation.
export const maxDuration = 300; // 5 minutes (Vercel / Hostinger max)
export const dynamic = 'force-dynamic';

// Rate limiter: max 3 books per IP per 10 minutes
const limiter = getRateLimiter({ windowMs: 10 * 60 * 1000, maxRequests: 3 });

/**
 * POST /api/generate-book
 *
 * Body: { topic: string, pageCount: number }
 * Returns: application/pdf binary stream
 */
export async function POST(request) {
  const ip = getClientIp(request);

  // ── 1. Rate limit ────────────────────────────────────────────────────────
  const rateCheck = limiter.check(ip);
  if (!rateCheck.allowed) {
    logger.warn('Rate limit exceeded', { ip });
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a few minutes and try again.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)) } }
    );
  }

  // ── 2. Parse body ────────────────────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse('Invalid JSON in request body.', 400);
  }

  // ── 3. Validate ──────────────────────────────────────────────────────────
  const { valid, errors } = validateGenerateRequest(body);
  if (!valid) {
    return NextResponse.json({ success: false, errors }, { status: 422 });
  }

  const topic = sanitizeTopic(body.topic);
  const pageCount = Number(body.pageCount);

  // ── 4. Check API key ─────────────────────────────────────────────────────
  if (!process.env.OPENAI_API_KEY) {
    logger.error('OPENAI_API_KEY is not configured');
    return errorResponse('Service is not properly configured. Please contact support.', 500);
  }

  // ── 5. Generate images ───────────────────────────────────────────────────
  let imageBuffers;
  const startTime = Date.now();

  try {
    logger.info('Starting book generation', { ip, topic, pageCount });
    imageBuffers = await generateAllPages(topic, pageCount, (done) => {
      logger.debug('Generation progress', { done, total: pageCount });
    });
    logger.info('Image generation complete', { ip, topic, durationMs: Date.now() - startTime });
  } catch (err) {
    logger.error('Image generation failed', { ip, topic, error: err?.message, status: err?.status });

    const isRateLimit = err?.status === 429 || (err?.message || '').toLowerCase().includes('rate limit');
    const isInvalidKey = err?.status === 401 || (err?.message || '').toLowerCase().includes('invalid api key');
    const isContentPolicy = err?.status === 400 && (err?.message || '').toLowerCase().includes('content policy');

    if (isRateLimit)    return errorResponse('Our AI is busy right now. Please wait a minute and try again.', 429);
    if (isInvalidKey)   return errorResponse('API key configuration error. Please contact support.', 500);
    if (isContentPolicy) return errorResponse('Your topic was flagged by the content filter. Please try a different topic.', 422);

    return errorResponse('Failed to generate coloring pages. Please try again.', 502);
  }

  // Guard: ensure we have all buffers
  const missing = imageBuffers.filter((b) => !b).length;
  if (missing > 0) {
    logger.error('Partial generation failure', { ip, topic, missing, total: pageCount });
    return errorResponse(`${missing} page(s) failed to generate. Please try again.`, 502);
  }

  // ── 6. Build PDF ─────────────────────────────────────────────────────────
  let pdfBytes;
  try {
    logger.info('Building PDF', { ip, topic, pageCount });
    pdfBytes = await buildColoringBookPDF(imageBuffers, topic);
    logger.info('PDF complete', { ip, topic, sizeBytes: pdfBytes.byteLength, totalMs: Date.now() - startTime });
  } catch (err) {
    logger.error('PDF generation failed', { ip, topic, error: err?.message });
    return errorResponse('Failed to assemble the PDF. Please try again.', 500);
  }

  // ── 7. Return PDF ─────────────────────────────────────────────────────────
  const filename = `bookmint-${topic.replace(/\s+/g, '-').toLowerCase()}-coloring-book.pdf`;

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(pdfBytes.byteLength),
      'Cache-Control': 'no-store',
      'X-Generation-Time': String(Date.now() - startTime),
    },
  });
}

// ─── GET — health check ──────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    service: 'BookMint AI',
    endpoint: 'POST /api/generate-book',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

// ─── Helper ──────────────────────────────────────────────────────────────────
function errorResponse(message, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}
