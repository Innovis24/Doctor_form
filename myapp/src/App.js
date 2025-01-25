import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationList from "./Components/RegistrationList";
import RegistrationForm from "./Components/RegistrationForm"; // Assuming you have this
import LoginScreen from "./Components/LoginScreen";

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<LoginScreen />} />
      <Route path="/registration_list" element={<RegistrationList />} />
      <Route path="/registration_form" element={<RegistrationForm />} />
    </Routes>
  );
};

export default App;
