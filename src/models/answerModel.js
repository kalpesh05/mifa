const { isEmpty } = require("lodash");
const { structuredWhere } = require("../helpers/commonFunction");
exports.create = async data => {
  let answer = [];
  for (var i in data) {
    answer.push({ [i]: data[i] });
  }
  console.log(answer);
  return await db.query(`INSERT INTO answers SET ? `, data);
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
    `SELECT * FROM answers ${filterdWhere} ${orderBy} ${gropuBy}`
  );
};

exports.query = async query => {
  return await db.query(query);
};

exports.findOne = async (
  where,
  orderBy = "order by created_at desc",
  gropuBy = ""
) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    console.log(Object.values(where).join());
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  // console.log(condition.join("and"));
  return await db.query(
    `SELECT * FROM answers where ${filterdWhere} ${gropuBy} ${gropuBy}`
  );
};

exports.update = async (where, data) => {
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    console.log(Object.values(where).join());
    filterdWhere += `${Object.keys(where)[i]}="${Object.values(where)[i]}"`;
  }
  let answer = [];
  for (var i in data) {
    answer.push(`${i}=${data[i]}`);
  }
  data = answer.join();
  return await db.query(`UPDATE answers SET ${data} where ${filterdWhere}`);
};

exports.remove = async where => {
  let filterdWhere = structuredWhere();

  return await db.query(`DELETE FROM answers where ${filterdWhere}`);
};
