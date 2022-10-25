const express = require('express');
const router = express.Router();
const passport = require('passport');

const authenticationMiddleware = require('../middleware/autenticate');
const userController = require('../api/controller/Users/usersController');

/* GET home page. */
router.get('/',function(req, res, next) {
  res.status(200).send({"message":"API UP"});
});

router.post('/', passport.authenticate('local', { failureRedirect: '/logout', failureMessage: true }),userController.login);
router.post('/logout', userController.logout);


module.exports = router;