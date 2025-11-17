// src/services/complaintsService.ts
import { db, storage } from "@/utils/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function createComplaint(data: {
  userId: string;
  title: string;
  description: string;
  categoria: string;
  location: { lat: number; lng: number };
  images: File[];
}) {
  // 1. Subir imágenes a Firebase Storage
  const imageUrls: string[] = [];

  for (const file of data.images) {
    const storageRef = ref(
      storage,
      `complaints/${data.userId}/${Date.now()}-${file.name}`
    );

    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    imageUrls.push(url);
  }

  // 2. Crear denuncia en Firestore
  const docRef = await addDoc(collection(db, "complaints"), {
    userId: data.userId,
    title: data.title,
    description: data.description,
    categoria: data.categoria,
    location: data.location,
    images: imageUrls,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}
