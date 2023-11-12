import { Button, Container, Nav, Navbar as NavbarBs, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { getToken, removeToken } from '../../utilities/TokenUtility';
import DependentDropdowns from "./DependentDropdowns";
import logo from '../../assets/images/Group1000004232.png';
import category from '../../assets/images/Group550.png';
import home from '../../assets/images/mobile-header/Group 1000004014.svg';
import favorite from '../../assets/images/mobile-header/Frame 106.svg';
import message from '../../assets/images/mobile-header/Frame 105.svg';
import profile_log from '../../assets/images/mobile-header/Group 1000004020.svg';
import add from '../../assets/images/mobile_add.svg';
import ring from '../../assets/images/navbar-ring.svg';
// import message from '../../assets/images/message-2.svg';
import profile from '../../assets/images/profile.svg';
import log_out from '../../assets/images/log-out.svg';
import g1 from '../../assets/images/dropdown/g1.svg';
import g2 from '../../assets/images/dropdown/g2.svg';
import g3 from '../../assets/images/dropdown/g3.svg';
import g4 from '../../assets/images/dropdown/g4.png';
import g5 from '../../assets/images/dropdown/g5.svg';
import g6 from '../../assets/images/dropdown/g6.svg';
import g7 from '../../assets/images/dropdown/g7.png';
import g8 from '../../assets/images/dropdown/g8.svg';
import g9 from '../../assets/images/dropdown/g9.png';


export function MobileHeader() {
  const navigate = useNavigate();
  const isAuthenticated = !!getToken();
  const [location, setLocation] = useState(""); // Initialized with an empty string
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  

  return (
    <header className="bottom-header">
      <NavbarBs className="">
        
          
            
          
          <nav className="">
            <div className="centered-link" id="centered-link-mobile">
             <NavLink  to="/" className="nav-item remove-style-from-link">
             <img src={home}></img>
            </NavLink>
            <div>Головна</div>
            </div>

              
             
            <div className="centered-link" id="centered-link-mobile">
                <NavLink to="/favorite"  >
                  <img src={favorite}></img>
                </NavLink>
                <div>Обране</div>
            </div>
            <div className="centered-link-button-mobile" id="bottom-add-ad" >
              <NavLink to="/add"  >
                <img src={add}></img>
              </NavLink>
              
              </div>
            
            <div className="centered-link" id="centered-link-mobile">
                <NavLink to="/"  >
                  <img src={message}></img> 
                </NavLink>
                <div>Повідомлення</div>
            </div>
            <div className="centered-link" id="centered-link-mobile">
              {isAuthenticated ? (
                <NavDropdown title={<img src={profile_log}></img>}as={NavLink} to="/profile" id="profile-dropdown" >
                  {/* <NavDropdown.Item as={NavLink} to="/profile" id="profile-dropdown-item">
                    Profile
                  </NavDropdown.Item> */}
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item onClick={handleLogout} >
                  <img src={log_out}></img>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/myads">
                    <img src={g1}></img>
                    Мої оголошення
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item as={NavLink} to="/add">
                    Create Listing
                  </NavDropdown.Item> */}
                  <NavDropdown.Item as={NavLink} to="/sales">
                  <img src={g2}></img>
                    Продажі
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/purchased">
                  <img src={g3}></img>
                    Покупки
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/rating">
                  <img src={g4}></img>
                  Рейтинг та відгуки
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/favorite">
                  <img src={g5}></img>
                    Обране
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/seelistings">
                  <img src={g6}></img>
                    Переглянуті оголошення
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/settings">
                  <img src={g7}></img>
                    Налаштування
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/usefullInfo">
                  <img src={g8}></img>
                    Корисна інформація
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/support">
                  <img src={g9}></img>
                  Yom підтримка*
                  </NavDropdown.Item>
                  
                </NavDropdown>
                
              ) : (
                <div className="centered-link" id="centered-link-mobile">
                <img src={profile_log}></img>
                <NavLink to="/login" className='remove-style-from-link'>
                    Увійдіть
                </NavLink>
                </div>
              )}
              </div>
              {/* <NavLink to="/edit:id" >
                Edit
              </NavLink> */}
            </nav>
            
            
          
            
      </NavbarBs>
    </header>

    
  )
}
