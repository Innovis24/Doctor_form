import React, { useState,useEffect } from "react";
import "./LoginScreen.css"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import doctorIllustration from '../assets/image/img-1.jpg';


const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Array, setArray] = useState([]);
  const [currentuser, setcurrentuser] = useState([]);
  const navigate = useNavigate();
  const apiUrl = "http://localhost/Doctor_search/Usermaster.php";
  useEffect(() => {
    getuserListapi();
   }, []);

   const getuserListapi = () => {
    axios
    .get(apiUrl)
    .then((response) => {
      setArray(response.data);
      setcurrentuser(response.data)
    })
    .catch((error) => console.error("Error fetching users:", error));
  }

  const loginFn = (e) => {
    e.preventDefault();
    if(username === '' && password ===''){
      toast.error("Please enter username and password");
      return;
    }
    if(username === '' && password !==''){
      toast.error("Please enter username ");
      return;
    }
    if(username !== '' && password === ''){
      toast.error("Please enter password");
      return;
    }
    const filtered = Array.filter((item) => item.UserName === username); 
    if(filtered.length > 0 ){
      const filteredVal = filtered.filter((item) => item.Password === password && item.Status === "Active"); 
      if(filteredVal.length>0){
        // onLogin();
        const loginFilter = currentuser.filter((item) => item.UserName === username );
        const currentUserRole =  loginFilter
        localStorage.setItem('currentUser',JSON.stringify(loginFilter));
        if(currentUserRole[0].UserRole === "Admin"){
          navigate("/registration_list");
        }
        else{
          navigate("/Profile");
        }
       
      }
      else{
        toast.error("Your username or password is incorrect. Kindly check it.");
    }
    }
    else{
        toast.error("Your username or password is incorrect. Kindly check it.");
    }
         // Navigate to the home page
};
const handleRegisterClick = () => {
  localStorage.setItem('newUser',true);
  navigate("/registration_form"); 
};
  return (
    <div className="login-container">
       <ToastContainer
              autoClose={500} // Auto-close in 20 seconds
              toastStyle={{ backgroundColor: "white", color: 'black' ,  fontFamily: "'Roboto', sans-serif" }}
              progressStyle={{ background: 'white' }}
      />
      {/* Illustration Section */}
      <div className="login-illustration">
        <div className="login-image">
            <img
        src={doctorIllustration}
        alt="Doctor Illustration"
        className="illustration-img responsive-image" />
        </div>
      {/* Login Form Section */}
      <div className="login-form-container login-form">
        <div className="login-form-wrapper">
          <h1 className="login-title"> Login</h1>
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <div className="form-footer">
              <a href="#" className="forgot-password">
                Forgot Password
              </a>
            </div> */}
              <div className="logjustify">
              <button  className="loginBtn" >
             Login
            </button>
              </div>
              <div className="register-prompt">
              <p>Don't have an account?</p>
              <div
                className="signuplg"
                onClick={handleRegisterClick}
              >
                Sign Up
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
