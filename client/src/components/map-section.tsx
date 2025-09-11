import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { locationsData, LocationData } from "@/data/locations";
import { Icon } from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [center, map]);
  return null;
}

export function MapSection() {
  const { t } = useTranslation();
  const [activeLocation, setActiveLocation] = useState<LocationData>(
    locationsData[0]
  );

  return (
    <section id="map" className="py-20 bg-card" aria-labelledby="map-title">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2
            id="map-title"
            className="text-3xl lg:text-4xl font-bold text-card-foreground mb-6 font-serif"
          >
            {t("map_section.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("map_section.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4">
            {locationsData.map((location) => (
              <div
                key={location.id}
                onClick={() => setActiveLocation(location)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setActiveLocation(location)
                }
                role="button"
                tabIndex={0}
                aria-pressed={activeLocation.id === location.id}
                className={`p-4 rounded-lg cursor-pointer border-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeLocation.id === location.id
                    ? "bg-muted border-primary"
                    : "bg-background border-transparent hover:border-muted"
                }`}
              >
                <h3 className="font-semibold text-lg text-card-foreground">
                  {t(location.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(location.descriptionKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-lg h-[500px] w-full">
            <MapContainer
              center={activeLocation.coords}
              zoom={6}
              scrollWheelZoom={false}
              className="h-full w-full"
              style={{ height: "500px" }}
            >
              <MapController center={activeLocation.coords} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {locationsData.map((location) => (
                <Marker key={location.id} position={location.coords}>
                  <Popup>
                    <div className="font-sans">
                      <h4 className="font-bold">{t(location.titleKey)}</h4>
                      <p>{t(location.descriptionKey)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
