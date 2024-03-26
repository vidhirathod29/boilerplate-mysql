const StatusCodes = require('../utils/Http-Status');
const bcrypt = require('bcrypt');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { RESPONSE_STATUS } = require('../utils/enum');
const logger = require('../logger/logger');
const { GeneralError } = require('../utils/error');
const connection = require('../middleware/db');
const { sendOTP } = require('../middleware/mail');
const moment = require('moment');
const { generateToken } = require('../middleware/authenticate');
const registration = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      hobby,
      city,
      mobile,
      email,
      password,
    } = req.body;
    const saltRounds = 10;
    const encrypt = await bcrypt.hash(password, saltRounds);
    if (!req.file) {
      next(
        new GeneralError(
          Messages.IMAGE_NOT_FOUND,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }

    const image = req.file.filename;
    const hashedPassword = encrypt;

    connection.query(
      'SELECT * FROM `user` WHERE email = ?',
      [email],
      async function (err, result) {
        if (err) {
          next(
            new GeneralError(
              Messages.SOMETHING_WENT_WRONG,
              StatusCodes.SOMETHING_WENT_WRONG,
              undefined,
              RESPONSE_STATUS.ERROR,
            ),
          );
        }
        if (result.length > 0) {
          next(
            new GeneralError(
              `User ${Messages.ALREADY_EXIST}`,
              StatusCodes.ALREADY_EXIST,
              undefined,
              RESPONSE_STATUS.ERROR,
            ),
          );
        } else {
          const insert = `INSERT INTO user(firstName,lastName,gender,hobby,city,mobile,email,password,image) VALUES('${firstName}','${lastName}'
          ,'${gender}','${hobby}','${city}','${mobile}','${email}','${hashedPassword}','${image}')`;

          connection.query(insert, (err, result) => {
            if (err) {
              next(
                new GeneralError(
                  Messages.SERVER_ERROR,
                  StatusCodes.INTERNAL_SERVER_ERROR,
                  undefined,
                  RESPONSE_STATUS.ERROR,
                ),
              );
            } else {
              next(
                new GeneralResponse(
                  Messages.REGISTER_SUCCESS,
                  undefined,
                  StatusCodes.CREATED,
                  RESPONSE_STATUS.SUCCESS,
                ),
              );
            }
          });
        }
      },
    );
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    connection.query(
      'SELECT * FROM user WHERE email=?',
      [email],
      async function (error, result) {
        if (error) {
          console.log('error-----', error);
          next(
            new GeneralError(
              `${Messages.SOMETHING_WENT_WRONG} while login`,
              StatusCodes.SOMETHING_WENT_WRONG,
              undefined,
              RESPONSE_STATUS.ERROR,
            ),
          );
        } else {
          if (result.length > 0) {
            const passwordCompare = await bcrypt.compare(
              password,
              result[0].password,
            );

            if (passwordCompare) {
              let token = generateToken({ email, password });
              next(
                new GeneralError(
                  Messages.LOGIN_SUCCESS,
                  StatusCodes.OK,
                  token,
                  RESPONSE_STATUS.SUCCESS,
                ),
              );
            } else {
              next(
                new GeneralError(
                  Messages.INCORRECT_CREDENTIAL,
                  StatusCodes.UNAUTHORIZED,
                  undefined,
                  RESPONSE_STATUS.ERROR,
                ),
              );
            }
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
        }
      },
    );
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

const viewProfile = async (req, res, next) => {
  try {
    const { email } = req.user;
    connection.query(
      'SELECT id,firstName,lastName,gender,hobby,city,mobile,email,password,image FROM user WHERE email=?',
      [email],
      async (error, result) => {
        if (error) {
          next(
            new GeneralError(
              Messages.SOMETHING_WENT_WRONG,
              StatusCodes.NOT_FOUND,
              undefined,
              RESPONSE_STATUS.ERROR,
            ),
          );
        }
        if (result) {
          const userProfile = result[0];
          next(
            new GeneralError(
              Messages.GET_SUCCESS,
              StatusCodes.OK,
              userProfile,
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
      },
    );
  } catch (error) {
    // logger.error('Error:', error);
    // console.log('original error',error.original());
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

const updateUserData = async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const setClause = Object.entries(req.body)
      .map(([key, value]) => `${key}='${value}'`)
      .join(', ');

    sql = `UPDATE user SET ${setClause} WHERE email='${userEmail}'`;

    connection.query(sql, [updateData, userEmail], (error, result) => {
      if (error) {
        console.log(' Error:', error);
        next(
          new GeneralError(
            `User ${Messages.NOT_FOUND}`,
            StatusCodes.NOT_FOUND,
            undefined,
            RESPONSE_STATUS.ERROR,
          ),
        );
      } else {
        console.log(' Result:', result);
        if (result.affectedRows > 0) {
          next(
            new GeneralError(
              Messages.UPDATED_SUCCESS,
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

const resetPassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    connection.query(
      'SELECT password FROM user WHERE email=?',
      [email],
      async (error, result) => {
        if (result.length > 0) {
          const passwordCompare = await bcrypt.compare(
            oldPassword,
            result[0].password,
          );
          if (!passwordCompare) {
            next(
              new GeneralError(
                Messages.INVALID_OLD_PASS,
                StatusCodes.UNAUTHORIZED,
                undefined,
                RESPONSE_STATUS.ERROR,
              ),
            );
          } else {
            const saltRounds = 10;
            const newHashPassword = await bcrypt.hash(newPassword, saltRounds);
            connection.query(
              'UPDATE user SET password=?',
              [newHashPassword],
              async (error, result) => {
                if (result) {
                  next(
                    new GeneralError(
                      Messages.RESET_PASS_SUCCESS,
                      StatusCodes.OK,
                      undefined,
                      RESPONSE_STATUS.SUCCESS,
                    ),
                  );
                }
                if (error) {
                  next(
                    new GeneralError(
                      Messages.USER_NOT_FOUND,
                      StatusCodes.NOT_FOUND,
                      undefined,
                      RESPONSE_STATUS.ERROR,
                    ),
                  );
                }
              },
            );
          }
        }
      },
    );
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

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const generateOtp = Math.floor(100000 + Math.random() * 900000);
    const expireTime = moment().add(5, 'minutes').format();

    connection.query(
      'SELECT * FROM user WHERE email=?',
      [email],
      async function (error, result) {
        if (result.length > 0) {
          sendOTP(email, generateOtp);
          const sql = `INSERT INTO otp(otp,email,expireTime) VALUES ('${generateOtp}','${email}','${expireTime}')`;
          connection.query(sql, (error, result) => {
            if (error) {
              next(
                new GeneralError(
                  Messages.SERVER_ERROR,
                  StatusCodes.INTERNAL_SERVER_ERROR,
                  undefined,
                  RESPONSE_STATUS.ERROR,
                ),
              );
            } else {
              next(
                new GeneralError(
                  Messages.OTP_SENT,
                  StatusCodes.OK,
                  undefined,
                  RESPONSE_STATUS.SUCCESS,
                ),
              );
            }
          });
        }
      },
    );
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

const verifyOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    connection.query(
      'SELECT * FROM otp WHERE email=? AND otp=?',
      [email, otp],
      async function (error, result) {
        if (result.length > 0) {
          connection.query(
            'DELETE FROM otp WHERE email=? AND otp=?',
            [email, otp],
            function (error, result) {
              if (error) {
                next(
                  new GeneralError(
                    Messages.SERVER_ERROR,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    undefined,
                    RESPONSE_STATUS.ERROR,
                  ),
                );
              } else {
                next(
                  new GeneralError(
                    Messages.OTP_VERIFY,
                    StatusCodes.OK,
                    undefined,
                    RESPONSE_STATUS.SUCCESS,
                  ),
                );
              }
            },
          );
        } else {
          next(
            new GeneralError(
              Messages.OTP_NOT_MATCH,
              StatusCodes.BAD_REQUEST,
              undefined,
              RESPONSE_STATUS.ERROR,
            ),
          );
        }
      },
    );
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

const updatePassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const saltRounds = 10;
    const newHashPassword = await bcrypt.hash(newPassword, saltRounds);

    connection.query(
      'SELECT * FROM user WHERE email=?',
      [email],
      function (error, result) {
        if (error) {
          next(
            new GeneralError(
              Messages.SERVER_ERROR,
              StatusCodes.INTERNAL_SERVER_ERROR,
              undefined,
              RESPONSE_STATUS.ERROR,
            ),
          );
        } else if (result.length === 0) {
          next(
            new GeneralError(
              Messages.UPDATED_SUCCESS,
              StatusCodes.UNAUTHORIZED,
              undefined,
              RESPONSE_STATUS.ERROR,
            ),
          );
        } else {
          connection.query(
            'UPDATE user SET password=? WHERE email=?',
            [newHashPassword, email],
            function (error, result) {
              if (error) {
                next(
                  new GeneralError(
                    Messages.SERVER_ERROR,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    undefined,
                    RESPONSE_STATUS.ERROR,
                  ),
                );
              } else {
                next(
                  new GeneralError(
                    Messages.UPDATED_PASSWORD,
                    StatusCodes.OK,
                    undefined,
                    RESPONSE_STATUS.SUCCESS,
                  ),
                );
              }
            },
          );
        }
      },
    );
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
  registration,
  login,
  viewProfile,
  updateUserData,
  resetPassword,
  verifyEmail,
  verifyOtp,
  updatePassword,
};
