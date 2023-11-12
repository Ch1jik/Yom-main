import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../../components/layout/CustomNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import data from '../../utilities/UkrainianCity.json';
interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  avatarPath?: File;
  phoneNumber: string;
  // dateCreated?: Date | null;
  // dateModified?: Date | null;
  about:string;
  // city:string;
  // age:number;
  // userRole: string;
  // isBlocked: boolean;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const userId = sessionStorage.getItem('userId');

  const [activeTab, setActiveTab] = useState('mainInfo');
  const [isEditing, setIsEditing] = useState(false);
  const cities = data[0].regions[0].cities.map(city => city.name);
  const [userData, setUserData] = useState<User>({
    id: '',
    fullName: '',
    userName: '',
    email: '',
    avatarPath: undefined,
    phoneNumber: '',
    // dateCreated: null,
    // dateModified: null,
    about: '',
    // city: '',
    // age:0
  });
  const [typedCity, setTypedCity] = useState(''); // To store characters typed within a specific timeframe

  const handleCitySearch = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    // Concatenate the typed characters
    setTypedCity(prev => prev + e.key);

    // Clear the typed characters after 1 second to reset the search
    setTimeout(() => {
      setTypedCity('');
    }, 1000);

    const matchedCity = cities.find(city =>
      city.toLowerCase().startsWith(typedCity.toLowerCase())
    );

    if (matchedCity) {
      // Update the userData state with the matched city
      setUserData(prevState => ({
        ...prevState,
        city: matchedCity
      }));
    }
  };
  useEffect(() => {
    checkAuthenticationStatus();
    fetchUserData();
  }, []);

  const checkAuthenticationStatus = () => {
    // Your authentication check logic here (if needed)
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://localhost:7014/api/User/ById/${userId}`);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        console.log('====================================');
        console.log(selectedFile);
        console.log('====================================');
        setUserData(prevState => ({
            ...prevState,
            avatarPath: selectedFile
        }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      id,
      fullName,
      userName,
      email,
      avatarPath,
      phoneNumber,
      about,

    } = userData;
    const formData = new FormData();
    const userId = sessionStorage.getItem('userId');
    if(userId)
    formData.append('Id', userId);
    formData.append('FullName', fullName);
    formData.append('UserName', userName);
    formData.append('Email', email);
    formData.append('PhoneNumber', phoneNumber);
    console.log('====================================');
    console.log(avatarPath);
    console.log('====================================');
    if (avatarPath) formData.append('Photo', avatarPath);
    
    // formData.append('Id', about);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
  }
    try {
        
        await axios.post('https://localhost:7014/api/User/Edit/Profile', formData, {
          headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data' // This is optional, as Axios will set it for you when using FormData.
          },
        });
        setIsEditing(false);
        alert("Профіль було успішно обновленно");
    } catch (error) {
        console.error('Error updating user data', error);
    }
};

  const deleteUser = async () => {
    try {
      // Make a DELETE request to the specified URL
      await axios.delete(`https://localhost:7014/api/Account/self-profile?userId=${userId}`);
      
      // Redirect or show a message after successful deletion
      navigate('/some-path'); // Change to wherever you want to navigate after deletion
    } catch (error) {
      console.error('Error deleting the user', error);
      // You may also want to show an error message to the user.
    }
  };

  return (
    <main>
      <div className='SettingsPage'>
        <div className='myads-menu'>
          <CustomNavbar/>
        </div>
        <section>
        <div className='setting-title'>
          {/* Tab Menu */}
          <div className="setting-section">
            <div className='setting-section-title'>
              <p>Налаштування</p>
            </div>
            <div className='setting-tabs'>
              <button onClick={() => setActiveTab('mainInfo')}>Основна інформація</button>
              <button onClick={() => setActiveTab('delivery')}>Доставка та оплата</button>
              <button onClick={() => setActiveTab('notice')}>Сповіщення</button>
            </div>
          </div>
        </div>
        
          {activeTab === 'mainInfo' && (
            <div className='settings-form-section'>
              
              
                <form onSubmit={handleSubmit} >
                  <div className='settings-form'>
                    <div>
                      <div className='settings-input-filed'>
                        <div>Повне Ім’я*</div>
                        <input name="fullName" type='text' value={userData.fullName} onChange={handleInputChange}  className='setting-loop-input'/>
                      </div>
                      <div className='settings-input-filed'>
                        <div>Електронна адресса *</div>
                        <input name="email" type='text' value={userData.email} onChange={handleInputChange}  className='setting-loop-input'/>
                      </div>
                      <div className='settings-input-filed-about'>
                        <div>Про себе</div>
                        <input name="about"type='text' value={userData.about} onChange={handleInputChange}  className='setting-about-input'/>
                      </div>
                      <div className='settings-input-filed'>
                        <div>Фотографія</div>
                        <input
                            type="file"
                            onChange={handleAvatarChange}
                            className='setting-loop-input'
                        />
                      </div>
                    </div>
                    <div >
                       <div className='settings-input-filed'>
                        <div>Ім’я користувача</div>
                        <input name="userName" type='text' value={userData.userName} onChange={handleInputChange}  className='setting-loop-input'/>
                      </div>
                      <div className='settings-input-filed'>
                        <div >Телефон</div>
                        <input name="phoneNumber" type='text' value={userData.phoneNumber} onChange={handleInputChange}  className='setting-loop-input'/>
                      </div>
                      <div className='settings-input-filed'>
                        <div>Вік</div>
                        {/* <input name="age" value={userData.age} onChange={handleInputChange} placeholder="Age" className='setting-loop-input'/> */}
                        <input name="age"   placeholder="Age" className='setting-loop-input'/>
                      </div>
                      
                      <div className='settings-input-filed'>
                        <div>Місто</div>
                        {/* <select
                          id="citySelect"
                          className='setting-loop-input'
                          value={userData.city}
                          onKeyUp={handleCitySearch}
                          onChange={e => setUserData(prev => ({ ...prev, city: e.target.value }))}
                        >
                          {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                          ))}
                        </select> */}
                        <select
                          id="citySelect"
                          className='setting-loop-input'
                          
                          onKeyUp={handleCitySearch}
                          
                        >
                          {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                 
                  <div className='settings-buttons'>
                    <button className='settings-button' type="submit">Зберегти</button>
                    <button className='settings-button-delete' onClick={deleteUser}>Видалити профіль</button>
                  </div>
                </form>
              
            </div>
          )}

          {activeTab === 'delivery' && (
            <div>
              {/* Your delivery related content here */}
            </div>
          )}

          {activeTab === 'notice' && (
            <div>
              {/* Your notice related content here */}
            </div>
          )}
        </section>
      </div>
    </main>
    
  );
}

export default Settings;
