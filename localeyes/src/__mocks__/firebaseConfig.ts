const mockUser = {
    uid: "user123",
    displayName: "Mock User",
    email: "mock@example.com",
    photoURL: "https://placehold.co/100x100",
};

export const auth = {
    currentUser: mockUser,
    onAuthStateChanged: (callback: (user: typeof mockUser) => void) => {
        callback(mockUser);
        return () => { };
    },
};

export const db = {
    // Minimal stub to fool Firestore
    type: "firestore",
    _delegate: {},
};