const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');

initializeApp();


const adminEmails = functions.config().admins.emails.split(',');

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
    let customClaims = { admin: false };
    if (user.email && adminEmails.includes(user.email)) {
        customClaims = { admin: true };
    }
    try {
        await getAuth().setCustomUserClaims(user.uid, customClaims);
        // Update real-time database to notify client to force refresh.
        const metadataRef = getDatabase().ref('metadata/' + user.uid);
        // Set the refresh time to the current UTC timestamp.
        // This will be captured on the client to force a token refresh.
        await  metadataRef.set({refreshTime: new Date().getTime()});
    } catch(error) {
        console.log(error);
    }
});
