import React, { useState } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import TransgenderIcon from "@mui/icons-material/Transgender";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DateRangeIcon from "@mui/icons-material/DateRange";
import WorkIcon from "@mui/icons-material/Work";
import NumbersIcon from "@mui/icons-material/Numbers";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EventIcon from "@mui/icons-material/Event";
import { LocationCity, Map } from '@mui/icons-material';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom"; 
import { Button } from "@mui/material";

const apiUrl = "http://localhost/Doctor_search/Registrationform.php";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    qualification: "",
    city:"",
    state:"",
    specialization: "",
    regNumber: "",
    regYear: "",
    employmentType: "",
    uprn: "",
    university: "",
    stateOfMedicine: "",
    yearOfQualification: "",
  });
  const [name, setname] = useState();
  const [fatherName, setfatherName] = useState();
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
  const [showForm, setShowForm] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [currentfilename, setcurrentfilename] = useState();
  const [image, setImage] = useState();
  const [errors, setErrors] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
  });
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
  const handleSubmit = (e) => {
    
    e.preventDefault();
   let formData = new FormData();
   formData.append('name', name);
   formData.append('fatherName', fatherName);
   formData.append('dob', dob);
   formData.append('gender', gender);
   formData.append('phone', phonenumber);
   formData.append('email', email);
   formData.append('address',address);
   formData.append('city',city);
   formData.append('state',state);
   formData.append('qualification', qualification);
   formData.append('specialization', specialization);
   formData.append('regNumber', regNumber);
   formData.append('regYear', regYear);
   formData.append('employmentType', employmentType);
   formData.append('uprn', uprn);
   formData.append('university', university);
   formData.append('stateOfMedicine', stateOfMedicine);
   formData.append('yearOfQualification', yearOfQualification);
   formData.append('images', image)

 
    if (name ===''|| fatherName  ===''|| dob ===''|| gender ===''|| phonenumber  ===''|| email ===''|| address  ===''|| qualification ===''|| specialization ===''|| regNumber ===''|| regYear  ===''||employmentType ===''|| uprn ===''|| university ===''|| stateOfMedicine ===''|| yearOfQualification ===''|| image.length == 0 || city == '' || state =='')
      {
        toast.error("Please fill all fields!", { position: "top-center" });
        return;
      }
  

      try {
        console.log(formData)
        const response =  axios.post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response) {
          toast.success("Form submitted successfully!", { position: "top-center" });
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
          toast.error("Failed to submit the form!", { position: "top-center" });
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        toast.error("An error occurred while submitting the form.", { position: "top-center" });
      }
    
  
  };

   const navigate = useNavigate(); // Use useNavigate for navigation

  const handleRegisterClick = () => {
    navigate("/"); // Redirect to registration form
  };

 const handleChange = (e) => {
   
  };


  return (
    <div className="form-container">
      {/* ToastContainer for rendering notifications */}
      <ToastContainer
 autoClose={20000} toastStyle={{ backgroundColor: "white",color:'black'}}  progressStyle= {{ background: 'white' }}
/>
      
      <div className="form-box">
        <h1>New Registration </h1>
        {/* Back Button */}
        <div className="btn-align">
  <button className="register-button" onClick={handleRegisterClick}>
    Back
  </button>
</div>

        <form onSubmit={handleSubmit}>
         {/* Name and Father/Spouse Name */}
         <div className="input-group">
            <PersonIcon />
            <span className="asterisk">*</span>
            <input
              type="text"
              placeholder="Name "
              onChange={(e) => setname(e.target.value)} value={name}
              maxLength={100}
            />
          </div>
          {/* {errors.name && <span className="error">{errors.name}</span>} */}
          <div className="input-group">
            <PersonIcon />
            <span className="asterisk">*</span>
            <input
              type="text"
              placeholder="Father / Spouse Name"
              onChange={(e) => setfatherName(e.target.value)} value={fatherName}
              maxLength={100}
            />            
          </div>
          
          {/* {errors.name && <span className="error">{errors.name}</span>} */}

          {/* Date of Birth and Gender */}
          <div className="grid-cols-2">
            <div className="input-group">
            <CalendarTodayIcon />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input
                type="date"
                placeholder="DateOfBirth"
                onChange={(e) => setdob(e.target.value)}
                value={dob}
              />
                
            </div>
            
            <div className="input-group">
            <TransgenderIcon />
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
            <PhoneIcon />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="number" placeholder="Phone Number"  onChange={(e) => setphonenumber(e.target.value)} value={phonenumber} maxLength={15}/>  
            </div>
            {/* {errors.name && <span className="error">{errors.name}</span>} */}
            <div className="input-group">
            <EmailIcon />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="email" placeholder="Email" onChange={(e) => setemail(e.target.value)} value={email} maxLength={50} />
            </div>
            {/* {errors.name && <span className="error">{errors.name}</span>} */}
          </div>

          {/* Address */}
          <div className="input-group">
          <LocationOnIcon />
          <span className="asterisk">*</span>
            <span className="material-icons"></span>
            <textarea placeholder="Address" rows="2"  onChange={(e) => setaddress(e.target.value)} value={address} maxLength={200}></textarea>
          </div>

           {/* State and City */}
           <div className="grid-cols-2">
            <div className="input-group">
            <LocationCity />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="City" onChange={(e) => setcity(e.target.value)} value={city} maxLength={100}/>
            </div>
            <div className="input-group">
            <Map />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="State" onChange={(e) => setstate(e.target.value)} value={state}  maxLength={100} />
            </div>
          </div>




          {/* Qualification and Specialization */}
          <div className="grid-cols-2">
            <div className="input-group">
            <SchoolIcon />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="Qualification" onChange={(e) => setqualification(e.target.value)} value={qualification} maxLength={100}/>
            </div>
            <div className="input-group">
            <BadgeIcon />
            <span className="asterisk">*</span>
              <span className="material-icons"></span>
              <input type="text" placeholder="Specialization" onChange={(e) => setspecialization(e.target.value)} value={specialization}  maxLength={100} />
            </div>
          </div>

          {/* RegistrationNumber & Year of Registration */}
         
          <div className="grid-cols-2">
            <div className="input-group">
              <AssignmentIndIcon />
              <span className="asterisk">*</span>
              <input type="text" placeholder="Registration Number"  onChange={(e) => setregNumber(e.target.value)} value={regNumber} maxLength={50} />
            </div>
            <div className="input-group">
              <DateRangeIcon />
              <span className="asterisk">*</span>
              <input type="text" placeholder="Year of Registration" onChange={(e) => setregYear(e.target.value)} value={regYear} maxLength={50} />
            </div>
          </div>
            
          {/* Employment Type and UPRN Number */}
          <div className="grid-cols-2">
            <div className="input-group">
              <WorkIcon />
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
              <NumbersIcon />
              <span className="asterisk">*</span>
              <input type="text" placeholder="UPRN Number" onChange={(e) => setuprn(e.target.value)} value={uprn}  maxLength={50}/>
            </div>
          </div>

  {/* University Name */}
            <div className="input-group">
            <SchoolIcon /> 
            <span className="asterisk">*</span>
               <input type="text" placeholder="University Name" onChange={(e) => setuniversity(e.target.value)} value={university} maxLength={100} /></div>

  {/* State of medicine & Year of Qualification */}
            <div className="grid-cols-2">
             <div className="input-group">
              <LocationCityIcon />
              <span className="asterisk">*</span>
              <input type="text" placeholder="State of Medicine" onChange={(e) => setstateOfMedicine(e.target.value)} value={stateOfMedicine} maxLength={100} />
            </div>
            <div className="input-group">
              <EventIcon />
              <span className="asterisk">*</span>
              <input type="text" placeholder="Year of Qualification" onChange={(e) => setyearOfQualification(e.target.value)} value={yearOfQualification}  maxLength={100}/>
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
    </div>
  );
};

export default RegistrationForm;
