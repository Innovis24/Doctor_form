import React, { useState, useEffect } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneAlt, faEnvelope, faTransgenderAlt, faCity, faMapMarkerAlt, faBirthdayCake,faIdCard,faCalendarAlt,faBriefcase ,faUniversity,faGraduationCap,faStethoscope,faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import './Profile.css';  // Import the CSS file
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6+
import doctorIllustration from '../assets/image/img-1.jpg';
import axios from "axios";
import { toast } from 'react-toastify';
const apiUrl = "http://localhost/Doctor_search/Registrationform.php";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("personal"); // State for active tab
  const [error, setError] = useState(null); // Error state
  const[handleTabChange,sethandleTabChange]=useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation
  
  useEffect(() => {
    const values =JSON.parse(localStorage.getItem('currentUser'));
      if(values === '' || values === null || values === undefined){
        navigate("/");
        return;
      }
        fetchData(values[0].RegNumber);
    
  }, []); // Empty dependency array, so it runs only once when the component mounts
  const fetchData = async (ID) => {
    try {
      const response = await axios.get(apiUrl);
      const filterVal = response.data.filter((record) =>
        record.RegistrationNumber === ID
      );
      if(filterVal.length > 0 ){
        setUserData(filterVal[0]);
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
        src={doctorIllustration}
        alt="Doctor Illustration"
        className="illustration-img responsive-image" />
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
          <div className="tab-content active">
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faUser} />
              <strong>Name:</strong> {userData.Name}
            </div>
            {/* <div className="personal-info-item">
              <FontAwesomeIcon icon={faTransgenderAlt} />
              <strong>Gender:</strong> {userData.gender}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faBirthdayCake} />
              <strong>Date of Birth:</strong> {userData.dob}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faPhoneAlt} />
              <strong>Phone:</strong> {userData.phone}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <strong>Email:</strong> {userData.email}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faCity} />
              <strong>City:</strong> {userData.city}
            </div>
            <div className="personal-info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <strong>State:</strong> {userData.state}
            </div>
            <div className="personal-info-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              <strong>Address:</strong> {userData.address}
            </div> */}
          </div>
        )}

        {/* Registration Info */}
        {/* {activeTab === "registration" && (
           <div className="tab-content active">
            <div className="registration-info-item">
                <FontAwesomeIcon icon={faIdCard} />
              <strong>Registration No:</strong> {userData.registrationNumber}
            </div>
            <div className="registration-info-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
              <strong>Year of Registration:</strong> {userData.yearOfRegistration}
            </div>
            <div className="registration-info-item">
            <FontAwesomeIcon icon={faBriefcase} />
              <strong>State of Medicine:</strong> {userData.stateOfMedicine}
            </div>
            <div className="registration-info-item">
            <FontAwesomeIcon icon={faUniversity} />
              <strong>University:</strong> {userData.university}
            </div>
          </div>
        )} */}

        {/* Qualification Info */}
        {/* {activeTab === "qualification" && (
           <div className="tab-content active">
            <div className="qualification-info-item">
             <FontAwesomeIcon icon={faGraduationCap} />
              <strong>Qualification:</strong> {userData.qualification}
            </div>
            <div className="qualification-info-item">
             <FontAwesomeIcon icon={faStethoscope} />
              <strong>Specialization:</strong> {userData.specialization}
            </div>
            <div className="qualification-info-item">
           <FontAwesomeIcon icon={faCalendarCheck} />
              <strong>Year of Qualification:</strong> {userData.yearOfQualification}
            </div>
          </div>
        )} */}

        {/* Close Button */}
        <button className="close-button" onClick={() => console.log("Close")}>Close</button>
      </div>
    </div>
  );
};

export default Profile;
