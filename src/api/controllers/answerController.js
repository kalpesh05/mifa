const { userService, answerService } = require("../../services");
const {
  DUPLICATE_SLUG,
  DATABASE_INTERNAL,
  ANSWER_NOT_FOUND
} = require("../constants/errorMessages");
class answerController {
  /**
   * Get All answer
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    let query = req.query ? req.query : {};

    try {
      const answers = await answerService.getAllWhere(query);
      return res.json({
        message: "",
        data: answers
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one answer
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOne(req, res, next) {
    let { answer_id } = req.params;
    try {
      const answer = await answerService.getOneWhere({ id: answer_id });
      return res.json({
        message: "",
        data: answer[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one answer admin
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOneAdmin(req, res, next) {
    let { answer_id } = req.params;
    try {
      const answer = await answerService.getOne(answer_id);
      return res.json({
        message: "",
        data: answer[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create answer
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;
    let { getOneWhere, create, update } = answerService;
    try {
      /**
       * Add answer
       **/
      // body.answered_by = req.user.id;
      let answer = {};
      let answerExist = await getOneWhere({
        submission_id: body.submission_id,
        question_id: body.question_id
      });
      // console.log(answerExist);
      if (answerExist.length === 0) {
        let answerSave = await create(body);

        if (answerSave.error) throw new Error(DATABASE_INTERNAL);

        answer = await getOneWhere({
          id: answerSave.insertId
        });
      } else {
        let answerUpdate = await update(answerExist[0].id, body);
        // console.log(answerUpdate);
        answer = await getOneWhere({
          submission_id: body.submission_id,
          question_id: body.question_id
        });
      }

      return res.json({
        message: "",
        data: answer[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update answer
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    let { update, getOneWhere } = answerService;
    try {
      /**
       * Check valid answer
       */
      let answerExist = await getOneWhere({
        id: params.answer_id
      });

      if (answerExist.length === 0) throw new Error(ANSWER_NOT_FOUND);

      let answerUpdate = await update(params.answer_id, body);

      /**
       * find answer after update
       */

      let answer = await getOneWhere({
        id: params.answer_id
      });

      /**
       * API response
       */
      return res.send({
        message: "",
        data: answer[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete answer
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async remove(req, res, next) {
    let { params } = req;
    let { getOneWhere, remove } = answerService;

    try {
      /**
       * Check valid answer
       */
      let answerExist = await getOneWhere({
        id: params.answer_id
      });

      if (!answerExist) throw new Error(ANSWER_NOT_FOUND);

      /**
       * Delete answer
       */
      let answerRemove = await remove({
        id: params.answer_id
      });

      /**
       * API response
       */

      return res.send({
        message: "",
        data: answerRemove
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new answerController();
