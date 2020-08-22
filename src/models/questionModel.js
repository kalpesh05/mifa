const { isEmpty } = require("lodash");
const { structuredWhere } = require("../helpers/commonFunction");

exports.create = async data => {
  let question = [];
  for (var i in data) {
    question.push({ [i]: data[i] });
  }
  // console.log(question);
  return await db.query(`INSERT INTO questions SET ? `, data);
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
  filterdWhere += condition.length > 0 ? condition.join("and") : filterdWhere;
  console.log(">>>>>>", filterdWhere);
  // let query;
  return await db.query(
    `SELECT * FROM questions ${filterdWhere} ${orderBy} ${gropuBy}`
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
    `SELECT * FROM questions where ${filterdWhere} ${gropuBy} ${gropuBy}`
  );
};

exports.update = async (where, data) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  let question = [];
  for (var i in data) {
    question.push(`${i}=${data[i]}`);
  }
  data = question.join();
  return await db.query(`UPDATE questions SET ${data} where ${filterdWhere}`);
};

exports.remove = async id => {
  // let filterdWhere = structuredWhere(where);

  return await db.query(`DELETE FROM questions where id =${id}`);
};
