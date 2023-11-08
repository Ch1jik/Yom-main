import { Button, Container, Nav, Navbar as NavbarBs ,NavDropdown} from "react-bootstrap"
import { NavLink } from "react-router-dom"


import React, { useEffect } from 'react';
import { getToken, removeToken } from '../../../utilities/TokenUtility'; // Import the token utility
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../../../assets/css/adminStyle.css'
import { useState } from "react";
import logo from '../../../assets/images/Group1000004232.png';
import ring from '../../../assets/images/admin_ring.svg';
import message from '../../../assets/images/admin_message.svg';
import log_out from '../../../assets/images/admin_logout.svg'
interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  avatarPath?: File;
  phoneNumber: number;
  about:string;

}
export function Header() {
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
    <header className="header-admin">
      
      <NavbarBs sticky="top" className=" mb-3">
        {/* <Container > */}
          
            
          
          <Nav className=" me-auto ">
            <div className="admin-header-left">
            
                <div className="centered-link" >
                
                
                <form onSubmit={handleFormSubmit}>
                    <input type="text" id="locationName" value={location} onChange={(e) => setLocation(e.target.value)} className="nav-bar-location" placeholder="Я шукаю ..." />
                </form>

                    
                
                
                </div>
            </div>
              <div className="admin-header-right">
              <div className="centered-link">
                <Nav.Link to="/" as={NavLink} >
                  <img src={message}></img> 
                </Nav.Link>
                <Nav.Link to="/" as={NavLink} >
                  <img src={ring}></img>
                </Nav.Link>
              
             

              
              
              
                {/* <NavDropdown title={<img src={userData.avatarPath}></img>} id="profile-dropdown" > */}
                <NavDropdown title={'lol'} id="profile-dropdown" >
                  {/* <NavDropdown.Item as={NavLink} to="/profile" id="profile-dropdown-item">
                    Profile
                  </NavDropdown.Item> */}
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item onClick={handleLogout} >
                  <img src={log_out}></img>
                    Logout
                  </NavDropdown.Item>
                 
                  
                </NavDropdown>
                <button onClick={handleLogout} className="category-trigger" >
                    <img src={log_out}></img>
                </button>
                </div>
              </div>
              {/* <Nav.Link to="/edit:id" as={NavLink}>
                Edit
              </Nav.Link> */}
            </Nav>
            
            
          
        {/* </Container> */}
        {/* <Breadcrumbs/> */}
      </NavbarBs>

    </header>
  )
}
