// src/pages/Home.tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function Alerts() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Alerts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Contenido de Alerts</IonContent>
    </IonPage>
  );
}
