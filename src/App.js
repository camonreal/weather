import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import Home from "./pages/Home/Home";
import WeatherAPI from './pages/WeatherAPI/WeatherAPI';
import MateoAPI from './pages/MateoAPI/MateoAPI';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mateo-api" element={<MateoAPI />} />
      <Route path="/weather-api" element={<WeatherAPI />} />
    </Routes>
  </Router>
  );
}

export default App;
