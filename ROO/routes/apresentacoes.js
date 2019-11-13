var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('apresentacao');
});

router.post('/', function(req, res, next) {
    res.send('unidade');
});
  
router.delete('/', function(req, res, next) {
    res.send('unidade');
});
module.exports = router;