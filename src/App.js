import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rest-countries-api" element={<Home />} />
        <Route path="/rest-countries-api/:countryName" element={<Detail />} />
        <Route path="/" element={<Navigate to="/rest-countries-api" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
