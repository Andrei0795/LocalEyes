import React from "react";
import { Link, useLocation } from "react-router-dom";
import AuthButton from "../components/AuthButton";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Explore", to: "/explore" },
    { name: "Map", to: "/map" },
    { name: "Bookmarks", to: "/bookmarks" },
    { name: "Profile", to: "/profile" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-3">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-6">
          {navItems.map(({ name, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`font-medium ${
                  pathname === to
                    ? "text-blue-600 dark:text-blue-400 underline"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-500"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;