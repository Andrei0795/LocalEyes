import { vi } from "vitest";

// 🔧 Mock Firebase
vi.mock("../firebase/firebaseConfig", () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: (cb: any) => {
      cb(null);
      return () => {};
    },
  },
}));

vi.mock("../firebase/firestoreBookmarks", () => ({
  addBookmark: vi.fn(),
  removeBookmark: vi.fn(),
  getBookmarkedEventIds: vi.fn().mockResolvedValue([]),
}));

//Import AFTER mocks
import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard";
import { MemoryRouter } from "react-router-dom";

describe("EventCard", () => {
  const mockEvent = {
    id: "abc123",
    title: "Test Event",
    category: "Tech",
    description: "This is a test event.",
    image: "https://placehold.co/600x400",
    date: "2025-05-01",
  };

  it("renders event details", () => {
    render(
      <MemoryRouter>
        <EventCard {...mockEvent} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Category: Tech")).toBeInTheDocument();
    expect(screen.getByText("This is a test event.")).toBeInTheDocument();
  });

  it("displays formatted date", () => {
    render(
      <MemoryRouter>
        <EventCard {...mockEvent} />
      </MemoryRouter>
    );

    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });
});