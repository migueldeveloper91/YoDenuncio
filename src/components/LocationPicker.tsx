import { GoogleMap } from "@capacitor/google-maps";
import { IonButton, IonIcon } from "@ionic/react";
import { locateOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

interface LocationPickerProps {
  onChange: (coords: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function LocationPicker({ onChange, initialLocation }: LocationPickerProps) {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<GoogleMap | null>(null);

  const [markerId, setMarkerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const defaultCenter = { lat: -12.0464, lng: -77.0428 };
  const initialCenter = initialLocation || defaultCenter;

  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      if (!mapDiv.current || cancelled) return;

      const map = await GoogleMap.create({
        id: "location-map",
        element: mapDiv.current,
        apiKey: "AIzaSyCP32R8QUUoOqYvvHRXylJ7FIVuaEYSkIQ", // 🔥 obligatorio en v6
        forceCreate: true,
        config: {
          center: initialCenter,
          zoom: 14,
        },
      });

      if (cancelled) return;

      mapInstance.current = map;

      // Colocar marcador inicial si hay ubicación
      if (initialLocation) {
        const initialMarkerId = await map.addMarker({
          coordinate: initialLocation,
        });
        setMarkerId(initialMarkerId);
      }

      map.setOnMapClickListener(async (event) => {
        const { latitude, longitude } = event;

        onChange({ lat: latitude, lng: longitude });

        if (markerId) {
          await map.removeMarker(markerId);
        }

        const newMarkerId = await map.addMarker({
          coordinate: { lat: latitude, lng: longitude },
        });

        setMarkerId(newMarkerId);
      });
    };

    setTimeout(initMap, 250);

    return () => {
      cancelled = true;
      mapInstance.current?.destroy();
    };
  }, [initialLocation]);

  const handleGetCurrentLocation = async () => {
    setLoading(true);
    try {
      if (!navigator.geolocation) {
        alert("Geolocalización no está disponible en tu navegador");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const coords = { lat: latitude, lng: longitude };

          // Actualizar el mapa
          await mapInstance.current?.setCamera({
            coordinate: coords,
            zoom: 16,
            animate: true,
          });

          // Actualizar el marcador
          if (markerId) {
            await mapInstance.current?.removeMarker(markerId);
          }

          const newMarkerId = await mapInstance.current?.addMarker({
            coordinate: coords,
          });

          setMarkerId(newMarkerId || null);
          onChange(coords);
          setLoading(false);
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          alert("No se pudo obtener tu ubicación. Verifica los permisos.");
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border bg-gray-100 z-30 relative">
      <div ref={mapDiv} className="w-full h-full min-h-[260px] z-10" />
      
      {/* Botón de ubicación actual */}
      <IonButton
        className="absolute top-2 right-2 z-50"
        size="default"
        color="light"
        onClick={handleGetCurrentLocation}
        disabled={loading}
      >
        <IonIcon slot="icon-only" icon={locateOutline} />
      </IonButton>
    </div>
  );
}
