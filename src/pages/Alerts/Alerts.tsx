import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonCheckbox,
  RefresherEventDetail,
  useIonToast,
} from "@ionic/react";
import {
  notificationsOutline,
  mailOpenOutline,
  trashOutline,
  checkmarkDoneOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  Notification,
} from "@/services/notificationService";
import useUserStore from "@/stores/userStore";
import { useHistory } from "react-router";

export default function Alerts() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((s) => s.user);
  const [present] = useIonToast();
  const history = useHistory();

  const loadNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getUserNotifications(user.uid);
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications:", error);
      present({
        message: "Error al cargar notificaciones",
        duration: 2000,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadNotifications();
    event.detail.complete();
  };

  const handleMarkAsRead = async (notificationId: string, event?: any) => {
    // Prevenir navegación si se hace clic en el checkbox
    if (event) {
      event.stopPropagation();
    }
    
    const result = await markNotificationAsRead(notificationId);
    if (result.success) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      present({
        message: "Notificación marcada como leída",
        duration: 1000,
        color: "success",
      });
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user) return;

    const result = await markAllNotificationsAsRead(user.uid);
    if (result.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      present({
        message: "Todas las notificaciones marcadas como leídas",
        duration: 1500,
        color: "success",
      });
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Navegar si tiene una denuncia relacionada
    if (notification.relatedId) {
      history.push(`/complaint/${notification.relatedId}`);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Ahora";
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} h`;
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Notificaciones
            {unreadCount > 0 && (
              <IonBadge color="danger" className="ml-2">
                {unreadCount}
              </IonBadge>
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* Botón marcar todas como leídas */}
        {unreadCount > 0 && (
          <div className="p-4 bg-gray-50">
            <IonButton
              expand="block"
              fill="outline"
              size="small"
              onClick={handleMarkAllAsRead}
            >
              <IonIcon slot="start" icon={checkmarkDoneOutline} />
              Marcar todas como leídas
            </IonButton>
          </div>
        )}

        {loading && notifications.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Cargando notificaciones...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 p-4">
            <IonIcon
              icon={notificationsOutline}
              className="text-6xl text-gray-300 mb-4"
            />
            <p className="text-gray-500 text-center">
              No tienes notificaciones
            </p>
          </div>
        ) : (
          <IonList>
            {notifications.map((notification) => (
              <IonItem
                key={notification.id}
                button={!!notification.relatedId}
                onClick={() => handleNotificationClick(notification)}
                className={notification.read ? "opacity-60" : ""}
              >
                {/* Checkbox para marcar como leída */}
                <IonCheckbox
                  slot="start"
                  checked={notification.read}
                  onIonChange={(e) => {
                    e.stopPropagation();
                    if (!notification.read) {
                      handleMarkAsRead(notification.id!, e);
                    }
                  }}
                  disabled={notification.read}
                />
                
                <IonIcon
                  icon={notification.read ? mailOpenOutline : notificationsOutline}
                  color={notification.read ? "medium" : "primary"}
                  className="text-2xl ml-2"
                />
                
                <IonLabel className="ml-2">
                  <h2 className="font-semibold">{notification.title}</h2>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <IonNote color="medium" className="text-xs mt-1">
                    {formatDate(notification.createdAt)}
                  </IonNote>
                </IonLabel>
                
                {!notification.read && (
                  <IonBadge color="primary" slot="end">
                    Nueva
                  </IonBadge>
                )}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
