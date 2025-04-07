import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { getBookmarkedEventIds } from "../firebase/firestoreBookmarks";
import EventCard from "../components/EventCard";

const Bookmarks: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setLoading(true);
        const ids = await getBookmarkedEventIds();
        const querySnapshot = await getDocs(collection(db, "events"));
        const allEvents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const filtered = allEvents.filter((event) => ids.includes(event.id));
        setBookmarkedEvents(filtered);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        🔒 Please log in to view your bookmarked events.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        ⏳ Loading your bookmarks...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔖 Your Bookmarked Events</h1>
      {bookmarkedEvents.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">You haven’t bookmarked any events yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarkedEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;