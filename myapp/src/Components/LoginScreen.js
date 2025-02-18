import React, { useState, useEffect } from "react";
import "./LoginScreen.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import doctorIllustration from '../assets/image/img-1.jpg';
import { REG_API_URL, USER_API_URL } from "../utlis/common";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Array, setArray] = useState([]);
  const [regList, setregList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [currentuser, setcurrentuser] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getuserListapi();
    fetchRegistrations();
  }, []);

  const getuserListapi = () => {
    axios
      .get(USER_API_URL)
      .then((response) => {
        setArray(response.data);
        setcurrentuser(response.data)
      })
      .catch((error) => console.error("Error fetching users:", error));
  }
  const forgetPassword = (e) => {
    e.preventDefault()
    navigate('/forget_password')
  }

  const loginFn = (e) => {
    e.preventDefault();
    if (username === '' && password === '') {
      toast.error("Please enter username and password");
      return;
    }
    if (username === '' && password !== '') {
      toast.error("Please enter username ");
      return;
    }
    if (username !== '' && password === '') {
      toast.error("Please enter password");
      return;
    }

    const filtered = Array.filter((item) => item.UserName === username);

    if (filtered && filtered.length > 0) {

     
      const adminRole = filtered.filter((item) => item.Password === password && item.Status === "Active" && item.UserRole === "Admin");
      const filteredVal = filtered.filter((item) => item.Password === password && item.Status === "Active");
      if (adminRole.length > 0) {
        const loginFilterVal = currentuser.filter((item) => item.UserName === username);
            localStorage.setItem('currentUser', JSON.stringify(loginFilterVal));
            navigate("/registration_list");
            return
      }
      else if (filteredVal.length > 0) {
        const regerList = regList.filter((item) => item.RegistrationNumber === filtered[0].RegNumber);
        if (regerList && regerList.length === 0) {
          toast.error("You don't have an account.");
          return;
        }
        const loginFilter = currentuser.filter((item) => item.UserName === username);
        localStorage.setItem('currentUser', JSON.stringify(loginFilter));
          navigate("/Profile");

      }
      else {
        toast.error("Your username or password is incorrect. Kindly check it.");
      }
    }
    else {
      toast.error("You don't have an account.");
    }
    // Navigate to the home page
  };
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(REG_API_URL);
      if (response.data.code === 400) {
        setregList([]);
      }
      else {
        setregList(response.data);
      }

    } catch (error) {
      toast.error("Failed to fetch registrations!");
    }
  };
  const handleRegisterClick = () => {
    localStorage.setItem('newUser', true);
    navigate("/registration_form");
  };
  return (
    <div className="login-container">
      <ToastContainer
        autoClose={500} 
        toastStyle={{ backgroundColor: "white", color: 'black', fontFamily: "'Roboto', sans-serif" }}
        progressStyle={{ background: 'white' }}
      />
      {/* Illustration Section */}
      <div className="login-illustration">
        <div className="login-image">
          <img
            src={doctorIllustration}
            alt="Doctor profile"
            className="illustration-img responsive-image" />
        </div>
        {/* Login Form Section */}
        <div className="login-form-container login-form">
          <div className="login-form-wrapper">
            {/* <h1 className="login-title">Doctor Management</h1>
            <div className="login_font_style"> Login</div> */}
            <h1 className="login-title">Login</h1>
            <form onSubmit={loginFn}>
              <div className="form-group">
                <div htmlFor="username" className="form-label">
                  Username
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  placeholder="Enter your username"
                  value={username}
                  autoComplete="off"
                  tabIndex={1}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group mrn_bottom15">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>

                  {/* <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /> */}
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className="form-input"
                    tabIndex={2}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"

                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    style={{
                      cursor: "pointer",
                      color: "#666",
                      marginLeft: "-10%",

                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>

              <div className="form-footer">
                <div
                  className="forget_pwd"
                >
                  <button  type="button" className="button_login_color fp_focus" tabIndex={4} onClick={forgetPassword}>
                    Forget password
                  </button>
                </div>
              </div>
              <div className="logjustify">
                <button type="button" className="loginBtn login_btn_focus" tabIndex={3} >
                  Login
                </button>
              </div>
              <div className="register-prompt">
                <p className="acc_mrg_btm">Don't have an account?</p>
                <div
                  className="signuplg"
                >
                  <button className="button_login_color fp_focus" onClick={handleRegisterClick}>
                    Sign up
                  </button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
