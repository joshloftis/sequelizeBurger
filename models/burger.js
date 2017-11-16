const orm = require('../config/orm');

const burger = {
  all(cb) {
    orm.selectAll('burgers', function(res){
      cb(res);
    });
  },
  insert(cols, vals, cb) {
    orm.insertOne('burgers', cols, vals, function(res){
      cb(res);
    });
  },
  update(objColVals, condition, cb) {
    orm.updateOne('burgers', objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete(condition, cb) {
    orm.deleteOne('burgers', condition, function(res){
      cb(res);
    });
  }
};

module.exports = burger;
