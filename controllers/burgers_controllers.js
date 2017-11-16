const express = require('express');
const router = express.Router();
const burger = require('../models/burger');

router.get('/', function(req, res){
  burger.all(function(data){
    let hbsObject = {
      burger: data
    };
    res.render('index', hbsObject);
  });
});

router.post('/api/burger', function(req, res){
  burger.insert(['burger_name', 'devoured'], [req.body.name, req.body.devoured], function(data){
    res.json({id: data.insertId});
  });
});

router.put('/api/burger/:id', function(req, res){
  let condition = `id = ${req.params.id}`;
  burger.update({devoured: req.body.devoured}, condition, function(data){
    if (data.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete('/api/burger/:id', function(req, res){
  let condition = `id = ${req.params.id}`;
  burger.delete(condition, function(data){
    if (data.affectedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
