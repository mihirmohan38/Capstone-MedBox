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



logsRouter.get('/', (req, res)=>{
    var data ; 
    pool.query(`SELECT * FROM medbox.users`, function(error, result){
        if(error) {
            res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ;
            //throw error ; 
        } else {
            res.json({'success': 1, 'error' : null, 'data': result }) ;
        }
    }) ;  
}) ;  

    


module.exports = logsRouter ; 
