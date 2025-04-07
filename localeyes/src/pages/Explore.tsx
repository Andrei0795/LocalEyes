import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import EventCard from "../components/EventCard";

const categories = ["All", "Tech", "Music", "Food", "Art", "Fitness", "Business"];

const Explore: React.FC = () => {
  const location = useLocation();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const stateCategory = location.state?.category;
    return categories.includes(stateCategory) ? stateCategory : "All";
  });

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌎 Explore Events</h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-medium transition ${selectedCategory === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg">Loading events...</div>
      ) : (
        <div
          key={selectedCategory}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-slide-fade"
        >
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
              😔 No events found in this category.
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                description={event.description}
                image={event.image}
                date={event.date}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
