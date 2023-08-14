import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCAWYT2etHP0-KbapQu-zSWwsxtnc_4w9I",
  authDomain: "emsapp-ed6da.firebaseapp.com",
  databaseURL: "https://emsapp-ed6da-default-rtdb.firebaseio.com",
  projectId: "emsapp-ed6da",
  storageBucket: "emsapp-ed6da.appspot.com",
  messagingSenderId: "359072941661",
  appId: "1:359072941661:web:6cebcbce845ba3d02b6fb4"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
