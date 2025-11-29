import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { addCircle, alertCircle, home, person } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import { getUserNotifications } from "@/services/notificationService";
import { useComplaintsStore } from "@/stores/useComplaintsStore";
import useUserStore from "@/stores/userStore";
import AboutUs from "./AboutUs/AboutUs";
import Alerts from "./Alerts/Alerts";
import NewReport from "./CreateComplaint/index";
import HelpAndSupport from "./HelpAndSupport/HelpAndSupport";
import Home from "./Home/Home";
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";

export default function Tabs() {
  const [notificationCount, setNotificationCount] = useState(0);
  const { fetchAll, all } = useComplaintsStore();
  const user = useUserStore((s) => s.user);
  console.log(all);

  const loadUnreadCount = async () => {
    if (!user) return;
    const notifications = await getUserNotifications(user.uid);
    const unreadCount = notifications.filter((n) => !n.read).length;
    setNotificationCount(unreadCount);
  };

  useEffect(() => {
    fetchAll();
    loadUnreadCount();

    // Actualizar contador cada 30 segundos
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/profile" component={Profile} />
        <Route exact path="/tabs/alerts" component={Alerts} />
        <Route exact path="/tabs/new" component={NewReport} />
        <Route exact path="/tabs/about" component={AboutUs} />
        <Route exact path="/tabs/help" component={HelpAndSupport} />
        <Route exact path="/tabs/EditProfile" component={EditProfile} />

        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>

        <IonTabButton tab="new" href="/tabs/new">
          <IonIcon icon={addCircle} />
          <IonLabel>Nueva</IonLabel>
        </IonTabButton>

        <IonTabButton tab="alerts" href="/tabs/alerts">
          <IonIcon icon={alertCircle} />
          <IonLabel>Alertas</IonLabel>

          {notificationCount > 0 && (
            <IonBadge color="danger">
              {notificationCount > 9 ? "9+" : notificationCount}
            </IonBadge>
          )}
        </IonTabButton>

        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={person} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
