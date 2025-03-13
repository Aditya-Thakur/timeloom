import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

interface NewsletterModalProps {
  show: boolean;
  onClose: () => void;
  initialDOB?: string;
  db: any;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ show, onClose, initialDOB, db }) => {
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [alreadySubscribed, setAlreadySubscribed] = useState<boolean>(false);

  useEffect(() => {
    if (initialDOB) {
      setDob(initialDOB);
      checkIfAlreadySubscribed(initialDOB);
    }
  }, [initialDOB, show, db]);

  // Function to check if user already subscribed
  const checkIfAlreadySubscribed = async (birthDate: string) => {
    if (!db) {
      console.error("Firebase not initialized properly");
      return;
    }

    try {
      const subscribersRef = collection(db, "newsletter_subscribers");
      const q = query(subscribersRef, where("dob", "==", birthDate));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setAlreadySubscribed(true);
      } else {
        setAlreadySubscribed(false);
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  };

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Validate DOB
    if (!dob) {
      setError('Please enter your date of birth');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!db) {
        throw new Error("Firebase not initialized properly");
      }

      // Check if already subscribed
      const subscribersRef = collection(db, "newsletter_subscribers");
      const q = query(subscribersRef, where("dob", "==", dob));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // User already subscribed
        setAlreadySubscribed(true);
        setSuccess(true);
      } else {
        // Add new subscription to Firestore
        await addDoc(collection(db, "newsletter_subscribers"), {
          email,
          dob,
          subscribedAt: new Date().toISOString()
        });
        
        // Also store in localStorage for quick local access
        const subscriptions = localStorage.getItem('newsletterSubscriptions') 
          ? JSON.parse(localStorage.getItem('newsletterSubscriptions')!) 
          : [];
        
        subscriptions.push({ email, dob });
        localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        
        setSuccess(true);
      }
      
      setEmail('');
      
      // Close modal after 3 seconds of showing success message
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error subscribing to newsletter:", err);
      setError('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        {!success ? (
          <>
            {alreadySubscribed ? (
              <div className="text-center py-8">
                <div className="text-blue-500 text-5xl mb-4">👋</div>
                <h3 className="text-xl font-bold mb-2">You're Already Subscribed!</h3>
                <p className="text-gray-600 mb-4">
                  It looks like you're already receiving our newsletter with this date of birth.
                </p>
                <button
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm transition duration-200"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-6">
                  Get monthly updates on time milestones and climate insights delivered to your inbox.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                        checkIfAlreadySubscribed(e.target.value);
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="mb-4 text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-bold mb-2">
              {alreadySubscribed ? "Welcome Back!" : "Successfully Subscribed!"}
            </h3>
            <p className="text-gray-600">
              {alreadySubscribed 
                ? "We're glad to see you're still interested! You're already on our list." 
                : "Thank you for subscribing to our newsletter. You'll receive your first issue soon!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;