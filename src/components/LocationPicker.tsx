import { GoogleMap } from "@capacitor/google-maps";
import { useEffect, useRef, useState } from "react";

interface LocationPickerProps {
  onChange: (coords: { lat: number; lng: number }) => void;
}

export default function LocationPicker({ onChange }: LocationPickerProps) {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<GoogleMap | null>(null);

  const [markerId, setMarkerId] = useState<string | null>(null);

  const initialCenter = { lat: -12.0464, lng: -77.0428 };

  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      if (!mapDiv.current || cancelled) return;

      const map = await GoogleMap.create({
        id: "location-map",
        element: mapDiv.current,
        apiKey: "AIzaSyA8byqPKDCSWZnLKVyVMShGsL27xEUY7i8", // 🔥 obligatorio en v6
        forceCreate: true,
        config: {
          center: initialCenter,
          zoom: 14,
        },
      });

      if (cancelled) return;

      mapInstance.current = map;

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
  }, []);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border bg-gray-100 z-30">
      <div ref={mapDiv} className="w-full h-full min-h-[260px] z-10" />
    </div>
  );
}
