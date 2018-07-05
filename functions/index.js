const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

const request = require('request-promise');

// This is the URL that we will callback and send the content of the updated data node.
// As an example we're using a Request Bin from http://requestb.in
// TODO: Make sure you create your own Request Bin and change this URL to try this sample.

const WEBHOOK_URL = 'https://03a570f0.ngrok.io/chat';

// Reads the content of the node that triggered the function and sends it to the registered Webhook
// URL.
exports.webhook = functions.database.ref('/messages/{username}/{pushId}').onCreate((snap,context) => {
  return request({
    uri: WEBHOOK_URL,
    method: 'POST',
    json: true,
    body: snap.val(),
    resolveWithFullResponse: true,
  }).then((response) => {
    if (response.statusCode >= 400) {
      throw new Error(`HTTP Error: ${response.statusCode}`);
    }
    console.log('SUCCESS! Posted', snap.ref);
    return null;
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{username}/{pushId}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      let hook = JSON.stringify(original);
      console.log('Uppercasing' , typeof(snapshot.val()) , original.text);
      const uppercase = original.text.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.child('uppercase').set(uppercase);
    });