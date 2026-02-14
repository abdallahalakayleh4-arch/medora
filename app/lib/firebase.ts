import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRVWEvWa-xOi3NFjP-IdIaCBXNJoEOKqY",
  authDomain: "medora-app-10e70.firebaseapp.com",
  projectId: "medora-app-10e70",
  storageBucket: "medora-app-10e70.appspot.com",
  messagingSenderId: "105310866840",
  appId: "1:105310866840:web:3265227cdd5e8a1555afed",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
