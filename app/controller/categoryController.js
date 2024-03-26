const connection = require('../middleware/db');
const logger = require('../logger/logger');
const { GeneralError } = require('../utils/error');
const StatusCodes = require('../utils/Http-Status');
const { Messages } = require('../utils/messages');
const { GeneralResponse } = require('../utils/response');
const { RESPONSE_STATUS } = require('../utils/enum');

const addCategory = (req, res, next) => {
  try {
    const { categoryName, description } = req.body;
    const sql = 'SELECT * FROM category WHERE categoryName=?';
    connection.query(sql, [categoryName], (err, result) => {
      if (err) {
        next(
          new GeneralError(
            Messages.USER_NOT_FOUND,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
      if (result.length > 0) {
        next(
          new GeneralError(
            `Category ${Messages.ALREADY_EXIST}`,
            StatusCodes.ALREADY_EXIST,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      } else {
        const sql = `INSERT INTO category(categoryName,description)VALUES ('${categoryName}','${description}')`;
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
              new GeneralResponse(
                `Category ${Messages.ADD_SUCCESS}`,
                undefined,
                StatusCodes.CREATED,
                RESPONSE_STATUS.SUCCESS,
              ),
            );
          }
        });
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

const viewCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM category WHERE id=${id}`;

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

const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM category WHERE id=${id}`;

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

        const sql = `UPDATE category SET ${setClause}  WHERE id=${id}`;
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
                Messages.UPDATED_SUCCESS,
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

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM category WHERE id=${id}`;
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
        const sql = `DELETE FROM category WHERE id =${id}`;
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

const deleteMultipleCategory = async (req, res, next) => {
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
    const sql = `DELETE FROM category WHERE id IN(${ids.join(',')})`;

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
  addCategory,
  viewCategory,
  updateCategory,
  deleteCategory,
  deleteMultipleCategory,
};
