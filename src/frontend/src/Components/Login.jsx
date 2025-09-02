import { useState } from  "react";
import {useNavigate} from 'react-router-dom';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem('token', data.token);
                navigate('/exam');
            } else{
                setError(data.error);
            }
        } catch(error){
            setError('Failed to connect to server');
        }
    };


    return(
        <div className="login-container">
            <h2>Student Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <span onClick={()=>navigate('/register')}>Register Here</span></p>
        </div>
    );

};

export default Login;