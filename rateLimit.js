/**
 * Simple in-memory rate limiter.
 * Suitable for single-instance deployments (Hostinger Node.js Apps).
 *
 * For multi-instance / serverless deployments, replace the store with
 * Redis (e.g. Upstash) so limits are shared across instances.
 *
 * Usage:
 *   const limiter = getRateLimiter({ windowMs: 60_000, maxRequests: 5 });
 *   const result  = limiter.check(identifier);
 *   if (!result.allowed) { return errorResponse('Rate limit exceeded', 429); }
 */

const store = new Map(); // identifier → { count, resetAt }

/**
 * @param {{ windowMs?: number, maxRequests?: number }} opts
 * @returns {{ check: (id: string) => { allowed: boolean, remaining: number, resetAt: number } }}
 */
export function getRateLimiter({ windowMs = 60_000, maxRequests = 10 } = {}) {
  return {
    check(identifier) {
      const now = Date.now();
      const entry = store.get(identifier);

      if (!entry || now > entry.resetAt) {
        // New window
        store.set(identifier, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
      }

      if (entry.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: entry.resetAt };
      }

      entry.count += 1;
      return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
    },
  };
}

/**
 * Get the client IP from a Next.js request.
 * Works with Hostinger's reverse proxy (X-Forwarded-For header).
 *
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

// Clean up expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now > val.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);
