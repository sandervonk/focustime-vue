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
// keep user state synced with firebase

auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_USER", user);
    console.log("User is logged in: ", user);
  } else {
    store.commit("CLEAR_USER");
    console.log("User is logged out");
  }
});
// add lisener for changes to user doc in firestore
// onSnapshot(doc(db, "users", store.state.user.uid), (doc) => {
//   console.log("Firebase set tasks: ", doc.data());
//   // update user data in store
//   store.commit("SET_TASKS", doc.data().name);
// });

export { auth, db };
