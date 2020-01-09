// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': 'AAAAVyNGamE:APA91bHCygn9wEk4HFX_JYILDguWhd0rQIUc9P2tBqg_C-o3DnnhmWMGTNfatol9oz0Mh5GA2IsdIsaF0-v9YCv3kURw1YRS3J8JWsU5G0bKEOackRNy9UEUYaR5EkHfA1jKRCQEyVvZ'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();