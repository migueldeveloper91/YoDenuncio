// src/pages/Profile.tsx
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/services/firebaseAuth";
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { helpCircle, informationCircle, logOut, pencil } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Profile.css";
// Import package.json to display the real app version
import packageJson from "../../../package.json";

export default function Profile() {
  const { user } = useAuth();
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setToastMessage("Sesión cerrada exitosamente");
      setShowToast(true);
      // Esperar un poco para que el usuario vea el mensaje
      setTimeout(() => {
        history.replace("/login");
      }, 1000);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setToastMessage("Error al cerrar sesión. Inténtalo de nuevo.");
      setShowToast(true);
      setIsLoading(false);
    }
  };

  const getMemberSinceDate = () => {
    if (user?.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    }
    return "15/01/2025";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding bg-gray-100">
        {/* Profile Card */}
        <div className="px-6 py-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            {/* Profile Image and Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-3">
                {user?.displayName || "Juan Sánchez"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {user?.email || "juan.sanchez@example.com"}
              </p>
            </div>
          </div>

          {/* Member Since Card */}
          <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-dark)] rounded-2xl p-6 mt-4 shadow-sm">
            <p className="text-orange-100 text-sm font-medium mb-1">
              Miembro desde
            </p>
            <p className="text-white text-2xl font-bold">
              {getMemberSinceDate()}
            </p>
          </div>

          {/* Menu Options */}
          <div className="mt-6 space-y-3">
            {/* Edit Profile */}
            <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <IonIcon icon={pencil} className="text-orange-600 text-sm" />
                </div>
                <span className="text-gray-800 font-medium">Editar perfil</span>
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>

            {/* About YoDenuncio */}
            <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
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

            {/* Help and Support */}
            <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
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

          {/* Logout Button */}
          <div className="mt-8 mb-8">
            <Button
              onClick={() => setShowLogoutAlert(true)}
              type="submit"
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
