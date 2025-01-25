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
  const apiUrl = "http://localhost/Doctor_search/Login.php";
  useEffect(() => {
    getuserListapi();
   }, []);

   const getuserListapi = () => {
    axios
    .get(apiUrl)
    .then((response) => {
      setArray(response.data);
      setcurrentuser(response.data[0].UserName)
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
      const filtered = Array.filter((item) => item.Password === password && item.Status === "Active"); 
      if(filtered.length>0){
        // onLogin();
        localStorage.setItem('currentUser',currentuser);
        navigate("/registration_list");
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
  return (
    <div className="login-container">
       <ToastContainer
              autoClose={500} // Auto-close in 20 seconds
              toastStyle={{ backgroundColor: "white", color: 'black' }}
              progressStyle={{ background: 'white' }}
      />
      {/* Illustration Section */}
      <div className="login-illustration">
        <div className="wt50">
          <h1>dsfds</h1>
            <img
        src={doctorIllustration}
        alt="Doctor Illustration"
        className="illustration-img" />
        </div>
      {/* Login Form Section */}
      <div className="login-form-container wt50">
        <div className="login-form-wrapper">
          <h1 className="login-title">Login</h1>
          <form onSubmit={loginFn}>
            <div className="form-group">
              <label htmlFor="username" className="form label">
                Enter your username
              </label>
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
                Enter your Password
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

            <div className="form-footer">
              <a href="#" className="forgot-password">
                Forgot Password
              </a>
            </div>

            <button type="submit" className="login_screen" >
              Sign up
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginScreen;
