import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home"; // si existe

import "@ionic/react/css/core.css";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/home" component={Home} />
        {/* Redirigir raíz a login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
