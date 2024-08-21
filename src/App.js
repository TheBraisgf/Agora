import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Pages

import MainPage from "./pages/MainPage";
import HobbyPage from "./pages/HobbyPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/hobbies" element={<HobbyPage />} />
          <Route path="/actividades" element={<ActivitiesPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
