const mysql = require('mysql') ; 

// const config =  mysql.createConnection({
//     host: 'capstone.cpwkghnwud3x.ap-southeast-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'password'    
//   }) ; 

var pool      =    mysql.createPool({
    host     :'capstone.cpwkghnwud3x.ap-southeast-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'password',
    database : 'medbox',
    debug    :  false
}); 

//const pool = mysql.createPool(config);
//console.log('connected')

function build() { 
    pool.query("CREATE TABLE users ( usernmae varchar(255) UNIQUE, password varchar(255) );", (error, result)=>{
            if (error) throw error;
            console.log(result) ; 
            }) ; 
    
} ; 

function getAll(){
    pool.query("select * from capstone.users ; ", (error, result)=>{
        if (error) throw error;
        console.log(result) ; 
        }) ; 
}

pool.query(`SELECT * FROM medbox.users LIMIT 1`, function(error, result){
    if(error) throw error ; 
    console.log(result) ; 
}) ; 



module.exports = pool; 

