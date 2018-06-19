const functions = require('firebase-functions');
const admin = require('firebase-admin');

//var serviceAccount = require("G:\\firebase_chat\\fir-chat-14cba-firebase-adminsdk-bx78d-025c40ca51.json");

// Initialize the app with a service account, granting admin privileges

admin.initializeApp();

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/messages");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
/*
exports.dbCreate = functions.database.ref('/messages').onCreate((snap, context) => {
  const createdData = snap.val(); // data that was created
});
*/
exports.pushNotification = functions.database.ref('/messages/{pushId}').onWrite( event => {

    console.log('Push notification event triggered');

    //  Grab the current value of what was written to the Realtime Database.
    var valueObject = event.data.val();

    if(valueObject.photoUrl != null) {
      valueObject.photoUrl= "Sent you a photo!";
    }

  // Create a notification
    const payload = {
        notification: {
            title:valueObject.name,
            body: valueObject.text || valueObject.photoUrl,
            sound: "default"
        },
    };

  //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    return admin.messaging().sendToTopic("pushNotifications", payload, options);
});

exports.makeUppercase = functions.database.ref('/messages/-K2ib5JHRbbL0NrztUfO/text/')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

