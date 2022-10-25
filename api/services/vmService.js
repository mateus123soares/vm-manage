const { exec } = require("child_process");

module.exports = {

    createvm (id){
        exec(`docker-compose -f ./env/docker-compose-${id}.yaml --env ./env/.env-${id} up`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return 0;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        })
        return 1;
    },

    dropvm(id){
        exec(`docker-compose -f ./env/docker-compose-${id}.yaml  --env ./env/.env-${id} down`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        })
        return 1;
    }
}