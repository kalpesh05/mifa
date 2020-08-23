const {
  userService,
  tokenService,
  submissionService,
  questionService,
  answerService
} = require("../../services");
const {
  USER_ALREADY_REGISTERED,
  DATABASE_INTERNAL,
  USER_NOT_FOUND
} = require("../constants/errorMessages");
const { groupBy, orderBy, omit } = require("lodash");
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
        id: createUser.insertId
      });

      return res.json({
        data: getUser[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  async getDetailedLastSubmission(req, res, next) {
    let { body } = req;
    try {
      let report = [];
      let finalReport = [];
      let getSubmission = await submissionService.getAllWhere({
        created_by: req.user.id
      });

      let questions = await questionService.getAllWhere({});

      for (let i in questions) {
        let answers = await answerService.getAnswersByUserSubmissions(
          req.user.id,
          questions[i]["id"],
          getSubmission[0].id
        );
        // console.log(answers);
        report.push({
          question: questions[i]["question"],
          question_id: questions[i]["id"],
          level_id: questions[i]["level_id"],
          level_title: questions[i]["level_title"],
          level_index: questions[i]["level_index"],
          submission_id: questions[i]["submission_id"],
          answer: answers.length > 0 ? answers[0]["answer"] : null,
          is_attempted: answers.length > 0 ? 1 : 0,
          is_correct: answers.length > 0 ? answers[0]["is_correct"] : 0,
          retry_count: answers.length > 0 ? answers[0]["retry_count"] : 0,
          time_taken_in_ms:
            answers.length > 0 && answers[0]["time_taken_in_ms"]
              ? answers[0]["time_taken_in_ms"]
              : 0
        });
      }

      finalReport = orderBy(report, ["level_index"], ["asc"]).map(v =>
        omit(v, ["level_index"])
      );
      finalReport = groupBy(finalReport, "level_title");

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

      // if (body.assigned_level || body.level) {
      //   let updated_level = body.assigned_level
      //     ? body.assigned_level
      //     : body.level;
      //   let getSubmission = await submissionService.getOneWhere({
      //     created_by: req.user.id
      //   });

      //   let submissionUpdate = await submissionService.update(
      //     getSubmission[0].id,
      //     { assigned_level: updated_level }
      //   );
      // }

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
