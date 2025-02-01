import "./Header.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faSignOut, faUserMd, faUserPlus ,faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const Header = ({ title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const searchParams = new URLSearchParams(window.location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [currentLogin, setCurrentLogin] = useState('');
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {

    const values = localStorage.getItem('currentUser') === 'undefined' ? 'null' : JSON.parse(localStorage.getItem('currentUser'));
    const newOne = localStorage.getItem('newUser');
    if (!newOne && values) {
      setCurrentLogin(values[0].UserRole)
    }
    else if (newOne && !values) {
      setCurrentLogin()
    }
    else {
      setCurrentLogin()
    }
    // if(!newOne &&  !values ){
    //   setCurrentLogin()
    // }
    // else{
    //   setCurrentLogin(values[0].UserRole)
    // }

  }, []);
  const OpenPopup = () => {
    setIsOpen(true)
  }
  const handleExit = () => {
    localStorage.clear();
    navigate("/")
  };
  return (
    <div>
      <Popup open={isOpen} onClose={closeModal} contentStyle={{
        width: '385px', 
        padding: '20px', 
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}>
        <div >
          <h2 className="fontFam">Are you sure you want to logout?</h2>
          <div className="popup_btn">
            <button className="btn_yesclr" onClick={handleExit}>Yes</button>
            <button className="btn_noClr" onClick={closeModal}>No</button>
          </div>

        </div>
      </Popup>
      <div className="header_font">
        {/* Render content only if logged in */}

        {/* Sidebar Section */}
        {/* Fora admin */}
        {currentLogin === "Admin" && !isSidebarOpen && searchParams && (
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
                  <FontAwesomeIcon className="list_icon" icon={faUserMd} /> DOCTOR LIST
                </a>
                <a href="/user_master" className="active">
                  <FontAwesomeIcon className="list_icon" icon={faUserPlus} /> USER MASTER
                </a>
              </li>

            </ul>

          </div>
        )}

        {currentLogin !== "Admin" && !isSidebarOpen && searchParams && (
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
                  <FontAwesomeIcon className="list_icon" icon={faUserMd} /> DOCTOR LIST
                </a>

                <a href="/Profile" className="active">
                  <FontAwesomeIcon className="list_icon" icon={faUser} /> MY PROFILE
                </a>
                
              </li>

            </ul>

          </div>
        )}



        <div className="display_flea_align">
          {/* Sidebar toggle button on the left */}

          {/* {currentLogin === "Admin" && isSidebarOpen && searchParams && ( */}
            <button
              className="sidebar-toggle-button-open"
              onClick={toggleSidebar}
            >
              ☰
            </button>
          {/* )} */}

          <div
            className="font_header">
            {title}
          </div>
          <div className="logout_style">
            <button className="icon_button" onClick={OpenPopup}>
              <FontAwesomeIcon icon={faSignOut} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};


export default Header;