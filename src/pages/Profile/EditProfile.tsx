// src/pages/EditProfile/EditProfile.tsx

import { useAuth } from "@/hooks/useAuth";
import { db } from "@/utils/firebaseConfig";
import { uploadImage } from "@/utils/uploadImage";

import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  name: string;
  email: string;
  createdAt: string;
}

export default function EditProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [present] = useIonToast();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      createdAt: "",
    },
  });

  // Cargar datos del usuario
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      const firestoreData = snap.exists() ? snap.data() : {};

      reset({
        name: firestoreData.name || user.displayName || "",
        email: user.email || "",
        createdAt: user.metadata.creationTime
          ? new Date(user.metadata.creationTime).toLocaleDateString()
          : "",
      });

      setPreview(firestoreData.photoURL || user.photoURL || null);

      setLoading(false);
    };

    loadData();
  }, [user, reset]);

  // Guardar cambios
  const onSubmit = async (data: EditProfileForm) => {
    if (!user) return;

    setLoading(true);

    try {
      let photoURL = preview;

      // Si hay nueva imagen → subir a Cloudinary
      if (file) {
        photoURL = await uploadImage(file);
      }

      // Actualizar Firebase Auth
      await updateProfile(user, {
        displayName: data.name,
        photoURL: photoURL || undefined,
      });

      // Actualizar Firestore
      await updateDoc(doc(db, "users", user.uid), {
        fullName: data.name,
        photoURL,
      });

      setLoading(false);

      present({
        message: "Perfil actualizado correctamente ✅",
        duration: 1500,
        position: "top",
      });
    } catch (err) {
      console.error(err);
      present({
        message: "Error al actualizar el perfil ❌",
        duration: 1500,
        position: "top",
      });
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "var(--color-secondary)" }}>
          <IonButtons slot="start">
            <IonBackButton
              style={{ color: "white" }}
              defaultHref="/tabs/profile"
            />
          </IonButtons>
          <IonTitle style={{ color: "white" }}>Editar perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="flex flex-col p-4 gap-4">
          {loading && <IonLoading isOpen={true} message="Cargando..." />}

          {!loading && (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Imagen / Avatar clickeable */}
              <div className="flex justify-center mb-6">
                <IonAvatar
                  style={{
                    width: "120px",
                    height: "120px",
                    cursor: "pointer",
                  }}
                  className="shadow-md hover:opacity-80 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={
                      preview ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "50%",
                    }}
                  />
                </IonAvatar>
              </div>

              {/* Input oculto para seleccionar imagen */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {/* Nombre */}
              <Input
                label="Nombre"
                type="text"
                {...register("name")}
                placeholder="Tu nombre"
              />

              {/* Email */}
              <Input
                label="Correo electrónico"
                type="text"
                disabled
                {...register("email")}
              />

              {/* Fecha */}
              <Input
                label="Miembro desde"
                type="text"
                disabled
                {...register("createdAt")}
              />

              <Button variant="secondary" type="submit" className="mt-6">
                Guardar cambios
              </Button>
            </form>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
