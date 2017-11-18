const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', function(req, res, next){
  db.Burger.findAll({}).then((data) => {
    let hbsObject = {
      burger: data
    };
    res.render('index', hbsObject);
  });
});

router.post('/api/burger', function(req, res, next){
  db.Burger.create({
    burger_name: req.body.name,
    devoured: req.body.devoured
  }).then(data => res.json(data)).catch(next);
});

router.put('/api/burger/:id', function(req, res, next){
  db.Burger.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data)).catch(next);
});

router.delete('/api/burger/:id', function(req, res, next){
  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data)).catch(next);
});

module.exports = router;
