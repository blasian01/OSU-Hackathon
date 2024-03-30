import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [loginCredential, setLoginCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Assuming we have a context or a way to set the user as logged in
  // This part of the code is commented out since it might not be necessary for your mock
  // const { logIn } = useAuth(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Mock login validation
    if (loginCredential === 'bronson.woods@okstate.edu' && password === '2020') {
      console.log("Login successful for: ", loginCredential);
      // logIn(); // Mock login function, uncomment if you have a login context or similar mechanism
      navigate('/home'); // Navigate to /home on successful login
    } else {
      setErrorMessage("Incorrect username or password");
    }
  };
  
  return (
    <div id="container">
      <section id="login-form" className="login-section">
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              {errorMessage && (
                <div className="error-message-container">
                  <div className="error-message">{errorMessage}</div>
                </div>
              )}
              <div className="inputbox">
                <input type="text" required value={loginCredential} onChange={(e) => setLoginCredential(e.target.value)} />
                <label>Email or Username</label>
              </div>
              <div className="inputbox">
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Password</label>
              </div>
              <button type="submit">Log in</button>

              <div className="forget">
                <label><input type="checkbox" />Remember Me</label>
                <a href="/forgot">Forget Password</a>
              </div>
              <div className="register">
                <p>Don't have an account? <a href="/register">Register</a></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
