// src/services/firebaseAuth.ts
import { auth, db } from "@/utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export async function registerUser(
  email: string,
  password: string,
  name: string
) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Actualizamos el displayName en Auth
  await updateProfile(user, { displayName: name });

  // Guardamos los datos en Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    fullName: name,
    email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log(userCredential);
  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}
