import './Feedback.css';
const Feedback = ({ good, neutral, bad, total, positivePercentage }) => {
  return (
    <ul className="feedback-list">
      <li>Good: {good}</li>
      <li>Neutral: {neutral}</li>
      <li>Bad: {bad}</li>
      <li>Total: {total}</li>
      <li>Positive feedback: {positivePercentage}%</li>
    </ul>
  );
};

export default Feedback;
