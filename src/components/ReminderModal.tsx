// ReminderModal.tsx
import React, { useState } from 'react';
import { X, Bell, Mail, Check } from 'lucide-react';
import { Milestone } from './constants/types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Re-use the Firebase config from your Footer component
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

interface ReminderModalProps {
  milestone: Milestone;
  closeReminderModal: () => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
  milestone,
  closeReminderModal,
}) => {
  const [email, setEmail] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reminderSuccess, setReminderSuccess] = useState(false);
  const [reminderError, setReminderError] = useState('');

  // Save reminder to Firebase
  const saveReminder = async () => {
    if (!email) {
      setReminderError('Please enter your email address');
      return;
    }

    if (!db) {
      setReminderError('Firebase not initialized properly. Please try again later.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add a new document with auto-generated ID to "reminders" collection
      await addDoc(collection(db, "reminders"), {
        email: email,
        message: reminderMessage || `Reminder for your ${milestone.description} milestone (${milestone.days.toLocaleString()} days)`,
        milestoneDescription: milestone.description,
        milestoneDays: milestone.days,
        milestoneDate: milestone.date,
        scheduledDate: new Date(milestone.date), // The date to send the reminder
        daysUntil: milestone.daysUntil,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      
      setReminderSuccess(true);
      setReminderError('');
    } catch (error) {
      console.error("Error saving reminder:", error);
      setReminderError('Failed to save reminder. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Bell size={20} className="text-amber-500 mr-2" />
              Milestone Reminder
            </h3>
            <button
              onClick={closeReminderModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>

          {!reminderSuccess ? (
            <>
              <p className="text-gray-600 mb-4">
                We'll remind you when you're approaching your {milestone.description} milestone on {milestone.date}.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border"
                    placeholder="Add a personal note to your future self..."
                    rows={3}
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                  />
                </div>

                {reminderError && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {reminderError}
                  </div>
                )}

                <button
                  onClick={saveReminder}
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Bell size={16} className="mr-2" />
                      Set Reminder
                    </span>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reminder Set!</h3>
              <p className="text-gray-600 mb-4">
                We'll email you a reminder as your {milestone.description} milestone approaches.
              </p>
              <button
                onClick={closeReminderModal}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;