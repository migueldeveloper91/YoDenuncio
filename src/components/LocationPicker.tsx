import { IonButton, IonIcon } from "@ionic/react";
import { locateOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix para los iconos de Leaflet (compatibles con web y Android)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface LocationPickerProps {
  onChange: (coords: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function LocationPicker({ onChange, initialLocation }: LocationPickerProps) {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerInstance = useRef<L.Marker | null>(null);
  const accuracyCircleInstance = useRef<L.Circle | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const defaultCenter: [number, number] = [-12.0464, -77.0428]; // Lima, Perú
  const initialCenter: [number, number] = initialLocation 
    ? [initialLocation.lat, initialLocation.lng] 
    : defaultCenter;

  useEffect(() => {
    if (!mapDiv.current) return;

    // Prevenir múltiples instancias del mapa
    if (mapInstance.current) {
      return;
    }

    // Delay para asegurar que el contenedor tenga dimensiones
    const timer = setTimeout(() => {
      if (!mapDiv.current) return;

      // Crear el mapa con OpenStreetMap
      const map = L.map(mapDiv.current, {
        center: initialCenter,
        zoom: 14,
        zoomControl: true,
      });

      // Agregar capa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstance.current = map;

      // Forzar actualización del tamaño del mapa
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Agregar marcador inicial si existe ubicación
      if (initialLocation) {
        const marker = L.marker([initialLocation.lat, initialLocation.lng], {
          draggable: true,
        }).addTo(map);

        marker.on("dragend", () => {
          const position = marker.getLatLng();
          onChange({ lat: position.lat, lng: position.lng });
        });

        markerInstance.current = marker;
      }

      // Manejar clic en el mapa
      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        onChange({ lat, lng });

        // Remover marcador anterior si existe
        if (markerInstance.current) {
          map.removeLayer(markerInstance.current);
        }

        // Agregar nuevo marcador
        const marker = L.marker([lat, lng], {
          draggable: true,
        }).addTo(map);

        marker.on("dragend", () => {
          const position = marker.getLatLng();
          onChange({ lat: position.lat, lng: position.lng });
        });

        markerInstance.current = marker;
      });
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const updateLocation = (position: GeolocationPosition) => {
    const { latitude, longitude, accuracy: posAccuracy } = position.coords;
    const coords = { lat: latitude, lng: longitude };

    setAccuracy(posAccuracy);

    // Actualizar vista del mapa
    if (mapInstance.current) {
      mapInstance.current.setView([latitude, longitude], 17);

      // Remover marcador y círculo anteriores
      if (markerInstance.current) {
        mapInstance.current.removeLayer(markerInstance.current);
      }
      if (accuracyCircleInstance.current) {
        mapInstance.current.removeLayer(accuracyCircleInstance.current);
      }

      // Agregar círculo de precisión
      const accuracyCircle = L.circle([latitude, longitude], {
        radius: posAccuracy,
        color: '#4285F4',
        fillColor: '#4285F4',
        fillOpacity: 0.15,
        weight: 2,
      }).addTo(mapInstance.current);

      accuracyCircleInstance.current = accuracyCircle;

      // Agregar nuevo marcador
      const marker = L.marker([latitude, longitude], {
        draggable: true,
      }).addTo(mapInstance.current);

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        onChange({ lat: position.lat, lng: position.lng });
      });

      markerInstance.current = marker;
    }

    onChange(coords);
  };

  const handleGetCurrentLocation = async () => {
    setLoading(true);
    try {
      if (!navigator.geolocation) {
        alert("Geolocalización no está disponible en tu navegador");
        setLoading(false);
        return;
      }

      // Obtener ubicación única con alta precisión
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocation(position);
          setLoading(false);
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          alert("No se pudo obtener tu ubicación. Verifica los permisos.");
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleToggleTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no está disponible en tu navegador");
      return;
    }

    if (isTracking && watchIdRef.current !== null) {
      // Detener seguimiento
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsTracking(false);
      setAccuracy(null);
      
      // Remover círculo de precisión
      if (accuracyCircleInstance.current && mapInstance.current) {
        mapInstance.current.removeLayer(accuracyCircleInstance.current);
        accuracyCircleInstance.current = null;
      }
    } else {
      // Iniciar seguimiento en tiempo real
      setIsTracking(true);
      setLoading(true);

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          updateLocation(position);
          setLoading(false);
        },
        (error) => {
          console.error("Error en seguimiento:", error);
          setLoading(false);
          setIsTracking(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      watchIdRef.current = watchId;
    }
  };

  // Cleanup del watchPosition al desmontar
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden border bg-gray-100 z-30 relative" style={{ height: '400px' }}>
      <div ref={mapDiv} className="w-full h-full z-10" style={{ minHeight: '400px' }} />
      
      {/* Botones de control */}
      <div className="absolute top-2 right-2 z-50 flex flex-col gap-2">
        {/* Botón de ubicación única */}
        <IonButton
          size="default"
          color="light"
          onClick={handleGetCurrentLocation}
          disabled={loading || isTracking}
          title="Obtener ubicación actual"
        >
          <IonIcon slot="icon-only" icon={locateOutline} />
        </IonButton>

        {/* Botón de seguimiento en tiempo real */}
        <IonButton
          size="default"
          color={isTracking ? "primary" : "light"}
          onClick={handleToggleTracking}
          disabled={loading}
          title={isTracking ? "Detener seguimiento" : "Seguimiento en tiempo real"}
        >
          <IonIcon 
            slot="icon-only" 
            icon={locateOutline}
            className={isTracking ? "animate-pulse" : ""}
          />
        </IonButton>
      </div>

      {/* Indicador de precisión */}
      {accuracy !== null && (
        <div className="absolute bottom-2 left-2 z-50 bg-white px-3 py-2 rounded-lg shadow-md text-xs">
          <span className="font-semibold">Precisión: </span>
          <span className={accuracy < 20 ? "text-green-600" : accuracy < 50 ? "text-yellow-600" : "text-orange-600"}>
            ±{accuracy.toFixed(1)}m
          </span>
        </div>
      )}
    </div>
  );
}
