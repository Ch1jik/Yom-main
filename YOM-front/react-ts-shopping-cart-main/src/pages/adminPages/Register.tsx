import React, { useState } from 'react';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import "../../assets/css/adminStyle.css";
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utilities/AdminTokens';
import AdminSideBar from '../../components/layout/AdminSideBar';
const Register: React.FC = () => {
  const [registrationData, setRegistrationData] = useState({ userName: '', email: '', password: '', name: '', lastname: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationData.password !== confirmPassword) {
      console.error('Passwords do not match');
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
    try {
      const response = await axios.post('https://localhost:7014/api/Account/Registration', registrationData);
      console.log('Registration successful', response.data);
      if (response.data) {
        setToken(response.data);
        // navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div className='admin-flex'>
      <AdminSideBar/>
      <div>

      
      <h1 className=''>Create Account</h1>
      <h3 className=''>Please enter your details.</h3>
      <form onSubmit={handleRegistrationSubmit}>
              <div className='firstAndlastName'>
                <div className="mb-3 form-control-sm">
                  <label  className="form-label">Name</label>
                  <input
                    type="text"
                    
                    className="form-control"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                  />
              </div>
              
              <div className="mb-3 form-control-sm">
                <label  className="form-label">Last Name</label>
                <input
                  type="text"
                  
                  className="form-control"
                  value={registrationData.lastname}
                  onChange={(e) => setRegistrationData({ ...registrationData, lastname: e.target.value })}
                />
              </div>
              </div>
              <div className="mb-3 form-control-sm">
                <label  className="form-label">User Name</label>
                <input
                  type="text"
                  
                  className="form-control"
                  value={registrationData.userName}
                  onChange={(e) => setRegistrationData({ ...registrationData, userName: e.target.value })}
                />
              </div>
              
              <div className="mb-3 form-control-sm">
                <label  className="form-label">Email address</label>
                <input
                  type="email"
                  
                  className="form-control"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                />
              </div>
              <div className="mb-3 form-control-sm">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  
                  className="form-control"
                  value={registrationData.password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setRegistrationData({ ...registrationData, password: newPassword });
                    const result = zxcvbn(newPassword);
                    setPasswordStrength(result.score); // 0 to 4, 0 being weak and 4 being strong
                  }}
                />
              </div>

              <div className="mb-3 form-control-sm">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {!passwordsMatch && (
                <div className="text-danger">Passwords do not match!</div>
              )}

              {/* Password Strength */}
              {registrationData.password && (
                  <div className="password-strength">
                    Password Strength:
                    <div className={`strength-${passwordStrength}`}>
                      {['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][passwordStrength]}
                    </div>
                  </div>
                )}

                <button type="submit" className="reg-buttons">Register</button>
              </form>
              </div>
    </div>
  );
};

export default Register;
