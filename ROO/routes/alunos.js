var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('alunos');
});


router.post('/', function(req, res, next) {
    res.send('alunos');
  });
  
  router.delete('/', function(req, res, next) {
    res.send('alunos');
  });

module.exports = router;