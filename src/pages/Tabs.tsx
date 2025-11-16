import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonBadge,
} from "@ionic/react";
import { addCircle, alertCircle, home, person } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import { useState, useEffect } from "react";

import Alerts from "./Alerts";
import Home from "./Home";
import NewReport from "./NewReport";
import Profile from "./Profile";
import "./Tabs.css";

export default function Tabs() {
  const [notificationCount, setNotificationCount] = useState(0);

  // Simulación de obtener notificaciones - aquí conectarías con tu API/servicio
  useEffect(() => {
    // Ejemplo de cómo podrías obtener las notificaciones
    const fetchNotifications = async () => {
      try {
        // Aquí harías la llamada a tu API para obtener notificaciones
        // const notifications = await getNotifications();
        // setNotificationCount(notifications.length);
        
        // Simulación - cambiar por tu lógica real
        setNotificationCount(2); // Ejemplo: 2 notificaciones pendientes
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotificationCount(0);
      }
    };

    fetchNotifications();

    // Opcional: configurar polling para actualizar notificaciones
    const interval = setInterval(fetchNotifications, 30000); // cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/profile" component={Profile} />
        <Route exact path="/tabs/alerts" component={Alerts} />
        <Route exact path="/tabs/new" component={NewReport} />
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="simple-tab-bar">
        <IonTabButton tab="home" href="/tabs/home" className="simple-tab-button">
          <IonLabel className="tab-label">Inicio</IonLabel>
        </IonTabButton>

        <IonTabButton tab="nueva" href="/tabs/new" className="simple-tab-button">
          <IonLabel className="tab-label">Nueva</IonLabel>
        </IonTabButton>

        <IonTabButton tab="alerts" href="/tabs/alerts" className="simple-tab-button alerts-tab">
          <div className="alerts-container">
            <IonLabel className="tab-label">Alertas</IonLabel>
            {notificationCount > 0 && (
              <div className="notification-badge">
                {notificationCount > 9 ? '9+' : notificationCount}
              </div>
            )}
          </div>
        </IonTabButton>

        <IonTabButton tab="profile" href="/tabs/profile" className="simple-tab-button">
          <IonLabel className="tab-label">Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
