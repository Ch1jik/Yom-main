import { Button, Container, Nav, Navbar as NavbarBs ,NavDropdown} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import i18n from '../../i18/i18n';
// import { useShoppingCart } from "../../context/ShoppingCartContext"
import React, { useEffect } from 'react';
import { getToken, removeToken } from '../../utilities/TokenUtility'; // Import the token utility
import { useNavigate } from 'react-router-dom';
// import HandleDropdown from "../../functions/HandleDropdown";
import DropdownItem,{DropdownMenuItem} from "./DropdownItem";
import DependentDropdowns from "./DependentDropdowns";
import axios from 'axios';
// import Breadcrumbs from "./Breadcrumbs";
import { useState } from "react";
import logo from '../../assets/images/Group1000004232.png';
import category from '../../assets/images/Group550.png';
import add from '../../assets/images/navbar-add.svg';
import ring from '../../assets/images/navbar-ring.svg';
import message from '../../assets/images/message-2.svg';
import profile from '../../assets/images/profile.svg';

import g1 from '../../assets/images/dropdown/g1.svg';
import g2 from '../../assets/images/dropdown/g2.svg';
import g3 from '../../assets/images/dropdown/g3.svg';
import g4 from '../../assets/images/dropdown/g4.png';
import g5 from '../../assets/images/dropdown/g5.svg';
import g6 from '../../assets/images/dropdown/g6.svg';
import g7 from '../../assets/images/dropdown/g7.png';
import g8 from '../../assets/images/dropdown/g8.svg';
import g9 from '../../assets/images/dropdown/g9.png';
import log_out from '../../assets/images/log-out.svg'
interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  avatarPath?: string;
  phoneNumber: number;
  about:string;

}
export function Navbar() {
  // const { openCart, cartQuantity } = useShoppingCart()
  const navigate = useNavigate();
  const isAuthenticated = !!getToken(); // Check if the user is authenticated
  const handleLogout = () => {
    removeToken();
    sessionStorage.removeItem('userId');
    navigate('/');
     // Remove the token when logging out
    // You can add additional logout logic here if needed
  };
  
  const userId = sessionStorage.getItem('userId');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState<string>();
  const [userData, setUserData] = useState<User>({
    id: '',
    fullName: '',
    userName: '',
    email: '',
    avatarPath: undefined,
    phoneNumber: 0,

    about: '',

  });
// const toggleDropdown = (isOpen, event, metadata) => {
//   // Check if the dropdown should be closed due to an outside click
//   if (metadata.source === 'select' || metadata.source === 'click') {
//     setIsDropdownOpen(isOpen);
//   }
// };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/ads/bycategoryselect?location=${location}`);
  };

  const closeCategoryDropdown = () => {
    setIsDropdownOpen(false);
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
  useEffect(() => {

    fetchUserData();
  }, []);
  return (
    <header>
      
      <NavbarBs sticky="top" className=" mb-3">
        {/* <Container > */}
          
            
          
          <Nav className=" me-auto ">
            <div className="centered-link" >
              {/* <NavLink to="/">
                <img src="/path_to_your_logo.png" alt="Your Brand Logo" style={{ height: '40px', marginRight: '10px' }} />
              </NavLink> */}
              <NavLink to="/">
                {/* <img src="/path_to_your_logo.png" alt="Your Brand Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
                <div className="centered-link-logo">
                  <div className="navbar-profile-logo-link1">
                      
                  </div>
                  <img src={logo} className="navbar-profile-logo-link2"></img>
                </div>
              </NavLink>
            </div>
            <div className="centered-link" id="category-trigger-nav">
              <div>
              {/* <NavDropdown title="Categories">
                <DependentDropdowns 
                  activeCategory={activeCategory} 
                  onCategoryHover={setActiveCategory} 
                  // onDropdownClose={closeDropdown}
                />
              </NavDropdown> */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the dependent dropdown
                className="category-trigger"
              >
                <img src={category}></img>
                <p>Усі категорії</p>
              </button>

              {isDropdownOpen && (
                <DependentDropdowns 
                    activeCategory={activeCategory} 
                    onCategoryHover={setActiveCategory} 
                    onCloseDropdown={closeCategoryDropdown} // passing the callback
                />
              )}
              </div>
            </div>
            <div className="centered-link" id="locationname-nav">
              
              
              <form onSubmit={handleFormSubmit}>
                <input type="text" id="locationName" value={location} onChange={(e) => setLocation(e.target.value)} className="nav-bar-location" placeholder="Я шукаю ..." />
              </form>

                  
              
              
            </div>
              {/* <NavLink to="/store" >
                Store
              </NavLink>
              <NavLink to="/products" >
                Main
              </NavLink> */}
              {/* <NavLink to="/about" >
                About
              </NavLink>
              <NavLink to="/view" >
                View
              </NavLink> */}
              {/* <DropdownItem items={dropdownItems}/> */}
              <div className="centered-link-button" id="top-add-ad-button" >
              <NavLink to="/add"  >
                <img src={add}></img>
              </NavLink>
              <NavLink to="/add"  className='remove-style-from-link'>
                
                <div className="create-ad-navbar " style={{padding: "20"}}>Подати оголошення</div>
                
              </NavLink>
              </div>
             
              <div className="centered-link">
                <NavLink to="/messenger"  >
                  <img src={message}></img> 
                </NavLink>
                <NavLink to="/"  >
                  <img src={ring}></img>
                </NavLink>
              
             

              
              <div className="drop-down-menu-nav">
              {isAuthenticated ? (
                <NavDropdown title={userData.avatarPath ? <img src={userData.avatarPath}></img> :<img src={profile}></img>} id="profile-dropdown" >
                  {/* <NavDropdown.Item  to="/profile" id="profile-dropdown-item">
                    Profile
                  </NavDropdown.Item> */}
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item onClick={handleLogout} >
                  <img src={log_out}></img>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/myads">
                    <img src={g1}></img>
                    Мої оголошення
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item  to="/add">
                    Create Listing
                  </NavDropdown.Item> */}
                  <NavDropdown.Item  href="/sales">
                  <img src={g2}></img>
                    Продажі
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/purchased">
                  <img src={g3}></img>
                    Покупки
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/rating">
                  <img src={g4}></img>
                  Рейтинг та відгуки
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/favorite">
                  <img src={g5}></img>
                    Обране
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/seelistings">
                  <img src={g6}></img>
                    Переглянуті оголошення
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/settings">
                  <img src={g7}></img>
                    Налаштування
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/usefullInfo">
                  <img src={g8}></img>
                    Корисна інформація
                  </NavDropdown.Item>
                  <NavDropdown.Item  href="/support">
                  <img src={g9}></img>
                  Yom підтримка*
                  </NavDropdown.Item>
                  
                </NavDropdown>
                
              ) : (
                <NavLink to="/login" className='remove-style-from-link remove-style-from-link-login' >
                  Login
                </NavLink>
              )}
              </div>
              </div>
              {/* <NavLink to="/edit:id" >
                Edit
              </NavLink> */}
            </Nav>
            <div className="centered-link">
                <button className="language-buttons ua" onClick={() => i18n.changeLanguage('ua')}>UA</button>
                  |
                <button className="language-buttons en" onClick={() => i18n.changeLanguage('en')}>EN</button>
                
                
            </div>
            
          
        {/* </Container> */}
        {/* <Breadcrumbs/> */}
      </NavbarBs>

    </header>
  )
}