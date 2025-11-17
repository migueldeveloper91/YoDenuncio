import { IonIcon, IonLabel, IonTabButton } from "@ionic/react";
import "./TabItem.css";

interface TabItemProps {
  tab: string;
  href: string;
  icon: unknown; // Ícono SVG de ionicons (objeto)
  label: string;
  notificationCount?: number;
}

export default function TabItem({
  tab,
  href,
  icon,
  label,
  notificationCount = 0,
}: TabItemProps) {
  const hasNotifications = notificationCount > 0 && tab === "alerts";

  return (
    <IonTabButton
      tab={tab}
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        padding: "8px 4px",
        minHeight: "60px",
        flex: 1,
        border: "none",
        background: "transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonIcon
          icon={icon as unknown as string}
          style={{
            fontSize: "24px",
            color: "#9ca3af",
            transition: "color 0.3s ease",
          }}
          className="tab-icon"
        />
        {hasNotifications && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-12px",
              backgroundColor: "#E53935",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "700",
              border: "2px solid white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {notificationCount > 9 ? "9+" : notificationCount}
          </div>
        )}
      </div>
      <IonLabel
        style={{
          fontSize: "12px",
          margin: 0,
          color: "#9ca3af",
          transition: "color 0.3s ease",
          fontWeight: "normal",
        }}
        className="tab-label"
      >
        {label}
      </IonLabel>
    </IonTabButton>
  );
}
