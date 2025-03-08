// DateEntryForm.tsx
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateEntryFormProps {
  onSubmit: (dateOfBirth: string) => void;
}

const DateEntryForm: React.FC<DateEntryFormProps> = ({ onSubmit }) => {
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateDate = (date: string): boolean => {
    if (!date) {
      setIsValid(false);
      setErrorMessage('Please enter a date');
      return false;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    
    if (selectedDate > today) {
      setIsValid(false);
      setErrorMessage('Date cannot be in the future');
      return false;
    }
    
    setIsValid(true);
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (validateDate(dateOfBirth)) {
      onSubmit(dateOfBirth);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <Calendar className="h-12 w-12 text-indigo-500" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Begin Your Timeline Journey</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="dob">
            When were you born?
          </label>
          <input
            type="date"
            id="dob"
            className={`w-full p-3 border rounded-lg ${!isValid ? 'border-red-500' : 'border-gray-300'}`}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          {!isValid && (
            <p className="text-red-500 mt-1">{errorMessage}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Discover My Milestones
        </button>
      </form>
    </div>
    
  );
};

export default DateEntryForm;