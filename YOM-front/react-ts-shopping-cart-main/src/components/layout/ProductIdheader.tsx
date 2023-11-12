import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as NavbarBs } from 'react-bootstrap';
interface IDataItem {
    id: number;
    title: string;
    description: string;
    price: number;
    dateCreated: string;
    dateModified: string;
    city: string;
    address: string;
    email:string;
    phoneNumber:number;
    currency: string;
    adType: string;
    productState:string;
    categoryId: number;
    subCategoryId: number;
    photos: string[];
    userId: number;
}
interface ProductIdheaderProps {
  product: IDataItem;
}

const ProductIdheader: React.FC<ProductIdheaderProps> = ({ product }) => {
    const [showNumber, setShowNumber] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    // Function to update the isMobile state based on screen width
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    useEffect(() => {
      // Initial check on component mount
      updateIsMobile();
  
      // Add an event listener to update isMobile on window resize
      window.addEventListener('resize', updateIsMobile);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', updateIsMobile);
      };
    }, []);
  
    // Render null if the screen size is greater than 768px
    if (!isMobile) {
      return null;
    }
  
    return (
      <header className="bottom-header-productId">
        <NavbarBs className="">
          <nav className="">
            <button onClick={() => setShowNumber(true)} className="productById-number-mobile">
              {showNumber ? product.phoneNumber : "+00 00 00 00 00"}
            </button>
            <Link to={`/messenger/${product.userId}`}>
              <button className="productById-message-mobile">Send Message</button>
            </Link>
            
          </nav>
        </NavbarBs>
      </header>
    );
  };
  
  export default ProductIdheader;
