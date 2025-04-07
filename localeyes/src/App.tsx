import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MapView from "./pages/MapView";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import EventDetail from "./pages/EventDetail";
import ScrollToTop from "./components/ScrollToTop";
import "./leaflet-fix";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
      </>
    </div>
  );
};

export default App;