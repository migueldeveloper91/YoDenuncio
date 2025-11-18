import ComplaintsSkeleton from "@/components/ComplaintsSkeleton";
import { useComplaintsStore } from "@/stores/useComplaintsStore";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// 🔥 Iconos por categoría
const categoryEmoji: Record<string, string> = {
  hurto: "🚨",
  asalto: "🧨",
  violencia: "✋",
  acoso: "⚠️",
  vandalismo: "🧱",
  accidente: "🚑",
  conduccion_peligrosa: "🏎️",
  rinas: "🥊",
  ruido: "🔊",
  alumbrado: "💡",
  basura: "🗑️",
  via_mal_estado: "🚧",
};

// 🔤 Mejorar texto de categoría
const formatCategory = (cat: string) => {
  if (!cat) return "";
  return cat.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()); // Capitaliza cada palabra
};

export default function Home() {
  const { all, fetchAll, loading } = useComplaintsStore();
  const history = useHistory();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const formatDate = (ts: Timestamp | Date | null | undefined): string => {
    if (!ts) return "";

    const date = ts instanceof Timestamp ? ts.toDate() : ts;
    return date.toLocaleDateString();
  };

  const shortText = (text: string, max = 80) =>
    text.length > max ? text.substring(0, max) + "…" : text;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Denuncias recientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <ComplaintsSkeleton count={5} />}

        {!loading &&
          all.map((c) => (
            <IonCard
              key={c.id}
              button
              onClick={() => history.push(`/complaint/${c.id}`)}
              className="rounded-xl shadow-sm m-4"
            >
              <IonCardContent>
                <div className="flex gap-4 items-center">
                  {/* 🟦 IZQUIERDA: ICONO + CATEGORÍA EN CUADRO */}
                  <div
                    className="
                      w-24                       /* ancho fijo */
                      h-full 
                      bg-[var(--color-secondary)] 
                      rounded-xl 
                      flex flex-col 
                      items-center 
                      justify-center 
                      py-3
                      shadow-sm
                    "
                  >
                    <span className="text-4xl">
                      {categoryEmoji[c.categoria] || "📌"}
                    </span>

                    <span className="text-[11px] font-medium text-center mt-2 px-2 text-black">
                      {formatCategory(c.categoria)}
                    </span>
                  </div>

                  {/* 🟥 DERECHA: TÍTULO + DESCRIPCIÓN + FECHA */}
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">
                      {shortText(c.title, 50)}
                    </h2>

                    <p className="text-gray-700 text-sm mt-1">
                      {shortText(c.description, 90)}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      📅 {formatDate(c.createdAt)}
                    </p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
}
