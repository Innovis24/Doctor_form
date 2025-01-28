import React, { useState ,useEffect } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faCalendar ,faTransgenderAlt ,faPhone,faEnvelope ,faAddressCard,
  faCity, faMapMarkerAlt,faGraduationCap, 
  faStethoscope, faIdCard,faCalendarAlt,faBriefcase,faBarcode,faUniversity,faMap,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate,useLocation  } from "react-router-dom"; 
import { Button } from "@mui/material";
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const apiUrl = "http://localhost/Doctor_search/Registrationform.php";
const userapiUrl = "http://localhost/Doctor_search/Usermaster.php";
const RegistrationForm = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   fatherName: "",
  //   dob: "",
  //   gender: "",
  //   phone: "",
  //   email: "",
  //   address: "",
  //   qualification: "",
  //   city:"",
  //   state:"",
  //   specialization: "",
  //   regNumber: "",
  //   regYear: "",
  //   employmentType: "",
  //   uprn: "",
  //   university: "",
  //   stateOfMedicine: "",
  //   yearOfQualification: "",
  // });
  const [name, setname] = useState();
  const [fatherName, setfatherName] = useState();
  const [newuser, setnewuser] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [dob, setdob] = useState();
  const [gender, setgender] = useState();
  const [email, setemail] = useState();
  const [address, setaddress] = useState();
  const [qualification, setqualification] = useState();
  const [specialization, setspecialization] = useState();
  const [regNumber, setregNumber] = useState();
  const [regYear, setregYear] = useState();
  const [employmentType, setemploymentType] = useState();
  const [uprn, setuprn] = useState();
  const [university, setuniversity] = useState();
  const [stateOfMedicine, setstateOfMedicine] = useState();
  const [yearOfQualification, setyearOfQualification] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [currentfilename, setcurrentfilename] = useState();
  const [CurrentSno, setSno] = useState();
  const [imagePath, setimagePath] = useState();
  const [pwdUsernamePopup, setpwdUsernamePopup] = useState(false);
  const [imageName, setimageName] = useState();
  const [image, setImage] = useState();
  const [Array, setArray] = useState([]);
  const location = useLocation();
  const data = location.state;
  const today = new Date().toISOString().split("T")[0];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  //username popup-start

 
  const [Arrayval, setArrayVal] = useState([]);
  const [currentDoctorName, setcurrentDoctorName] = useState("");
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [UserID, setUserID] = useState([]);

   //username popup-end

  useEffect(() => {
    const newOne =localStorage.getItem('newUser');
    setnewuser(newOne)

    const values =JSON.parse(localStorage.getItem('currentUser'));
    if((values === '' || values === null || values === undefined) && (!newOne )){
      navigate("/");
      return;
    }
   

    fetchRegistrations()
    getUserDetails()

    const value = localStorage.getItem('editItem');
    // console.log(data)
    if(value === "true"){
      setSno(data.Sno)
      setname(data.Name);
      setfatherName(data.Fathername);
      setphonenumber(data.Phonenumber);
      setdob(data.DOB);
      setgender(data.Gender);
      setemail(data.Email);
      setaddress(data.Address);
      setcity(data.City);
      setstate(data.State);
      setImage(data.image_name);
      setcurrentfilename(data.image_name);
      setqualification(data.Qualification);
      setspecialization(data.Specialization);
      setregNumber(data.RegistrationNumber);
      setregYear(data.Yearofregistration);
      setemploymentType(data.Employmenttype);
      setuprn(data.Uprnnumber);
      setuniversity(data.Universityname);
      setstateOfMedicine(data.Stateofmedicine);
      setyearOfQualification(data.Yearofqualification);
      setimagePath(data.image_path);
      setimageName(data.image_name);
    }
  }, [data,navigate]);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(apiUrl);
      setArray(response.data);
    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
  };
  const getUserDetails = async () => {
    try {
      const response = await axios.get(userapiUrl);
      setArrayVal(response.data);
    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setcurrentfilename(file.name)
      // Process file upload here (e.g., send it to the server)

      // Clear the input field after file selection
      // fileInputRef.current.value = null; // Reset the file input field
    }
  };
  const handleDelete = ()=>{
    setcurrentfilename('')
    setImage('')
  }
  function capitalizeFirstLetter(string) {
    return string.replace(/^\w/, c => c.toUpperCase());
  }
  const checkregnumber = (event) =>{
            const value = event.target.value;
            const isUsernameTaken = Array.some((record) =>
              record.RegistrationNumber.toLowerCase() === value.toLowerCase()
            );

            if (isUsernameTaken && value.length > 0) {
              toast.error('Given Register number is already exists'); // Show an error notification
            }
              setregNumber(event.target.value);
            
  }
  const openCreateuser = ()=>{
    setIsPopupOpen(false)
    setpwdUsernamePopup(true)
  }

  const handleSubmit = async (e) => {

    
    e.preventDefault();

 
    if ( !name ||
      !fatherName ||
      !dob ||
      !gender ||
      !phonenumber ||
      !email ||
      !address ||
      !qualification ||
      !specialization ||
      !regNumber ||
      !regYear ||
      !employmentType ||
      !uprn ||
      !university ||
      !stateOfMedicine ||
      !yearOfQualification ||
      image.length === 0 || // For checking empty image array
      !city ||
      !state  ) 
      {
        toast.error("Please fill all fields!", { position: "top-center" });
        return;
      }
  
      const checkRegNumber = Array.some((record) =>
        record.RegistrationNumber.toLowerCase() === regNumber.toLowerCase()
      );

     
 
      try {
        //insert new record
        if(CurrentSno === "" || CurrentSno === undefined || CurrentSno === null){
          if (checkRegNumber && regNumber.length > 0) {
            toast.error('Given Register number is already exists'); // Show an error notification
            return;
          }
          let formData = new FormData();
        formData.append('name', capitalizeFirstLetter(name));
        formData.append('fatherName', capitalizeFirstLetter(fatherName));
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('phone', phonenumber);
        formData.append('email', email);
        formData.append('address',capitalizeFirstLetter(address));
        formData.append('city',capitalizeFirstLetter(city));
        formData.append('state',capitalizeFirstLetter(state));
        formData.append('qualification', capitalizeFirstLetter(qualification));
        formData.append('specialization', capitalizeFirstLetter(specialization));
        formData.append('regNumber', regNumber);
        formData.append('regYear', regYear);
        formData.append('employmentType', employmentType);
        formData.append('uprn', uprn);
        formData.append('university', capitalizeFirstLetter(university));
        formData.append('stateOfMedicine', capitalizeFirstLetter(stateOfMedicine));
        formData.append('yearOfQualification', yearOfQualification);
        formData.append('images', image)
        console.log(formData)
        const response =  await axios.post(apiUrl+ '?action=create', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.code === 200) {
          toast.success(response.data.message, { position: "top-center" });
          setcurrentDoctorName(capitalizeFirstLetter(name));
          setUserID(regNumber)
          setname('');
          setfatherName('');
          setphonenumber('');
          setdob('');
          setgender('');
          setemail('');
          setaddress('');
          setcity('');
          setstate('');
          setImage('');
          setcurrentfilename()
          setqualification('');
          setspecialization('');
          setregNumber('');
          setregYear('');
          setemploymentType('');
          setuprn('');
          setuniversity('');
          setstateOfMedicine('');
          setyearOfQualification('');
          setIsPopupOpen(true)
          
        }else {
          toast.error("Failed to submit the form!", { position: "top-center" });
        }
        }
        //update record
        else{
          let formData = new FormData();
        formData.append('Sno', capitalizeFirstLetter(CurrentSno));
        formData.append('name', capitalizeFirstLetter(name));
        formData.append('fatherName', capitalizeFirstLetter(fatherName));
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('phone', phonenumber);
        formData.append('email', email);
        formData.append('address',capitalizeFirstLetter(address));
        formData.append('city',capitalizeFirstLetter(city));
        formData.append('state',capitalizeFirstLetter(state));
        formData.append('qualification', capitalizeFirstLetter(qualification));
        formData.append('specialization', capitalizeFirstLetter(specialization));
        formData.append('regNumber', regNumber);
        formData.append('regYear', regYear);
        formData.append('employmentType', employmentType);
        formData.append('uprn', uprn);
        formData.append('university', capitalizeFirstLetter(university));
        formData.append('stateOfMedicine', capitalizeFirstLetter(stateOfMedicine));
        formData.append('yearOfQualification', yearOfQualification);
        formData.append('images', image)
        formData.append('image_path', imagePath);
        if(imageName === image){
          formData.append('image_name', imageName);
        }
        else{
          formData.append('image_name', image.name);
        }
        
        console.log(formData)
        const response =  await  axios.post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.code === 200) {
          toast.success(response.data.message, { position: "top-center" });
          localStorage.setItem('editItem',false );
          setname('');
          setfatherName('');
          setphonenumber('');
          setdob('');
          setgender('');
          setemail('');
          setaddress('');
          setcity('');
          setstate('');
          setImage('');
          setcurrentfilename()
          setqualification('');
          setspecialization('');
          setregNumber('');
          setregYear('');
          setemploymentType('');
          setuprn('');
          setuniversity('');
          setstateOfMedicine('');
          setyearOfQualification('');
          
        }else {
          toast.error("Failed to update the form!", { position: "top-center" });
        }
        }
        
      } catch (error) {
        console.error("Error submitting the form:", error);
        toast.error("An error occurred while submitting the form.", { position: "top-center" });
      }
    
  
  };

  const closePopup = () => {
    setcurrentDoctorName('');
    setusername('');
    setpassword('');

  }

  const handleRegisterClick = () => {
    navigate("/registration_list"); // Redirect to registration form
    localStorage.setItem('editItem',false );
  };

   const handleInputChange = (event) => {
      const newUsername = event.target.value;
      setusername(newUsername);
      const validRecords = Arrayval.filter((record) => record && record.UserName);
  
      const isUsernameTaken = validRecords.some((record) =>
        record.UserName.toLowerCase() === newUsername.toLowerCase()
      );
  
      if (isUsernameTaken ) {
        toast.error('Username already exists'); // Show an error notification
      }
    };

  const handleSave = async () => {

    const FormData = {
      ID: UserID,
      name: currentDoctorName,
      userName: username,
      password: password,
      userRole: "Doctor",
      status:"Active"
    };
    const response = await axios.post(userapiUrl, FormData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.code === 200) {
      toast.success(response.data.message);
      setcurrentDoctorName('');
      setusername('');
      setpassword('');
      setIsPopupOpen(true)
      navigate('/registration_list', { state:UserID});
    }
    else {
      toast.error("Failed to submit the form!", { position: "top-center" });
    }
  }

  return (
    <div className="form-container">
      {/* ToastContainer for rendering notifications */}
      <ToastContainer
        autoClose={500} // Auto-close in 20 seconds
        toastStyle={{ backgroundColor: "white", color: 'black' ,  fontFamily: "'Roboto', sans-serif" }}
        progressStyle={{ background: 'white' }}
/>
{isPopupOpen === true && pwdUsernamePopup === false && (
      <Popup open={isPopupOpen} closeOnDocumentClick onClose={() => setIsPopupOpen(false)}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Thank You!</h2>
        <p className="text-gray-700">You have successfully registered. Please create a username and password to view your profile.</p>
        <button
        onClick={openCreateuser} 
          className="usernamepwd_style"
        >
          Create Username & Password
        </button>
      </div>
    </Popup>
)}

{isPopupOpen === false && pwdUsernamePopup === false && (
      <div className="form-box">
        <h1 className="fontFam">New Registration </h1>
        {/* Back Button */}
        <div className="btn-align">
          {!newuser && <button className="register-button" onClick={handleRegisterClick}>
    Back
  </button>}
  
</div>

        <form onSubmit={handleSubmit}>
         {/* Name and Father/Spouse Name */}
         <div className="input-group">
            <FontAwesomeIcon icon={faUser} />
            <span className="asterisk">*</span>
            <input
              type="text"  className="txt_transform"
              placeholder="Name"
              onChange={(e) => setname(e.target.value)} value={name}
              maxLength={100}
            />
          </div>
          {/* {errors.name && <span className="error">{errors.name}</span>} */}
          <div className="input-group">
          <FontAwesomeIcon icon={faUser} />
            <span className="asterisk">*</span>
            <input
              type="text" className="txt_transform"
              placeholder="Father / Spouse Name"
              onChange={(e) => setfatherName(e.target.value)} value={fatherName}
              maxLength={100}
            />            
          </div>
          
          {/* {errors.name && <span className="error">{errors.name}</span>} */}

          {/* Date of Birth and Gender */}
          <div className="grid-cols-2">
            <div className="input-group">
            <FontAwesomeIcon icon={faCalendar} />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input
                type="date"
                max={today}
                placeholder="DateOfBirth"
                onChange={(e) => setdob(e.target.value)}
                value={dob}
              />
                
            </div>
            
            <div className="input-group">
            <FontAwesomeIcon icon={faTransgenderAlt} />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              
              <select onChange={(e) => setgender(e.target.value)} value={gender}> 
              <option value="Select">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                
              </select>
            </div>
          </div>
          {/* {errors.name && <span className="error">{errors.name}</span>} */}
          
          {/* Phone Number and Email */}
          <div className="grid-cols-2">
            <div className="input-group">
            <FontAwesomeIcon icon={faPhone} />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="number"  placeholder="Phone Number"  onChange={(e) => setphonenumber(e.target.value)} value={phonenumber} maxLength={15}/>  
            </div>
            {/* {errors.name && <span className="error">{errors.name}</span>} */}
            <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope } />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="email" placeholder="Email" onChange={(e) => setemail(e.target.value)} value={email} maxLength={50} />
            </div>
            {/* {errors.name && <span className="error">{errors.name}</span>} */}
          </div>

          {/* Address */}
          <div className="input-group">
          <FontAwesomeIcon icon={faAddressCard } />
          <span className="asterisk">*</span>
            <span className="material-icons"></span>
            <textarea placeholder="Address" rows="2" className="txt_transform" onChange={(e) => setaddress(e.target.value)} value={address} maxLength={200}></textarea>
          </div>

           {/* State and City */}
           <div className="grid-cols-2">
            <div className="input-group">
             <FontAwesomeIcon icon={faCity } />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="City" className="txt_transform" onChange={(e) => setcity(e.target.value)} value={city} maxLength={100}/>
            </div>
            <div className="input-group">
            <FontAwesomeIcon icon={faMapMarkerAlt } />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="State" className="txt_transform" onChange={(e) => setstate(e.target.value)} value={state}  maxLength={100} />
            </div>
          </div>




          {/* Qualification and Specialization */}
          <div className="grid-cols-2">
            <div className="input-group">
            <FontAwesomeIcon icon={faGraduationCap } />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="Qualification" className="txt_transform" onChange={(e) => setqualification(e.target.value)} value={qualification} maxLength={100}/>
            </div>
            <div className="input-group">
            <FontAwesomeIcon icon={faStethoscope } />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="Specialization" className="txt_transform" onChange={(e) => setspecialization(e.target.value)} value={specialization}  maxLength={100} />
            </div>
          </div>

          {/* RegistrationNumber & Year of Registration */}
         
          <div className="grid-cols-2">
            <div className="input-group">
            <FontAwesomeIcon icon={faIdCard } />
              <span className="asterisk">*</span>
              <input type="text" placeholder="Registration Number" 
              onChange={(e) => checkregnumber(e)}
              value={regNumber} maxLength={50} />
            </div>
            <div className="input-group">
            <FontAwesomeIcon icon={faCalendarAlt } />
              <span className="asterisk">*</span>
              <input type="text" placeholder="Year of Registration" onChange={(e) => setregYear(e.target.value)} value={regYear} maxLength={50} />
            </div>
          </div>
            
          {/* Employment Type and UPRN Number */}
          <div className="grid-cols-2">
            <div className="input-group">
            <FontAwesomeIcon icon={faBriefcase } />
              <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <select onChange={(e) => setemploymentType(e.target.value)} value={employmentType}> 
              <option value="Select">Select EmploymentType</option>
              <option value="Self-Employed">Self-Employed</option>
                <option value="Hospital-Employee">Hospital-Employee</option>
                <option value="Clinic Affiliation">Clinic Affiliation</option>
                <option value="other">Other</option>
                
              </select>
            </div>
            <div className="input-group">
            <FontAwesomeIcon icon={faBarcode } />
              <span className="asterisk">*</span>
              <input type="text" placeholder="UPRN Number" onChange={(e) => setuprn(e.target.value)} value={uprn}  maxLength={50}/>
            </div>
          </div>

  {/* University Name */}
            <div className="input-group">
            <FontAwesomeIcon icon={faUniversity } />
            <span className="asterisk">*</span>
               <input type="text" placeholder="University Name" className="txt_transform" onChange={(e) => setuniversity(e.target.value)} value={university} maxLength={100} /></div>

  {/* State of medicine & Year of Qualification */}
            <div className="grid-cols-2">
             <div className="input-group">
             <FontAwesomeIcon icon={faMap } />
              <span className="asterisk">*</span>
              <input type="text" placeholder="State of Medicine" className="txt_transform" onChange={(e) => setstateOfMedicine(e.target.value)} value={stateOfMedicine} maxLength={100} />
            </div>
            <div className="input-group">
            <FontAwesomeIcon icon={faCalendarCheck } />
              <span className="asterisk">*</span>
              <input type="text" placeholder="Year of Qualification"  onChange={(e) => setyearOfQualification(e.target.value)} value={yearOfQualification}  maxLength={100}/>
            </div>
            </div>
            <div>
            <div className="prfile_font">Upload Image for Your profile<span className="asterisk">*</span></div>
            
            <div className="img_style">
            <div className="img_input" >
              
            <input type="file" id="file"  // Attach the ref to the file input
        onChange={handleFileChange} accept="image/*" style={{
        display: "none", // Hides the default file input
      }} />
          <div className="display_fileupload">
            <div className="display_flex">
            <Button 
                  htmlFor="file"
                  style={{
                    display: "inline-block",
                    backgroundColor: "white",
                    color: "black",
                    padding: "4Px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "11px",
                    border: "1px solid grey",
                    textTransform:"math-auto",
                    width: "120px", // Fixed width
                    // overflow: "hidden", // Hides overflow text
                    // whiteSpace: "nowrap", // Prevents text wrapping
                    // textOverflow: "ellipsis",
                  }}
                  onClick={() => document.getElementById("file").click()}
                >
                <span> Choose File</span> 
                </Button>
                {(currentfilename !== "" && image !== "" && currentfilename  !== undefined && image !== undefined) &&
                <FontAwesomeIcon className="view-button" title = 'Delete' icon={faTrash} style={{ marginRight: "8px" }} onClick={() => handleDelete()} />}
            </div>
         
                <span className="filenamestyle">{currentfilename}</span>
          </div>
         
            </div>
      
          </div>
            </div>
            
        {/* Submit Button */}
<div className="submit-button-container"><center>
  <button type="submit" className="submit-button">
    Submit
  </button></center>
</div>

         
          </form>
      </div>
      )}

{pwdUsernamePopup && 
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create Your Account</h2>
            <div className="mrg_bottom">
              <div className="ft_wt">User name</div>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                maxLength={50}
                onChange={(e) => handleInputChange(e)}
              />
              
              <div className="ft_wt">Password</div>
              <input
                type="text"
                placeholder="Enter password"
                value={password}
                maxLength={50}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button onClick={handleSave} className="btn_submitclr">Submit</button>
            <button onClick={closePopup} className="btn_cancelClr">Clear</button>
          </div>
        </div>
      }
    </div>
  );
};

export default RegistrationForm;
