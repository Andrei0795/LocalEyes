import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { auth, db } from "../firebase/firebaseConfig";
import { addBookmark, removeBookmark, getBookmarkedEventIds } from "../firebase/firestoreBookmarks";
import { collection, query, where, getDocs } from "firebase/firestore";

const EventDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            setLoading(true);
            const q = query(collection(db, "events"), where("id", "==", Number(id)));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                setEvent({ id: doc.id, ...doc.data() });
            }
            setLoading(false);
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user || !event) return;
            const bookmarkedIds = await getBookmarkedEventIds();
            setIsBookmarked(bookmarkedIds.includes(event.id));
        };
        fetchBookmarks();
    }, [user, event]);

    const toggleBookmark = async () => {
        if (!user || !event) return;
        if (isBookmarked) {
            await removeBookmark(event.id);
            setIsBookmarked(false);
        } else {
            await addBookmark(event.id);
            setIsBookmarked(true);
        }
    };

    if (loading || !event && loading) {
        return (
            <div className="p-6 text-center text-gray-500 dark:text-gray-300">

            </div>
        );
    }

    if (!event) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Event Not Found</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 border rounded text-blue-600 hover:underline"
                >
                    ← Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-6 p-6 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-blue-600 hover:underline"
            >
                ← Back
            </button>

            <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg shadow-sm"
            />

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        🗕 {new Date(event.date).toLocaleDateString()} at {event.hour}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        🏷 Category: {event.category}
                    </p>
                </div>
                {user && (
                    <button
                        onClick={toggleBookmark}
                        className="text-sm px-3 py-1 bg-white dark:bg-gray-700 border rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        {isBookmarked ? "🔖 Bookmarked" : "➕ Bookmark"}
                    </button>
                )}
            </div>

            <p className="text-lg">{event.long_description}</p>

            <div className="space-y-1">
                <h2 className="text-xl font-semibold">📍 Location</h2>
                <p className="font-medium">{event.location_name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {event.location_address}, {event.city}
                </p>
            </div>

            <div className="h-64">
                <MapContainer
                    center={[event.location_lat, event.location_long]}
                    zoom={15}
                    className="h-full rounded-lg shadow-sm"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[event.location_lat, event.location_long]}>
                        <Popup>{event.location_name}</Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div>
                    <span className="font-medium">
                        🎟 {event.paid
                            ? `€${(typeof event.price === "number" ? event.price : Number(event.price)).toFixed(2)}`
                            : "Free"}
                    </span>
                </div>
                <div className="flex gap-4">
                    {event.ref_link && (
                        <a
                            href={event.ref_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            Reference
                        </a>
                    )}
                    {event.buy_link && (
                        <a
                            href={event.buy_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Buy Ticket
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;