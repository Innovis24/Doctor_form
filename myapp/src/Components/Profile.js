import React, { useState, useEffect } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneAlt, faPencil, faEnvelope, faBarcode, faTransgenderAlt, faCity, faMapMarkerAlt, faBirthdayCake, faIdCard, faCalendarAlt, faBriefcase, faUniversity, faGraduationCap, faStethoscope, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';  // Import the CSS file
import { useNavigate, useLocation } from "react-router-dom"; // Use useNavigate for React Router v6+
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = "http://localhost/Doctor_search/Registrationform.php";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [fatherName, setfatherName] = useState();
  const [currentID, setcurrentID] = useState("");
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [editItem, seteditItem] = useState(false);
  //UPDATE FORM
  const today = new Date().toISOString().split("T")[0];
  const [name, setname] = useState();
  const [gender, setgender] = useState();
  const [dob, setdob] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [email, setemail] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [address, setaddress] = useState();
  const [regNumber, setregNumber] = useState();
  const [regYear, setregYear] = useState();
  const [specialization, setspecialization] = useState();
  const [employmentType, setemploymentType] = useState();
  const [uprn, setuprn] = useState();
  const [university, setuniversity] = useState();
  const [stateOfMedicine, setstateOfMedicine] = useState();
  const [qualification, setqualification] = useState();
  const [yearOfQualification, setyearOfQualification] = useState();
  const [CurrentSno, setSno] = useState();
  const [imagePath, setimagePath] = useState();
  const [imageName, setimageName] = useState();
  const [image, setImage] = useState();
  const [Array, setarray] = useState({});

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const newOne = localStorage.getItem('newUser');
    const values = JSON.parse(localStorage.getItem('currentUser'));

    if ((values === '' || values === null || values === undefined) && (!newOne)) {
      navigate("/");
      return;
    }

    if (!data) {
      fetchData(values[0].RegNumber);

    }
    else {
      fetchData(data);
    }



  }, []);
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update activeTab state correctly
  };
  const fetchData = async (ID) => {
    try {
      const response = await axios.get(apiUrl);
      setarray(response.data)
      if (currentID !== "") {
        const filterValNew = response.data.filter((record) =>
          record.RegistrationNumber === currentID
        );
        if (filterValNew.length > 0) {
          setUserData(filterValNew[0]);
          setActiveTab("personal")
        }
        else {
          setUserData([]);
        }
      }

      else {
        const filterValOld = response.data.filter((record) =>
          record.RegistrationNumber === ID
        );
        if (filterValOld.length > 0) {
          setUserData(filterValOld[0]);
          setActiveTab("personal")
        }
        else {
          setUserData([]);
        }
      }



    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
  };
  function capitalizeFirstLetter(string) {
    return string.replace(/^\w/, c => c.toUpperCase());
  }
  const EditDetails = (data) => {
    seteditItem(true)
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
    // setcurrentfilename(data.image_name);
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
  const SubmitFn = async () => {

    if (!name ||
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
      !state) {
      toast.error("Please fill all fields!", { position: "top-center" });
      return;
    }

    //register number
    const valrArr = Array.filter((record) =>
      record.Sno.toLowerCase() !== CurrentSno.toLowerCase()
    );
    const checkRegNumber = valrArr.some((record) =>
      record.RegistrationNumber.toLowerCase() === regNumber.toLowerCase()
    );
    if (checkRegNumber) {
      toast.error('Given Register number is already exists'); // Show an error notification
      return;
    }
    //phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phonenumber) {
      return;
    }
    if (!phoneRegex.test(phonenumber)) {
      toast.error("Enter a valid 10-digit phone number.");
      return
    }
    //email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return
    }
    // check upran

    const isUsernameTaken = Array.some((record) =>
      record.Uprnnumber.toLowerCase() === uprn.toLowerCase()
    );

    if (isUsernameTaken) {
      toast.error('Given Uprnnumber is already exists'); // Show an error notification
      return;

    }

    let formData = new FormData();
    formData.append('Sno', capitalizeFirstLetter(CurrentSno));
    formData.append('name', capitalizeFirstLetter(name));
    formData.append('fatherName', capitalizeFirstLetter(fatherName));
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('phone', phonenumber);
    formData.append('email', email);
    formData.append('address', capitalizeFirstLetter(address));
    formData.append('city', capitalizeFirstLetter(city));
    formData.append('state', capitalizeFirstLetter(state));
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
    if (imageName === image) {
      formData.append('image_name', imageName);
    }
    else {
      formData.append('image_name', image.name);
    }

    console.log(formData)
    const response = await axios.post(apiUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data.code === 200) {
      toast.success(response.data.message, { position: "top-center" });
      localStorage.setItem('editItem', false);
      fetchData(regNumber)
      seteditItem(false)


    } else {
      toast.error("Failed to update the form!", { position: "top-center" });
    }
  }
  const checkPhonenumber = (phonenum) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phonenum) {
      return;
    }
    if (!phoneRegex.test(phonenum)) {
      toast.error("Enter a valid 10-digit phone number.");
    }
  }

  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
    }
  }

  const checkregnumber = (event) => {
    const value = event.target.value;
    const isUsernameTaken = Array.some((record) =>
      record.RegistrationNumber.toLowerCase() === value.toLowerCase()
    );

    if (isUsernameTaken && value.length > 0) {
      toast.error('Given Register number is already exists'); // Show an error notification

    }
    setregNumber(event.target.value);

  }
  const checkURPN = (event) => {
    const value = event.target.value;
    const isUsernameTaken = Array.some((record) =>
      record.Uprnnumber.toLowerCase() === value.toLowerCase()
    );

    if (isUsernameTaken && value.length > 0) {
      toast.error('Given Uprnnumber is already exists'); // Show an error notification

    }
    setuprn(event.target.value);

  }

  return (
    <div>
      <Header title="Profile" />
      <ToastContainer
        autoClose={500} // Auto-close in 20 seconds
        toastStyle={{ backgroundColor: "white", color: 'black', fontFamily: "'Roboto', sans-serif" }}
        progressStyle={{ background: 'white' }}
      />
      <div className="profile-container font_family_robot">
        {/* Profile Header */}
        <div>
          <div className="profile-header">
            <img

              className="profile-image"
              src={`http://localhost/Doctor_search/${userData.image_path}`}
            />
            <div className="edit_icon_pad">
              <FontAwesomeIcon icon={faPencil}
                onClick={() => EditDetails(userData)} className="cursor" />
            </div>
          </div>

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
          <div className="tab-content actively padding_align">

            <div className="algin_tab">
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faUser} />
                {editItem === true &&
                  <input
                    type="text" className="txt_transform pro_input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    maxLength={100}
                  />
                }
                {editItem === false &&
                  <div>
                    <strong>Name:</strong> {userData.Name}
                  </div>
                }

              </div>
              <div className="personal-info-item tab_input_width txt_transform">
                <FontAwesomeIcon icon={faUser} />
                {editItem === true &&
                  <input
                    type="text" className="txt_transform pro_input"
                    placeholder="Father name"
                    value={fatherName}
                    onChange={(e) => setfatherName(e.target.value)}
                    maxLength={100}
                  />
                }
                {editItem === false &&
                  <div>
                    <strong>Father Name:</strong> {userData.Fathername}
                  </div>
                }


              </div>
            </div>

            <div className="algin_tab">
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faBirthdayCake} />
                {editItem === true && <input
                  type="date"
                  className="pro_input"
                  max={today}
                  placeholder="DateOfBirth"
                  onChange={(e) => setdob(e.target.value)}
                  value={dob}
                />}
                {editItem === false &&
                  <div>
                    <strong>Date of Birth:</strong> {userData.DOB}
                  </div>
                }

              </div>
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faTransgenderAlt} />
                {editItem === true &&
                  <select className="pro_GENDER" onChange={(e) => setgender(e.target.value)} value={gender}>
                    <option value="Select">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>

                  </select>
                }
                {editItem === false &&
                  <div>
                    <strong>Gender:</strong> {userData.Gender}
                  </div>
                }


              </div>
            </div>

            <div className="algin_tab">
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faEnvelope} />
                {editItem === true &&
                  <input type="email" placeholder="Email" className="pro_input"
                    onChange={(e) => setemail(e.target.value)}
                    onBlur={() => checkEmail(email)}
                    value={email} maxLength={50} />
                }
                {editItem === false &&
                  <div>
                    <strong>Email:</strong> {userData.Email}
                  </div>
                }
              </div>
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faPhoneAlt} />
                {editItem === true &&

                  <input type="number" placeholder="Phone Number" className="pro_input"
                    onChange={(e) => setphonenumber(e.target.value)}
                    onBlur={() => checkPhonenumber(phonenumber)}
                    value={phonenumber} maxLength={15} />
                }
                {editItem === false &&
                  <div>
                    <strong>Phone:</strong> {userData.Phonenumber}
                  </div>
                }

              </div>
            </div>

            <div className="algin_tab">
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faCity} />
                {editItem === true &&
                  <input type="text" placeholder="City" className="txt_transform pro_input" onChange={(e) => setcity(e.target.value)} value={city} maxLength={100} />
                }
                {editItem === false &&
                  <div>
                    <strong>City:</strong> {userData.City}
                  </div>
                }

              </div>
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {editItem === true &&
                  <input type="text" placeholder="State" className="txt_transform pro_input" onChange={(e) => setstate(e.target.value)} value={state} maxLength={100} />
                }
                {editItem === false &&
                  <div>
                    <strong>State:</strong> {userData.State}
                  </div>
                }
              </div>
            </div>
            <div className="algin_tab">
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {editItem === true &&
                  <textarea placeholder="Address" rows="2" className="txt_transform pro_input" onChange={(e) => setaddress(e.target.value)} value={address} maxLength={200}></textarea>
                }
                {editItem === false &&
                  <div>
                    <strong>Address:</strong> {userData.Address}
                  </div>
                }

              </div>
            </div>

          </div>
        )}

        {/*Registration Info */}
        {activeTab === "registration" && (
          <div className="tab-content active">

            <div className="algin_tab">
              <div className="registration-info-item1 tab_input_width">
                <FontAwesomeIcon icon={faIdCard} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="Registration Number"
                    className="pro_input"
                    onChange={(e) => checkregnumber(e)}
                    value={regNumber} maxLength={50} />
                }
                {editItem === false &&
                  <div> <strong>Registration No:</strong> {userData.RegistrationNumber} </div>
                }

              </div>
              <div className="registration-info-item1 tab_input_width txt_transform">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="Year of Registration"
                    className="pro_input" onChange={(e) => setregYear(e.target.value)} value={regYear} maxLength={50} />
                }
                {editItem === false &&
                  <div>
                    <strong>Year of Registration:</strong> {userData.Yearofregistration}
                  </div>
                }

              </div>
            </div>


            <div className="algin_tab">
              <div className="registration-info-item1 tab_input_width">
                <FontAwesomeIcon icon={faIdCard} className="icon_style_profile" />
                {editItem === true &&
                  //  <div>
                  <select className="pro_GENDER" onChange={(e) => setemploymentType(e.target.value)} value={employmentType}>
                    <option value="Select">Select EmploymentType</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Hospital-Employee">Hospital-Employee</option>
                    <option value="Clinic Affiliation">Clinic Affiliation</option>
                    <option value="other">Other</option>

                  </select>
                  // </div>
                }
                {editItem === false &&
                  <div> <strong>EmploymentType:</strong> {userData.Employmenttype} </div>
                }

              </div>
              <div className="registration-info-item1 tab_input_width txt_transform">
                <FontAwesomeIcon icon={faBarcode} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="UPRN Number" className="txt_transform pro_input" 
                  onChange={(e) => checkURPN(e)}
                    value={uprn} maxLength={50} />
                }
                {editItem === false &&
                  <div>
                    <strong>UPRN Number:</strong> {userData.Uprnnumber}
                  </div>
                }

              </div>
            </div>

            <div className="algin_tab">
              <div className="registration-info-item1 tab_input_width">
                <FontAwesomeIcon icon={faBriefcase} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="State of Medicine" className="txt_transform pro_input" onChange={(e) => setstateOfMedicine(e.target.value)} value={stateOfMedicine} maxLength={100} />
                }
                {editItem === false &&
                  <div>
                    <strong>State of Medicine:</strong> {userData.Stateofmedicine}
                  </div>
                }

              </div>
              <div className="registration-info-item1 tab_input_width txt_transform">
                <FontAwesomeIcon icon={faUniversity} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="University Name" className="txt_transform pro_input" onChange={(e) => setuniversity(e.target.value)} value={university} maxLength={100} />
                }
                {editItem === false &&
                  <div>
                    <strong>University:</strong> {userData.Universityname}
                  </div>
                }

              </div>
            </div>

          </div>
        )}

        {/* Qualification Info */}
        {activeTab === "qualification" && (
          <div className="tab-content active">
            <div className="qualification-info-item1">
              <FontAwesomeIcon icon={faGraduationCap} className="icon_style_profile" />
              {editItem === true &&
                <input type="text" placeholder="Qualification" className="txt_transform pro_input" onChange={(e) => setqualification(e.target.value)} value={qualification} maxLength={100} />
              }
              {editItem === false &&
                <div>
                  <strong>Qualification:</strong> {userData.Qualification}
                </div>
              }

            </div>
            <div className="qualification-info-item1">
              <FontAwesomeIcon icon={faStethoscope} className="icon_style_profile" />
              {editItem === true &&
                <input type="text" placeholder="Specialization" className="txt_transform pro_input" onChange={(e) => setspecialization(e.target.value)} value={specialization} maxLength={100} />
              }
              {editItem === false &&
                <div>
                  <strong>Specialization:</strong> {userData.Specialization}
                </div>

              }

            </div>
            <div className="qualification-info-item1">
              <FontAwesomeIcon icon={faCalendarCheck} className="icon_style_profile" />
              {editItem === true &&
                <input type="text" placeholder="Year of Qualification" className="pro_input" onChange={(e) => setyearOfQualification(e.target.value)} value={yearOfQualification} maxLength={100} />
              }
              {editItem === false &&
                <div>
                  <strong>Year of Qualification:</strong> {userData.Yearofqualification}
                </div>
              }

            </div>
          </div>
        )}
        {/* Close Button */}
        <div className="cls_btn_style">
          {editItem === true &&
            <button className="submit-button-Profile" onClick={SubmitFn}>Submit</button>
          }
          {editItem === true &&
            <button className="close-button-Profile" onClick={() => seteditItem(false)}>Close</button>
          }
        </div>


      </div>
    </div>
  );
};

export default Profile;
