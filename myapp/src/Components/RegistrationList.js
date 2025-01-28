import React, { useState, useEffect } from "react";
import "./RegistrationList.css";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6+
import SearchIcon from "@mui/icons-material/Search"; 
import CloseIcon from "@mui/icons-material/Close";
// Import Font Awesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faBirthdayCake, faPhoneAlt, faEnvelope ,faTransgenderAlt} from '@fortawesome/free-solid-svg-icons';
import { faEye,faPencil ,faTrash} from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCity, faMapMarkerAlt, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
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
  const [currentDeleteSno, setCurrentDeleteSno] = useState(''); // State for search input
  const [currentImagepath, setcurrentImagepath] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Use useNavigate for navigation
  const rowsPerPage = 5; // Adjust as needed

  // Calculate the indices for slicing
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = registrations.slice(startIndex, endIndex);

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);


  // Calculate total pages
  const totalPages = Math.ceil(registrations.length / rowsPerPage);
  useEffect(() => {
    const values =JSON.parse(localStorage.getItem('currentUser'));
   
    if(values === '' || values === null || values === undefined){
      navigate("/");
      return;
    }
    fetchRegistrations();
  }, [navigate]);

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

  const sethandleSearch = (e)=>{
    let searchValue = e.target.value
    setSearchQuery(searchValue.trim())
  }

  const handleSearch = (e) => {
    const filteredRegistrations = registrations.filter((record) =>
      record.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.RegistrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
      record.Qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.Stateofmedicine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.Yearofregistration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.City.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.Uprnnumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.Fathername.toLowerCase().includes(searchQuery.toLowerCase()) || 
      record.Gender.toLowerCase().includes(searchQuery.toLowerCase())

    );
    setRegistrations(filteredRegistrations)
  };

  const clear = () =>{
    setSearchQuery('')
    fetchRegistrations();
  }

  // Filter registrations based on the search query
 

  const handleRegisterClick = () => {
    navigate("/registration_form"); // Redirect to registration form
  };

  const [activeTab, setActiveTab] = useState('personal'); // Initial active tab


  const closeDetails = () => {
    setShowDetails(false);
    setSelectedRecord(null); // This line can be kept if you want to reset the selected record
  };

  const handleEdit = (record) => {

    localStorage.setItem('editItem',true );
    navigate('/registration_form', { state:record});

  }


  const handleDelete = async (record) => {
  
    setCurrentDeleteSno(record.Sno);
    setcurrentImagepath(record.image_path);
    setIsOpen(true)
  };

  const handleYesDelete=async ()=>{

      try {
        const response = await axios.delete(apiUrl, {
          data: { Sno: Number(currentDeleteSno),image_path:currentImagepath}, // Send the Sno for deletion
        });
  
        if (response.status === 200) {
          toast.success("Record deleted successfully!");
          setIsOpen(false)
          fetchRegistrations()
        } else {
          toast.error(response.data.error || "Failed to delete record.");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        toast.error("Failed to delete record. Please try again.");
      }
  }

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
       <Header   title="Registration List"/>
       <ToastContainer
        autoClose={500} // Auto-close in 20 seconds
        toastStyle={{ backgroundColor: "white", color: 'black' ,  fontFamily: "'Roboto', sans-serif" }}
        progressStyle={{ background: 'white' }}/>
        <Popup open={isOpen} onClose={closeModal} contentStyle={{
        width: '385px', // Adjust the width to your desired size
        padding: '20px', // Optional: Adjust padding if needed
        border: '1px solid #ccc', // Optional: Styling for better appearance
        borderRadius: '8px', // Optional: Rounded corners
      }}>
        <div >
          <h2>Are you sure you want to delete?</h2>
          <div className="popup_btn">
          <button className="btn_yesclr" onClick={handleYesDelete}>Yes</button>
          <button className="btn_noClr" onClick={closeModal}>No</button>
          </div>
       
        </div>
      </Popup>
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
          value={searchQuery} onChange={(e) => sethandleSearch(e)} 

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
            <th>Gender</th>
            <th>Father / Spouse Name</th>
            <th>Qualification</th>
            <th>UPRN Number</th>
            {/* <th>Registration No</th> */}
            <th>Year of Registration</th>
            <th>State of Medicine</th>
            <th>City</th>
           
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((record, index) => (
              <tr key={index}>
                <td className="text-wrap">{startIndex + index + 1}</td>
                {/* <td className="text-wrap">
                  <div>
                  <img   style={{ height: '150px', width: '100%' }}
                src={`http://localhost/Doctor_search/${record.image_path}`}
                alt={record.Name}
              />
                  </div>
                </td> */}
                <td className="text-wrap">
                  <div>
                  {record.Name}
                  <div className="regNumFont">
                 #{record.RegistrationNumber}
                  </div>
                  </div>
                 
                  </td>
                <td className="text-wrap txt_trans">{record.Gender}</td>
                <td className="text-wrap">{record.Fathername}</td>
                <td className="text-wrap">{record.Qualification}</td>
                <td className="text-wrap">{record.Uprnnumber}</td>
                {/* <td className="text-wrap">{record.RegistrationNumber}</td> */}
                <td className="text-wrap">{record.Yearofregistration}</td>
                <td className="text-wrap">{record.Stateofmedicine}</td>
                <td className="text-wrap">{record.City}</td>
                
                <td>
                 
                <div className="alignmentbtn">
                  <FontAwesomeIcon  className="view-button" icon={faEye} style={{ marginRight: "8px" }} onClick={() => handleView(record)} />
                    <FontAwesomeIcon className="view-button" icon={faPencil} style={{ marginRight: "8px" }} onClick={() => handleEdit(record)} />
                  
                    <FontAwesomeIcon className="view-button" icon={faTrash} style={{ marginRight: "8px" }} onClick={() => handleDelete(record)}
/>
                  </div>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10"><b>No records found!</b></td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table_postiion">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="pagination_style">
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            style={{
              margin: "0 5px",
              backgroundColor: currentPage === index + 1 ? "#00b4b6" : "#fff",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "1px solid #00b4b6",
              borderRadius: "5px"
            }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="pagination_style">
          Next
        </button>
      </div>



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
   <center>
<div className="personal-info-item profile-image-item">
  <img 
   style={{ height: '50%', width: '50%%', objectFit: 'cover' }}
    className="profile-image"
    src={`http://localhost/Doctor_search/${selectedRecord.image_path}`} 
    alt={selectedRecord.Name} 
  />
</div>
</center>
  <div className="personal-info">
   
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faUser} />
      <div className="disply_flex"><strong className="font_size_popup">Name: </strong><div className="popup_wrap">{selectedRecord.Name}</div> </div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faUserTie} />
      <div className="disply_flex"><strong className="font_size_popup">Father/Spouse Name:</strong><div className="popup_wrap"> {selectedRecord.Fathername}</div></div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faBirthdayCake} />
      <div className="disply_flex"><strong className="font_size_popup">Date of Birth:</strong> <div className="popup_wrap">{selectedRecord.DOB}</div></div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faTransgenderAlt} />
      <div className="disply_flex"><strong className="font_size_popup">Gender:</strong> <div className="popup_wrap txt_trans">{selectedRecord.Gender}</div></div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faPhoneAlt} />
      <div className="disply_flex"><strong className="font_size_popup">Phone:</strong><div className="popup_wrap"> {selectedRecord.Phonenumber}</div></div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faEnvelope} />
      <div className="disply_flex"><strong className="font_size_popup">Email:</strong><div className="popup_wrap"> {selectedRecord.Email}</div></div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faCity} />
      <div className="disply_flex"><strong className="font_size_popup">City:</strong><div className="popup_wrap"> {selectedRecord.City}</div></div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faMapMarkerAlt} />
      <div className="disply_flex"><strong className="font_size_popup">State:</strong><div className="popup_wrap"> {selectedRecord.State}</div></div>
    </div>
    <div className="personal-info-item">
      <FontAwesomeIcon icon={faAddressCard} />
      <div className="disply_flex"><strong className="font_size_popup">Address:</strong><div className="popup_wrap"> {selectedRecord.Address}</div></div>
    </div>
  </div>
