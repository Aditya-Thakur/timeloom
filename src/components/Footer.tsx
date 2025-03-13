import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import NewsletterModal from './NewsletterModal';

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

interface FooterProps {
  currentDOB?: string;
}

const Footer: React.FC<FooterProps> = ({ currentDOB }) => {
  const [visitCount, setVisitCount] = useState<number>(0);
  const [showNewsletterModal, setShowNewsletterModal] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

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

  // Check if current DOB is in local storage subscriptions
  useEffect(() => {
    if (currentDOB) {
      const checkSubscriptionStatus = () => {
        const subscriptions = localStorage.getItem('newsletterSubscriptions');
        if (subscriptions) {
          const parsedSubscriptions = JSON.parse(subscriptions);
          const isUserSubscribed = parsedSubscriptions.some(
            (sub: { dob: string }) => sub.dob === currentDOB
          );
          setIsSubscribed(isUserSubscribed);
        } else {
          setIsSubscribed(false);
        }
      };

      checkSubscriptionStatus();
    } else {
      setIsSubscribed(false);
    }
  }, [currentDOB, showNewsletterModal]);

  const handleOpenNewsletterModal = () => {
    setShowNewsletterModal(true);
  };

  return (
    <>
      <footer className="w-full bg-gray-800 text-white p-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>©2025 TimeLoom - Weaving the fabric of your timeline</p>
            <p className="text-sm mt-2">Total Visitors: {visitCount}</p>
          </div>
          
          <div className="newsletter-signup bg-gray-700 p-4 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            
            {isSubscribed ? (
              <div className="flex items-center text-green-400 mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>You are subscribed to our newsletter!</span>
              </div>
            ) : (
              <>
                <p className="text-sm mb-3">
                  Subscribe to our monthly newsletter for milestone & climate related information
                </p>
                <button 
                  onClick={handleOpenNewsletterModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition duration-200"
                >
                  Subscribe Now
                </button>
              </>
            )}
          </div>
        </div>
      </footer>

      <NewsletterModal 
        show={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
        initialDOB={currentDOB}
        db={db}
      />
    </>
  );
};

export default Footer;