const LocalStrategy = require("passport-local").Strategy;

const users = [{
    _id: 1,
    username: 'adm',
    password: "$2a$12$bx4OizWSMe/DjajghOFl8eVFcTnqlJdl.aw6U3vwy9yQUPF4b4DSS"
}]

module.exports = function(passport){
    function findUser(username) {
        return users.find(item => item.username === username);
    }

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },(username, password, cb) => {
        try{
            const user = findUser(username);
            if (!user) return cb(null,false);
            return cb(null,{id:users[0]._id});
        }
        catch(err){
            console.log(err);
            return cb(err,false);
        }
    }));

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, user);
        });
      });
      
    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
    });
}