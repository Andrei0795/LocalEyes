import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

const AuthButton: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Sign in error", err);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Sign out error", err);
        }
    };

    return (
        <div>
            {user ? (
                <div className="flex items-center gap-2">
                    <img
                        src={user.photoURL || "/default-user-icon.png"}
                        alt="User avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden sm:inline text-sm font-medium">{user.displayName}</span>
                    <button
                        onClick={handleSignOut}
                        className="ml-2 text-sm text-red-600 hover:underline"
                    >
                        Log out
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleSignIn}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Log in
                </button>
            )}
        </div>
    );
};

export default AuthButton;