const express = require('express') ; 
const pool = require('./database'); 
const onboardRouter = express.Router() ;           
const {generate, authenticate} = require('./jwt') ; 

const token_life = 86400*30 ; 


// initializing the auth rounters
onboardRouter.use((req, res, next) => {
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

onboardRouter.post('/register', (req, res) => {
    //the code to provide a response 
    console.log('here') ; 
    var medboxID = req.body.medboxID ; 
    var password = req.body.password ; 
    
      
    var del = 'DELETE FROM onboarding WHERE medboxID=?' ; 
    pool.query(del, medboxID, (error, result)=>{
        if (error) throw error ; 
        //console.log('delted')
    }) ; 

   

    var insert = 'INSERT INTO onboarding (medboxID, password, expiration) VALUES (?, ?, NOW()+5000000) ' ; 
    var values = [medboxID, password]
    pool.query(insert,values, (error, result)=>{
        if (error) {
            //throw error; 
            res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ;
        } else {
            res.json({'success': 1, 'error' : null, 'data': null}) ; 
        }
    } ) ; 
}) ;

onboardRouter.post('/authenticate', (req, res)=>{
    var medboxID = req.body.medboxID ;  // user input 
    var password = req.body.password ;  // user input 
    var username = req.body.username ;  // local memory 
    
    var exists = 'SELECT * FROM onboarding WHERE medboxID=? AND expiration>NOW()+1 AND password=? LIMIT 1' ;
    var values = [medboxID, password]
    pool.query(exists, values, (error, result)=>{
        if (error) {
            console.log('error here')
            res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ;
            //throw error ;
         } else {
            console.log(result.length) ; 
            var user_exists = result.length>0 ; 
            if (user_exists) {
                // send jwt token and allow access
                var token = generate({username : username, medboxID : medboxID}, token_life) ; 
                res.json({'success': 1, 'error' : null, 'data': {jwt : token}}) ;
            }else {
                res.json({'success': 0, 'error' : 'Password wrong or expired. Please try again', 'data': null}) ;
            }
         }
        //console.log(result[0]['1'])

    }) ; 
}) ; 


module.exports = onboardRouter; 
