/* eslint-disable no-unused-vars */

/**
 * Not Found Error.
 */
class Not_found_error extends Error {
  /**
     * Construcutor
     * @param {string} message The error message.
     */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 404;
  }
};

/**
 * Wrong Credential Error
 */
class Credential_error extends Error {
  /**
     * Constructor
     * @param {string} message The error message.
     */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 401;
  }
}

/**
 * Duplication Error
 */
class Duplication_error extends Error {
  /**
     * Constructor
     * @param {string} message The error message.
     */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 409;
  }
}

/**
 * Access Denial Error
 */
class Access_denial_error extends Error {
  /**
     * Constructor
     * @param {string} message The error message.
     */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 403;
  }
}

/**
 * Database Operation Error
 */
class Database_operation_error extends Error {
  /**
   * Constructor.
   * @param {string} message The error message.
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.code = 500;
  }
}

/**
 * Limit Exceeded Error.
 */
class Limit_exceeded_error extends Error {
  /**
   * Constructor.
   * @param {string} message The error message.
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.code = 403;
  }
}

/**
 * Authentication Error.
 */
class Authentication_error extends Error {
  /**
   * @constructor
   * @param {string} message The error message.
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.code = 400;
    this.message = message;
  }
}


module.exports = {
  Not_found_error,
  Credential_error,
  Access_denial_error,
  Duplication_error,
  Database_operation_error,
  Limit_exceeded_error,
  Authentication_error,
};
