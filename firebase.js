import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAWhS5Yk3Vas6mzRAbcqLnIN3PWW1Nb4kU",
  authDomain: "livebus-088091160.firebaseapp.com",
  databaseURL: "https://livebus-088091160.firebaseio.com",
  projectId: "livebus-088091160",
  storageBucket: "livebus-088091160.appspot.com",
  messagingSenderId: "23237595283",
  appId: "1:23237595283:web:bd907f8756c73cd3a17d66",
  measurementId: "G-303C0HRRFK"
};

export default firebaseConfig;
// if(!firebase.apps.length){
//   firebase.initializeApp(firebaseConfig);   // Initialize Firebase
// }

// export function currentWriteUserData(location) {
//   const db = firebase.database().ref('Drivers')
//   db.child("1234567789").child("CurrentPosition").set({
//     location
//   })
// }

// export function startWriteUserData(location) {
//   const db = firebase.database().ref('Drivers')
//   db.child("1234567789").child("StartingPosition").set({
//     location
//   })
// }

// export function finalWriteUserData(location) {
//   const db = firebase.database().ref('Drivers')
//   db.child("1234567789").child("FinalPosition").set({
//     location
//   })
// }

