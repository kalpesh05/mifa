const { userService, assesmentTypeService } = require("../../services");
const {
  DUPLICATE_SLUG,
  DATABASE_INTERNAL,
  ASSESMENT_TYPE_NOT_FOUND
} = require("../constants/errorMessages");
class assesmentTypeController {
  /**
   * Get All assesmentType
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res, next) {
    let query = req.query ? req.query : {};

    try {
      const assesmentTypes = await assesmentTypeService.getAllWhere(query);
      return res.json({
        message: "",
        data: assesmentTypes
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one assesmentType
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOne(req, res, next) {
    let { assesmentType_id } = req.params;
    try {
      const assesmentType = await assesmentTypeService.getOneWhere({
        id: assesmentType_id
      });
      return res.json({
        message: "",
        data: assesmentType[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Get one assesmentType admin
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getOneAdmin(req, res, next) {
    let { assesmentType_id } = req.params;
    try {
      const assesmentType = await assesmentTypeService.getOne(assesmentType_id);
      return res.json({
        message: "",
        data: assesmentType[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create assesmentType
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    let { body } = req;
    let { getOneWhere, create } = assesmentTypeService;
    try {
      /**
       * Add assesmentType
       **/
      console.log(req.user.id);
      body.created_by = req.user.id;
      // return;
      let assesmentTypeSave = await create(body);

      if (assesmentTypeSave.error) throw new Error(DATABASE_INTERNAL);
      // console.log(assesmentTypeSave);
      let assesmentType = await getOneWhere({
        id: assesmentTypeSave.insertId
      });

      return res.json({
        message: "",
        data: assesmentType[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update assesmentType
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    let { params, body } = req;
    let { update, getOneWhere } = assesmentTypeService;
    try {
      /**
       * Check valid assesmentType
       */
      let assesmentTypeExist = await getOneWhere({
        id: params.assesmentType_id
      });

      if (!assesmentTypeExist) throw new Error(ASSESMENT_TYPE_NOT_FOUND);

      let assesmentTypeUpdate = await update(params.assesmentType_id, body);

      /**
       * find assesmentType after update
       */

      let assesmentType = await getOneWhere({
        id: params.assesmentType_id
      });

      /**
       * API response
       */
      return res.send({
        message: "",
        data: assesmentType[0]
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete assesmentType
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async remove(req, res, next) {
    let { params } = req;
    let { getOneWhere, remove } = assesmentTypeService;

    try {
      /**
       * Check valid assesmentType
       */
      let assesmentTypeExist = await getOneWhere({
        id: params.assesmentType_id
      });

      if (!assesmentTypeExist) throw new Error(ASSESMENT_TYPE_NOT_FOUND);

      /**
       * Delete assesmentType
       */
      let assesmentTypeRemove = await remove(params.assesmentType_id);

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

module.exports = new assesmentTypeController();
