import { useState, useEffect } from 'react';
import Feedback from './components/feedback/Feedback';
import Options from './components/options/Options';
import Notification from './components/notification/Notification';
import './App.css';

const MY_FEEDBACK = 'feedbackData';

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem(MY_FEEDBACK);
    return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
  });

  const updateFeedback = feedbackType => {
    setFeedback(prev => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positivePercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  useEffect(() => {
    localStorage.setItem(MY_FEEDBACK, JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className="container">
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>

      <Options
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        hasFeedback={totalFeedback > 0}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}
