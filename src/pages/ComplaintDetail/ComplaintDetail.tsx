import { db } from "@/utils/firebaseConfig";
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  categoria: string;
  location: { lat: number; lng: number };
  images: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar denuncia desde Firestore
  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true);
      const ref = doc(db, "complaints", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setComplaint({
          id: snap.id,
          ...(snap.data() as Omit<Complaint, "id">),
        });
      }

      setLoading(false);
    };

    fetchComplaint();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" />
          </IonButtons>
          <IonTitle>Detalle de denuncia</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4">
        <IonCard className="rounded-lg p-3">
          <IonCardContent>
            {/* 🔥 TITULO */}
            {loading ? (
              <IonSkeletonText
                animated
                style={{ width: "60%", height: "24px" }}
              />
            ) : (
              <h1 className="text-xl font-bold">📄 {complaint?.title}</h1>
            )}

            {/* 🔥 DESCRIPCIÓN */}
            {loading ? (
              <>
                <IonSkeletonText animated style={{ width: "100%" }} />
                <IonSkeletonText animated style={{ width: "90%" }} />
                <IonSkeletonText animated style={{ width: "80%" }} />
              </>
            ) : (
              <p className="mt-2 text-gray-700">{complaint?.description}</p>
            )}

            {/* 🔥 CATEGORÍA */}
            <div className="mt-4">
              {loading ? (
                <IonSkeletonText animated style={{ width: "40%" }} />
              ) : (
                <p className="font-semibold text-gray-700">
                  📌 Categoría: {complaint?.categoria}
                </p>
              )}
            </div>

            {/* 🔥 CARRUSEL DE IMÁGENES */}
            <div className="mt-4">
              {loading ? (
                <div className="flex gap-3 overflow-x-auto">
                  <IonSkeletonText
                    animated
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "12px",
                    }}
                  />
                  <IonSkeletonText
                    animated
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              ) : complaint?.images.length ? (
                <>
                  <p className="mt-2 text-gray-700"> 🖼️ Imagenes</p>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                    {complaint.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="min-w-[250px] h-[300px] object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Sin imágenes</p>
              )}
            </div>

            {/* 🔥 UBICACIÓN */}
            <div className="mt-4">
              {loading ? (
                <IonSkeletonText
                  animated
                  style={{ width: "50%", height: "20px" }}
                />
              ) : (
                <p className="text-gray-700">
                  📍 Ubicación: {complaint?.location.lat},{" "}
                  {complaint?.location.lng}
                </p>
              )}
            </div>

            {/* 🔥 FECHA */}
            <div className="mt-4">
              {loading ? (
                <IonSkeletonText
                  animated
                  style={{ width: "40%", height: "22px" }}
                />
              ) : (
                <p className="text-gray-500">
                  📅 Creado en: {complaint?.createdAt.toDate().toLocaleString()}
                </p>
              )}
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
