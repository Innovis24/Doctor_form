import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneAlt,faCirclePlus, faTrash, faPencil, faEnvelope, faBarcode, faTransgenderAlt, faCity, faMapMarkerAlt, faBirthdayCake, faIdCard, faCalendarAlt, faBriefcase, faUniversity, faGraduationCap, faStethoscope, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';  // Import the CSS file
import { useNavigate, useLocation } from "react-router-dom"; // Use useNavigate for React Router v6+
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from 'react-spinners';

const apiUrl = "http://localhost/Doctor_search/Registrationform.php";

const Profile = () => {
  const [loading, setLoading] = useState(false);
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
  const [currentfilename, setcurrentfilename] = useState();
  const [imagePath, setimagePath] = useState();
  const [imageName, setimageName] = useState();
   const [galleryArray, setgalleryArray] = useState([]);
  const [image, setImage] = useState();
  const [Array, setarray] = useState({});
  const [newImsge, setnewImsge] = useState([]);
  const location = useLocation();
  const data = location.state;
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
    zIndex: 1000,
  };
  const fetchData = useCallback(async (ID) => {
    setLoading(true)
    try {
      const response = await axios.get(apiUrl);
      setarray(response.data)
      if (currentID !== "") {
        setLoading(false)
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
        setLoading(false)
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
      setLoading(false)
      toast.error("Failed to fetch registrations!");
    }
  }, [currentID]);



  useEffect(() => {
    const newOne = localStorage.getItem('newUser');
    const values = localStorage.getItem('currentUser') === 'undefined' ? 'null' : JSON.parse(localStorage.getItem('currentUser'));

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

  }, [navigate, data, fetchData]);
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update activeTab state correctly
  };
  const handleFileGalleryChange = (event) => {
   

    if (!event.target.files || event.target.files.length === 0) {
      console.log("No files selected.");
      return;
    }

    const selectedFiles = [...event.target.files]; // Correct conversion ✅
    const newImageURLs = selectedFiles.map((file) => URL.createObjectURL(file)); // Convert to preview URLs

    setnewImsge((prev) => [...prev, ...newImageURLs]); 

    console.log('fileupload')
    const selectedFilesapi = event.target.files;
  
    if (selectedFiles) {
      setgalleryArray([...galleryArray, ...selectedFilesapi]); // Append selected files to the array
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
  const handleEdit = (value)=>{

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

    // check upran

    const isUsernameTaken = valrArr.some((record) =>
      record.Uprnnumber.toLowerCase() === uprn.toLowerCase()
    );

    if (isUsernameTaken) {
      toast.error('Given Uprnnumber is already exists'); // Show an error notification
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
    galleryArray.forEach((file, index) => {
      formData.append(`galleryImages[${index}]`, file);
   });
    // console.log(formData)
    const response = await axios.post(apiUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data.code === 200) {
      toast.success(response.data.message, { position: "top-center" });
      localStorage.setItem('editItem', false);
      fetchData(regNumber)
      seteditItem(false)
      setgalleryArray([])
      setnewImsge([])


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
  const handleImgDelete = async (imgDet)=>{
   
    try {
      const response = await axios.delete((apiUrl + '?action=deleteImage'), {
        data: { Sno: Number(CurrentSno), imageName: imgDet }, // Send the Sno for deletion
      });

      if (response.status === 200) {
        setLoading(false);
        toast.success("Record deleted successfully!");
  
        const response = await axios.get(apiUrl);
       

        const filterValNew = response.data.filter((record) =>
            record.Sno === CurrentSno
          );
        if (filterValNew.length > 0) {
            setUserData(filterValNew[0]);
            setActiveTab("gallery")
        }
          else {
            setUserData([]);
        }





        setActiveTab('gallery')
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
  const newhandleImgDelete = async (ind,imageURL)=>{
   
      
  // let indexToRemove = 1; // Remove the second element

  // let updatedBlobs = newImsge.filter((_, index) => index !== indexToRemove);

  //   setnewImsge(updatedBlobs)
  setnewImsge((prevImages) => {
    const indexToDelete = prevImages.indexOf(imageURL); // Find index of deleted image
    
    if (indexToDelete === -1) return prevImages; // If not found, return same state

    // Remove the image URL
    const updatedImages = prevImages.filter((_, index) => index !== indexToDelete);

    setgalleryArray((prevGallery) => {
      const updatedGallery = prevGallery.filter((_, index) => index !== indexToDelete);
      return updatedGallery.length > 0 ? updatedGallery : []; // Ensure empty array when last item is deleted
    });

    return updatedImages;
  });
   
  }
  const handleDelete = () => {
    setcurrentfilename('')
    setImage('')
  }
  return (
    <div>
         {loading && (
                <div style={overlayStyle}>
                  <ClipLoader size={50} color="#fff" />
                </div>
              )}
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
              alt="Profile not loading"
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
            Qualification Info & Profile Image
          </div>
          <div className={`tab ${activeTab === "gallery" ? "active gallery_icon" : "gallery_icon"}`} onClick={() => handleTabChange("gallery")}>
          
            <div >
            Gallery
            </div>
       
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
                  <div className="content_display">
                    <strong>Name:</strong> 
                    <div className="Profile_txt_wrap txt_transform">
                      {userData.Name}
                    </div>
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
                  <div className="content_display">
                    <strong>Father Name:</strong> 
                    <div className="Profile_txt_wrap">
                      {userData.Fathername}
                    </div>
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
                   <div className="content_display">
                    <strong>Date of Birth:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.DOB}
                    </div>
                   
                  </div>
                }

              </div>
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faTransgenderAlt} />
                {editItem === true &&
                  <select className="pro_GENDER txt_trans" onChange={(e) => setgender(e.target.value)} value={gender}>
                    <option value="Select">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>

                  </select>
                }
                {editItem === false &&
                  <div className="txt_trans content_display">
                    <strong>Gender:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Gender}
                    </div>
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
                    <div className="content_display">
                    <strong>Email:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Email}
                    </div>
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
                   <div className="content_display">
                    <strong>Phone:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Phonenumber}
                    </div>
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
                  <div className="content_display">
                    <strong>City:</strong>
                    <div className="Profile_txt_wrap">
                    {userData.City}
                    </div>
                  </div>
                }

              </div>
              <div className="personal-info-item tab_input_width">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {editItem === true &&
                  <input type="text" placeholder="State" className="txt_transform pro_input" onChange={(e) => setstate(e.target.value)} value={state} maxLength={100} />
                }
                {editItem === false &&
                 <div className="content_display">
                    <strong>State:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.State}
                    </div>
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
                    <div className="content_display">
                    <strong>Address:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Address}
                    </div>
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
                     <div className="content_display"> <strong>Registration No:</strong> 
                     
                     <div className="Profile_txt_wrap">
                     {userData.RegistrationNumber} 
                    </div>
                     </div>
                }

              </div>
              <div className="registration-info-item1 tab_input_width txt_transform">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="Year of Registration"
                    className="pro_input" onChange={(e) => setregYear(e.target.value)} value={regYear} maxLength={50} />
                }
                {editItem === false &&
                   <div className="content_display">
                    <strong>Year of Registration:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Yearofregistration}
                    </div>
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
                  <div className="content_display">
                    <strong>EmploymentType:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Employmenttype}
                    </div>
                    </div>
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
                 <div className="content_display">
                    <strong>UPRN Number:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Uprnnumber}
                    </div>
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
                   <div className="content_display">
                    <strong>State of Medicine:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Stateofmedicine}
                    </div>
                  </div>
                }

              </div>
              <div className="registration-info-item1 tab_input_width txt_transform">
                <FontAwesomeIcon icon={faUniversity} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="University Name" className="txt_transform pro_input" onChange={(e) => setuniversity(e.target.value)} value={university} maxLength={100} />
                }
                {editItem === false &&
                   <div className="content_display">
                    <strong>University:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Universityname}
                    </div>
                  </div>
                }

              </div>
            </div>

          </div>
        )}

        {/* Qualification Info */}
        {activeTab === "qualification" && (
          <div className="tab-content active">

            <div className="algin_tab">
              <div className="qualification-info-item1 tab_input_width">
                <FontAwesomeIcon icon={faGraduationCap} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="Qualification" className="txt_transform pro_input" onChange={(e) => setqualification(e.target.value)} value={qualification} maxLength={100} />
                }
                {editItem === false &&
                   <div className="content_display">
                    <strong>Qualification:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Qualification}
                    </div>
                  </div>
                }

              </div>
              <div className="registration-info-item1 tab_input_width txt_transform">
                <FontAwesomeIcon icon={faStethoscope} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="Specialization" className="txt_transform pro_input" onChange={(e) => setspecialization(e.target.value)} value={specialization} maxLength={100} />
                }
                {editItem === false &&
                   <div className="content_display">
                    <strong>Specialization:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Specialization}
                    </div>
                  </div>

                }

              </div>
            </div>

            <div className="algin_tab">
              <div className="qualification-info-item1 tab_input_width">
                <FontAwesomeIcon icon={faCalendarCheck} className="icon_style_profile" />
                {editItem === true &&
                  <input type="text" placeholder="Year of Qualification" className="pro_input" onChange={(e) => setyearOfQualification(e.target.value)} value={yearOfQualification} maxLength={100} />
                }
                {editItem === false &&
                  <div className="content_display">
                    <strong>Year of Qualification:</strong> 
                    <div className="Profile_txt_wrap">
                    {userData.Yearofqualification}
                    </div>
                  </div>
                }

              </div>
            </div>
            <div className="algin_tab">
              <div className="qualification-info-item1 tab_input_width">
              <div className="prfile_font">Upload image for your profile</div>
                <div className="img_style_pro">
                  
                  <div className="img_input" >
                  

                    <input type="file" id="file"  // Attach the ref to the file input
                      onChange={handleFileChange} accept="image/*" style={{
                        display: "none", // Hides the default file input
                      }} />

                    <div className="display_fileupload">
                      <div className="display_flex">
                        <button
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
                            textTransform: "math-auto",
                            width: "120px", // Fixed width
                            // overflow: "hidden", // Hides overflow text
                            // whiteSpace: "nowrap", // Prevents text wrapping
                            // textOverflow: "ellipsis",
                          }}
                          onClick={() => document.getElementById("file").click()}
                        >
                          <span> Choose File</span>
                        </button>
                        {(currentfilename !== "" && image !== "" && currentfilename !== undefined && image !== undefined) &&
                          <FontAwesomeIcon className="view-button" title='Delete' icon={faTrash} style={{ marginRight: "8px" }} onClick={() => handleDelete()} />}
                      </div>

                      <span className="filenamestyle">{currentfilename}</span>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        )}
        {/* gallery */}
        {activeTab === "gallery" && (
          <div className="tab-content active">
          <div className={!userData.gallery_image_paths ? "img_align  algin_tab" : "algin_tab img_align_rt"} >
          {editItem === true && (
            <div>
                <FontAwesomeIcon icon={faCirclePlus} className="add_icon curserPointer"  onClick={() => document.getElementById("file1").click()}  />
                <input 
              type="file" 
              id="file1" 
              multiple 
              onChange={handleFileGalleryChange} 
              accept="image/*" 
              style={{
                display: 'none',  // Hides the file input
              }}
            />
            </div>
            
          )
        
          
          }
        <div>
        {!userData.gallery_image_paths && newImsge.length === 0 &&
         <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center" }}>
           <div  style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "red", padding: "20px" }}>No images found</div>
          </div>}
        </div>
       
        <div className="img_wrap img_gap_scroll" >
          {userData.gallery_image_paths &&
        userData.gallery_image_paths.replace(/^,/, "").split(",").map((imgPath, index) => (
          <div>
              <img
            key={index}
            src={`http://localhost/Doctor_search/${imgPath}`}
            alt="Gallery Item"
            width="150"
            height="150"
            className="img_mrg_btm"
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
           {editItem === true &&
      <FontAwesomeIcon className="view-button img_padding" icon={faTrash} style={{ marginRight: "8px" }} onClick={() => handleImgDelete(imgPath)} />
           }
          </div>
        
          
        ))}
        {newImsge.length > 0 &&
          newImsge.map((imgUrl, index) => (
            <div key={index} style={{ display: "inline-block" }} className="newlt_img">
              <img
                src={imgUrl}
                alt="New gallery item"
                width="150"
                height="150"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
                <FontAwesomeIcon className="view-button img_padding newImg_btom" icon={faTrash} style={{ marginRight: "8px" }} onClick={() => newhandleImgDelete(index,imgUrl)} />
            </div>
            
          ))}
        </div>
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
