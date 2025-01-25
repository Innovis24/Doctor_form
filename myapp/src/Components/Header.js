import "./Header.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSignOut,faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const Header = ({ title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const searchParams = new URLSearchParams(window.location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const OpenPopup= () => {
    setIsOpen(true)
  }
  const handleExit = () => {
    localStorage.clear();
    navigate("/")
  };
  return (
    <div>
    <Popup open={isOpen} onClose={closeModal} contentStyle={{
        width: '385px', // Adjust the width to your desired size
        padding: '20px', // Optional: Adjust padding if needed
        border: '1px solid #ccc', // Optional: Styling for better appearance
        borderRadius: '8px', // Optional: Rounded corners
      }}>
        <div >
          <h2>Are you sure you want to logout?</h2>
          <div className="popup_btn">
          <button className="btn_yesclr" onClick={handleExit}>Yes</button>
          <button className="btn_noClr" onClick={closeModal}>No</button>
          </div>
       
        </div>
      </Popup>
      <div className="header_font">
        {/* Render content only if logged in */}

        {/* Sidebar Section */}
        {!isSidebarOpen && searchParams && (
          <div className="sidebar">
            <button className="sidebar-toggle-button" onClick={toggleSidebar}>
              ✖
            </button>
            <div className="sidebar-header">
              <h3>Doctor Search</h3>
            </div>
            <ul className="sidebar-menu">
              <li>
                
                <a href="/registration_list" className="active">
                <FontAwesomeIcon className="list_icon" icon={faUserMd } /> DOCTOR LIST
                </a>
              </li>
            </ul>
          </div>
        )}

        <div className="display_flea_align">
          {/* Sidebar toggle button on the left */}
          {isSidebarOpen && searchParams && (
            <button
              className="sidebar-toggle-button-open"
              onClick={toggleSidebar}
            >
              ☰
            </button>
          )}

          <div
            className="font_header">
            {title}
          </div>
          <div  className="logout_style">
            <button className="icon_button"  onClick={OpenPopup}>
            <FontAwesomeIcon icon={faSignOut } />
            </button>
         
          </div>
          
        </div>

      </div>
    </div>
  );
};


export default Header;