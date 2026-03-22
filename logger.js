/**
 * Lightweight structured logger.
 * In production, replace with your preferred logging service
 * (e.g. Axiom, Datadog, Pino) by swapping the transport below.
 */

const isDev = process.env.NODE_ENV !== 'production';

function formatMsg(level, message, meta) {
  const ts = new Date().toISOString();
  if (isDev) {
    const metaStr = meta ? ' ' + JSON.stringify(meta) : '';
    return `[${ts}] [BookMint] [${level.toUpperCase()}] ${message}${metaStr}`;
  }
  // Production: structured JSON for log aggregators
  return JSON.stringify({ ts, service: 'bookmintai', level, message, ...meta });
}

export const logger = {
  info(message, meta)  { console.log(formatMsg('info',  message, meta)); },
  warn(message, meta)  { console.warn(formatMsg('warn',  message, meta)); },
  error(message, meta) { console.error(formatMsg('error', message, meta)); },
  debug(message, meta) { if (isDev) console.debug(formatMsg('debug', message, meta)); },
};
