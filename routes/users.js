var express = require('express');
var router = express.Router();
const qu = require("../functions/queue-controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(qu.receive())
  res.send('respond with a resource');
});

module.exports = router;
