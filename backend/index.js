const express = require('express') ; 
const bodyParser = require('body-parser'); 

const app = express() ; 
const port = process.env.PORT || 4000 ; 

/**
 * @typedef {Object} ExpressRouter
 * @property {string} filePath - the path to load each of the router
 * @property {string} endPoint - the end point to which a router will be serving 
  */
//const pool = require('./database'); 
const testRouter = require('./test') ; 
const authRouter = require('./auth') ; 
const logsRouter = require('./logs') ; 
const medboxAuthRouter = require('./medboxAuth') ; 
const onboardRouter = require('./onboard') ;
const notificationRouter = require("./GCM/notification") ; 
const queueRouter = require("./MQ/queue") ; 


// setting up the end points 
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());


// adding the routers 
app.use('/auth',authRouter) ; 
app.use('/logs', logsRouter) ; 
app.use('/', testRouter) ; 
app.use('/medboxAuth', medboxAuthRouter) ; 
app.use('/onboard', onboardRouter) ; 
app.use('/notification', notificationRouter) ;
app.use('/queue', queueRouter) ;  



// setting up the express server

app.listen(port, () => {
    console.log('Authentication is online') ; 
}) ; 

