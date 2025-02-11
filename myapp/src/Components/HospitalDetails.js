import React, { useState, useEffect } from "react";
import Header from './Header';
import "./HospitalDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faAddressCard, faCircleXmark, faPencil, faTrash, faEye ,faCity,faStethoscope,faMapMarkerAlt,faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HOS_API_URL } from "../utlis/common";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HospitalDetails() {
    const [newHostpital, setnewHostpital] = useState(false);
    const [hospitalname, sethospitalname] = useState();
    const [city, setcity] = useState();
    const [address, setaddress] = useState();
    const [hospitalDetails, sethospitalDetails] = useState();
    const [viewhospitalDetails, setviewhospitalDetails] = useState();
    const [Arrayval, setArray] = useState([]);
    const [popupTitle, setpopupTitle] = useState([]);
    const [CurrentID, setCurrentID] = useState();
    const [viewPopup, setviewPopup] = useState();
    const navigate = useNavigate();
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5; // Adjust as needed
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = Arrayval.slice(startIndex, endIndex);

    useEffect(() => {
        const values = localStorage.getItem('currentUser') === 'undefined' ? 'null' : JSON.parse(localStorage.getItem('currentUser'));

        if (values === '' || values === null || values === undefined) {
            navigate("/");
            return;
        }
        fetchUserList();
    }, [navigate]);

    const addNewDetails = () => {
        setpopupTitle([{ title: 'Add Work Details', btnNmae: 'Submit' }])
        sethospitalname("");
        setcity("");
        setaddress("");
        sethospitalDetails("");
        setnewHostpital(true)
    }
    const closepopup = () => {
        setnewHostpital(false)
    }
    const openEdit = (records) => {
        setnewHostpital(true);
        setpopupTitle([{ title: 'Edit Work Details', btnNmae: 'Update' }]);
        sethospitalname(records.HospitalName);
        setcity(records.City);
        setaddress(records.Address);
        sethospitalDetails(records.HospitalDetails);
        setCurrentID(records.Sno)
    }

    const OpenPopup = (item) => {
        setviewPopup(true)
        sethospitalname(item.HospitalName);
        setcity(item.City);
        setaddress(item.Address);
        const items = item.HospitalDetails.split(',');
        setviewhospitalDetails(items);
    }
    const fetchUserList = async () => {
        try {
            const response = await axios.get(HOS_API_URL);
            setArray(response.data);
        } catch (error) {
            toast.error("Failed to fetch registrations!");
        }
    };
    const clearfn = (event) => {
        event.preventDefault();
        sethospitalname("");
        setcity("");
        setaddress("");
        sethospitalDetails("");
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!hospitalname || !city || !address || !hospitalDetails) {
            toast.error("Please fill all fields!", { position: "top-center" });
            return;
        }
        if (popupTitle[0].btnNmae === "Submit") {
            const FormData = {
                name: hospitalname,
                city: city,
                address: address,
                hosDetails: hospitalDetails
            };
            const response = await axios.post(HOS_API_URL, FormData, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.code === 200) {
                setnewHostpital(false)
                toast.success(response.data.message);
                sethospitalname("");
                setcity("");
                setaddress("");
                sethospitalDetails("");
            }
            else {
                toast.error("Failed to submit the form!", { position: "top-center" });
            }
        }
        else {
            const FormData = {
                ID: CurrentID,
                name: hospitalname,
                city: city,
                address: address,
                hosDetails: hospitalDetails
            };
            const response = await axios.put(HOS_API_URL, FormData, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.code === 200) {
                setnewHostpital(false)
                toast.success(response.data.message);
                sethospitalname("");
                setcity("");
                setaddress("");
                sethospitalDetails("");
            }
            else {
                toast.error("Failed to submit the form!", { position: "top-center" });
            }
        }
        fetchUserList();
    }
    const handleDelete = async (Value) => {

        try {
            const response = await axios.delete(HOS_API_URL, {
                data: { id: Number(Value.Sno) }, // Send the Sno for deletion
            });

            if (response.status === 200) {
                toast.success("Record deleted successfully!");
                fetchUserList()
            } else {
                toast.error(response.data.error || "Failed to delete record.");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            toast.error("Failed to delete record. Please try again.");
        }
    }
    const closeEditPopup = () =>{
        setviewPopup(false)
    }
    return (
        <div>
            <ToastContainer
                autoClose={500} // Auto-close in 20 seconds
                toastStyle={{ backgroundColor: "white", color: 'black', fontFamily: "'Roboto', sans-serif" }}
                progressStyle={{ background: 'white' }}
            />
            <Header title="Work Details" />
            <div className="btn_align_hos">
                <button className="register-button" onClick={addNewDetails}>
                    Add Hospital
                </button>
            </div>
            <div >
                {newHostpital && (
                    <form className="divCar">
                        <div className="box_clr">
                            <div>
                                <div className="close_icon_style">
                                    <FontAwesomeIcon icon={faCircleXmark} onClick={closepopup} />
                                </div>
                                <div className="title_details">{popupTitle[0].title}</div>
                            </div>

                            <div className="input-group">
                                <FontAwesomeIcon icon={faHospital} />
                                <span className="asterisk">*</span>
                                <input
                                    type="text" className="txt_transform"
                                    placeholder="Name"
                                    onChange={(e) => sethospitalname(e.target.value)} value={hospitalname}
                                    maxLength={100}
                                />
                            </div>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faCity} />
                                <span className="asterisk">*</span>
                                <input
                                    type="text" className="txt_transform"
                                    placeholder="City"
                                    onChange={(e) => setcity(e.target.value)} value={city}
                                    maxLength={100}
                                />
                            </div>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faAddressCard} />
                                <span className="asterisk">*</span>
                                <span className="material-icons"></span>
                                <textarea
                                    type="text" className="txt_transform"
                                    placeholder="Address"
                                    onChange={(e) => setaddress(e.target.value)} value={address}
                                    maxLength={200}
                                />
                            </div>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faStethoscope} />
                                <span className="asterisk">*</span>
                                <span className="material-icons"></span>
                                <textarea
                                    type="text" className="txt_transform"
                                    placeholder="Hospital details"
                                    onChange={(e) => sethospitalDetails(e.target.value)} value={hospitalDetails}
                                    maxLength={500}
                                />
                            </div>
                            <div className="submit-button-container grid-cols-3">
                                <button type="submit" className="submit_clr mrg_right_submit" onClick={handleSubmit}>
                                    {popupTitle[0].btnNmae}
                                </button>
                                <button className="cancel_btn_form" onClick={clearfn}>
                                    Clear
                                </button>

                            </div>
                        </div>
                    </form>
                )}
                {!newHostpital && (
                    <div className="table_pad_style">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Hospital Name</th>
                                <th>City</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? (
                                currentRows.map((record, index) => (
                                    <tr key={index}>
                                        <td className="text-wrap">{startIndex + index + 1}</td>
                                        <td className="text-wrap txt_trans">
                                            <div>
                                                {record.HospitalName}
                                            </div>
                                        </td>
                                        <td className="text-wrap txt_trans">{record.City}</td>
                                        <td className="text-wrap txt_trans">{record.Address}</td>
                                        <td>

                                            <div className="alignmentbtn">

                                                <FontAwesomeIcon className="view-button" icon={faEye} style={{ marginRight: "8px" }} onClick={() => OpenPopup(record)} />
                                                <FontAwesomeIcon className="view-button" icon={faPencil} style={{ marginRight: "8px" }} onClick={() => openEdit(record)} />
                                                <FontAwesomeIcon className="view-button" icon={faTrash} style={{ marginRight: "8px" }} onClick={() => handleDelete(record)} />



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
                )}
                {viewPopup && (
                    <div className="modal1">
                    <div className="modal1-content">
                    {/* heading */}
                    <div className="pop_up_cancelicon1">
                    <div className="profile_style">Work Details</div>  
                    <div> 
                    <FontAwesomeIcon icon={faCircleXmark} className="model_icon_clr" onClick={closeEditPopup} />
                    </div>
                    </div>

                    <div>
                                    <div className="grid-cols-1">
                                      <div className="input-group">
                                        <FontAwesomeIcon  className='icon_mrg' icon={faHospital} />
                                        <input type="text" 
                                          readOnly className="txt_transform"
                                          value={hospitalname} />
                                      </div>
                                      <div className="input-group">
                                        <FontAwesomeIcon className='icon_mrg' icon={faCity} />
                                        <input type="text" readOnly className="txt_transform" value={city}  />
                                      </div>
                                    </div>
                                    <div className="grid-cols-1">
                                      <div className="input-group">
                                        <FontAwesomeIcon icon={faAddressCard} className='icon_mrg' />
                                        <textarea type="text" readOnly className="txt_transform"
                                          value={address}  />
                                      </div>
                                      <div className="speicality_style">
                                       <div>
                                            <FontAwesomeIcon icon={faStethoscope} className="icon_mrg" />
                                            <b >Specialties:</b>
                                        </div>
                                      <div className="speciality_style">
                                        <ul className="tooltip-list txt_transform">
                                            {viewhospitalDetails.map((item, index) => (
                                            <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                        </div>
                                      </div>
                                    </div>
                       
                    </div>

                   
                   
                   
                    
                    </div>
                </div>
                )}
            </div>

        </div>
    )
}
export default HospitalDetails;