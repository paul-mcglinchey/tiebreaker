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
import CreateGroup from './components/CreateGroup.js';
import ClientList from './components/ClientList.js';

export default function App() {

  const [groups, setGroups] = useState([]);
  const [userGroup, setUserGroup] = useState();
  const [groupsLoading, setGroupsLoading] = useState(false);

  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  const location = useLocation();

  function PrivateRoute({ children }) {
    return Userfront.accessToken() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  function GroupRoute({ children }) {
    return groups.length > 0 ? children : <Navigate to="/creategroup" state={{ from: location }} />;
  }

  const update = () => {
    getGroups(setGroups, userGroup, setUserGroup, setGroupsLoading);
    getClients(userGroup, setMaxPages, pageNumber, setClients, setClientsLoading);
  }

  setActiveLink(location);
  useMountEffect(update, [userGroup]);

  return (
    <div>
      <NavMenu
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
                  groups={groups}
                  groupsLoading={groupsLoading}
                  clients={clients}
                  clientsLoading={clientsLoading}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/clients"
            element={
              <ClientList
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                maxPages={maxPages}
                clients={clients}
                userGroup={userGroup}
                update={() => update()}
              />
            }
          />
          <Route
            path="addclients"
            element={
              <GroupRoute>
                <AddNewClient
                  userGroup={userGroup}
                  update={() => update()}
                />
              </GroupRoute>
            }
          />
          <Route
            path="groups"
            element={
              <GroupRoute>
                <Groups
                  groups={groups}
                  update={() => getGroups(setGroups, userGroup, setUserGroup, setGroupsLoading)}
                  setUserGroup={setUserGroup}
                />
              </GroupRoute>
            }
          />
          <Route
            path="creategroup"
            element={
              <CreateGroup
                groups={groups}
                update={() => update()}
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
    </div >
  );
}