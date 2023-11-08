import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import '../../assets/css/style.css'; // Import the CSS file

export interface DropdownMenuItem {
  text: string;
  to: string;
}

interface DropdownProps {
  items: DropdownMenuItem[];
}

const DropdownItem: React.FC<DropdownProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the document click event from closing the dropdown
  };

  return (
    <div className={`dropdown ${isOpen ? 'active' : ''}`} ref={dropdownRef} onClick={handleDropdownClick}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Click me
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to}>{item.text}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownItem;
