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
import getClients from './requests/getClients.js';
import Groups from './components/Groups.js';
import { links, setActiveLink } from './helpers/activeLinkController';
import { useMountEffect } from './helpers/useMountEffect.js';

export default function App() {
  
  const [groups, setGroups] = useState([]);
  const [userGroup, setUserGroup] = useState();

  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  
  const location = useLocation();

  function PrivateRoute({ children }) {
    return Userfront.accessToken() ? children : <Navigate to="/login" state={{ from: location }} />;
  }
  
  const update = () => {
    getGroups(setGroups, userGroup, setUserGroup);
    getClients(userGroup, setMaxPages, pageNumber, setClients, setClientsLoading);
  }

  setActiveLink(location);
  useMountEffect(update);

  return (
    <div>
      <NavMenu
        userGroup={userGroup}
        setUserGroup={setUserGroup}
        groups={groups}
        links={links}
        update={() => update()}
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
                  groups={groups}
                  clients={clients}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  maxPages={maxPages}
                  clientsLoading={clientsLoading}
                  getClients={() => getClients(userGroup, setMaxPages, pageNumber, setClients, setClientsLoading)}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="addclients"
            element={
              <AddNewClient
                userGroup={userGroup}
                getClients={() => getClients(userGroup, setMaxPages, pageNumber, setClients, setClientsLoading)}
              />
            }
          />
          <Route
            path="groups"
            element={
              <Groups
                groups={groups}
                getGroups={() => getGroups(setGroups, userGroup, setUserGroup)}
                setUserGroup={setUserGroup}
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