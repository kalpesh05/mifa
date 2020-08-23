/**
 * Common function
 */
const crypto = require("crypto");
const moment = require("moment-timezone");

exports.cryptoPassword = function(userSalt, password) {
  let salt = `${Math.round(new Date().valueOf() * Math.random())}`;

  if (userSalt) {
    salt = userSalt;
  }

  const newPassword = crypto
    .createHmac("sha1", salt)
    .update(password)
    .digest("hex");

  return {
    salt,
    password: newPassword
  };
};

exports.randomString = function(length) {
  const token = crypto.randomBytes(length).toString("hex");

  return token;
};

exports.structuredWhere = function(where) {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;

  return filterdWhere;
};

exports.classCode = function() {
  return Math.floor(10000 + Math.random() * 90000);
};

exports.mongoId = function(model) {
  let token = crypto.randomBytes(12).toString("hex");

  switch (model) {
    case "user":
      token = `usr_${token}`;
      break;

    case "event":
      token = `evn_${token}`;
      break;

    default:
      token = token;
      break;
  }

  return token;
};

exports.addTime = function(time, type) {
  const date = new Date(Date.parse(moment().add(time, type)));

  return date;
};
