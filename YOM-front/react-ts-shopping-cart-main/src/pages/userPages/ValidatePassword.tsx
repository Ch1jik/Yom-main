import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ValidatePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const [token, setToken] = useState<string | null>(null);
  
  // const token = decodeURIComponent(params.get('token') || '');
  // console.log('====================================');
  // console.log(token);
  // console.log('====================================');
  const navigate = useNavigate();
  useEffect(() => {
    // Extract token and preserve the + sign
    const rawSearch = window.location.search;
    const tokenMatch = rawSearch.match(/token=([^&]+)/);

    if (tokenMatch && tokenMatch[1]) {
      // Manually decode the URI components, but preserve the + sign
      const decodedToken = decodeURIComponent(tokenMatch[1].replace(/\+/g, '%2B'));
      setToken(decodedToken);
    }
  }, []);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resetData = {
      token,
      email,
      newPassword
    };

    try {
      const response = await axios.post('https://localhost:7014/api/Account/reset-password-email', resetData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Password reset successfully.');
        alert("You password was changes ");
        navigate('/login');
        // Handle any other logic after successful submission, e.g. showing a success message.
      } else {
        console.error('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="validate-form-container">
      <h2>Відновлення паролю</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Новий Пароль</label>
          <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        
        <button type="submit">Відновити</button>
      </form>
    </div>
  );
};

export default ValidatePassword;
