/*
Simple logger wrapper to centralize logging and allow future enhancements.
Avoid using console directly elsewhere.
*/

const LEVELS = ['debug', 'info', 'warn', 'error'];

function log(level, ...args) {
  const ts = new Date().toISOString();
  // eslint-disable-next-line no-console
  console[level](`[${ts}] [${level.toUpperCase()}]`, ...args);
}

const logger = {
  debug: (...args) => log('debug', ...args),
  info: (...args) => log('info', ...args),
  warn: (...args) => log('warn', ...args),
  error: (...args) => log('error', ...args)
};

module.exports = {
  logger,
  LEVELS
};
