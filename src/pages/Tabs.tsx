import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { addCircle, alertCircle, home, person } from "ionicons/icons";
import { Redirect, Route } from "react-router";

import Alerts from "./Alerts";
import Home from "./Home";
import NewReport from "./NewReport";
import Profile from "./Profile";

export default function Tabs() {
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

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>

        <IonTabButton tab="alerts" href="/tabs/alerts">
          <IonIcon icon={alertCircle} />
          <IonLabel>Alertas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="new" href="/tabs/new">
          <IonIcon icon={addCircle} />
          <IonLabel>Denunciar</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={person} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
