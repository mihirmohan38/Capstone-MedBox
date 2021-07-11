// const axios = require('axios') ; 
// var admin = require("firebase-admin");

// var serviceAccount = require("../keys/serviceAccountKey.json"); 

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// console.log(admin) ; 
// var test = [] ; 

// function sendNotification(registrationTokens) {

//     // Create a list containing up to 500 registration tokens.
//     // These registration tokens come from the client FCM SDKs.
//     // const registrationTokens = [
//     //   'YOUR_REGISTRATION_TOKEN_1',
//     //   // …
//     //   'YOUR_REGISTRATION_TOKEN_N',
//     // ];

//     const message = {
//             notification: {
//                 title: 'Message from node',
//                 body: 'hey there'
//             },
//             tokens: registrationTokens,
//          };

//     admin.messaging().sendMulticast(message)
//     .then((response) => {
//         console.log(response.successCount + ' messages were sent successfully');
//     }).catch((error) => {
//         console.log('Error sending message:', error);
//     });
// }

// sendNotification(test) ; 
const sendNotification = require("./send") ; 
tokens = ["cZJUHJt5R0KV_jlWWJvl6K:APA91bE4PDCMbBUaKt68V5BiRUVQi31ZFFm_kceRqqWtxEKinkSacHGK9M2CtI-yvuStXNCtYByqiZjASoswxUQsWH1UCzKMrzscrgMJZY8BKS1n3427-zf1IY0rfm42QTnHe0H2Jdtz"]
sendNotification(tokens) ; 