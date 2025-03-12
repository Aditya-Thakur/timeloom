import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Firebase Config using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if credentials are available
const app = import.meta.env.VITE_FIREBASE_API_KEY ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

const Footer: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    const incrementVisit = async () => {
      if (!db) {
        console.error("Firebase not initialized properly");
        return;
      }
      
      try {
        const visitRef = doc(db, "analytics", "visitorCount");
        const visitSnap = await getDoc(visitRef);
        if (visitSnap.exists()) {
          const newCount = visitSnap.data().count + 1;
          await updateDoc(visitRef, { count: newCount });
          setVisitCount(newCount);
        } else {
          await setDoc(visitRef, { count: 1 });
          setVisitCount(1);
        }
      } catch (error) {
        console.error("Error updating visitor count:", error);
      }
    };

    incrementVisit();
  }, []);

  return (
    <footer className="w-full bg-gray-800 text-white p-4 text-center mt-auto">
      <p>©2025 TimeLoom - Weaving the fabric of your timeline</p>
      <p className="text-sm mt-2">Total Visitors: {visitCount}</p>
    </footer>
  );
};

export default Footer;