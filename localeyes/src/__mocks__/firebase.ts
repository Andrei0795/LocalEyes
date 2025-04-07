import { vi } from "vitest";

export const mockUser = {
    uid: "user123",
    displayName: "Mock User",
    email: "mock@example.com",
    photoURL: "https://placehold.co/100x100",
  };
  
  export const auth = {
    currentUser: mockUser,
    onAuthStateChanged: (callback: (user: typeof mockUser) => void) => {
      callback(mockUser);
      return () => {};
    },
  };
  
  export const addBookmark = vi.fn();
  export const removeBookmark = vi.fn();
  export const getBookmarkedEventIds = vi.fn().mockResolvedValue(["123"]);