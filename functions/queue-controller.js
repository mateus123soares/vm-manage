const vmController = require("../functions/vm-controller");

// define two queues
let openQueue = [
    {userId:null,vmId:1},
    {userId:null,vmId:2},
    {userId:null,vmId:3},
    {userId:null,vmId:4},
    {userId:null,vmId:5},
    {userId:null,vmId:6},
    {userId:null,vmId:7},
];

module.exports = {

    createVM(userId) {
        const index = openQueue.findIndex( item => item.userId == null)
        if(index == -1){
           return 0
        }
        else {
            openQueue[index].userId = userId;
            vmController.createvm(openQueue[index].vmId);
        }

        console.log(openQueue);
    },

    dropVM(userId){
        openQueue = openQueue.filter(item => {
            if(item.userId == userId){
                vmController.dropvm(item.vmId); 
                return item.userId ="null";
            }
            else {
                return item
            }
        })
        console.log(openQueue);
    }
}