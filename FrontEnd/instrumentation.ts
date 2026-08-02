export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { logger } = await import('./lib/logger');

  process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', { scope: 'instrumentation', source: 'server' }, reason);
  });

  process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', { scope: 'instrumentation', source: 'server' }, err);
  });
}
