
const express = require('express') ; 
const queueRouter = express.Router() ;           
const {generate, authenticate} = require('../jwt') ;  
const {getPrescriptions, updatePrescriptions} = require("./dataManagement") ; 
var prescriptions = getPrescriptions() ; 

// // initializing the auth rounters
queueRouter.use((req, res, next) => {
    // the code to filter i.e middleware 
    var token = req.headers["jwt"];
    //console.log('token', token)
    var decoded = authenticate(token) ; 
    if (req.body.username===decoded.username) { 
        next() ; 
    } else { 
        res.json({'success': 0, 'error' : 'Unauthorized access, please log in again', 'data': null}) ;
    } 
     
}) ; 

queueRouter.post('/produce', (req, res) => {
    //the code to provide a response 
    var medboxID = req.body.medboxID ; 
    var prescription = req.body.prescription ; 
    prescriptions[medboxID] = JSON.parse(prescription) ; 
    res.json({'success': 1, 'error' : null , 'data': null})

}) ;
/*
/queue/consume
header {jwt : token}
body {
    username : username of patient 
    medboxID : medboxID  
}
*/


queueRouter.post("/consume", (req, res) => {
    var medboxID = req.body.medboxID ; 
    console.log(req.body) ; 
    console.log(medboxID) ; 
    console.log(prescriptions) ; 
    if(medboxID in prescriptions) {
        res.json({'success': 1, 'error' : null , 'data': prescriptions[medboxID]})
    } else {
        res.json({'success': 0, 'error' : 'MedBoxID isnt registered, please contact NUH', 'data': null})
    }

});
    
 


module.exports = queueRouter ;  