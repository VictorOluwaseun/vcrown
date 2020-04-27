import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAiCqpQB5Ne8EU-6rcYnjwSF9O8OzO6BYM",
  authDomain: "crwn-db-10a5d.firebaseapp.com",
  databaseURL: "https://crwn-db-10a5d.firebaseio.com",
  projectId: "crwn-db-10a5d",
  storageBucket: "crwn-db-10a5d.appspot.com",
  messagingSenderId: "685298813254",
  appId: "1:685298813254:web:a947e8bf65248c2022fd47",
  measurementId: "G-8ZZ2WLKCGH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // console.log(userRef);
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;