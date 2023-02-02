const logger = require('./resources/logging.js')
const server = require('./infra_services/web-server.js');

async function startup() {
  logger.logger.info("Starting application");
  try {
    logger.logger.info("Initializing server module");
    await server.initialize();
  } catch (err) {
    logger.logger.error(err);
    process.exit(1);
  }
}

startup();

