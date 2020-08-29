const { userService, submissionService } = require("../../services");
const {
  DUPLICATE_SLUG,
  DATABASE_INTERNAL,
  SUBMISSION_NOT_FOUND
} = require("../constants/errorMessages");
class submissionController {
  /**
   * Get All submission
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    let query = req.query ? req.query : {};

    try {
      const submissions = await submissionService.getAllWhere(query);
      return res.json({
        message: "",
        data: submissions
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one submission
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOne(req, res, next) {
    let { submission_id } = req.params;
    try {
      const submission = await submissionService.getOneWhere({
        id: submission_id
      });
      return res.json({
        message: "",
        data: submission[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one submission admin
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOneAdmin(req, res, next) {
    let { submission_id } = req.params;
    try {
      const submission = await submissionService.getOne(submission_id);
      return res.json({
        message: "",
        data: submission[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create submission
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;
    let { getOneWhere, create, update } = submissionService;
    try {
      /**
       * Add submission
       **/
      body.created_by = req.user.id;

      let submissionSave = await create(body);

      if (submissionSave.error) throw new Error(DATABASE_INTERNAL);

      let updateretyrflag = await userService.update(req.user.id, {
        is_retry_allowed: 0
      });

      let submission = await getOneWhere({
        id: submissionSave.insertId
      });

      return res.json({
        message: "",
        data: submission[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update submission
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    let { update, getOneWhere } = submissionService;
    try {
      /**
       * Check valid submission
       */
      let submissionExist = await getOneWhere({
        id: params.submission_id
      });

      if (submissionExist.length === 0) throw new Error(SUBMISSION_NOT_FOUND);

      let submissionUpdate = await update(params.submission_id, body);

      let changeStudentLevel = await userService.update(req.user.id, {
        level: body.assigned_level_id
      });

      /**
       * find submission after update
       */

      let submission = await getOneWhere({
        id: params.submission_id
      });

      /**
       * API response
       */
      return res.send({
        message: "",
        data: submission[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete submission
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async remove(req, res, next) {
    let { params } = req;
    let { getOneWhere, remove } = submissionService;

    try {
      /**
       * Check valid submission
       */
      let submissionExist = await getOneWhere({
        id: params.submission_id
      });

      if (submissionExist.length === 0) throw new Error(SUBMISSION_NOT_FOUND);

      /**
       * Delete submission
       */
      let submissionRemove = await remove(params.submission_id);

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

module.exports = new submissionController();
