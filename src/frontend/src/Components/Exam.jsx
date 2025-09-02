import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token found:', !!token);

        if (!token) {
          console.log('No token found, redirecting to login');
          navigate('/');
          return;
        }

        const response = await fetch('http://localhost:5000/api/questions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Questions received:', data);
          setQuestions(data);
        } else {
          navigate('/');
        }
      } catch (error) {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex]._id]: optionIndex
    }));
  };

 const handleSubmitExam = async () => {
  try {
    console.log('=== STARTING EXAM SUBMISSION ===');
    console.log('Answers to submit:', answers);
    console.log('Number of answers:', Object.keys(answers).length);
    
    const token = localStorage.getItem('token');
    console.log('Token available:', !!token);

    if (Object.keys(answers).length === 0) {
      console.log('No answers to submit!');
      setError('You must answer at least one question before submitting.');
      return;
    }

    console.log('Sending submission to server...');
    const response = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ answers })
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('Submission successful! Result:', result);
      navigate('/results', { state: result });
    } else {
      const errorData = await response.json();
      console.error('Submission failed. Error:', errorData);
      setError('Failed to submit exam: ' + (errorData.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Exam submission error:', error);
    setError('Failed to submit exam. Please check your connection.');
  }
};

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="exam-container">
      <div className="exam-header">
        <h2>Online Examination</h2>
        <div className="timer">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="question-nav">
        <button 
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <button 
          onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>

      {currentQuestion && (
        <div className="question">
          <h3>{currentQuestion.questionText}</h3>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <label key={index} className='input-radio'>
                <input
                  type="radio"
                  name="answer"
                  checked={answers[currentQuestion._id] === index}
                  onChange={() => handleAnswerSelect(index)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

        <button className="submit-btn" onClick={handleSubmitExam}>
          Submit Exam
        </button>

    </div>
  );
};

export default Exam;