import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYgZ1VgYlLnC_y0mhHKHuMAhFq0i8g-ho",
  authDomain: "doancongnghethongtin-2df4c.firebaseapp.com",
  projectId: "doancongnghethongtin-2df4c",
  storageBucket: "doancongnghethongtin-2df4c.appspot.com",
  messagingSenderId: "311479252720",
  appId: "1:311479252720:web:c6494cc2ac545d8cb3b435",
  measurementId: "G-EKDXYS51BE",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
