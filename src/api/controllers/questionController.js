const {
  userService,
  questionService,
  answerService
} = require("../../services");
const {
  DUPLICATE_SLUG,
  DATABASE_INTERNAL,
  QUESTION_NOT_FOUND
} = require("../constants/errorMessages");
const { omit, orderBy, groupBy } = require("lodash");
class questionController {
  /**
   * Get All  question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    let query = req.query ? req.query : {};

    try {
      let questions = await questionService.getAllWhere(query);
      // questions = questions.map(v => omit(v, ["index"]));
      for (let i in questions) {
        let answers = await answerService.getAllWhere({
          question_id: questions[i]["id"]
        });
        questions[i]["answers"] = answers;
      }
      questions = orderBy(questions, ["level_index"], ["asc"]).map(v =>
        omit(v, ["level_index", "index"])
      );
      questions = groupBy(questions, "level_title");

      return res.json({
        message: "",
        data: questions
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
    let { question_id } = req.params;
    try {
      const question = await questionService.getOneWhere({ id: question_id });
      return res.json({
        message: "",
        data: question[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one  question admin
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOneAdmin(req, res, next) {
    let { question_id } = req.params;
    try {
      const question = await questionService.getOne(question_id);
      return res.json({
        message: "",
        data: question[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create  question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;
    let { getOneWhere, create } = questionService;
    try {
      /**
       * Add  question
       **/
      body.created_by = req.user.id;
      let questionSave = await create(body);

      if (questionSave.error) throw new Error(DATABASE_INTERNAL);

      let question = await getOneWhere({
        id: questionSave.insertId
      });

      return res.json({
        message: "",
        data: question[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update  question
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    let { update, getOneWhere } = questionService;
    try {
      /**
       * Check valid  question
       */
      let questionExist = await getOneWhere(params.question_id);

      if (questionExist.length === 0) throw new Error(QUESTION_NOT_FOUND);

      let questionUpdate = await update(params.question_id, body);

      /**
       * find  question after update
       */

      let question = await getOneWhere({
        id: params.question_id
      });

      /**
       * API response
       */
      return res.send({
        message: "",
        data: question[0]
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
    let { getOneWhere, remove } = questionService;

    try {
      /**
       * Check valid  question
       */
      let questionExist = await getOneWhere({
        id: params.question_id
      });

      if (!questionExist) throw new Error(QUESTION_NOT_FOUND);

      /**
       * Delete  question
       */
      let questionRemove = await remove(params.question_id);

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

module.exports = new questionController();
