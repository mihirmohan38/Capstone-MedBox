const express = require('express') ; 
const pool = require('./database'); 
const medboxAuthRouter = express.Router() ;           
const {generate, authenticate} = require('./jwt') ; 

const token_life = 86400 ; 


// initializing the auth rounters
medboxAuthRouter.use((req, res, next) => {
    // the code to filter i.e middleware 
    next() ; 
}) ; 



// endpoints 

medboxAuthRouter.post('/register', (req, res) => {
    //the code to provide a response 
    var username = req.body.username ; 
    var password = req.body.password ; 
    //console.log(username,password) ; 
    var exists = 'SELECT 1 FROM medboxusers WHERE username=? LIMIT 1' ; 
    pool.query(exists, username, (error, result)=>{
        if (error) throw error ; 
        //console.log(result[0]['1'])
        user_exists = result[0]
        if (user_exists) {
            res.json({'success': 0, 'error' : 'user already exists', 'data': null}) ;
        }else {
            var query = 'INSERT INTO medboxusers(username, password) VALUES(?, ?)' ; 
            const values = [username, password]
            pool.query(query,values,(error, result)=>{
                if (error) {
                    //throw error
                    res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ;
                } else {
                    var token = generate({username : username}, token_life) ; 
                    res.json({'success': 1, 'error' : null, 'data': {jwt : token}}) ;
                    
                }     
            }) ; 
            
        }
    }) ; 
}) ;

medboxAuthRouter.post('/login', (req, res)=>{
    var username = req.body.username ; 
    var password = req.body.password ; 
    //var token = req.headers["jwt"];
    
    pool.query('SELECT password FROM medboxusers WHERE username=?',username,(error, result)=>{
        if (error) {
            //throw error; 
            res.json({'success': 0, 'error' : 'db connection error', 'data': null}) ;
        } else {
            let data = result[0] ; 
            if (!data) {
                res.json({'success': 0, 'error' : 'no such user exists', 'data': null}) ;
            } else {
                var verified = password===data['password'] ; 
                // console.log(password, result[0]['password'])
                if(verified){
                    var token = generate({username : username}, token_life) ; 
                    res.json({'success': 1, 'error' : null, 'data': {jwt : token}}) ; 
                } else {
                    res.json({'success': 0, 'error' : 'username and passowrd did not match', 'data': null}) ;
                }
            }
            
        }
       
    }) ; 
}) ; 


module.exports = medboxAuthRouter; 