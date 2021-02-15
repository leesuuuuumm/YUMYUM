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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();


let firestore = firebase.firestore();
const geofire = require('geofire-common');

export {firestore, geofire};
