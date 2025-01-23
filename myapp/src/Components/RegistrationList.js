import React, { useState, useEffect } from "react";
import "./RegistrationList.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6+
import SearchIcon from "@mui/icons-material/Search"; 
import CloseIcon from "@mui/icons-material/Close";
// Import Font Awesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faBirthdayCake, faVenusMars, faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from './Header'
import { 
  faIdCard, 
  faCalendarAlt, 
  faBriefcase, 
  faBarcode, 
  faUniversity, 
  faMap 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faGraduationCap, 
  faStethoscope, 
  faCalendarCheck 
} from "@fortawesome/free-solid-svg-icons";

const apiUrl = "http://localhost/Doctor_search/Registrationform.php";

const RegistrationList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(apiUrl);
      setRegistrations(response.data);
    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };


  const handleSearch = (e) => {
    const filteredRegistrations = registrations.filter((record) =>
      record.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.RegistrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
      record.Qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.Stateofmedicine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.Yearofregistration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.City.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.State.toLowerCase().includes(searchQuery.toLowerCase()) 

    );
    console.log(filteredRegistrations)
    setRegistrations(filteredRegistrations)
  };

  const clear = () =>{
    setSearchQuery('')
    fetchRegistrations();
  }

  // Filter registrations based on the search query
 

  const handleRegisterClick = () => {
    navigate("/registration-form"); // Redirect to registration form
  };

  const [activeTab, setActiveTab] = useState('personal'); // Initial active tab


  const closeDetails = () => {
    setShowDetails(false);
    setSelectedRecord(null); // This line can be kept if you want to reset the selected record
  };


  return (
    <div>
       <Header   title="Registration List"/>
    
    <div className="list-container">
    <div className="btn-align1">

    <button className="register-button1" onClick={handleRegisterClick}>
    <FontAwesomeIcon icon={faPlus} /> Register
    </button>
  </div>
      <div className="controls">
        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 

        />
       <SearchIcon className="search-icon" onClick={() => handleSearch()} />

         <CloseIcon className="clear-icon" onClick={() => clear()} />
        </div>

        {/* Register Button */}

      
      <div className="table-container">

      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            {/* <th>Profile</th> */}
            <th>Name</th>
            <th>Qualification</th>
            <th>Registration No</th>
            <th>Year of Registration</th>
            <th>State of Medicine</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length > 0 ? (
            registrations.map((record, index) => (
              <tr key={index}>
                <td className="text-wrap">{index + 1}</td>
                {/* <td className="text-wrap">
                  <div>
                  <img   style={{ height: '150px', width: '100%' }}
                src={`http://localhost/Doctor_search/${record.image_path}`}
                alt={record.Name}
              />
                  </div>
                </td> */}
                <td className="text-wrap">{record.Name}</td>
                <td className="text-wrap">{record.Qualification}</td>
                <td className="text-wrap">{record.RegistrationNumber}</td>
                <td className="text-wrap">{record.Yearofregistration}</td>
                <td className="text-wrap">{record.Stateofmedicine}</td>
                <td className="text-wrap">{record.City}</td>
                <td className="text-wrap">{record.State}</td>
                <td>
            
<div className="view-button">
  <FontAwesomeIcon icon={faEye} style={{ marginRight: "8px" }} onClick={() => handleView(record)} />
  </div>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No records found!</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      {/* Details Modal */}.
{showDetails && selectedRecord && (
  <div className="modal">
    <div className="modal-content">
      <h2>Registration Details</h2>
      
 {/* Tabs */}
<div className="tabs">
  <div 
    className={`tab ${activeTab === 'personal' ? 'active' : ''}`} 
    onClick={() => setActiveTab('personal')}
  >
    Personal Info
  </div>
  <div 
    className={`tab ${activeTab === 'registration' ? 'active' : ''}`} 
    onClick={() => setActiveTab('registration')}
  >
    Registration Details
  </div>
  <div 
    className={`tab ${activeTab === 'qualification' ? 'active' : ''}`} 
    onClick={() => setActiveTab('qualification')}
  >
    Qualification Info
  </div>
</div>

{/* Tab Contents */}
{/* Personal Info Tab Content */}
<div className={`tab-content ${activeTab === 'personal' ? 'active' : ''}`}>
   {/* Profile Image */}
<div className="personal-info-item profile-image-item">
  <img 
   style={{ height: '200px', width: '100%', objectFit: 'cover' }}
    className="profile-image"
    src={`http://localhost/Doctor_search/${selectedRecord.image_path}`} 
    alt={selectedRecord.Name} 
  />
</div>
  <div className="personal-info">
   
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faUser} />
      <p><strong>Name:</strong> {selectedRecord.Name}</p>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faUserTie} />
      <p><strong>Father/Spouse Name:</strong> {selectedRecord.Fathername}</p>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faBirthdayCake} />
      <p><strong>Date of Birth:</strong> {selectedRecord.DOB}</p>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faVenusMars} />
      <p><strong>Gender:</strong> {selectedRecord.Gender}</p>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faPhoneAlt} />
      <p><strong>Phone:</strong> {selectedRecord.Phonenumber}</p>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faEnvelope} />
      <p><strong>Email:</strong> {selectedRecord.Email}</p>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faMapMarkerAlt} />
      <p><strong>Address:</strong> {selectedRecord.Address}</p>
    </div>
  </div>
</div>

{/* Registration Info Tab Content */}
<div className={`tab-content ${activeTab === 'registration' ? 'active' : ''}`}>
  <div className="registration-info">
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faIdCard} />
      <p><strong>Registration No:</strong> {selectedRecord.RegistrationNumber}</p>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faCalendarAlt} />
      <p><strong>Year of Registration:</strong> {selectedRecord.Yearofregistration}</p>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faBriefcase} />
      <p><strong>Employment Type:</strong> {selectedRecord.Employmenttype}</p>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faBarcode} />
      <p><strong>UPRN:</strong> {selectedRecord.Uprnnumber}</p>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faUniversity} />
      <p><strong>University:</strong> {selectedRecord.Universityname}</p>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faMap} />
      <p><strong>State of Medicine:</strong> {selectedRecord.Stateofmedicine}</p>
    </div>
  </div>
</div>

{/* Qualification Info Tab Content */}
<div className={`tab-content ${activeTab === 'qualification' ? 'active' : ''}`}>
  <div className="qualification-info">
    <div className="qualification-info-item">
      <FontAwesomeIcon icon={faGraduationCap} />
      <p><strong>Qualification:</strong> {selectedRecord.Qualification}</p>
    </div>
    <div className="qualification-info-item">
      <FontAwesomeIcon icon={faStethoscope} />
      <p><strong>Specialization:</strong> {selectedRecord.Specialization}</p>
    </div>
    <div className="qualification-info-item">
      <FontAwesomeIcon icon={faCalendarCheck} />
      <p><strong>Year of Qualification:</strong> {selectedRecord.Yearofqualification}</p>
    </div>
  </div>
</div>



      {/* Close Button */}
      <button className="close-button" onClick={closeDetails}>
        Close
      </button>
    </div>
  </div>
)}

    </div>
    </div>
  );
};

export default RegistrationList;
