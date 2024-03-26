const connection = require('../middleware/db');
const logger = require('../logger/logger');
const { GeneralError } = require('../utils/error');
const StatusCodes = require('../utils/Http-Status');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');

const addContact = async (req, res, next) => {
  try {
    const { name, email, message, number, date } = req.body;

    const sql = `INSERT INTO contact (name, email, message, number, date) VALUES ('${name}','${email}','${message}','${number}','${date}')`;
    connection.query(sql, (error, result) => {
      if (error) {
        next(
          new GeneralError(
            Messages.SOMETHING_WENT_WRONG,
            StatusCodes.BAD_REQUEST,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
      if (result) {
        next(
          new GeneralError(
            `Contact ${Messages.ADD_SUCCESS}`,
            StatusCodes.OK,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
      }
    });
  } catch (error) {
    next(
      new GeneralError(
        Messages.SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const viewContact = async (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM contact WHERE id=${id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      next(
        new GeneralError(
          Messages.SOMETHING_WENT_WRONG,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
    if (result) {
      next(
        new GeneralError(
          Messages.GET_SUCCESS,
          StatusCodes.OK,
          result,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    } else {
      next(
        new GeneralError(
          Messages.USER_NOT_FOUND,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  });
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM contact WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        next(
          new GeneralError(
            Messages.SOMETHING_WENT_WRONG,
            StatusCodes.BAD_REQUEST,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
      if (result.length > 0) {
        const setClause = Object.entries(req.body)
          .map(([key, value]) => `${key}='${value}'`)
          .join(', ');

        const sql = `UPDATE contact SET ${setClause}  WHERE id=${id}`;
        connection.query(sql, (err, result) => {
          if (err) {
            next(
              new GeneralError(
                Messages.SOMETHING_WENT_WRONG,
                StatusCodes.BAD_REQUEST,
                undefined,
                RESPONSE_STATUS.ERROR,
              ),
            );
          }
          if (result) {
            next(
              new GeneralError(
                `Contact ${Messages.UPDATED_SUCCESS}`,
                StatusCodes.OK,
                undefined,
                RESPONSE_STATUS.SUCCESS,
              ),
            );
          }
        });
      } else {
        next(
          new GeneralError(
            Messages.USER_NOT_FOUND,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    });
  } catch (error) {
    logger.error('Error:', error);
    next(
      new GeneralError(
        Messages.SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM contact WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        next(
          new GeneralError(
            Messages.SOMETHING_WENT_WRONG,
            StatusCodes.BAD_REQUEST,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
      if (result.length > 0) {
        const sql = `DELETE FROM contact WHERE id =${id}`;
        connection.query(sql, (err, result) => {
          if (err) {
            next(
              new GeneralError(
                Messages.SOMETHING_WENT_WRONG,
                StatusCodes.BAD_REQUEST,
                undefined,
                RESPONSE_STATUS.ERROR,
              ),
            );
          }
          if (result) {
            next(
              new GeneralError(
                Messages.DELETE_SUCCESS,
                StatusCodes.OK,
                undefined,
                RESPONSE_STATUS.SUCCESS,
              ),
            );
          }
        });
      } else {
        next(
          new GeneralError(
            Messages.USER_NOT_FOUND,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    });
  } catch (error) {
    logger.error('Error:', error);
    next(
      new GeneralError(
        Messages.SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const deleteMultipleContact = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      next(
        new GeneralError(
          Messages.SOMETHING_WENT_WRONG,
          StatusCodes.BAD_REQUEST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
    const sql = `DELETE FROM contact WHERE id IN(${ids.join(',')})`;

    connection.query(sql, (err, result) => {
      if (err) {
        next(
          new GeneralError(
            Messages.SOMETHING_WENT_WRONG,
            StatusCodes.BAD_REQUEST,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
        return;
      }
      if (result.affectedRows > 0) {
        next(
          new GeneralError(
            Messages.DELETE_SUCCESS,
            StatusCodes.OK,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
      } else {
        next(
          new GeneralError(
            Messages.USER_NOT_FOUND,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    });
  } catch (error) {
    logger.error('Error:', error);
    next(
      new GeneralError(
        Messages.SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = {
  addContact,
  viewContact,
  updateContact,
  deleteContact,
  deleteMultipleContact,
};
