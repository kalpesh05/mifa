const {
  userService,
  tokenService,
  submissionService
} = require("../../services");
const {
  USER_ALREADY_REGISTERED,
  DATABASE_INTERNAL,
  USER_NOT_FOUND
} = require("../constants/errorMessages");
const { groupBy } = require("lodash");
const moment = require("moment-timezone");
const { classCode } = require("../../helpers/commonFunction");
class userController {
  /**
   * Get All User
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json({
        data: users
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one  question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOne(req, res, next) {
    let { params } = req;
    try {
      const user = await userService.getOne(params.user_id);
      // console.log(user);
      return res.json({
        message: "",
        data: user[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one  question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async userCheck(req, res, next) {
    let { body } = req;
    try {
      const user = await userService.getOneWhere(body);
      return res.json({
        message: "",
        data: user[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Create User
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;
    try {
      if (body.role === "teacher") {
        body.class_code = classCode();
      } else if (body.role === "student") {
        body.class_code = req.user.class_code;
      }
      // console.log("????", body);
      const createUser = await userService.create(body);

      const getUser = await userService.getOneWhere({
        email: createUser.insertId
      });

      return res.json({
        data: getUser
      });
    } catch (e) {
      return next(e);
    }
  }

  async getAnswers(req, res, next) {
    let { body } = req;
    try {
      let report = [];
      let finalReport = [];
      let answers = await userService.getAnswers(req.user.id);

      for (let i in answers) {
        let question = await userService.getQuestions(
          answers[i]["question_id"]
        );
        report.push({
          question: question[0]["question"],
          question_id: question[0]["question_id"],
          submission_id: question[0]["submission_id"],
          answer: answers[i]["answer"],
          is_correct: answers[i]["is_correct"],
          retry_count: answers[i]["retry_count"]
        });
      }

      finalReport = groupBy(report, "question");
      return res.json({
        data: finalReport
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Update  user
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    let { update, getOneWhere } = userService;
    try {
      /**
       * Check valid  user
       */
      let userExist = await getOneWhere({
        id: params.user_id
      });

      if (!userExist) throw new Error(USER_NOT_FOUND);

      let userUpdate = await update(params.user_id, body);

      if (body.assigned_level || body.level) {
        let updated_level = body.assigned_level
          ? body.assigned_level
          : body.level;
        let getSubmission = await submissionService.getOneWhere({
          created_by: req.user.id
        });

        let submissionUpdate = await submissionService.update(
          getSubmission[0].id,
          { assigned_level: updated_level }
        );
      }

      /**
       * find  user after update
       */

      let user = await getOneWhere({
        id: params.user_id
      });

      /**
       * API response
       */
      return res.send({
        message: "",
        data: user[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete  question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async remove(req, res, next) {
    let { params } = req;
    let { getOneWhere, remove } = userService;

    try {
      /**
       * Check valid  user
       */
      let userExist = await getOneWhere({
        id: params.user_id
      });

      if (!userExist) throw new Error(QUESTION_NOT_FOUND);

      /**
       * Delete  user
       */
      let userRemove = await remove({
        id: params.user_id
      });

      /**
       * API response
       */

      return res.send({
        message: "",
        data: {}
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new userController();
