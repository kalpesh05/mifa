/**
 * API authentication middleware
 */
const { getOneWhere } = require("../../services/tokenService");

const { UNAUTHORIZED } = require("../constants/errorMessages");

const apiAuth = async (req, res, next) => {
  const [code, message] = UNAUTHORIZED.split("::");
  const apiErrorResponse = {
    error: true,
    message: message || "",
    data: {}
  };

  let { authorization: token } = req.headers;
  // console.log(token);
  if (token && token.startsWith("bearer ")) {
    token = token.slice(7, token.length);

    const tokenFound = await getOneWhere({ token });
    console.log(">>>>", tokenFound);
    if (tokenFound) {
      return next();
    } else {
      res.status(code).send(apiErrorResponse);
    }
  } else {
    res.status(code).send(apiErrorResponse);
  }
};

module.exports = apiAuth;
