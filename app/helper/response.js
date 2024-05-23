const { GeneralResponse } = require('../utils/response');
const { StatusCodes } = require('http-status-codes');

const handleResponse = (response, req, res, next) => {
  console.log('response',response);
  if (response instanceof GeneralResponse) {

    return res.status(StatusCodes.OK).json({
      message: response.message,
      data: response.data,
      code: response.statusCode,
      status: response.status,
    });
  }
  next(response);
};

module.exports = handleResponse;
