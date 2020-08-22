const { levelModel } = require("../models");
const { ALREADY_EXIST } = require("../api/constants/errorMessages");

class levelService {
  async getWhere(where = {}) {
    return levelModel.find(where);
  }

  async getOne(id) {
    return levelModel.findOne({ id: id });
  }

  async getOneWhere(where) {
    return levelModel.findOne(where);
  }

  async create(model) {
    let level = await levelModel.findOne({ title: model.title });
    if (level.length > 0) throw new Error(ALREADY_EXIST);

    return levelModel.create(model);
  }

  async getAlllevels() {
    return levelModel.find();
  }

  async update(id, model) {
    return levelModel.update({ id: id }, model);
  }

  async remove(id) {
    return levelModel.remove({ id: id });
  }
}

module.exports = new levelService();
