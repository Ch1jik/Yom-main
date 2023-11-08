import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../components/layout/CustomNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../utilities/TokenUtility';
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const userId = sessionStorage.getItem('userId');

  const [userData, setUserData] = useState({
    id: '',
    fullName: '',
    userName: '',
    email: '',
    avatarPath: '',
    phoneNumber: '',
    dateCreated: '',
    dateModified: '',
    userRole: '',
    isBlocked: false,
    password: '' // password isn't typically included in user profiles for security reasons
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    checkAuthenticationStatus();
    fetchUserData();
  }, []);

  const checkAuthenticationStatus = () => {
    const isAuthenticated = !!getToken();
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://localhost:7014/api/User/ById/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/api/User/ChangeAllInfo', userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  return (
    <main>
      <div className='profilePage'>
        <div className='profile-menu'>
          <CustomNavbar />
        </div>
        <section>
          <h1>Profile</h1>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              {/* Add input fields for each property of userData */}
              <input name="fullName" value={userData.fullName} onChange={handleInputChange} placeholder="Full Name" />
              {/* ... Add similar input fields for other properties ... */}
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
              <p>ID: {userData.id}</p>
              <p>Full Name: {userData.fullName}</p>
              <p>Username: {userData.userName}</p>
              <p>Email: {userData.email}</p>
              <p>Avatar Path: {userData.avatarPath}</p>
              <p>Phone Number: {userData.phoneNumber}</p>
              <p>Date Created: {new Date(userData.dateCreated).toLocaleDateString()}</p>
              <p>Date Modified: {new Date(userData.dateModified).toLocaleDateString()}</p>
              <p>Role: {userData.userRole}</p>
              <p>Blocked: {userData.isBlocked ? "Yes" : "No"}</p>
              {/* It's not common or secure to display the password */}
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Profile;
