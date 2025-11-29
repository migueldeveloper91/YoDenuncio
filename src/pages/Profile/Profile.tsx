// src/pages/Profile.tsx
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/firebaseAuth";
import { db } from "@/utils/firebaseConfig";
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { helpCircle, informationCircle, logOut, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import packageJson from "../../../package.json";
import "./Profile.css";

interface UserProfile {
  fullName?: string;
  name?: string;
  photoURL?: string;
  email?: string;
}

export default function Profile() {
  const { user } = useAuth();
  const history = useHistory();

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // 🔥 Cargar datos del usuario desde Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      }

      setLoading(false);
    };

    loadUserData();
  }, [user]);

  // 🔥 Función para cerrar sesión
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setToastMessage("Sesión cerrada exitosamente");
      setShowToast(true);

      setTimeout(() => {
        history.replace("/login");
      }, 1000);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setToastMessage("Error al cerrar sesión");
      setShowToast(true);
      setIsLoading(false);
    }
  };

  const getMemberSinceDate = () => {
    if (user?.metadata?.creationTime) {
      const d = new Date(user.metadata.creationTime);
      return `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
      ).padStart(2, "0")}/${d.getFullYear()}`;
    }
    return "---";
  };

  if (loading) {
    return <IonLoading isOpen={true} message="Cargando perfil..." />;
  }

  const displayName =
    userData?.fullName || userData?.name || user?.displayName || "Usuario";

  const photoURL =
    userData?.photoURL ||
    user?.photoURL ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-no-padding bg-gray-100">
        <div className="px-6 py-4">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mt-3">
                {displayName}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {user?.email || "Sin email"}
              </p>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-dark)] rounded-2xl p-6 mt-4 shadow-sm">
            <p className="text-orange-100 text-sm font-medium mb-1">
              Miembro desde
            </p>
            <p className="text-white text-2xl font-bold">
              {getMemberSinceDate()}
            </p>
          </div>

          {/* Options */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => history.push("/tabs/EditProfile")}
              className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <IonIcon icon={pencil} className="text-orange-600 text-sm" />
                </div>
                <span className="text-gray-800 font-medium">Editar perfil</span>
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>

            <button
              onClick={() => history.push("/tabs/about")}
              className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <IonIcon
                    icon={informationCircle}
                    className="text-blue-600 text-sm"
                  />
                </div>
                <span className="text-gray-800 font-medium">
                  Acerca de YoDenuncio
                </span>
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>

            <button
              onClick={() => history.push("/tabs/help")}
              className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <IonIcon
                    icon={helpCircle}
                    className="text-pink-600 text-sm"
                  />
                </div>
                <span className="text-gray-800 font-medium">
                  Ayuda y soporte
                </span>
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
          </div>

          {/* Logout */}
          <div className="mt-8 mb-8">
            <Button
              onClick={() => setShowLogoutAlert(true)}
              label="Cerrar sesión"
              variant="danger"
              icon={logOut}
              isLoading={isLoading}
            />
          </div>

          {/* Version */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">V {packageJson.version}</p>
          </div>
        </div>

        {/* Logout Confirmation Alert */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          cssClass="logout-alert"
          header="Cerrar sesión"
          message="¿Estás seguro de que deseas cerrar sesión?"
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "alert-button-cancel",
            },
            {
              text: "Cerrar sesión",
              role: "confirm",
              cssClass: "alert-button-confirm",
              handler: () => {
                handleLogout();
              },
            },
          ]}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
}
