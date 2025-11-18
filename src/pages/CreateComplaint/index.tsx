import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
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
import CategorySelector from "@/components/ui/CategorySelector";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { uploadImages } from "@/utils/uploadImages";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function CreateComplaint() {
  const { createComplaint } = useComplaintsStore();
  const user = useUserStore((s) => s.user);
  const [present] = useIonToast();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      lat: 4.60971, // Bogotá
      lng: -74.08175,
    },
  });

  // Obtener ubicación automáticamente al cargar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("lat", position.coords.latitude);
          setValue("lng", position.coords.longitude);
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          present({
            message:
              "No se pudo obtener tu ubicación automáticamente. Por favor selecciona una en el mapa.",
            duration: 3000,
            position: "top",
            color: "warning",
          });
          setLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLoadingLocation(false);
      present({
        message:
          "Geolocalización no disponible. Por favor selecciona una ubicación en el mapa.",
        duration: 3000,
        position: "top",
        color: "warning",
      });
    }
  }, [setValue, present]);

  const onSubmit = async (data: ComplaintForm) => {
    console.log("DATA", data);

    try {
      if (!user) {
        present({
          message: "Debes iniciar sesión para crear una denuncia",
          duration: 1500,
          position: "top",
        });
        return;
      }
      // 1. Subir imágenes
      const imageUrls = data.images
        ? await uploadImages(data.images as File[])
        : [];

      // 2. Guardar denuncia
      const newId = await createComplaint({
        userId: user.uid,
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
        color: "success",
      });
      reset({
        title: "",
        description: "",
        categoria: "",
        images: [],
        lat: 4.60971,
        lng: -74.08175,
      });
      setPreviewImages([]);

      // 4. Redirigir al detalle
      history.push(`/complaint/${newId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";

      present({
        message: "Error al crear la denuncia: " + message,
        duration: 2500,
        position: "top",
        color: "danger",
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
            <div>
              <Input
                label="Título"
                placeholder="Ingresa un título"
                {...register("title")}
                error={errors.title?.message}
              />
            </div>

            <div>
              {/* Descripción */}
              <TextArea
                label="Descripción"
                placeholder="Describe lo que ocurrió..."
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            {/* Categoría */}

            <CategorySelector
              label="Categoría"
              value={watch("categoria")}
              error={errors.categoria?.message}
              onChange={(value) => setValue("categoria", value)}
            />
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
            <IonCardSubtitle>
              3) Ubicación {loadingLocation && "(Obteniendo ubicación...)"}
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="mt-4">
            {errors.lat && (
              <p className="text-red-500 text-sm mb-2">
                ⚠️ {errors.lat.message}
              </p>
            )}
            <LocationPicker
              onChange={(coords) => {
                setValue("lat", coords.lat);
                setValue("lng", coords.lng);
              }}
              initialLocation={
                watch("lat") && watch("lng")
                  ? { lat: watch("lat")!, lng: watch("lng")! }
                  : undefined
              }
            />
            {watch("lat") && watch("lng") && (
              <p className="text-sm text-gray-600 mt-2">
                📍 Ubicación: {watch("lat")?.toFixed(6)},{" "}
                {watch("lng")?.toFixed(6)}
              </p>
            )}
            {errors.lat && <p className="text-red-600">{errors.lat.message}</p>}
            {errors.lng && <p className="text-red-600">{errors.lng.message}</p>}
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
