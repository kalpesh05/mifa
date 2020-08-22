const { submissionModel } = require("../models");
const { ALREADY_EXIST } = require("../api/constants/errorMessages");

class submissionService {
  async getAllWhere(where = {}) {
    return submissionModel.find(where);
  }

  async getOne(id) {
    return submissionModel.findOne({ id: id });
  }

  async getOneWhere(where) {
    return submissionModel.findOne(where);
  }

  async create(model) {
    // let submission = await submissionModel.findOne({ title: model.title });
    // if (submission.length > 0) throw new Error(ALREADY_EXIST);

    return submissionModel.create(model);
  }

  async getAllsubmissions() {
    return submissionModel.find();
  }

  async update(id, model) {
    return submissionModel.update({ id: id }, model);
  }

  async remove(id) {
    return submissionModel.remove(id);
  }
}

module.exports = new submissionService();
