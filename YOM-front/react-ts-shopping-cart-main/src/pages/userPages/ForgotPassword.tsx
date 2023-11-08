import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7014/api/Account/forgot-password', { email: email }, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      setMessage("A reset link has been sent to your email. Please check your inbox.");
      navigate('/reset-password');
    } catch (error) {
      console.error('Error sending forgot password email', error);
      setMessage("Error sending forgot password email. Please try again.");
    }
  };

  return (
    <main>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group-forgot">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="reset-btn-forgot">Send Reset Email</button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;