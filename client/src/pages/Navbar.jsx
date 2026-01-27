import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem('loggedInUser');

  const facilities = [
    { label: "Khetrent", path: "/khetrent" },
    { label: "Warehouse", path: "/warehouse" },
    { label: "Direct Sell", path: "/directsell" },
    { label: "Soil Detection", path: "/soildetection" },
    { label: "Water Management", path: "/watermanagement" },
    { label: "Machinery", path: "/machinery" },
    { label: "Seeds", path: "/seeds" },
    { label: "Pay After Harvest", path: "/payafterharvest" },
    { label: "Personal Advisory", path: "/personaladvisory" },
    { label: "Transportation", path: "/transportation" },
    { label: "Insurance", path: "/insurance" },
    { label: "Profile", path: "/profile" },
    {label: "Home" , path:"/home"},
  ];

  const handleFacilityClick = (path) => {
    setOpenDropdown(false);
    navigate(path);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar">
      {/* LEFT: app name */}
      <div className="nav-left">
        <Link to="/home" className="nav-logo">KissanApp</Link>
      </div>

      {/* CENTER: Facilities dropdown */}
      <div className="nav-center">
        <div
          className="nav-dropdown-wrapper"
          onClick={() => setOpenDropdown(prev => !prev)}
        >
          <span className="nav-dropdown-label">Facilities ▾</span>
        </div>

        {openDropdown && (
          <div className="nav-dropdown-menu">
            {facilities.map((item) => (
              <div
                key={item.path}
                className="nav-dropdown-item"
                onClick={() => handleFacilityClick(item.path)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: name + profile circle */}
      <div className="nav-right">
        {loggedInUser && (
          <span className="nav-username">Hi, {loggedInUser}</span>
        )}

        <div className="nav-profile-circle" onClick={handleProfileClick}>
          <span className="nav-profile-initial">
            {loggedInUser
              ? loggedInUser.charAt(0).toUpperCase()
              : 'U'}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
