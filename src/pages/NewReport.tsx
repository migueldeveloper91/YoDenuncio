// src/pages/Home.tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function NewReport() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NewReport</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Contenido de NewReport</IonContent>
    </IonPage>
  );
}
