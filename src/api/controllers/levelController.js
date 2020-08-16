const { userService, levelService } = require("../../services");
const {
  DUPLICATE_SLUG,
  DATABASE_INTERNAL,
  LEVEL_NOT_FOUND
} = require("../constants/errorMessages");
class levelController {
  /**
   * Get All level
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    let query = req.query ? req.query : {};

    try {
      const levels = await levelService.getAllWhere(query);
      return res.json({
        message: "",
        data: levels
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one level
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOne(req, res, next) {
    let { level_id } = req.params;
    try {
      const level = await levelService.getOneWhere({ id: level_id });
      return res.json({
        message: "",
        data: level[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one level admin
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOneAdmin(req, res, next) {
    let { level_id } = req.params;
    try {
      const level = await levelService.getOne(level_id);
      return res.json({
        message: "",
        data: level[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create level
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;
    let { getOneWhere, create } = levelService;
    try {
      /**
       * Add level
       **/
      body.created_by = req.user.id;
      let levelSave = await create(body);

      if (levelSave.error) throw new Error(DATABASE_INTERNAL);

      let level = await getOneWhere({
        id: levelSave.insertId
      });

      return res.json({
        message: "",
        data: level[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update level
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    let { update, getOneWhere } = levelService;
    try {
      /**
       * Check valid level
       */
      let levelExist = await getOneWhere({
        id: params.level_id
      });

      if (!levelExist) throw new Error(LEVEL_NOT_FOUND);

      let levelUpdate = await update(params.level_id, body);

      /**
       * find level after update
       */

      let level = await getOneWhere({
        id: params.level_id
      });

      /**
       * API response
       */
      return res.send({
        message: "",
        data: level[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete level
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async remove(req, res, next) {
    let { params } = req;
    let { getOneWhere, remove } = levelService;

    try {
      /**
       * Check valid level
       */
      let levelExist = await getOneWhere({
        id: params.level_id
      });

      if (!levelExist) throw new Error(LEVEL_NOT_FOUND);

      /**
       * Delete level
       */
      let levelRemove = await remove({
        id: params.level_id
      });

      /**
       * API response
       */

      return res.send({
        message: "",
        data: levelRemove
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new levelController();
