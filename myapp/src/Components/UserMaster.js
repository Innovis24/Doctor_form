import React, { useState, useEffect  } from "react";
import Header from './Header';
import Select from "react-select";
import "./UserMaster.css";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faTrash,faPencil,faPlus,faSearch,faTimes } from '@fortawesome/free-solid-svg-icons';
const UserMaster = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [Array, setArray] = useState([]);
    const [CurrentDeleteID, setCurrentDeleteID] = useState();
    const [userStatusOption, setuserStatusOption] = useState([
      { value: '0', label: '' },
      { value: '1', label: 'Active' },
      { value: '2', label: 'Inactive' }
    ]);
    const [userStatusValue, setuserStatusValue] = useState("");
    const [editPopup, seteditPopup] = useState();
    const [popupTitle, setpopupTitle] = useState([ ]);
    const rowsPerPage = 5; // Adjust as needed
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = Array.slice(startIndex, endIndex);
    const navigate = useNavigate();
    //popup
    const [usernameOption, setusernameOption] = useState([]);
    const [UserID, setUserID] = useState([ ]);
    const [currentDoctorName, setcurrentDoctorName] = useState("");
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [userrole, setuserrole] = useState();
    const [sno, setsno] = useState();

    const [searchQuery, setSearchQuery] = useState(""); // State for search input
     const [isOpen, setIsOpen] = useState(false);
      const closeModal = () => setIsOpen(false);
    const apiUrl = "http://localhost/Doctor_search/Usermaster.php";
    const api = "http://localhost/Doctor_search/Registrationform.php";
     useEffect(() => {
        const values =JSON.parse(localStorage.getItem('currentUser'));
        
        if(values === '' || values === null || values === undefined){
          navigate("/");
          return;
        }
        fetchRegistrations();
        fetchuserNameList();
      }, [navigate]);
      
      const fetchRegistrations = async () => {
        try {
          const response = await axios.get(apiUrl);
          setArray(response.data);
        } catch (error) {
          toast.error("Failed to fetch registrations!");
        }
      };
      const fetchuserNameList = async () => {
        try {
          const response = await axios.get(api);
          const options = response.data.map((user) => ({
            value: user.RegistrationNumber,
            label: user.Name,
          }));
          setusernameOption(options);
        } catch (error) {
          toast.error("Failed to fetch registrations!");
        }
      };
      const OpenPopup= (record) => {
        setCurrentDeleteID(record.Sno)
        setIsOpen(true);
      }
      const AddNewuser = () =>{
        setpopupTitle([{ title: 'Add User', btnNmae: 'Submit' }])
        seteditPopup(true)
      }
      const handleDelete = async () =>{
       
        try {
          const response = await axios.delete(apiUrl, {
            data: { id: Number(CurrentDeleteID)}, // Send the Sno for deletion
          });
    
          if (response.status === 200) {
            toast.success("Record deleted successfully!");
            setusername('');
            setpassword('');
            setuserrole('');
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
      const handleEdit = async (record) => {
        setpopupTitle([{ title: 'Edit User', btnNmae: 'Update' }]);
        setcurrentDoctorName(record.Name)
        setusername(record.UserName);
        setpassword(record.Password);
        setuserrole(record.UserRole);
        setsno(record.Sno)
        if(record.Status === "Active"){
          setuserStatusValue({ value: '1', label: 'Active' });
        }else{
          setuserStatusValue({ value: '2', label: 'Inactive' });
        }
        seteditPopup(true);
      }
      const sethandleSearch = (e)=>{
        let searchValue = e.target.value
        setSearchQuery(searchValue.trim())
      }
      const handleSearch = () => {
        const filteredRegistrations = Array.filter((record) =>
          record.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.RegNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
          record.UserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.UserRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.Status.toLowerCase().includes(searchQuery.toLowerCase()) 
    
        );
        setArray(filteredRegistrations)
      }
      const clear = () =>{
        setSearchQuery('')
        fetchRegistrations();
      }
      const handleSave = async () => {
        if(popupTitle[0].btnNmae === "Submit"){
          const FormData = {
            ID : UserID,
            name:currentDoctorName,
            userName: username,
            password: password,
            userRole: userrole,
            status: userStatusValue.label
          };
          const response =  await axios.post(apiUrl, FormData, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.code === 200) {
                seteditPopup(false)
                toast.success(response.data.message);
                setuserStatusValue('')
                fetchRegistrations();
             
          }
          else{
             toast.error("Failed to submit the form!", { position: "top-center" });
          }
        }
        else{
          const FormData = {
            sno:sno,
            name:currentDoctorName,
            userName: username,
            password: password,
            userRole: userrole,
            status: userStatusValue.label
          };
          const response =  await axios.put(apiUrl, FormData, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.code === 200) {
                seteditPopup(false)
                toast.success(response.data.message);
                setuserStatusValue('')
                fetchRegistrations();
             
          }
          else{
             toast.error("Failed to submit the form!", { position: "top-center" });
          }
        }
        
      }
      const closePopup = () =>{
        seteditPopup(false);
        setcurrentDoctorName('');
        setusername('');
        setpassword('');
        setuserrole('');
        setuserStatusValue('')
      }
      const handleStatusChange = (selectedOption) => {
        setuserStatusValue(selectedOption); // Store the selected option
      };
      const handleUsernameChange = (selectedOption) => {
        // if(){

        // }
        const selectedName = selectedOption.label.split('#')[0];
        const idvalue = selectedOption.label.split('#')[1];
        setcurrentDoctorName(selectedName); 
        setUserID(idvalue)
      };
      const handleInputChange = (event) => {
        const value = event.target.value;
        const isUsernameTaken = Array.some((record) =>
          record.UserName.toLowerCase() === value.toLowerCase()
        );
    
        if (isUsernameTaken && value.length > 0) {
          toast.error('Username already exists'); // Show an error notification
        }
        else{
          setusername(event.target.value);
        }
      };
      
      
    return (
        <div>
           <Header   title="User Master"/>
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
                        <button className="btn_yesclr" onClick={handleDelete}>Yes</button>
                        <button className="btn_noClr" onClick={closeModal}>No</button>
                        </div>
                     
                      </div>
                    </Popup>
                    <div className="list-container">
                    <div className="btn-align_user">
                    
                        <button className="user-button1" onClick={AddNewuser}>
                           <FontAwesomeIcon icon={faPlus} /> Add user
                           </button>
                           </div>
                           <div className="Usercontrols">
                            {/* Search Bar */}
                            <input
                              type="text"
                              className="search-bar"
                              placeholder="Search"
                              value={searchQuery} onChange={(e) => sethandleSearch(e)} 

                            />
                            <FontAwesomeIcon className="view-button icon_style" icon={faSearch} style={{ marginRight: "8px" }} onClick={() => handleSearch()}/>
                            <FontAwesomeIcon className="view-button cancelStyle" icon={faTimes} style={{ marginRight: "8px" }} onClick={() => clear()}/>

                          {/* <SearchIcon className="search-icon" onClick={() => ()} />

                            <CloseIcon className="clear-icon" onClick={() => clear()} /> */}
                            </div>
              <table className="table">
                   <thead>
                     <tr>
                       <th>S.No</th>
                       <th>Name</th>
                       <th>User Name</th>
                       <th>User Role</th>
                       <th>Status</th>
                       <th>Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {currentRows.length > 0 ? (
                       currentRows.map((record, index) => (
                         <tr key={index}>
                           <td className="text-wrap">{startIndex + index + 1}</td>
                           <td className="text-wrap">
                           <div>
                              {record.Name}
                              <div className="regNumFont">
                            #{record.RegNumber}
                              </div>
                              </div>
                            </td>
                           <td className="text-wrap">{record.UserName}</td>
                           <td className="text-wrap">{record.UserRole}</td>
                           <td className="text-wrap">{record.Status}</td>
                           <td>
                            
                           <div className="alignmentbtn">

                              <FontAwesomeIcon className="view-button" icon={faPencil} style={{ marginRight: "8px" }} onClick={() => handleEdit(record)}/>
                             
                             { record && record.UserRole !== "Admin"  &&  (
                              <FontAwesomeIcon className="view-button" icon={faTrash} style={{ marginRight: "8px" }} onClick={() => OpenPopup(record)}/>
                              )}
                              
                             </div>
           
                           </td>
                         </tr>
                       ))
                     ) : (
                       <tr>
                         <td colSpan="5" className="txt_align"><b>No records found!</b></td>
                       </tr>
                     )}
                   </tbody>
                 </table>
                 </div>
                     {editPopup && 
                      <div className="popup-overlay">
                      <div className="popup-content">
                        <h2>{popupTitle[0].title}</h2>
                        <div className="mrg_bottom">
                        <div className="ft_wt">Name</div>
                        <Select
                           options={usernameOption.map(option => ({
                            value: option.value,  // Set the id as the value
                            label: `${option.label}# ${option.value}`,  // Show both name and id
                          }))}
                          value={currentDoctorName ? { label: `${currentDoctorName}` } : null}
                          onChange={handleUsernameChange}
                          placeholder="Select a Status"
                          isSearchable 
                          className="status_style"
                        />

                        {/* <input
                          type="text"
                          placeholder="Enter name"
                          value={currentDoctorName}
                          maxLength={50}
                          onChange={(e) => setcurrentDoctorName(e.target.value)}
                        /> */}
                        <div className="ft_wt">User name</div>
                        <input
                          type="text"
                          placeholder="Enter username"
                          value={username}
                          maxLength={50}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <div className="ft_wt">User role</div>
                         <input
                          type="text"
                          placeholder="Enter userrole"
                          value={userrole}
                          maxLength={50}
                          onChange={(e) => setuserrole(e.target.value)}
                        />
                        <div className="ft_wt">Password</div>
                         <input
                          type="text"
                          placeholder="Enter password"
                          value={password}
                          maxLength={50}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                        <div>
                        <div className="ft_wt">Status</div>
                        <Select
                          options={userStatusOption} 
                          value={userStatusValue} 
                          onChange={handleStatusChange}
                          placeholder="Select a Status"
                          isSearchable 
                          className="status_style"
                        />
                        </div>
                        </div>
                       
                        <button onClick={handleSave} className="btn_submitclr">{popupTitle[0].btnNmae}</button>
                        <button onClick={closePopup} className="btn_cancelClr">Cancel</button>
                      </div>
                    </div>
                      }
                    
           </div>
    )
}
export default UserMaster;