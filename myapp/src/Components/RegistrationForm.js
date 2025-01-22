import React, { useState } from "react";
import "./style.css";
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
import { UnpublishedSharp } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

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

  const [errors, setErrors] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormData = {
      name: name,
      fatherName: fatherName,
      dob: dob,
      gender: gender,
      phone: Number(phonenumber),
      email: email,
      address: address,
      qualification: qualification,
      specialization: specialization,
      regNumber: regNumber,
      regYear: regYear,
      employmentType: employmentType,
      uprn: uprn,
      university: university,
      stateOfMedicine: stateOfMedicine,
      yearOfQualification: yearOfQualification,
    };
 
    if (name ===''|| fatherName  ===''|| dob ===''|| gender ===''|| phonenumber  ===''|| email ===''|| address  ===''|| qualification ===''|| specialization ===''|| regNumber ===''|| regYear  ===''||employmentType ===''|| uprn ===''|| university ===''|| stateOfMedicine ===''|| yearOfQualification ==='')
      {
        toast.error("Please fill all fields!", { position: "top-center" });
        return;
      }
  

      try {
        console.log(newFormData)
        const response =  axios.post(apiUrl, newFormData, {
          headers: { "Content-Type": "application/json" },
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

 const handleChange = (e) => {
   
  };


  return (
    <div className="form-container">
      {/* ToastContainer for rendering notifications */}
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored" // Options: 'light', 'dark', 'colored'
/>

      <div className="form-box">
        <h1>Registration Form</h1>
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
