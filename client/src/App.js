import { useState } from 'react';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import Signup from './components/Signup.js';
import Userfront from "@userfront/core";
import PasswordResetRequest from './components/PasswordResetRequest.js';
import PasswordReset from './components/PasswordReset.js';
import AddNewClient from './components/AddNewClient.js';
import NavMenu from './components/NavMenu';
import getGroups from './requests/getGroups.js';
import Groups from './components/Groups.js';
import { links, setActiveLink } from './helpers/activeLinkController';

export default function App() {

  
  const [groups, setGroups] = useState([]);
  const [userGroup, setUserGroup] = useState();
  
  console.log(groups);
  
  const location = useLocation();

  function PrivateRoute({ children }) {
    return Userfront.accessToken() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  setActiveLink(location);

  return (
    <div>
      <NavMenu
        getGroups={() => getGroups(setGroups, userGroup, setUserGroup)}
        userGroup={userGroup}
        setUserGroup={setUserGroup}
        groups={groups}
        links={links}
      />
      <div className="font-sans subpixel-antialiased px-2 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard
                  userGroup={userGroup}
                  getGroups={() => getGroups(setGroups, userGroup, setUserGroup)}
                  groups={groups}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="addclients"
            element={
              <AddNewClient
                userGroup={userGroup}
              />
            }
          />
          <Route
            path="groups"
            element={
              <Groups
                groups={groups}
                getGroups={() => getGroups(setGroups, userGroup, setUserGroup)}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login />
            }
          />
          <Route
            path="signup"
            element={
              <Signup />
            }
          />
          <Route
            path="passwordresetrequest"
            element={
              <PasswordResetRequest />
            }
          />
          <Route
            path="passwordreset"
            element={
              <PasswordReset />
            }
          />
        </Routes>
      </div>
    </div>
  );
}