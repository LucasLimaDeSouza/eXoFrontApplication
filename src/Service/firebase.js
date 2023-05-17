import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyAPT53H8795Nb2O4Uxj2jlHrjRetSeawzs",
  
    authDomain: "exoapplication-15e48.firebaseapp.com",
  
    projectId: "exoapplication-15e48",
  
    storageBucket: "exoapplication-15e48.appspot.com",
  
    messagingSenderId: "994311224434",
  
    appId: "1:994311224434:web:d142e36ea04aed54db16eb"
  
};

const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

export {firebase, auth, app}
  