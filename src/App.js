// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home"; // Import the Home component
import FlowDiagram from "./components/FlowDiagram"; // Import the FlowDiagram component
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use element prop for route rendering */}
          <Route path="/flow-diagram" element={<FlowDiagram />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
