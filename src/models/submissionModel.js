const { isEmpty } = require("lodash");
const { structuredWhere } = require("../helpers/commonFunction");
exports.create = async data => {
  let submission = [];
  for (var i in data) {
    submission.push({ [i]: data[i] });
  }
  // console.log(submission);
  return await db.query(`INSERT INTO submissions SET ? `, data);
};

exports.find = async (
  where = {},
  orderBy = "order by created_at desc",
  gropuBy = ""
) => {
  let filterdWhere = "";
  let condition = [];

  if (!isEmpty(where)) {
    filterdWhere = "where ";

    for (let i in Object.keys(where)) {
      condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
    }
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  // console.log(">>>>>>", filterdWhere);
  // let query;
  return await db.query(
    `SELECT * FROM submissions ${filterdWhere} ${orderBy} ${gropuBy}`
  );
};

exports.findOne = async (
  where,
  orderBy = "order by created_at desc",
  gropuBy = ""
) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  return await db.query(
    `SELECT * FROM submissions where ${filterdWhere} ${gropuBy} ${gropuBy}`
  );
};

exports.update = async (where, data) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  let submission = [];
  for (var i in data) {
    submission.push(`${i}="${data[i]}"`);
  }
  data = submission.join();
  return await db.query(`UPDATE submissions SET ${data} where ${filterdWhere}`);
};

exports.remove = async where => {
  let filterdWhere = structuredWhere();
  return await db.query(`DELETE FROM submissions where ${filterdWhere}`);
};
