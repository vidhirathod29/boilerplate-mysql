const connection = require('../middleware/db');
const logger = require('../logger/logger');
const { GeneralError } = require('../utils/error');
const StatusCodes = require('../utils/Http-Status');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');

const addPortfolio = async (req, res, next) => {
  try {
    const {
      projectCategory,
      projectName,
      projectTitle,
      projectDate,
      description,
      categoryId,
    } = req.body;

    if (req.files) {
      const images = req.files.map((images) => images.filename).join(',');
      connection.query(
        `INSERT INTO portfolio
            (categoryId, projectCategory, projectName, projectTitle, projectDate, description,images) 
            VALUES ('${categoryId}','${projectCategory}','${projectName}','${projectTitle}','${projectDate}','${description}','${images}')`,
        (err, results) => {
          if (err) {
            next(
              new GeneralError(
                Messages.SOMETHING_WENT_WRONG,
                StatusCodes.NOT_FOUND,
                undefined,
                RESPONSE_STATUS.ERROR,
              ),
            );
          }

          if (results) {
            next(
              new GeneralError(
                `Portfolio ${Messages.ADD_SUCCESS}`,
                StatusCodes.OK,
                undefined,
                RESPONSE_STATUS.SUCCESS,
              ),
            );
          }
        },
      );
    }
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

const viewPortfolio = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT 
        portfolio.*, 
        category.id AS categoryId,
        category.categoryName,
        category.description AS categoryDescription,
        JSON_OBJECT(
            'categoryId', category.id,
            'categoryName', category.categoryName,
            'description', category.description
        ) AS categoryDetails
      FROM 
        portfolio 
      INNER JOIN 
        category 
      ON 
        portfolio.categoryId = category.id
      WHERE 
        portfolio.id = ${id};
    `;

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
      if (result.length === 0) {
        next(
          new GeneralError(
            `Portfolio ${Messages.NOT_FOUND}`,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      } else {
        next(
          new GeneralError(
            Messages.GET_SUCCESS,
            StatusCodes.OK,
            result[0],
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

const updatePortfolio = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM portfolio WHERE id=${id}`;
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

        const sql = `UPDATE portfolio SET ${setClause}  WHERE id=${id}`;
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
                `Portfolio ${Messages.UPDATED_SUCCESS}`,
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

const deletePortfolio = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM portfolio WHERE id=${id}`;
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
        const sql = `DELETE FROM portfolio WHERE id =${id}`;
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
            Messages.NOT_FOUND,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    });
  } catch (error) {
    logger.error('Error', error);
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

const deleteMultiplePortfolio = async (req, res, next) => {
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
    const sql = `DELETE FROM portfolio WHERE id IN(${ids.join(',')})`;

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
            Messages.NOT_FOUND,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
    });
  } catch (error) {
    logger.error('Error', error);
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
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
  deleteMultiplePortfolio,
  viewPortfolio,
};
