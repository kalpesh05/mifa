const { isEmpty } = require("lodash");
exports.create = async data => {
  // let user = [];
  // for (var i in data) {
  //   user.push({ [i]: data[i] });
  // }
  // console.log(user);
  return await db.query(`INSERT INTO users SET ? `, data);
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
      condition.push(
        ` users.${Object.keys(where)[i]}="${Object.values(where)[i]}" `
      );

      // console.log(Object.values(where).join());
    }
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  console.log(">>>>>>", filterdWhere);

  // let query;
  return await db.query(
    `SELECT users.*, submissions.assigned_level as level FROM users LEFT JOIN submissions ON submissions.created_by = users.id ${filterdWhere} ${orderBy} ${gropuBy}`
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
    condition.push(
      ` users.${Object.keys(where)[i]}="${Object.values(where)[i]}" `
    );
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;

  return await db.query(
    `SELECT * FROM users where ${filterdWhere} ${gropuBy} ${gropuBy}`
  );
};

exports.update = async (where, data) => {
  let filterdWhere = "";
  let condition = [];

  if (!isEmpty(where)) {
    for (let i in Object.keys(where)) {
      condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);

      // console.log(Object.values(where).join());
    }
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  let user = [];
  for (var i in data) {
    // let val = typeof data[i] !== "" ? data[i] : `"${data[i]}"`;
    user.push(` ${i}="${data[i]}"`);
  }
  data = user.join();
  console.log(data);
  return await db.query(`UPDATE users SET ${data} where ${filterdWhere}`);
};

exports.remove = async where => {
  let filterdWhere = "";
  let condition = [];

  if (!isEmpty(where)) {
    for (let i in Object.keys(where)) {
      condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);

      // console.log(Object.values(where).join());
    }
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  return await db.query(`DELETE FROM users where ${filterdWhere}`);
};

exports.query = async query => {
  return await db.query(query);
};
