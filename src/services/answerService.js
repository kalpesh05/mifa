const { answerModel, questionModel } = require("../models");
const { ALREADY_EXIST } = require("../api/constants/errorMessages");

class answerService {
  async getAllWhere(where = {}) {
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

  async getAnswersByUserSubmissions(id, submission_id, question_id) {
    return answerModel.query(
      `SELECT answers.*, submissions.status as submissionType, submissions.assigned_level_id as assignLevel FROM answers join submissions ON submissions.id = answers.submission_id where submissions.created_by = ${id} and answers.question_id = ${question_id} and submissions.id = ${submission_id}`
    );
  }
}

module.exports = new answerService();
