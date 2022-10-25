const express = require('express');
const router = express.Router();
const openQueue = require("../functions/queue-controller");
const passport = require('passport');
const authenticationMiddleware = require('../middleware/autenticate')

/* GET home page. */
router.get('/', authenticationMiddleware,function(req, res, next) {
  res.status(200).send(req.user)
});

router.get('/create-vm/:id',authenticationMiddleware, function(req, res, next) {
  openQueue.createVM(req.params.id);
  res.status(200).send("ok")
});

router.get('/down-vm/',authenticationMiddleware ,function(req, res, next) {
  openQueue.dropVM(req.user.id);
  res.status(200).send("ok")
});

router.post('/', passport.authenticate('local', { failureRedirect: '/logout', failureMessage: true }),
function(req, res) {
  res.redirect('/create-vm/' + req.user.id);
})

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = router;
