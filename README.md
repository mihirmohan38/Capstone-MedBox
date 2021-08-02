# Capstone-MedBox 

The backed services exist to and provide the functionality to the different user applications in the solution. The design of the backend was based on the solution’s need to be safe, scalable, and analytics compliant. The backend was developed with Node.Js to tap into numerous support packages and to simplify the development of a fast and scalable solution. Following is an architecture diagram showing the different components and how they interact with each other. The code is also hosted on the following github repo.



The set up includes an AWS EC2 server that runs the express backend, an AWS RDS to host a mysql database, and a GCM server to manage push notifications for the mobile applications. 

##AWS RDS
The AWS RDS server hosts the mySQL database. You can refer to the official documentation to set up an RDS server on your own. Upon set up please edit the security group ( inbound rules) to allow for your EC2 instance to access the RDS server. Refer to the following images for the inbound and outbound rules. 




After deploying the server, you will have to set the tables in the mySQL Database. You can do this by using a mySQL client such as MySQL workbench, PhP Admin, or directly use the CLI. Refer to the diagram below for the different schemas. 


Using your preferred interface, run all the following commands to set up the tables. 

-- create users table for authentication 
create table users (username varchar(255) not null unique, password varchar(255) not null ) ; 

-- create onboarding table for linking medbox to mobile app
create table  onboarding (medboxID int not null unique, password varchar(255), expiration datetime ) ;


-- create medlogs table for medbox logs
CREATE TABLE med_logs (
    id int NOT NULL AUTO_INCREMENT,
    medbox_id int NOT NULL,
    medicine_id int NOT NULL , 
    medicine_name varchar(255) NOT NULL,
    quantity int NOT NULL, 
    taken int NOT NULL , 
    time_slot varchar(255) NOT NULL, 
    time_taken datetime NOT NULL,
	times_snoozed int,
    PRIMARY KEY (id)
);


-- create tokens table for GCM storing notification tokens 
create table tokens (
	id int NOT NULL AUTO_INCREMENT,
	medBoxID int NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (id)
    );




##AWS EC2 
The AWS EC2 runs the express server for the backend. You can refer to the official documentation to set up your own EC2 instance.  Upon setting up please edit the security group (inbound rules and outbound to open up to everyone. 




 
Upon Set up, you will need to install nodeJS, NPM, and git. Then you can git clone the backend repo into your EC2.  
git clone https://github.com/mihirmohan38/Capstone-MedBox.git
cd Capstone-MedBox/backend


Then install all the necessary dependencies, these include express,sql, axios, firebase-admin, body-parser and jsonwebtoken. 

npm install axios 
npm install express
npm install body-parser
npm install firebase-admin
npm install jsonwebtoken 
npm install mysql


##Google Cloud Messaging server
The GCM server is used to send notifications to mobile applications. No code is required to set up the server. Refer to the official documentation to set up the server. 

##Connecting all the different components of the backend
Connect the RDS to the EC2 Server, by editing the pool object in /backend/database.js
const mysql = require('mysql') ; 

// const config =  mysql.createConnection({
var pool      =    mysql.createPool({
    host     :'', // fill up your rds public address
    user     : "", // fill up username
    password : "", // fill up username 
    database : 'medbox', // change if your database anime is different
    debug    :  false
}); 


Connect the EC2 to GCM by getting your GCM services account key and adding it to the /backend/keys folder. Then change the code to give the server access to your new credentials. 
var admin = require("firebase-admin");


// replace the file destination below.
var serviceAccount = require("../keys/serviceAccountKeyKeith.json"); 

admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

