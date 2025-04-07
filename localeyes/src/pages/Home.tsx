import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const featuredEvents = events.slice(0, 3); // Pick first 3 as featured events

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Discover Events Around You</h1>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          From tech meetups to food festivals — all in one place. Explore what's happening in your city.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/explore")}
            className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100"
          >
            🔍 Explore Events
          </button>
          <button
            onClick={() => navigate("/map")}
            className="bg-white text-purple-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100"
          >
            🗺️ View Map
          </button>
        </div>
      </section>

      {/* Category Preview */}
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {["Tech", "Music", "Food", "Art", "Fitness", "Business"].map((cat) => (
            <button
              key={cat}
              onClick={() => navigate("/explore", { state: { category: cat } })}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📅 {new Date(event.date).toLocaleDateString()} — {event.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
          <div>
            <div className="text-4xl mb-2">🔎</div>
            <h4 className="font-semibold text-lg mb-2">Search Events</h4>
            <p className="text-sm">Find events in your area or by category of interest.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">📍</div>
            <h4 className="font-semibold text-lg mb-2">View on Map</h4>
            <p className="text-sm">See nearby events plotted on an interactive map.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🎟️</div>
            <h4 className="font-semibold text-lg mb-2">Join or Buy Tickets</h4>
            <p className="text-sm">Get directions or ticket links to attend in person.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;