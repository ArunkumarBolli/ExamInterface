import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { score, total } = location.state || {};

  if (!score && score !== 0) {
    return <div>No results found. Please take the exam first.</div>;
  }

  return (
    <div className="results-container">
      <h2>Exam Results</h2>
      <div className="score">
        Your Score: {score} out of {total}
      </div>
      <div className="percentage">
        Percentage: {((score / total) * 100).toFixed(2)}%
      </div>
      <button onClick={() => window.location.href = '/'}>
        Take Another Exam
      </button>
    </div>
  );
};

export default Results;