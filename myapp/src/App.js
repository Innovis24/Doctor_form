import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationList from "./Components/RegistrationList";
import RegistrationForm from "./Components/RegistrationForm"; // Assuming you have this

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegistrationList />} />
      <Route path="/registration-form" element={<RegistrationForm />} />
    </Routes>
  );
};

export default App;
