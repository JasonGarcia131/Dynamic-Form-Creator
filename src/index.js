import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Inspections from './components/Inspections';
import Inspectionsbyuser from './components/Inspectionsbyuser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route exact path="/admin-page" element={<Admin/>}/>
        {/* <Route path="/admin-page/inspections" element={<Inspections/>}/> */}
        {/* <Route path='/admin-page/inspections/:username' element={<Inspectionsbyuser/>}/> */}
      </Routes>
    </Router>
);

