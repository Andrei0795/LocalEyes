import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Explore from "../pages/Explore";
import { MemoryRouter } from "react-router-dom";
import mockEvents from "../data/mockEvents.json";

describe("Explore", () => {
  it("shows only filtered events when a category is selected", async () => {
    render(
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    const musicButton = screen.getByRole("button", { name: /Music/i });
    fireEvent.click(musicButton);

    // wait for one known Music event to appear
    await waitFor(() =>
      expect(screen.getByText("Jazz Night")).toBeInTheDocument()
    );

    // verify all music events appear
    const musicEvents = mockEvents.filter((e) => e.category === "Music");

    for (const e of musicEvents) {
      expect(screen.getByText(e.title)).toBeInTheDocument();
    }

    // verify non-music events don't appear
    const nonMusicEvents = mockEvents.filter((e) => e.category !== "Music");

    for (const e of nonMusicEvents) {
      expect(screen.queryByText(e.title)).not.toBeInTheDocument();
    }
  });
});