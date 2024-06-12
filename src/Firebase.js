
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgDrfTCEkOA8knuJ5zIpavurcW0P000Kg",
  authDomain: "mailbox-client-2f343.firebaseapp.com",
  projectId: "mailbox-client-2f343",
  storageBucket: "mailbox-client-2f343.appspot.com",
  messagingSenderId: "891601352189",
  appId: "1:891601352189:web:b6ccf719d1b6d08a3d5594",
  measurementId: "G-X4ES4WQ7ZC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export {auth,db};