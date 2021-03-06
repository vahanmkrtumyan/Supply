import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD87pAUvujGMBYCpTC_5mGRpp3GCHoQFPI",
  authDomain: "supply2-e7d37.firebaseapp.com",
  databaseURL: "https://supply2-e7d37.firebaseio.com",
  projectId: "supply2-e7d37",
  storageBucket: "supply2-e7d37.appspot.com",
  messagingSenderId: "1047219263931"
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
