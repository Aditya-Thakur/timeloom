import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Firebase Config (Replace with your credentials)
const firebaseConfig = {
  apiKey: "AIzaSyCdHYqFA6Zq9d5LyfSne79HwJ8F0iaPDQQ",
  authDomain: "timeloom-c6bb8.firebaseapp.com",
  projectId: "timeloom-c6bb8",
  storageBucket: "timeloom-c6bb8.firebasestorage.app",
  messagingSenderId: "930867455862",
  appId: "1:930867455862:web:1c18bd729f5d49996f7c57",
  measurementId: "G-3R11LSW8W5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Footer: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    const incrementVisit = async () => {
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
