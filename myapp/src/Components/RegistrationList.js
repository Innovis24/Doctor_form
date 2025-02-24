import React, { useState, useEffect } from "react";
import "./RegistrationList.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom"; // Use useNavigate for React Router v6+
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
// Import Font Awesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faBirthdayCake, faPhoneAlt, faEnvelope, faTransgenderAlt, faEye, faSearch, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { faPencil ,faTrash} from '@fortawesome/free-solid-svg-icons';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCity, faMapMarkerAlt, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Header from './Header';
import { ClipLoader } from 'react-spinners';
import { REG_API_URL, API_URL } from "../utlis/common";
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



const RegistrationList = () => {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [wholearray, setwholearray] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState([]);
  const [getPGarray, setgetPGarray] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentDeleteSno, setCurrentDeleteSno] = useState(''); // State for search input
  const [currentImagepath, setcurrentImagepath] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Use useNavigate for navigation
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('personal'); // Initial active tab
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [Totalvalue, setTotalvalue] = useState(0);
  const maxVisiblePages = 5;
  const [searchFilters, setSearchFilters] = useState({
    Name: "",
    Gender: "",
    Fathername: "",
    Phonenumber: "",
    Qualification: "",
    Uprnnumber: "",
    Yearofregistration: "",
    Stateofmedicine: "",
    City: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };
  // Calculate the indices for slicing
  const totalRecord = registrations.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = registrations.slice(startIndex, endIndex);
  const totalPages = Math.ceil(registrations.length / rowsPerPage);
  const startRecord = registrations.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const endRecord = Math.min(startRecord + rowsPerPage - 1, registrations.length);
  useEffect(() => {
    const values = localStorage.getItem('currentUser') === 'undefined' ? 'null' : JSON.parse(localStorage.getItem('currentUser'));
    const newOne = localStorage.getItem('newUser');

    if ((values === '' || values === null || values === undefined) && (!newOne)) {
      navigate("/");
      return;
    }
    fetchRegistrations();
  }, [navigate]);

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  const param1 = getQueryParam('param1');
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "N/A"; // Return "N/A" if DOB is empty
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`; // Convert to "dd-mm-yyyy"
  };
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(REG_API_URL);
      if (response.data.code === 400) {
        setLoading(false);
        setRegistrations([]);
      } else {
        setLoading(false);
        setRegistrations(response.data);
        setwholearray(response.data)
        setTotalvalue(response.data.length)
      }
    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
    setLoading(false);
    // finally {
    //   setLoading(false);  // Stop loader after data is fetched
    // }
  };

  const handleView = (record) => {
    setLoading(true);
    setSelectedRecord(record);
   
    const PGarray = !record.Postgraduation ? [] : JSON.parse(record.Postgraduation)
    setgetPGarray(PGarray)
    setShowDetails(true);
    setLoading(false);
  };

  const sethandleSearch = (e) => {
    setLoading(true);
    let value = e.target.value.trim()
    setSearchQuery(value)
    if (e.target.value === "") {
      setLoading(false);
      setRegistrations(wholearray)
      return
    }

    handleSearch(value);
    setLoading(false);
  }

  const handleSearch = (selectedValue) => {
    setLoading(true);
    // console.log(param1)

    // if(param1 === 'searchDoctor'){
    //   const filteredRegistrations = registrations.filter((record) =>
    //     record.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   record.RegistrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) 
    //   );
    //   setRegistrations(filteredRegistrations)
    // }
    // else{
    const filteredRegistrations = wholearray.filter((record) =>
      record.Name.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.RegistrationNumber.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.Qualification.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.Stateofmedicine.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.Yearofregistration.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.City.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.Uprnnumber.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.Fathername.toLowerCase().includes(selectedValue.toLowerCase()) ||
      record.Gender.toLowerCase().startsWith(selectedValue.toLowerCase()) ||
      record.Phonenumber.toLowerCase().includes(selectedValue.toLowerCase())

    );
    setLoading(false);
    setRegistrations(filteredRegistrations)
    setCurrentPage(1);
    // }

  };
  const clearSearch = () => {
    setSearchFilters({
      Name: "",
      Gender: "",
      Fathername: "",
      Phonenumber: "",
      Qualification: "",
      Uprnnumber: "",
      Yearofregistration: "",
      Stateofmedicine: "",
      City: ""
    })
    setRegistrations(wholearray)
  }
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= maxVisiblePages) {
      // If total pages are within limit, show all
      pages = [...Array(totalPages)].map((_, i) => i + 1);
    } else {
      // Always show first and last page
      pages = [1];

      if (currentPage > 3) pages.push("...");

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }
    return pages;
  };
  const handleSearchChange = (e, field) => {
    const { value } = e.target;

    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value, // Update only the specific field
    }));

    if (e.target.value === "") {
      setRegistrations(wholearray)
      return
    }

    if (field === 'Gender') {
      applyFiltersGender({ ...searchFilters, [field]: value.trim() });
      return
    }
    // Check if Enter is pressed
    // if (e.key === "Enter") {
    applyFilters({ ...searchFilters, [field]: value.trim() });
    // }
  };

  const applyFilters = (filters) => {

    const filteredData = wholearray.filter((record) =>
      Object.keys(filters).every((key) =>
        filters[key] === "" ||
        (record[key] && record[key].toString().toLowerCase().includes(filters[key].toLowerCase()))
      )
    );

    setRegistrations(filteredData);
  };

  const applyFiltersGender = (filters) => {
    const filteredData = wholearray.filter((record) =>
      Object.keys(filters).every((key) => {
        const recordValue = record[key] ? String(record[key]).toLowerCase().trim() : "";
        const filterValue = filters[key] ? filters[key].toLowerCase().trim() : "";

        return filterValue === "" || recordValue.startsWith(filterValue);
      })
    );

    setRegistrations(filteredData);
  };




  const clear = () => {
    setSearchQuery('')
    fetchRegistrations();
  }


  const handleRegisterClick = () => {
    navigate("/registration_form"); // Redirect to registration form
  };


  const closeDetails = () => {
   setActiveTab('personal')
    setShowDetails(false);
  };

  const handleEdit = (record) => {

    localStorage.setItem('editItem', true);
    navigate('/registration_form', { state: record });

  }


  const handleDelete = async (record) => {

    setCurrentDeleteSno(record.Sno);
    setcurrentImagepath(record.image_path);
    setIsOpen(true)
  };

  const handleYesDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete((REG_API_URL + '?action=deleteuser'), {
        data: { Sno: Number(currentDeleteSno), image_path: currentImagepath }, // Send the Sno for deletion
      });

      if (response.status === 200) {
        setLoading(false);
        toast.success("Record deleted successfully!");
        setIsOpen(false)
        fetchRegistrations()
      } else {
        setLoading(false);
        toast.error(response.data.error || "Failed to delete record.");
      }
    } catch (error) {
      setLoading(false);
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
      {loading && (
        <div style={overlayStyle}>
          <ClipLoader size={50} color="#fff" />
        </div>
      )}
      <Header title="Doctors List" />
      <ToastContainer
        autoClose={500} // Auto-close in 20 seconds
        toastStyle={{ backgroundColor: "white", color: 'black', fontFamily: "'Roboto', sans-serif" }}
        progressStyle={{ background: 'white' }} />

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
      <div className="list-container1">
        <div className="btn-align1">

          {/* <button className="register-button1" onClick={handleRegisterClick}>
    <FontAwesomeIcon icon={faPlus} /> Register
    </button> */}
        </div>
        {/* <div>Doctor list</div> */}
        <div className="controls">

          <div className="itm_wt">
            <b className="ITEM_MRG">Show</b>
            <select
              className="itemPerpage"
              value={rowsPerPage}
              onChange={(e) => {
                setrowsPerPage(Number(e.target.value));
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>

            </select>
            <b className="ITEM_MRG">entries</b>
          </div>
          <div className="display_item">
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => sethandleSearch(e)}
              onKeyDown={(e) => applyFilters(searchFilters)}
            // onChange={(e) => setSearchQuery(e)}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter') {
            //     handleSearch(); // Trigger search on Enter key press
            //   }
            // }}
            />
            <div className="search_icon_style">
              <SearchIcon className="search-icon" onClick={() => handleSearch()} />

              <CloseIcon className="clear-icon" onClick={() => clear()} />
            </div>

          </div>
          {/* Search Bar */}

        </div>

        {/* Register Button */}


        <div className="table-container1">

          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                {/* <th>Profile</th> */}
                <th>Name</th>
                <th>Gender</th>
                <th>Father / Spouse Name</th>
                <th>Phone Number</th>
                <th>Qualification</th>
                <th>UPRN Number</th>
                {/* <th>Registration No</th> */}
                <th>Year of Registration</th>
                <th>State of Medicine</th>
                <th>City</th>

                <th>Action</th>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    className="input_hover_style"
                    value={searchFilters.Name}
                    onChange={(e) => handleSearchChange(e, "Name")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search Name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input_hover_style"
                    value={searchFilters.Gender}
                    onChange={(e) => handleSearchChange(e, "Gender")}
                    onKeyDown={(e) => applyFiltersGender(searchFilters)}
                    placeholder="Search Gender"
                  />
                  {/* <select value={searchFilters.Gender} onChange={(e) => handleSearchChange(e, "Gender")}>
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select> */}
                </td>
                <td>
                  <input
                    type="text"
                    className="input_hover_style"
                    value={searchFilters.Fathername}
                    onChange={(e) => handleSearchChange(e, "Fathername")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search Father/Spouse"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input_hover_style"
                    value={searchFilters.Phonenumber}
                    onChange={(e) => handleSearchChange(e, "Phonenumber")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search Phone"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={searchFilters.Qualification}
                    className="input_hover_style"
                    onChange={(e) => handleSearchChange(e, "Qualification")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search Qualification"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={searchFilters.Uprnnumber}
                    className="input_hover_style"
                    onChange={(e) => handleSearchChange(e, "Uprnnumber")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search UPRN"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={searchFilters.Yearofregistration}
                    className="input_hover_style"
                    onChange={(e) => handleSearchChange(e, "Yearofregistration")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search Year"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={searchFilters.Stateofmedicine}
                    className="input_hover_style"
                    onChange={(e) => handleSearchChange(e, "Stateofmedicine")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search State"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={searchFilters.City}
                    className="input_hover_style"
                    onChange={(e) => handleSearchChange(e, "City")}
                    onKeyDown={(e) => applyFilters(searchFilters)}
                    placeholder="Search City"
                  />
                </td>
                <td>
                  <button className="clear_btn_style" onClick={clearSearch}>Clear</button>
                </td>
              </tr>
            </thead>
            <tbody>
              {currentRows && currentRows.length > 0 ? (
                currentRows.map((record, index) => (
                  <tr key={index}>
                    <td className="text-wrap">{startIndex + index + 1}</td>
                    {/* <td className="text-wrap">
                  <div>
                  <img   style={{ height: '150px', width: '100%' }}
                src={`https://doctors.innovis24.com/Doctor_search/${record.image_path}`}
                alt={record.Name}
              />
                  </div>
                </td> */}
                    <td className="text-wrap">
                      <div className="font_wt">
                        {record.Name}
                        <div className="regNumFont">
                          #{record.RegistrationNumber}
                        </div>
                      </div>

                    </td>
                    <td className="text-wrap txt_trans">{record.Gender}</td>
                    <td className="text-wrap">{record.Fathername}</td>
                    <td className="text-wrap">{record.Phonenumber}</td>
                    <td className="text-wrap">{record.Qualification}</td>
                    <td className="text-wrap">{record.Uprnnumber}</td>
                    {/* <td className="text-wrap">{record.RegistrationNumber}</td> */}
                    <td className="text-wrap">{record.Yearofregistration}</td>
                    <td className="text-wrap txt_trans">{record.Stateofmedicine}</td>
                    <td className="text-wrap txt_trans">{record.City}</td>

                    <td>

                      <div className="alignmentbtn">
                        <FontAwesomeIcon className="view-button" icon={faEye} style={{ marginRight: "8px" }} onClick={() => handleView(record)} />
                        {/* <FontAwesomeIcon className="view-button" icon={faPencil} style={{ marginRight: "8px" }} onClick={() => handleEdit(record)} /> */}

                        {/* <FontAwesomeIcon className="view-button" icon={faTrash} style={{ marginRight: "8px" }} onClick={() => handleDelete(record)} /> */}
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11"><b>No records found!</b></td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="table_position sticky_position">
            {totalPages > 1 && (
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination_style_reg"
              >
                Previous
              </button>
            )}
            {totalPages > 1 && (
              <div className="pagination_buttons">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="ellipsis">...</span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => goToPage(page)}
                      className={`pagination_button ${currentPage === page ? "active" : ""}`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
            {totalPages > 1 && (
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination_style_reg"
              >
                Next
              </button>
            )}
            <div className="total_record totalrecord_style ">
              {/* <span>TOTAL RECORD:</span>  */}
              {/* <span>Showing {startRecord}-{endRecord} of {totalRecord} pages</span> */}
              <span>Showing {startRecord} to {endRecord} of {totalRecord} entries (Total: {Totalvalue})</span>
            </div>

          </div>




        </div>
        {/* Details Modal */}
        {showDetails && selectedRecord && (
          <div className="modal">
            <div className="modal-content">

              <div className="pop_up_cancelicon">
                <div className="profile_style">Profile Details - {selectedRecord.Name}</div>
                <div>
                  <CloseIcon className="clear-icon cancel_btn_style" onClick={closeDetails} /></div>
              </div>


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

                <div
                  className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  Gallery
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
                      onLoad={() => setLoading(false)}
                      onError={() => setLoading(false)}
                      src={`${API_URL}/${selectedRecord.image_path}`}
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
                    <div className="disply_flex"><strong className="font_size_popup">Date of Birth:</strong> <div className="popup_wrap">{selectedRecord.DOB ? formatDateForDisplay(selectedRecord.DOB) : "N/A"}</div></div>
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
                    <div className="disply_flex"><strong className="font_size_popup">State of Medicine:</strong><div className="state_council popup_wrap"> {selectedRecord.Stateofmedicine}</div></div>
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
                <div className="pg_item">
                  <div>
                    <div className="mrg_btom16"><b>Postgraduate Qualifications</b></div>
                    <div className="pg_scroll_style">

                      <table className="qualification-table table MRG_TOP7">
                        <thead>
                          <tr>
                            <th className="table_colum_wrap" style={{ width: 'auto', textAlign: 'left' }}>Qualification</th>
                            <th className="table_colum_wrap">University Name</th>
                            <th className="table_colum_wrap">Specialization</th>
                            <th className="table_colum_wrap">Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getPGarray && getPGarray.length > 0 ? (
                            getPGarray.map((item, index) => (
                              <tr key={index}>
                                <td className="table_colum_wrap" style={{ width: 'auto', textAlign: 'left' }}>{item.Qualification}</td>
                                <td className="table_colum_wrap">{item.Universityname}</td>
                                <td className="table_colum_wrap">{item.specializationname}</td>
                                <td className="table_colum_wrap">{item.year}</td>

                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">No qualifications added !</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`tab-content ${activeTab === 'gallery' ? 'active' : ''}`}>
                <div className={selectedRecord.gallery_image_paths ? "img_flex image-container" : ""}>

                  {selectedRecord.gallery_image_paths &&
                    selectedRecord.gallery_image_paths.replace(/^,/, "").split(",").map((imgPath, index) => (
                      <div >
                        <img
                          key={index}
                          src={`${API_URL}/${imgPath}`}
                          alt="gallery item"
                          width="150"
                          height="150"
                          className="img_mrg_btm"
                          style={{ borderRadius: "8px", objectFit: "cover" }}
                        />
                      </div>


                    ))}

                  {!selectedRecord.gallery_image_paths && (
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center" }}>
                      <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "red" }}>No images found</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              {/* <button className="close-button" onClick={closeDetails}>
                Close
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationList;

