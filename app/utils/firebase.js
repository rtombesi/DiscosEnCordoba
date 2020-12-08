import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGjPn9lpFewrw2AW1p106UnKADy56fMlY",
  authDomain: "disco-cba.firebaseapp.com",
  databaseURL: "https://disco-cba.firebaseio.com",
  projectId: "disco-cba",
  storageBucket: "disco-cba.appspot.com",
  messagingSenderId: "940640298732",
  appId: "1:940640298732:web:4eaadef09d384df7eca7c9",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
