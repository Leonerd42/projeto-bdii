var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('professores');
});


router.post('/', function(req, res, next) {
    res.send('professores');
});

router.delete('/', function(req, res, next) {
    res.send('professores');
});

module.exports = router;