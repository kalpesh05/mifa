const { userModel, tokenModel } = require("../models");
const tokenService = require("./tokenService");
const {
  EMAIL_ADDRESS_ALREADY_REGISTERED,
  EXTRA_FIELD_NOT_FOUND
} = require("../api/constants/errorMessages");
// const bcrypt = require("bcrypt");

// const request = require("request-promise");
const jwt = require("jsonwebtoken");
const {
  cryptoPassword,
  mongoId,
  generateKeyPair,
  classCode
} = require("../helpers/commonFunction");
const {
  forgotPasswordEmailSend,
  emailVerificationEmailSend
} = require("../helpers/mailSendUsingTemplateId");

class userService {
  async getAllUsersWhere(where = {}) {
    return userModel.find(where);
  }

  async getOne(id) {
    return userModel.findOne({ id: id });
  }

  async getOneWhere(where) {
    return userModel.findOne(where);
  }

  async create(model) {
    model.username = `${model.first_name} ${model.last_name}`;
    // try {
    // let obj = { data: null, error: null };
    // try {
    let user =
      model.role && model.role === "student"
        ? await userModel.findOne({
            email: model.email,
            class_code: model.class_code
          })
        : await userModel.findOne({
            email: model.email
          });
    // console.log(user);
    // if (user) obj.error = EMAIL_ADDRESS_ALREADY_REGISTERED;
    if (user.length > 0) throw new Error(EMAIL_ADDRESS_ALREADY_REGISTERED);

    // const { salt, password } = cryptoPassword(null, model.password);

    // model.password = password;
    // model.salt = salt;
    // model._id = mongoId("user");
    return userModel.create(model);
  }

  async getAllUsers() {
    return userModel.find();
  }

  //   removeAuthToken(token) {
  //     return app.models.Token.deleteOne({ token });
  //   }

  async update(id, model) {
    return userModel.update({ id: id }, model);
  }

  async getAnswers(id) {
    return userModel.query(
      `SELECT answers.*, submissions.type as submissionType, submissions.assigned_level as assignLevel FROM answers join submissions ON submissions.id = answers.submission_id where submissions.created_by = ${id}`
    );
  }

  async getQuestions(id) {
    return userModel.query(
      `SELECT questions.question FROM questions where id = ${id}`
    );
  }

  // /**
  //  * Send verification mail to user email
  //  */
  // async sendVerificationMail(body, userId) {
  //   let tokenData = await tokenService.createToken({
  //     user_id: userId,
  //     type: "email_verification"
  //   });

  //   await emailVerificationEmailSend(
  //     body.email,
  //     body.first_name,
  //     `${process.env.FRONTEND_URL}/verify/email/${tokenData.token}`
  //   );

  //   return true;
  // }

  // /**
  //  * Send forgot password mail to user email
  //  */
  // async sendForgotPasswordMail(user, token) {
  //   await forgotPasswordEmailSend(
  //     user.email,
  //     user.first_name,
  //     `${process.env.FRONTEND_URL}/reset-password/${token}`
  //   );

  //   return true;
  // }
}

module.exports = new userService();
