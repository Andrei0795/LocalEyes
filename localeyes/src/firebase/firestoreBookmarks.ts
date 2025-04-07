import { doc, setDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Add bookmark
export const addBookmark = async (eventId: string) => {
  const user = auth.currentUser;
  if (!user || typeof user.uid !== "string") return;

  const userDocRef = doc(db, "users", user.uid);

  await setDoc(userDocRef, {
    bookmarks: arrayUnion(eventId),
  }, { merge: true });
};

// Remove bookmark
export const removeBookmark = async (eventId: string) => {
  const user = auth.currentUser;
  if (!user || typeof user.uid !== "string") return;

  const userDocRef = doc(db, "users", user.uid);

  await setDoc(userDocRef, {
    bookmarks: arrayRemove(eventId),
  }, { merge: true });
};

// Get all bookmarked event IDs
export const getBookmarkedEventIds = async (): Promise<string[]> => {
  const user = auth.currentUser;
  if (!user || typeof user.uid !== "string") return [];

  const docSnap = await getDoc(doc(db, "users", user.uid));
  return (docSnap.exists() ? docSnap.data()?.bookmarks : []) || [];
};