const { isEmpty } = require("lodash");
exports.create = async data => {
  // let token = [];
  // for (var i in data) {
  //   token.push({ [i]: data[i] });
  // }
  // console.log(token);
  return await db.query(`INSERT INTO tokens SET ? `, data);
};

exports.find = async (
  where = {},
  orderBy = "order by created_at desc",
  gropuBy = ""
) => {
  let filterdWhere = "";
  let condition = [];
  if (!isEmpty(where)) {
    for (let i in Object.keys(where)) {
      filterdWhere = " where ";
      condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
    }
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;

  return await db.query(
    `SELECT * FROM tokens ${filterdWhere} ${orderBy} ${gropuBy}`
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
    `SELECT * FROM tokens where ${filterdWhere} ${gropuBy} ${gropuBy}`
  );
};

exports.update = async (where, data) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  let token = [];
  for (var i in data) {
    token.push(`${i}=${data[i]}`);
  }
  data = token.join();
  return await db.query(`UPDATE tokens SET ${data} where ${filterdWhere}`);
};

exports.remove = async where => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join(" and ") : filterdWhere;
  return await db.query(`DELETE FROM tokens where ${filterdWhere}`);
};
