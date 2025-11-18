import { IonSkeletonText } from "@ionic/react";

export default function ComplaintItemSkeleton() {
  return (
    <div
      className="w-full bg-white rounded-xl p-4 shadow-sm flex gap-4 items-start"
      style={{ height: "120px" }}
    >
      {/* 🟥 COLUMNA IZQUIERDA (cuadro categoría) */}
      <div
        className="flex flex-col items-center justify-center rounded-xl"
        style={{
          width: "85px",
          height: "100%",
          backgroundColor: "var(--ion-color-light)",
        }}
      >
        <IonSkeletonText
          animated
          style={{ width: "40px", height: "40px", borderRadius: "8px" }}
        />
        <IonSkeletonText
          animated
          style={{
            width: "60px",
            height: "12px",
            marginTop: 10,
            borderRadius: "8px",
          }}
        />
      </div>

      {/* 🟦 COLUMNA DERECHA (texto) */}
      <div className="flex-1 flex flex-col justify-between h-full py-1">
        <IonSkeletonText
          animated
          style={{ width: "70%", height: "18px", borderRadius: "8px" }}
        />
        <IonSkeletonText
          animated
          style={{ width: "90%", height: "14px", borderRadius: "8px" }}
        />
        <IonSkeletonText
          animated
          style={{ width: "85%", height: "14px", borderRadius: "8px" }}
        />

        <IonSkeletonText
          animated
          style={{ width: "40%", height: "12px", marginTop: 6 }}
        />
      </div>
    </div>
  );
}
