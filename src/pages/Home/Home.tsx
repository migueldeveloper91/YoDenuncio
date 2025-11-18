import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { useEffect } from "react";
import { useComplaintsStore } from "@/stores/useComplaintsStore";
import useUserStore from "@/stores/userStore";
import { getThumbnailUrl } from "@/utils/cloudinaryHelpers";

export default function Home() {
  const user = useUserStore((s) => s.user);
  const { mine: complaints, loading, fetchMine } = useComplaintsStore();

  useEffect(() => {
    if (user?.id) {
      fetchMine(user.id);
    }
  }, [user?.id, fetchMine]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mis Denuncias</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Denuncias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {complaints.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>No tienes denuncias creadas</p>
            <p style={{ fontSize: '14px', color: 'gray' }}>
              Crea tu primera denuncia desde la pestaña "Nueva"
            </p>
          </div>
        ) : (
          <IonList>
            {complaints.slice(0, 10).map((complaint) => (
              <IonCard key={complaint.id}>
                <IonCardHeader>
                  <IonCardTitle>{complaint.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p><strong>Categoría:</strong> {complaint.categoria}</p>
                  <p><strong>Descripción:</strong> {complaint.description}</p>
                  <p><strong>Ubicación:</strong> {complaint.location.lat.toFixed(4)}, {complaint.location.lng.toFixed(4)}</p>
                  {complaint.images && complaint.images.length > 0 && (
                    <div>
                      <p><strong>Imágenes:</strong> {complaint.images.length}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {complaint.images.map((imageUrl, idx) => (
                          <img 
                            key={idx}
                            src={getThumbnailUrl(imageUrl)}
                            alt={`Evidencia ${idx + 1}`}
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <p style={{ fontSize: '12px', color: 'gray' }}>
                    {complaint.createdAt?.toDate?.()?.toLocaleDateString() || 'Fecha desconocida'}
                  </p>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
