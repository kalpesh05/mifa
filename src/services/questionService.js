const { questionModel } = require("../models");
const { ALREADY_EXIST } = require("../api/constants/errorMessages");

class questionService {
  async getAllWhere(where = {}) {
    return questionModel.find(where);
  }

  async getOne(id) {
    return questionModel.findOne({ id: id });
  }

  async getOneWhere(where) {
    return questionModel.findOne(where);
  }

  async create(model) {
    let question = await questionModel.findOne({ question: model.question });
    if (question.length > 0) throw new Error(ALREADY_EXIST);

    return questionModel.create(model);
  }

  async getAllquestions() {
    return questionModel.find();
  }

  async update(id, model) {
    return questionModel.update({ id: id }, model);
  }

  async remove(id) {
    return questionModel.remove(id);
  }
}

module.exports = new questionService();
