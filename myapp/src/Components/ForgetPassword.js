import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgetPassword.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgetPassword = () => {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [Arrayval, setArrayVal] = useState([]);
  const navigate = useNavigate();
  const apiUrl = "http://localhost/Doctor_search/Usermaster.php";
  useEffect(() => {
    const values = JSON.parse(localStorage.getItem('currentUser'));

    fetchuserNameList();
  }, [navigate]);

  const fetchuserNameList = async () => {
    try {
      const response = await axios.get(apiUrl);
      setArrayVal(response.data);
    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
  };
  const handleSave = async () => {

    if (!username || !password) {
      toast.error("Please fill all fields!", { position: "top-center" })
      return
    }

    const checkrecord = Arrayval.filter((record) => record && record.UserName);

    const isTaken = checkrecord.some((record) =>
      record.UserName.toLowerCase() === username.toLowerCase()
    );

    if (!isTaken) {
      toast.error('Username does not exists');
      return
    }


    const validRecords = Arrayval.filter((record) => record && record.UserName === username);
    const cuurentvalue = validRecords && validRecords[0];

    const FormData = {
      sno: cuurentvalue.Sno,
      name: cuurentvalue.Name,
      userName: username,
      password: password,
      userRole: cuurentvalue.UserRole,
      status: 'Active'
    };
    const response = await axios.put(apiUrl, FormData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.code === 200) {
      toast.success(response.data.message);
      setusername('');
      setpassword('');
      setTimeout(() => {
        navigate('/')
      }, 1000);

    }
    else {
      toast.error("Failed to submit the form!", { position: "top-center" });
    }
  }
  const closePopup = async () => {
    setusername('');
    setpassword('');
  }
  const backPopup = async () => {
    navigate('/')
  }
  const handleInputChange = (event) => {
    const newUsername = event.target.value;
    setusername(newUsername);

  };

  const checkUsernameAvailability = (newUsername) => {

    if (!newUsername) {
      return;
    }
    // If the username is empty, don't validate
    if (newUsername.trim() === '') {
      // setIsUsernameTaken(false);
      return;
    }

    const validRecords = Arrayval.filter((record) => record && record.UserName);

    const isTaken = validRecords.some((record) =>
      record.UserName.toLowerCase() === newUsername.toLowerCase()
    );

    if (!isTaken) {
      toast.error('Username does not exists');
    } else {
      // setIsUsernameTaken(false);
    }
  }

  return (

    <div className="popup-overlay_for">
      <ToastContainer
        autoClose={500} // Auto-close in 20 seconds
        toastStyle={{ backgroundColor: "white", color: 'black', fontFamily: "'Roboto', sans-serif" }}
        progressStyle={{ background: 'white' }} />
      <div className="popup-content">
        <h2>Change Password</h2>
        <div className="mrg_bottom1">
          <div className="ft_wt_mrg_btm">User name<span className="asterisk">*</span></div>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            maxLength={50}
            onChange={(e) => handleInputChange(e)}
            onBlur={() => checkUsernameAvailability(username)}
          />

          <div className="ft_wt_mrg_btm">Password<span className="asterisk">*</span></div>
          <input
            type="text"
            placeholder="Enter password"
            value={password}
            maxLength={50}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSave} className="btn_submitclr_for icon_mrg_rt">Reset</button>
          <button onClick={closePopup} className="btn_cancelClr_for icon_mrg_rt">Cancel</button>
          <button onClick={backPopup} className="btn_submitclr_for">Back</button>
        </div>

      </div>
    </div>
  )
}

export default ForgetPassword;