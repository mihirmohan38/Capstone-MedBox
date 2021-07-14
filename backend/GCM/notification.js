const express = require('express') ; 
const notificationRouter = express.Router() ;           
const {generate, authenticate} = require('../jwt') ; 
const sendNotification = require("./send") ; 
const pool = require('../database'); 

// initializing the auth rounters
notificationRouter.use((req, res, next) => {
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

/*

/notification/send endpoint
post request 
header {jwt : jwt_token}
body {
    username : username of app user, 
    medboxID : medboxid (1), 
}


*/

notificationRouter.post('/send', (req, res) => {
    //the code to provide a response 
    console.log('here') ; 
    var medboxID = req.body.medboxID ; 
    var query = "SELECT token FROM tokens WHERE medBoxID=?" ; 
    pool.query(query, medboxID, (error, result)=>{
        if (error) {
            res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ; 
        }else {
            if (result.length<=0){
                res.json({'success': 1, 'error' : 'no one to notify ', 'data': null}) ; 
            }else {
                var registrationTokens = result.map(row => row.token) ; // might have to be changed
                var success = sendNotification(registrationTokens) ;
                res.json({"success": -1, "error": "placeholder return", 'data': null}) ; 

            }
        }
    }) ; 
}) ;



/*

/notification/register endpoint
post request 
header {jwt : jwt_token}
body {
    username : username of app user, 
    medboxID : medboxid (1), 
    registrationToken : token for sending notification 
}


*/


notificationRouter.post("/register", (req, res) => {
    var token = req.body.registrationToken ; 
    var username = req.body.username  ; 
    var medBoxID = req.body.medboxID ; 
    var exists = 'SELECT 1 FROM tokens WHERE medBoxID=? AND token=? LIMIT 1' ; 
    pool.query(exists, [medBoxID, token], (error, result)=>{
        if (error) throw error ; 
        //console.log(result[0]['1'])
        user_exists = result[0]
        if (user_exists) {
            res.json({'success': 0, 'error' : 'id, token pair already exists', 'data': null}) ;
        }else {
            var query = 'INSERT INTO tokens(medBoxID, token) VALUES(?, ?)' ; 
            const values = [medBoxID, token] ; 
            pool.query(query,values,(error, result)=>{
                if (error) {
                    //throw error
                    console.log(error) ; 
                    res.json({'success': 0, 'error' : error, 'data': null}) ;
                } else {
                    
                    res.json({'success': 1, 'error' : null, 'data': null}) ;
                    
                }     
            }) ; 
            }
        }) ; 
    });




    
 


module.exports = notificationRouter ;  