</div>

{/* Registration Info Tab Content */}
<div className={`tab-content ${activeTab === 'registration' ? 'active' : ''}`}>
  <div className="registration-info">
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faIdCard} />
      <div className="disply_flex"><strong className="font_size_popup">Registration No:</strong> <div className="popup_wrap">{selectedRecord.RegistrationNumber}</div></div>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faCalendarAlt} />
      <div className="disply_flex"><strong className="font_size_popup">Year of Registration:</strong><div className="popup_wrap"> {selectedRecord.Yearofregistration}</div></div>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faBriefcase} />
      <div className="disply_flex"><strong>Employment Type:</strong><div className="popup_wrap"> {selectedRecord.Employmenttype}</div></div>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faBarcode} />
      <div className="disply_flex"><strong className="font_size_popup">UPRN:</strong><div className="popup_wrap"> {selectedRecord.Uprnnumber}</div></div>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faUniversity} />
      <div className="disply_flex"><strong className="font_size_popup">University:</strong> <div className="popup_wrap">{selectedRecord.Universityname}</div></div>
    </div>
    <div className="registration-info-item">
      <FontAwesomeIcon icon={faMap} />
      <div className="disply_flex"><strong className="font_size_popup">State of Medicine:</strong><div className="state_council"> {selectedRecord.Stateofmedicine}</div></div>
    </div>
  </div>
</div>

{/* Qualification Info Tab Content */}
<div className={`tab-content ${activeTab === 'qualification' ? 'active' : ''}`}>
  <div className="qualification-info">
    <div className="qualification-info-item">
      <FontAwesomeIcon icon={faGraduationCap} />
      <div className="disply_flex"><strong className="font_size_popup">Qualification:</strong><div className="popup_wrap"> {selectedRecord.Qualification}</div></div>
    </div>
    <div className="qualification-info-item">
      <FontAwesomeIcon icon={faStethoscope} />
      <div className="disply_flex"><strong className="font_size_popup">Specialization:</strong><div className="popup_wrap"> {selectedRecord.Specialization}</div></div>
    </div>
    <div className="qualification-info-item">
      <FontAwesomeIcon icon={faCalendarCheck} />
      <div className="disply_flex"><strong className="font_size_popup">Year of Qualification:</strong><div className="popup_wrap"> {selectedRecord.Yearofqualification}</div></div>
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

