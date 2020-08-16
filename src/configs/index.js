const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Your favorite port
   */
  port: process.env.PORT || 8000,

  /**
   * Databse Configrution
   */

  DB_CONFIG: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true,
    connectionLimit: 5000
  },

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
    myCustomLevel: {
      levels: {
        trace: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        help: 7,
        warn: 8,
        error: 9
      },
      colors: {
        trace: "magenta",
        input: "grey",
        verbose: "cyan",
        prompt: "grey",
        debug: "blue",
        info: "green",
        data: "grey",
        help: "cyan",
        warn: "yellow",
        error: "red"
      }
    }
  },
  /**
   * API configs
   */
  api: {
    prefix: "/api/v1"
  }
};
