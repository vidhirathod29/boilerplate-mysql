const logger = require('../logger/logger');

class GeneralResponse {
  constructor(message, data = '', statusCode = '', status) {
    logger.info(message);
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.status = status;
  }
}

module.exports = {
  GeneralResponse,
};
