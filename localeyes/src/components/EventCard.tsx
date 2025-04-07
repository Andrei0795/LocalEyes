import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import {
  addBookmark,
  removeBookmark,
  getBookmarkedEventIds,
} from "../firebase/firestoreBookmarks";

interface EventCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  category,
  description,
  image,
  date,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      const bookmarkedIds = await getBookmarkedEventIds();
      setIsBookmarked(bookmarkedIds.includes(id));
    };
    fetchBookmarks();
  }, [user, id]);

  const toggleBookmark = async () => {
    if (!user) return;
    if (isBookmarked) {
      await removeBookmark(id);
      setIsBookmarked(false);
    } else {
      await addBookmark(id);
      setIsBookmarked(true);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-white dark:bg-gray-800 relative">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <Link to={`/event/${id}`}>
          <h2 className="font-semibold text-lg mb-1">{title}</h2>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Category: {category}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          📅 {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {description}
        </p>
      </div>
      {user && (
        <button
          onClick={toggleBookmark}
          className="absolute top-2 right-2 bg-white dark:bg-gray-700 text-sm px-2 py-1 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          {isBookmarked ? "🔖 Bookmarked" : "➕ Bookmark"}
        </button>
      )}
    </div>
  );
};

export default EventCard;