// import { db } from "../firebase/firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import events from "../data/eventsToUpload.json";

// export const uploadEventsToFirestore = async () => {
//   try {
//     const batch = events.map(async (event) => {
//       await addDoc(collection(db, "events"), event);
//     });

//     await Promise.all(batch);
//     console.log("All events uploaded to Firestore!");
//   } catch (err) {
//     console.error("Error uploading events:", err);
//   }
// };