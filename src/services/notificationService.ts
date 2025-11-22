import { db } from "@/utils/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

export interface Notification {
  id?: string;
  userId: string;
  type: "welcome" | "denuncia_created" | "denuncia_updated" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
  relatedId?: string; // ID de denuncia relacionada si aplica
}

// Crear notificación en Firestore
export const createNotification = async (
  notification: Omit<Notification, "id" | "createdAt" | "read">
) => {
  try {
    const docRef = await addDoc(collection(db, "notifications"), {
      ...notification,
      read: false,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating notification:", error);
    return { success: false, error };
  }
};

// Obtener notificaciones de un usuario
export const getUserNotifications = async (userId: string) => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notification[];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

// Marcar notificación como leída
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, {
      read: true,
    });
    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { success: false, error };
  }
};

// Marcar todas las notificaciones como leídas
export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    const notifications = await getUserNotifications(userId);
    const unreadNotifications = notifications.filter((n) => !n.read);

    const promises = unreadNotifications.map((notification) =>
      markNotificationAsRead(notification.id!)
    );

    await Promise.all(promises);
    return { success: true };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return { success: false, error };
  }
};
