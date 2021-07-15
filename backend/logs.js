const express = require('express') ; 
const pool = require('./database'); 
const logsRouter = express.Router() ;           

const {generate, authenticate} = require('./jwt') ; 

// initializing the auth rounters
logsRouter.use((req, res, next) => {
    // the code to filter i.e middleware
    var token = req.headers["jwt"];
    console.log('token', token)
    var decoded = authenticate(token) ; 
    if (req.body.username===decoded.username) { 
        next() ; 
    } else {
        res.json({'success': 0, 'error' : 'Unauthorized access, please log in again', 'data': null}) ;
    } 
}) ; 

/*
/logs/getLogs
header {jwt : token}
body {
    username : username 
    medboxID : medbox ID 
}
*/

logsRouter.post('/getLogs', (req, res)=>{
    var medboxID = req.body.medboxID ;  
    pool.query(`SELECT * FROM med_logs WHERE medbox_id=? LIMIT 10 `,medboxID, function(error, result){
        if(error) {
            res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ;
            //throw error ; 
        } else {
            res.json({'success': 1, 'error' : null, 'data': result }) ;
        }
    }) ;  
}) ;  



/*
/logs/addLog
header {jwt : token}
body {
    username : username , 
    medboxID : medboxID, 
    medicineID : medicineID , 
    medicineName : medicineName , 
    quantity : quantity of medicine 
    taken : [0 or 1] boolen value 
    timeSlot : either of ["M", "L", "E", "D"] for the four timeslots
    timesSnoozed : number of time medicine taking was snoozed
}


*/

logsRouter.post("/addLog", (req, res)=>{
    var medboxID = req.body.medboxID ; 
    var medicineID = req.body.medicineID ; 
    var medicineName = req.body.medicineName ; 
    var quantity = req.body.quantity ; 
    var taken = req.body.taken ; 
    var timeSlot= req.body.timeSlot ; 
    var timesSnoozed = req.body.timesSnoozed ; 
       
    var query = "INSERT INTO med_logs (medbox_id, medicine_id, medicine_name, quantity, taken, time_slot, time_taken, times_snoozed) VALUES  (?,?,?,?, ?, ?, sysdate(), ?) "
    var values = [medboxID, medicineID, medicineName, quantity, taken, timeSlot, timesSnoozed] ; 
    pool.query(query, values, function(error, result){
        if(error){
            res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ;
        } else {
            res.json({'success': 1, 'error' : null, 'data': null }) ;
        }
    }) ; 
}) ; 

    


module.exports = logsRouter ; 
