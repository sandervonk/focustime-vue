import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtV4ajO6P0PH3aje1J0UedJj8zSYgqy9w",
  authDomain: "focustime-a18ff.firebaseapp.com",
  projectId: "focustime-a18ff",
  storageBucket: "focustime-a18ff.appspot.com",
  messagingSenderId: "1081184659635",
  appId: "1:1081184659635:web:c62431e60888334575e8c6",
  measurementId: "G-N8T6NFR8GN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// import store for following

import store from "../store";

// enable database persistence and ensure user stays logged in
// keep user state synced with firebase auth
auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_USER", user);
    console.warn("user is logged in: " + user.uid);
    // add onSnapshot listener for changes to user doc in firestore, then use "SET_DOC" to update state
    onSnapshot(doc(db, "users", user.uid), (doc) => {
      console.warn("onSnapshot fired");
      store.commit("SET_DOC", doc.data());
    });
  } else {
    store.commit("CLEAR_USER");
    console.warn("user is logged out");
  }
});

export { auth, db };
