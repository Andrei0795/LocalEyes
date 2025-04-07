import { vi } from "vitest";

export const addBookmark = vi.fn();
export const removeBookmark = vi.fn();
export const getBookmarkedEventIds = vi.fn().mockResolvedValue(["123"]);