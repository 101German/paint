import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3tqkvHxVn0V4JSPXOQyO2PTdaj5BXwmQ",
  authDomain: "paint-ad404.firebaseapp.com",
  projectId: "paint-ad404",
  storageBucket: "paint-ad404.appspot.com",
  messagingSenderId: "220113650755",
  appId: "1:220113650755:web:9720e903397f5c8fbcc0f6"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export const auth = getAuth(app);
export default database;
