import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhJ8GNEYW40TF5gEdKRK7lAKW-5VkvLI8",
  authDomain: "capstone-clothing-application.firebaseapp.com",
  projectId: "capstone-clothing-application",
  storageBucket: "capstone-clothing-application.appspot.com",
  messagingSenderId: "862892311880",
  appId: "1:862892311880:web:b347ee1891160f66bb1f7d",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if (!userAuth) return;
  console.log(userAuth, "userAuth");
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef, "userDocRef");

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot, "userSnapshot");
  console.log(userSnapshot.exists(), "userSnapshot.exists()");

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, 
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
