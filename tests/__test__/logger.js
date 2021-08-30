const pino = require("pino");

var pinoInstance = pino();

var logger = {
  logInfo: pinoInstance.info.bind(pinoInstance),
  logError: pinoInstance.error.bind(pinoInstance),
};

module.exports = logger;
