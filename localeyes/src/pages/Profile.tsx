import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User, deleteUser, reauthenticateWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getBookmarkedEventIds } from "../firebase/firestoreBookmarks";
import { collection, deleteDoc, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const ids = await getBookmarkedEventIds();
        setBookmarkCount(ids.length);
      }
    });
    return () => unsubscribe();
  }, []);

  const deleteAllBookmarks = async (uid: string) => {
    const snapshot = await getDocs(collection(db, "bookmarks", uid, "events"));
    const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletions);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      // Re-authenticate if needed
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, provider);

      // Delete bookmarks
      await deleteAllBookmarks(user.uid);

      // Delete user
      await deleteUser(user);

      alert("Your account has been deleted.");
      window.location.href = "/";
    } catch (error: any) {
      console.error("Error deleting account:", error);
      alert(error.message || "Failed to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        🔒 Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Your Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <img
          src={user.photoURL || "/default-user-icon.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full mb-4"
        />
        <p className="text-lg font-medium">{user.displayName}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Joined: {new Date(user.metadata.creationTime || "").toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          🔖 You have {bookmarkCount} bookmarked event{bookmarkCount !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          You can manage your account in your Google account settings.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="mt-4 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Profile;