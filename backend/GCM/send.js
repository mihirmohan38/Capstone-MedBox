function sendNotification(registrationTokens, username) {

    // Create a list containing up to 500 registration tokens.
    // These registration tokens come from the client FCM SDKs.
    // const registrationTokens = [
    //   'YOUR_REGISTRATION_TOKEN_1',
    //   // …
    //   'YOUR_REGISTRATION_TOKEN_N',
    // ];

    var admin = require("firebase-admin");

    var serviceAccount = require("../keys/serviceAccountKeyKeith.json"); 

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

    const message = {
            notification: {
                title: 'Patient ' + username + " hasn't taken her medicine yet",
                body: 'please contact the patient'
            },
            tokens: registrationTokens,
         };

    admin.messaging().sendMulticast(message)
    .then((response) => {
        console.log(response) ; 
        console.log(response.successCount + ' messages were sent successfully');
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
}

module.exports = sendNotification ; 