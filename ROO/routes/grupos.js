var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('grupos');
});


router.post('/', function(req, res, next) {
    res.send('grupos');
  });
  
  router.delete('/', function(req, res, next) {
    res.send('grupos');
  });

module.exports = router;