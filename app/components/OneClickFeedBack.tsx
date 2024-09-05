'use client'

import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

interface FeedbackProps {
  pageId: string; // Unique identifier for the page or feature being rated
}

const OneClickFeedback: React.FC<FeedbackProps> = ({ pageId }) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleFeedback = async (type: 'up' | 'down') => {
    if (feedback) return; // Prevent multiple submissions

    setFeedback(type);

    const feedbackData = {
      type,
      pageId,
      timestamp: new Date().toISOString(),
      country: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // Add any other relevant data you want to collect
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedback(null); // Reset feedback state on error
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleFeedback('up')}
        disabled={feedback !== null}
        className={`p-2 rounded-full ${
          feedback === 'up' ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <FaThumbsUp className={feedback === 'up' ? 'text-white' : 'text-gray-600'} />
      </button>
      <button
        onClick={() => handleFeedback('down')}
        disabled={feedback !== null}
        className={`p-2 rounded-full ${
          feedback === 'down' ? 'bg-red-500' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        <FaThumbsDown className={feedback === 'down' ? 'text-white' : 'text-gray-600'} />
      </button>
    </div>
  );
};

export default OneClickFeedback;