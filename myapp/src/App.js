import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationList from "./Components/RegistrationList";
import RegistrationForm from "./Components/RegistrationForm"; // Assuming you have this
import LoginScreen from "./Components/LoginScreen";
import UserMaster from "./Components/UserMaster";
import Profile from "./Components/Profile";
import ForgetPassword from "./Components/ForgetPassword"

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<LoginScreen />} />
       <Route path="/Profile" element={<Profile />} />
       <Route path="/forget_password" element={<ForgetPassword />} />
      <Route path="/registration_list" element={<RegistrationList />} />
      <Route path="/user_master" element={<UserMaster />} />
      <Route path="/registration_form" element={<RegistrationForm />} />
    </Routes>
  );
};

export default App;
