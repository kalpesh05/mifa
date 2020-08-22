const { isEmpty } = require("lodash");
const { structuredWhere } = require("../helpers/commonFunction");
exports.create = async data => {
  let assesment_type = [];
  for (var i in data) {
    assesment_type.push({ [i]: data[i] });
  }
  console.log(assesment_type);
  return await db.query(`INSERT INTO assesment_types SET ? `, data);
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
    `SELECT * FROM assesment_types ${filterdWhere} ${orderBy} ${gropuBy}`
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
    `SELECT * FROM assesment_types where ${filterdWhere} ${gropuBy} ${gropuBy}`
  );
};

exports.update = async (where, data) => {
  let condition = [];
  let filterdWhere = "";
  for (let i in Object.keys(where)) {
    condition.push(` ${Object.keys(where)[i]}="${Object.values(where)[i]}" `);
  }
  filterdWhere = condition.length > 0 ? condition.join("and") : filterdWhere;
  let assesment_type = [];
  for (var i in data) {
    assesment_type.push(`${i}=${data[i]}`);
  }
  data = assesment_type.join();
  return await db.query(
    `UPDATE assesment_types SET ${data} where ${filterdWhere}`
  );
};

exports.remove = async id => {
  // let filterdWhere = structuredWhere(where);
  // console.log(`DELETE FROM assesment_types where id = ${id}`);
  return await db.query(`DELETE FROM assesment_types where id = ${id}`);
};
