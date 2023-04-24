import './App.css';
import Admin from './components/Admin';
import LinkPage from './components/LinkPage';
import Inspections from './components/Inspections';
import Inspectionsbyuser from './components/Inspectionsbyuser';
import Inspectionbyid from './components/Inspectionbyid';
import Checklist2 from './components/Checklist2';
import PersistantLogin from './components/PersistantLogin';
import RequireAuth from './components/RequireAuth';
import { Route, Routes } from 'react-router-dom';
import Unauthorized from './components/Unauthorized';
import Missing from './pages/Missing';
import LogIn from './components/LogIn';
import Layout from './components/Layout';
import Home from './components/Home';

const ROLES = {
  'User': 2001,
  'Admin': 1994
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<LinkPage />} />
        <Route path="login" element={<LogIn />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Private routes */}
        <Route element={<PersistantLogin />}>

          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="home" element={<Home />} />
          </Route>
          {/* Users */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            < Route path="/inspection-form" element={<Checklist2 />} />
          </Route>
          {/* Admin */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />} >
            <Route exact path="/admin-page" element={<Admin />} />
            <Route exact path="/admin-page/inspections" element={<Inspections />} />
            <Route exact path='/admin-page/inspections/:username' element={<Inspectionsbyuser />} />
            <Route exact path='/admin-page/inspections/:submittedBy/:id' element={<Inspectionbyid />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Route>

    </Routes>

  );
}

export default App;
