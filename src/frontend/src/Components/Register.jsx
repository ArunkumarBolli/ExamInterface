import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Starting registration...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      
      console.log('Response status:', response.status); 

      const data = await response.json();

      console.log('Response data:', data);
      
      if (response.ok) {
        console.log('Token received:', data.token);

        localStorage.setItem('token', data.token);

        console.log('Token saved to localStorage');
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/exam');
      } else {
        setError(data.error);
      }
    } catch (error) {
        console.error('Registration error:', error);
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="login-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Already have an account? <span onClick={() => navigate('/')}>Login here</span></p>
    </div>
  );
};

export default Register;