import React, { useState, useEffect } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneAlt, faEnvelope, faTransgenderAlt, faCity, faMapMarkerAlt, faBirthdayCake,faIdCard,faCalendarAlt,faBriefcase ,faUniversity,faGraduationCap,faStethoscope,faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import './Profile.css';  // Import the CSS file
import { useNavigate,useLocation } from "react-router-dom"; // Use useNavigate for React Router v6+
import axios from "axios";
import { toast } from 'react-toastify';

const apiUrl = "http://localhost/Doctor_search/Registrationform.php";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [activeTab, setActiveTab] = useState(""); 
  const [currentID, setcurrentID] = useState(""); 
  const navigate = useNavigate(); // Use useNavigate for navigation
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update activeTab state correctly
  };
  const location = useLocation();
  const data = location.state;
  useEffect(() => {
    const values =JSON.parse(localStorage.getItem('currentUser'));
    fetchData(values[0].RegNumber);
      if(values === '' || values === null || values === undefined){
        navigate("/");
        return;
      }
      if(data !== ""){
        setcurrentID(data)
      }
  }, []); // Empty dependency array, so it runs only once when the component mounts
 
  const fetchData = async (ID) => {
    try {
      const response = await axios.get(apiUrl);
      const filterVal = []
      if(currentID !== ""){
        filterVal = response.data.filter((record) =>
          record.RegistrationNumber === currentID
        );
      }
      else{
        filterVal = response.data.filter((record) =>
          record.RegistrationNumber === ID
        );
      }
    
      if(filterVal.length > 0 ){
        setUserData(filterVal[0]);
        setActiveTab("personal")
      }
      else{
        setUserData([]);
      }
      
    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
  };
 
  return (
    <div>
      <Header title="Profile" />
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
        <img 
   
    className="profile-image"
    src={`http://localhost/Doctor_search/${userData.image_path}`} 
  />
  {/* <h1>{userData.Name}</h1> */}
</div>


        {/* Profile Tabs */}
        <div className="tabs">
        <div className={`tab ${activeTab === "personal" ? "active" : ""}`} onClick={() => handleTabChange("personal")}>
  Personal Info
</div>
<div className={`tab ${activeTab === "registration" ? "active" : ""}`} onClick={() => handleTabChange("registration")}>
  Registration Details
</div>
<div className={`tab ${activeTab === "qualification" ? "active" : ""}`} onClick={() => handleTabChange("qualification")}>
  Qualification Info
</div>

        </div>

        {/* Personal Info */}
        {activeTab === "personal" && (
          <div className="tab-content actively">
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faUser} />
              <strong>Name:</strong> {userData.Name}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faTransgenderAlt} />
              <strong>Gender:</strong> {userData.Gender}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faBirthdayCake} />
              <strong>Date of Birth:</strong> {userData.DOB}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faPhoneAlt} />
              <strong>Phone:</strong> {userData.Phonenumber}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <strong>Email:</strong> {userData.Email}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faCity} />
              <strong>City:</strong> {userData.City}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <strong>State:</strong> {userData.State}
            </div>
            <div className="personal-info-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              <strong>Address:</strong> {userData.Address}
            </div>
          </div>
        )}

        {/*Registration Info */}
        {activeTab === "registration" && (
           <div className="tab-content active">
            <div className="registration-info-item1">
                <FontAwesomeIcon icon={faIdCard} />
              <strong>Registration No:</strong> {userData.RegistrationNumber}
            </div>
            <div className="registration-info-item1">
            <FontAwesomeIcon icon={faCalendarAlt} />
              <strong>Year of Registration:</strong> {userData.Yearofregistration}
            </div>
            <div className="registration-info-item1">
            <FontAwesomeIcon icon={faBriefcase} />
              <strong>State of Medicine:</strong> {userData.Stateofmedicine}
            </div>
            <div className="registration-info-item1">
            <FontAwesomeIcon icon={faUniversity} />
              <strong>University:</strong> {userData.Universityname}
            </div>
          </div>
        )}

        {/* Qualification Info */}
        {activeTab === "qualification" && (
           <div className="tab-content active">
            <div className="qualification-info-item1">
             <FontAwesomeIcon icon={faGraduationCap} />
              <strong>Qualification:</strong> {userData.Qualification}
            </div>
            <div className="qualification-info-item1">
             <FontAwesomeIcon icon={faStethoscope} />
              <strong>Specialization:</strong> {userData.Specialization}
            </div>
            <div className="qualification-info-item1">
           <FontAwesomeIcon icon={faCalendarCheck} />
              <strong>Year of Qualification:</strong> {userData.Yearofqualification}
            </div>
          </div>
        )}
      {/* Close Button */}
        <div className="cls_btn_style">
        <button className="close-button-Profile" onClick={() => console.log("Close")}>Close</button>
        </div>
      
       
      </div>
    </div>
  );
};

export default Profile;
