import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ComplaintDetail from "./pages/ComplaintDetail/ComplaintDetail";
import Tabs from "./pages/Tabs";

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        {/* públicas */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/complaint/:id" component={ComplaintDetail} exact />

        {/* privadas */}
        <PrivateRoute path="/tabs" component={Tabs} />

        {/* redirección por defecto */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
