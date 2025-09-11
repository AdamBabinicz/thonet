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
    <section id="map" className="bg-card py-20" aria-labelledby="map-title">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2
            id="map-title"
            className="font-serif text-3xl font-bold text-card-foreground mb-6 lg:text-4xl"
          >
            {t("map_section.title")}
          </h2>
          <p className="text-xl leading-relaxed text-muted-foreground">
            {t("map_section.description")}
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
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
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeLocation.id === location.id
                    ? "border-primary bg-muted"
                    : "border-transparent bg-background hover:border-muted"
                }`}
              >
                <h3 className="text-lg font-semibold text-card-foreground">
                  {t(location.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(location.descriptionKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="h-[500px] w-full overflow-hidden rounded-lg shadow-lg lg:col-span-2">
            <MapContainer
              center={activeLocation.coords}
              zoom={6}
              scrollWheelZoom={false}
              className="h-full w-full"
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
