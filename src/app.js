const express = require("express");
const app = express();
const { mysqlLoader } = require("./loaders");

const { port } = require("./configs");

const { expressLoader, logger } = require("./loaders");

mysqlLoader();

expressLoader(app);

app.listen(port, err => {
  if (err) {
    logger.error(err);
    process.exit(1);
    return;
  }
  logger.info(`
      ########################################
      🛡️ Server listening on port: ${port} 🛡️ 
      ########################################
    `);
});
