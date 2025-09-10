import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { locationsData, LocationData } from "@/data/locations";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2
            id="map-title"
            className="text-3xl lg:text-4xl font-bold text-card-foreground mb-6 font-serif"
          >
            {t("map_section.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("map_section.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4">
            {locationsData.map((location) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
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
                    : "bg-background border-transparent"
                }`}
              >
                <h3 className="font-semibold text-lg text-card-foreground">
                  {t(location.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(location.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 rounded-lg overflow-hidden shadow-lg h-[500px] w-full"
          >
            <MapContainer
              center={activeLocation.coords}
              zoom={6}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <ChangeView center={activeLocation.coords} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {locationsData.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coords}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="font-sans">
                      <h4 className="font-bold">{t(location.titleKey)}</h4>
                      <p>{t(location.descriptionKey)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
