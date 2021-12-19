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
import Groups from './components/Groups'
import { activeLinkHelper } from './helpers';
import CreateGroup from './components/CreateGroup.js';

export default function App() {

  const [userGroup, setUserGroup] = useState(null);

  const location = useLocation();

  function PrivateRoute({ children }) {
    return Userfront.accessToken() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  activeLinkHelper.setActiveLink(location);

  return (
    <div>
      <NavMenu />
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
                  setUserGroup={setUserGroup}
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
              <Groups />
            }
          />
          <Route
            path="creategroup"
            element={
              <CreateGroup />
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
    </div >
  );
}