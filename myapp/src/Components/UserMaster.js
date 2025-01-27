import React, { useState, useEffect } from "react";
import Header from './Header';
import "./UserMaster.css";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faTrash,faPencil,faPlus } from '@fortawesome/free-solid-svg-icons';
const UserMaster = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [Array, setArray] = useState([]);
    const [CurrentDeleteID, setCurrentDeleteID] = useState();
    const rowsPerPage = 5; // Adjust as needed
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = Array.slice(startIndex, endIndex);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
     const [isOpen, setIsOpen] = useState(false);
      const closeModal = () => setIsOpen(false);
    const apiUrl = "http://localhost/Doctor_search/Usermaster.php";
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
          setArray(response.data);
        } catch (error) {
          toast.error("Failed to fetch registrations!");
        }
      };
      const OpenPopup= (record) => {
        setCurrentDeleteID(record.Sno)
        setIsOpen(true);
      }
      const AddNewuser = () =>{

      }
      const handleDelete = async () =>{
       
        try {
          const response = await axios.delete(apiUrl, {
            data: { id: Number(CurrentDeleteID)}, // Send the Sno for deletion
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
      const handleEdit = async () => {
        
      }
      const sethandleSearch = (e)=>{
        // let searchValue = e.target.value
        // setSearchQuery(searchValue.trim())
      }
      const handleSearch = (e) => {
      }
      const clear = () =>{
      }
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
                          {/* <SearchIcon className="search-icon" onClick={() => handleSearch()} />

                            <CloseIcon className="clear-icon" onClick={() => clear()} /> */}
                            </div>
              <table className="table">
                   <thead>
                     <tr>
                       <th>S.No</th>
                       {/* <th>Profile</th> */}
                       <th>Name</th>
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
   
           </div>
    )
}
export default UserMaster;