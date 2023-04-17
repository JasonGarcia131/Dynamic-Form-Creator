import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Inspections from './components/Inspections';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route exact path="/admin-page" element={<Admin/>}/>
        <Route path="/admin-page/inspections" element={<Inspections/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

