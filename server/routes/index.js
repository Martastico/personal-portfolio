var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */

router.get('/api/test', function(req, res, next) {
  res.json({hello: 1})
});


router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../../client/index.html'))
});

module.exports = router;
