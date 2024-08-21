import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components
import NavBar from "./components/NavBar.js";

//Pages

import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
