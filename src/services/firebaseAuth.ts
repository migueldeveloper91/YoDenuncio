// src/services/firebaseAuth.ts
import { auth, db } from "@/utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { sendWelcomeEmail } from "@/utils/emailService";
import { createNotification } from "./notificationService";

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

  // Enviar correo de bienvenida
  try {
    await sendWelcomeEmail(email, name);
    console.log("Correo de bienvenida enviado a:", email);
  } catch (emailError) {
    console.error("Error enviando correo de bienvenida:", emailError);
    // No detenemos el registro si falla el correo
  }

  // Crear notificación de bienvenida en Firestore
  try {
    await createNotification({
      userId: user.uid,
      type: "welcome",
      title: "¡Bienvenido a YoDenuncio!",
      message: `Hola ${name}, gracias por registrarte. Ahora puedes crear denuncias y ayudar a mejorar tu comunidad.`,
    });
    console.log("Notificación de bienvenida creada");
  } catch (notifError) {
    console.error("Error creando notificación:", notifError);
  }

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
