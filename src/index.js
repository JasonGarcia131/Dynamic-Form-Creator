import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Inspections from './components/Inspections';
import Inspectionsbyuser from './components/Inspectionsbyuser';
import Inspectionbyid from './components/Inspectionbyid';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route exact path="/admin-page" element={<Admin/>}/>
        <Route exact path="/admin-page/inspections" element={<Inspections/>}/>
        <Route exact path='/admin-page/inspections/:username' element={<Inspectionsbyuser/>}/>
        <Route exact path='/admin-page/inspections/:submittedBy/:id' element={<Inspectionbyid/>}/>
      </Routes>
    </Router>
);

