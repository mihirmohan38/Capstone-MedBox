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
/logs
header {jwt : token}
body {
    username : username 
    medboxID : medbox ID 
}
*/

logsRouter.get('/', (req, res)=>{
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

    


module.exports = logsRouter ; 
