import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/adminStyle.css";
import { setToken } from '../../utilities/AdminTokens';
import { useAdmin } from '../../utilities/AdminContext';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
const { adminId, setAdminId, adminRole, setAdminRole, refreshToken, setRefreshToken } = useAdmin();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7014/api/Account/login', loginData);
      console.log('Login successful', response.data);
      
      setAdminId(response.data.userId);
      setAdminRole(response.data.role);
      
      navigate('/admin/dashboard'); 
      
    } catch (error) {
      console.error('Login error', error);
    }
  };
useEffect(()=>{
  const Adminr =sessionStorage.getItem('adminRole');

  if(Adminr){
    navigate('/admin/dashboard'); 
  }
  
})
  return (
    
    <div className='AdminloginPage'>
      <div className='Adminlogin'>
        <div className='Adminlogin-form'>
          <div>
            
            <div className='Adminlogin-top'>
            <h1 className='AdminloginPagetitle'>Welcome back</h1>
            
            
            <h3 className='AdminloginPagedescription'>Please enter your details.</h3>
            </div>
            <div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3 form-control-sm">
                <label className="form-label">Login</label>
                <input
                  type="email"
                  className="form-control"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>
              <div className="mb-3 form-control-sm">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
              <button type="submit" className="reg-buttons">Login</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
