// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiT71gtKrdKyd6O_s-cRu5oXxLDXWGNn0",
  authDomain: "yodenuncio-c0044.firebaseapp.com",
  projectId: "yodenuncio-c0044",
  storageBucket: "yodenuncio-c0044.firebasestorage.app",
  messagingSenderId: "855653566973",
  appId: "1:855653566973:web:59a5ac8a150b9d535a3194",
  measurementId: "G-9TYV0VW641",
};

// Inicializar la app
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
