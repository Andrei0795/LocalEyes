# LocalEyes 🌍
Discover Events Around You (Ract Web Project)

**LocalEyes** is a modern event discovery web app that helps users explore local events by category, map, and featured selections — with support for login, bookmarking, and a mobile-friendly UI.

## Features

- 🔎 **Explore Tab**: Filter events by category
- 🗘️ **Interactive Map**: View events plotted with Leaflet
- 🔖 **Bookmarking**: Logged-in users can save events
- 🔭 **Event Detail View**: Detailed info, map, ticket links
- 📌 **Persistent Map State**: Keeps map zoom & category when returning
- 👤 **Profile Page**: Shows user info and bookmark count
- 🔐 **Login**: Google login via Firebase Auth
- 🔥 **Firebase Firestore**: Events and user bookmarks stored in Firestore
- 🧪 **Unit Testing**: Tests with Vitest and React Testing Library
- 📦 **Responsive**: Built with TailwindCSS

## Live Demo

🌐 Check out the live app: [localeyes-72780.firebaseapp.com](https://localeyes-72780.firebaseapp.com/)

## Screenshots

<img width="400" alt="Screenshot 2024-05-28 at 23 40 47" src="https://github.com/user-attachments/assets/b6ba42e5-2df2-4e6b-a4c5-600645677959">
<img width="400" alt="Screenshot 2024-05-28 at 23 40 47" src="https://github.com/user-attachments/assets/d57d26c7-e80b-42ee-8981-4a4a7a501da5">
<img width="400" alt="Screenshot 2024-05-28 at 23 40 47" src="https://github.com/user-attachments/assets/a8bfb615-a5ba-4221-a22f-06802b78cee6">
<img width="400" alt="Screenshot 2024-05-28 at 23 40 47" src="https://github.com/user-attachments/assets/23bfcdb2-58b5-4b51-8246-19cd85383cf8">

## Tech Stack

- **React** with **TypeScript**
- **React Router v6**
- **Firebase** (Firestore + Auth)
- **Tailwind CSS**
- **Leaflet** (React-Leaflet)
- **Vite**
- **Vitest** for unit testing
- **ESLint + Prettier**
- **GitHub + Firebase Hosting**

## Project Structure

```
src/
├── components/        # Reusable components
├── pages/             # Main pages: Home, Explore, Map, Bookmarks, Profile
├── firebase/          # Firebase config and helper functions
├── data/              # Local fallback data or mockEvents
├── utils/             # Utilities like Firestore import
└── App.tsx            # Main App
```

## Environment Variables

Your Firebase credentials should be stored in a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
The above is an example that can be found at .env.example but you should store the actual credentials in .env

## Deployment

- Hosted via **Firebase Hosting**
- To deploy: `npm run build && firebase deploy`

## ✨ Future Ideas

- Add user comments and reviews
- Allow event creation by admins
- Add calendar sync
- Location-based search
- Search Bar in Home

---

Made with love ❤️ by Andrei
