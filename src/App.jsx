import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import History from "./pages/history";
import Details from "./pages/details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/history" element={<History />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;

