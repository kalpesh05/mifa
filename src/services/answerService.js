const { answerModel, questionModel } = require("../models");
const { ALREADY_EXIST } = require("../api/constants/errorMessages");

class answerService {
  async getAllanswersWhere(where = {}) {
    return answerModel.find(where);
  }

  async getOne(id) {
    return answerModel.findOne({ id: id });
  }

  async getOneWhere(where) {
    return answerModel.findOne(where);
  }

  async create(model) {
    let answer = await answerModel.findOne({
      answer: model.answer,
      question_id: model.question_id,
      submission_id: model.submission_id,
      is_correct: 1
    });
    if (answer.length > 0) throw new Error(ALREADY_EXIST);
    let question = await questionModel.findOne({ id: model.question_id });

    if (question && question.length > 0) {
      model.is_correct = model.answer === question[0]["correct_answer"] ? 1 : 0;
    }

    return answerModel.create(model);
  }

  async getAllanswers() {
    return answerModel.find();
  }

  async update(id, model) {
    return answerModel.update({ id: id }, model);
  }

  async remove(id) {
    return answerModel.remove({ id: id });
  }
}

module.exports = new answerService();
