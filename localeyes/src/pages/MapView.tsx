import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapRefSetter from "../components/MapRefSetter";
import { mapState } from "../state/sessionMapState";

const categories = ["All", "Tech", "Music", "Food", "Art", "Fitness", "Business"];

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, _setMapCenter] = useState<[number, number]>(mapState.center);
  const [mapZoom, _setMapZoom] = useState<number>(mapState.zoom);
  const [selectedCategory, setSelectedCategory] = useState<string>(mapState.selectedCategory);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) => selectedCategory === "All" || event.category === selectedCategory
  );

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-gray-900 z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 text-sm rounded-full border font-medium transition whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              mapState.selectedCategory = cat;
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Leaflet map */}
      <div className="flex-1">
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 p-4">Loading map...</div>
        ) : (
          <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full z-0">
            <MapRefSetter mapRef={mapRef} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            />

            {filteredEvents.map((event) => (
              <Marker
                key={event.id}
                position={[event.location_lat, event.location_long]}
              >
                <Popup>
                  <div className="text-sm max-w-[200px]">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold">{event.title}</h3>
                    <button
                      className="text-blue-600 underline text-sm mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        const center = mapRef.current?.getCenter();
                        const zoom = mapRef.current?.getZoom();

                        // Persist to session state
                        mapState.center = [center.lat, center.lng];
                        mapState.zoom = zoom;
                        mapState.selectedCategory = selectedCategory;

                        navigate(`/event/${event.id}`);
                      }}
                    >
                      Read more →
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapView;
