import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FineCalculator from './pages/FineCalculator';
import TrafficSignsGuide from './pages/TrafficSignsGuide';
import TripCostCalculator from './pages/TripCostCalculator';
import EmergencyContacts from './pages/EmergencyContacts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fine-calculator" element={<FineCalculator />} />
        <Route path="/traffic-signs" element={<TrafficSignsGuide />} />
        <Route path="/trip-cost" element={<TripCostCalculator />} />
        <Route path="/emergency" element={<EmergencyContacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
