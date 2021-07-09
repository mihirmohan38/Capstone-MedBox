const express = require('express') ; 
const jwt = require('jsonwebtoken');
; 
const fs = require('fs') ; 
const PUB_KEY = fs.readFileSync(__dirname + '/privatekey.pem', 'utf8');
const pool = require('./database'); 
const testRouter = express.Router() ; 
const {generate, authenticate} = require('./jwt') ; 



testRouter.use((req, res, next)=>{
    next() ; 
}) ; 

testRouter.get('/',(req, res)=>{
    console.log('reached') ; 
    pool.query(`SELECT * FROM medbox.users`, function(error, result){
    if(error) throw error ; 
    res.json(result)
        }) ;    
    }) ; 

testRouter.get('/yo', function(req, res, next){
    var token = jwt.sign({ id: 'test' }, PUB_KEY, {
        expiresIn: 86400 // 24 hours
      });
    
      jwt.verify(token, PUB_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        //req.userId = decoded.id;
        res.json({'id' : decoded.id}) ; 
        console.log('work', decoded.id) ; 
        next();
      });
    //res.send('test') ; 

}) ; 

testRouter.get('/you', function(req, res, next){
    var token = generate({id : 'test'}, 86400) ; 
    console.log(token) ; 
    token = String (token) ; 
    console.log('type', typeof(token)) ; 
   
    var decoded = authenticate(String(token)) ; 
    console.log(decoded) ; 
    res.json(decoded) ; 
    
    //   jwt.verify(token, PUB_KEY, (err, decoded) => {
    //     if (err) {
    //       return res.status(401).send({
    //         message: "Unauthorized!"
    //       });
    //     }
    //     //req.userId = decoded.id;
    //     res.json({'id' : decoded.id}) ; 
    //     console.log('work', decoded.id) ; 
    //     next();
    //   });
    // //res.send('test') ; 

}) ; 

testRouter.get('/ping', function (req, res, next){
    res.send('hello') ; 
}) ; 




/* POST login. */
testRouter.get('/test', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});


module.exports = testRouter; 

    