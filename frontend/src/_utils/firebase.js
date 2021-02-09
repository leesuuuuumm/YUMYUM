import firebase from "firebase/app";
import 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    apiKey: "AIzaSyCeL9p12TTHkaSXnH-F1MAhCoHv4j1Qlrw",
    authDomain: "react-yumyum.firebaseapp.com",
    projectId: "react-yumyum",
    storageBucket: "react-yumyum.appspot.com",
    messagingSenderId: "950587745855",
    appId: "1:950587745855:web:898198ba041c2be97dba8a"
  };

firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore();

export {firestore};

// export function firebaseLogin(email) {
//     database.ref('messages/'+email).set({});
//     console.log("firebase test success")
//     // users에 email 추가

// }


// ====================json tree=========================
// {
//     "users": {
//       "ahyeon@ssafy.com": {
//         "nickname": "ahyeonway"
//       },
//       "weekyear@ssafy.com": {
//         "nickname": "weekyear"
//       },
//     },
//     "messages": {
//       "ahyeon@ssafy.com": {
//         "m1": {
//              "sender": "weekyear@ssafy.com",   
//              "text": "hi",   
//              "timestamp": "20210208",   
//          },
//         "m2": {
//              "sender": "ahyeon@ssafy.com",   
//              "text": "hihihi",   
//              "timestamp": "20210208",   
//          },
//       },
//       "weekyear@ssafy.com": {
//         "m1": {
//              "sender": "weekyear@ssafy.com",   
//              "text": "hi",   
//              "timestamp": "20210208",   
//          },
//         "m2": {
//              "sender": "ahyeon@ssafy.com",   
//              "text": "hihihi",   
//              "timestamp": "20210208",   
//          },
//       },
//     }
//   }