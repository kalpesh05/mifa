const { assesmentTypeModel } = require("../models");
const { ALREADY_EXIST } = require("../api/constants/errorMessages");

class assesmentTypeService {
  async getAllWhere(where = {}) {
    return assesmentTypeModel.find(where);
  }

  async getOne(id) {
    return assesmentTypeModel.findOne({ id: id });
  }

  async getOneWhere(where) {
    return assesmentTypeModel.findOne(where);
  }

  async create(model) {
    let assesmentType = await assesmentTypeModel.findOne({
      title: model.title
    });
    if (assesmentType.length > 0) throw new Error(ALREADY_EXIST);

    return assesmentTypeModel.create(model);
  }

  async getAllassesmentTypes() {
    return assesmentTypeModel.find();
  }

  async update(id, model) {
    return assesmentTypeModel.update({ id: id }, model);
  }

  async remove(id) {
    return assesmentTypeModel.remove({ id: id });
  }
}

module.exports = new assesmentTypeService();
