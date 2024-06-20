import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh0dXhnZ7-AqwKHVw3nVbP-nwnEeycS3I",
  authDomain: "webcarros-35574.firebaseapp.com",
  projectId: "webcarros-35574",
  storageBucket: "webcarros-35574.appspot.com",
  messagingSenderId: "211543966256",
  appId: "1:211543966256:web:5adc807dc984afb4a523f5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };