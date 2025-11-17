import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ComplaintForm, complaintSchema } from "@/schemas/complaintSchema";
import { useComplaintsStore } from "@/stores/useComplaintsStore";
import useUserStore from "@/stores/userStore";

import LocationPicker from "@/components/LocationPicker";
import Button from "@/components/ui/Button";
import { uploadImages } from "@/utils/uploadImages";
import { useState } from "react";

export default function CreateComplaint() {
  const { createComplaint } = useComplaintsStore();
  const user = useUserStore((s) => s.user);
  const [present] = useIonToast();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
  });

  const onSubmit = async (data: ComplaintForm) => {
    try {
      // 1. Subir imágenes
      const imageUrls = data.images
        ? await uploadImages(data.images as File[])
        : [];

      // 2. Guardar denuncia
      await createComplaint({
        userId: user!.id,
        title: data.title,
        description: data.description,
        categoria: data.categoria,
        location: { lat: data.lat, lng: data.lng },
        images: imageUrls,
      });

      present({
        message: "Denuncia creada exitosamente",
        duration: 1500,
        position: "top",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";

      present({
        message: "Error al crear la denuncia: " + message,
        duration: 1500,
        position: "top",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear nueva denuncia </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="p-4 ">
        <IonCard className="m-4 rounded-lg p-4">
          <IonCardHeader>
            <IonCardSubtitle>1) información</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="mt-4">
            {/* Título */}

            <IonInput
              {...register("title")}
              fill="outline"
              label="Título"
              labelPlacement="floating"
            />

            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}

            {/* Descripción */}
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea autoGrow {...register("description")} />
            </IonItem>
            {errors.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}

            {/* Categoría */}
            <IonItem>
              <IonLabel position="stacked">Categoría</IonLabel>
              <IonSelect
                onIonChange={(e) => setValue("categoria", e.detail.value)}
              >
                <IonSelectOption value="robo">Robo</IonSelectOption>
                <IonSelectOption value="violencia">Violencia</IonSelectOption>
                <IonSelectOption value="accidente">Accidente</IonSelectOption>
              </IonSelect>
            </IonItem>
            {errors.categoria && (
              <p className="text-red-600">{errors.categoria.message}</p>
            )}
          </IonCardContent>
        </IonCard>

        {/* Imágenes */}
        {/* Imágenes */}
        <IonCard className="m-4 rounded-lg p-4">
          <IonCardHeader>
            <IonCardSubtitle>2) Evidencia</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="mt-2">
            {/* Botón bonito */}
            <Button
              label="📸 Añadir foto"
              onClick={() => document.getElementById("imagePicker")?.click()}
              variant="secondary"
            />

            {/* Input oculto */}
            <input
              id="imagePicker"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setValue("images", files);
                setPreviewImages(
                  files.map((file) => URL.createObjectURL(file))
                );
              }}
            />

            {/* Previsualización */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {previewImages.map((src, index) => (
                <div
                  key={index}
                  className="w-full h-24 rounded overflow-hidden border"
                >
                  <img
                    src={src}
                    className="object-cover w-full h-full"
                    alt={`evidencia-${index}`}
                  />
                </div>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard className="m-4 rounded-lg p-4">
          <IonCardHeader>
            <IonCardSubtitle>3) Ubicación</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="mt-4">
            <LocationPicker
              onChange={(coords) => {
                setValue("lat", coords.lat);
                setValue("lng", coords.lng);
              }}
            />
          </IonCardContent>
        </IonCard>

        <IonItem>
          <Button
            label="Crear denuncia"
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
}
