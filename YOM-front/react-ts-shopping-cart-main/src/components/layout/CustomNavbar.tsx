import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import g1_black from '../../assets/images/g1_big_dark.svg';
import g2_black from '../../assets/images/g2_big_dark.svg';
import g3_black from '../../assets/images/g3_big_dark.png';
import g4_black from '../../assets/images/g4_big_dark.png';
import g5_black from '../../assets/images/g5_big_dark.svg';
import g6_black from '../../assets/images/g6_big_dark.svg';
import g7_black from '../../assets/images/g7_big_dark.png';
import g8_black from '../../assets/images/g8_big_dark.png';
import g9_black from '../../assets/images/g9_big_dark.png';
import g1_white from '../../assets/images/g1_big_white.svg';
import g2_white from '../../assets/images/g2_big_white.svg';
import g3_white from '../../assets/images/g3_big_white.png';
import g4_white from '../../assets/images/g4_big_white.png';
import g5_white from '../../assets/images/g5_big_white.svg';
import g6_white from '../../assets/images/g6_big_white.svg';
import g7_white from '../../assets/images/g7_big_white.png';

import g9_white from '../../assets/images/g9_big_white.png';
interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  avatarPath?: string;
  phoneNumber: number;
  about:string;

}
const CustomNavbar = () => {
  const [activeNavbar, setActiveNavbar] = useState(0);
  const userId = sessionStorage.getItem('userId');
  const [userData, setUserData] = useState<User>({
    id: '',
    fullName: '',
    userName: '',
    email: '',
    avatarPath: undefined,
    phoneNumber: 0,
    about: '',

  });
  // const handleNavbarClick = (index: number) => {
  //   setActiveNavbar(index);
  // };
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
  useEffect(() => {

    fetchUserData();
  }, []);
   const handleNavbarClick = (index: number) => {
    setActiveNavbar(index);
  };
  const navItems = [
    { path: "/myads", label: "Мої оголошення", imgBlack: g1_black, imgWhite: g1_white, id: 1 },

    { path: "/sales", label: "Продажі", imgBlack: g2_black, imgWhite: g2_white, id: 2 },
    { path: "/purchased", label: "Покупки", imgBlack: g3_black, imgWhite: g3_black, id: 3 },
    { path: "/rating", label: "Рейтинг та відгуки", imgBlack: g4_black, imgWhite: g4_white, id: 4 },
    { path: "/favorite", label: "Обране", imgBlack: g5_black, imgWhite: g5_white, id: 5 },
    { path: "/seelistings", label: "Переглянуті оголошення", imgBlack: g6_black, imgWhite: g6_white, id: 6 },
    { path: "/settings", label: "Налаштування", imgBlack: g7_black, imgWhite: g7_white, id: 7 },
    { path: "/userCare", label: "Корисна інформація", imgBlack:g8_black, imgWhite: g8_black, id: 8 },
    { path: "/support", label: "Yom підтримка*", imgBlack: g9_black, imgWhite: g9_white, id: 9 },
    // If you have other routes, you can continue to add them here following the pattern
  ];
  return (
    
    // <nav className="navigation-menu">
    //   <div className='navigation-profile-info'>
    //     <div className='navigation-profile-info-photo'>
    //       <img src={userData.avatarPath}></img>
    //     </div>
    //     <div>
    //         {userData.userName}
    //     </div>
        
    //   </div>
    //   <ul>

    //     <li>
    //       <NavLink
    //         to="/myads"
    //         className={`navigation-element ${activeNavbar === 2 ? 'active' : ''}`}
    //         id="el2"
            
    //       >
    //         Мої оголошення
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/add"
    //         className={`navigation-element ${activeNavbar === 3 ? 'active' : ''}`}
    //         id="el3"
    //       >
    //         Create Listing
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/sales"
    //         className={`navigation-element ${activeNavbar === 4 ? 'active' : ''}`}
    //         id="el4"
    //       >
    //         Продажі
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/purchased"
    //         className={`navigation-element ${activeNavbar === 5 ? 'active' : ''}`}
    //         id="el5"
    //       >
    //         Покупки
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/rating"
    //         className={`navigation-element ${activeNavbar === 6 ? 'active' : ''}`}
    //         id="el6"
    //       >
    //         Рейтинг та відгуки
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/favorite"
    //         className={`navigation-element ${activeNavbar === 7 ? 'active' : ''}`}
    //         id="el7"
    //       >
    //         Обране
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/seelistings"
    //         className={`navigation-element ${activeNavbar === 8 ? 'active' : ''}`}
    //         id="el8"
    //       >
    //         Переглянуті оголошення
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/settings"
    //         className={`navigation-element ${activeNavbar === 9 ? 'active' : ''}`}
    //         id="el9"
    //       >
    //         Налаштування
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/userCare"
    //         className={`navigation-element ${activeNavbar === 10 ? 'active' : ''}`}
    //         id="el10"
    //       >
    //         Корисна інформація
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/support"
    //         className={`navigation-element ${activeNavbar === 11 ? 'active' : ''}`}
    //         id="el11"
    //       >
    //         Yom підтримка*
    //       </NavLink>
    //     </li>
        
    //   </ul>
    // </nav>
    <nav className="navigation-menu">
    <div className='navigation-profile-info'>
      <div className='navigation-profile-info-photo'>
        <img src={userData.avatarPath} alt="User Avatar" />
      </div>
      <div>
        {userData.userName}
      </div>
    </div>
    <ul>
      {navItems.map(item => (
        <li key={item.id}>
          <NavLink
            to={item.path}
            className={`navigation-element ${activeNavbar === item.id ? 'active' : ''}`}
            id={`el${item.id}`}
            // activeClassName="active" // This will add the 'active' class when the link is active
          >
            <img src={activeNavbar === item.id ? item.imgWhite : item.imgBlack} alt={item.label} />
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
  );
};

export default CustomNavbar;
