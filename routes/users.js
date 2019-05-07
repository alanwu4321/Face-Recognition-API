var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'This is User' });

});

module.exports = router;
