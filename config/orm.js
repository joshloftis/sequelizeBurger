const connection = require('./connection');

const help = {
  qMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  },
  objToSql(obj) {
    let arr = [];
    for (var key in obj) {
      let value = obj[key];
      if (Object.hasOwnProperty.call(obj, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = `'${value}'`;
        }
        arr.push(`${key}=${value}`);
      }
    }
    return arr.toString();
  }
};

const orm = {
  selectAll(table, cb) {
    let query = `SELECT * FROM ${table};`;
    connection.query(query, function(err, result){
      if (err) throw err;
      cb(result);
    });
  },
  insertOne(table, cols, vals, cb) {
    let query = `INSERT INTO ${table} (${cols.toString()}) VALUES (${help.qMarks(vals.length)})`;
    connection.query(query, vals, function(err, result){
      if (err) throw err;
      cb(result);
    });
  },
  updateOne(table, objColVals, condition, cb) {
    let query = `UPDATE ${table} SET ${help.objToSql(objColVals)} WHERE ${condition}`;
    connection.query(query, function(err, result){
      if (err) throw err;
      cb(result);
    });
  },
  deleteOne(table, condition, cb) {
    let query = `DELETE FROM ${table} WHERE ${condition}`;
    connection.query(query, function(err, result){
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;
