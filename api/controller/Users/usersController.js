const queueService = require('../../services/queueService');

module.exports = {
    async login(req, res) {
        let statusVM = queueService.createVM(req.user.id);
        if (statusVM){
            return res.status(200).json({ "message":"Login Sucess e VM criada"});
        }
        else{
            res.status(500).json({ "message":"Erro na criação da VM"});
        }
    },
    async logout(req, res) {
        queueService.dropVM(req.user.id);
        req.logout(function(err) {
            if (err) { return next(err); }
            res.status(200).json({ "message":"Logout Sucess"});
        });
    },
};