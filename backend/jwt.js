const jwt = require('jsonwebtoken');
const fs = require('fs') ;  
const PUB_KEY = fs.readFileSync(__dirname + '/privatekey.pem', 'utf8');


// data is a dictionanry eg. {id : 'userid'}
// time is in seconds eng 86400 (24 hrs)
function generate(data,time){
    var token = jwt.sign(data, PUB_KEY, {
        expiresIn: time // 24 hours
      });
    return token ; 
}

// input jwt token
function authenticate(token){
    var response ; 
    jwt.verify(token, PUB_KEY, (err, decoded) => {
        if (err) {
          response = false  ; 
        } else {
            response =  decoded ; 
        }
      });
    return response ; 

}

module.exports = {generate, authenticate} ; 


   