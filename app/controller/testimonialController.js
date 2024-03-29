const connection = require('../middleware/db');
const logger = require('../logger/logger');
const { GeneralError } = require('../utils/error');
const StatusCodes = require('../utils/Http-Status');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');

const addTestimonial = async (req, res, next) => {
  const { name, designation, description } = req.body;

  const selectSql = `SELECT * FROM testimonial WHERE name = ?`;
  connection.query(selectSql, [name], (err, existingTestimonial) => {
    if (err) {
      return next(
        new GeneralError(
          Messages.SERVER_ERROR,
          StatusCodes.INTERNAL_SERVER_ERROR,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
    if (existingTestimonial.length > 0) {
      return next(
        new GeneralError(
          `Testimonial ${Messages.ALREADY_EXIST}`,
          StatusCodes.ALREADY_EXIST,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
    const image = req.file.filename;
    const sql = `INSERT INTO testimonial (name, designation, description, image) VALUES ('${name}','${designation}','${description}','${image}')`;
    connection.query(sql, (error, result) => {
      if (error) {
        next(
          new GeneralError(
            Messages.SOMETHING_WENT_WRONG,
            StatusCodes.SOMETHING_WENT_WRONG,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      }
      if (result) {
        next(
          new GeneralError(
            `Testimonial ${Messages.ADD_SUCCESS}`,
            StatusCodes.OK,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
      }
    });
  });
};

const viewTestimonial = async (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM testimonial WHERE id=${id}`;
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

const updateTestimonial = async (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM testimonial WHERE id=${id}`;
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

      const sql = `UPDATE testimonial SET ${setClause}  WHERE id=${id}`;
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
              `Testimonial ${Messages.UPDATED_SUCCESS}`,
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
};

const deleteTestimonial = async (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM testimonial WHERE id=${id}`;
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
      const sql = `DELETE FROM testimonial WHERE id =${id}`;
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
};

const deleteMultipleTestimonial = async (req, res, next) => {
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
  const sql = `DELETE FROM testimonial WHERE id IN(${ids.join(',')})`;

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
};

module.exports = {
  addTestimonial,
  viewTestimonial,
  updateTestimonial,
  deleteTestimonial,
  deleteMultipleTestimonial,
};
