import { useState } from 'react';
import Userfront from "@userfront/core";
import { activeLinkHelper } from './utilities';

import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import {
  Dashboard,
  NavMenu,
  AddClient,
  AddSession,
  ViewClient,
  EditClient,
  Groups,
  CreateGroup,
  Login,
  Signup,
  PasswordReset,
  PasswordResetRequest
} from './components';

export default function App() {

  const getUserGroupInStorage = () => {
    try {
      return JSON.parse(sessionStorage.getItem("userGroup"));
    } catch {
      return null;
    }
  }

  const [status, setStatus] = useState({
    isLoading: false,
    success: '',
    error: ''
  });

  const [userGroup, setUserGroup] = useState(getUserGroupInStorage());

  const location = useLocation();

  function PrivateRoute({ children }) {
    return Userfront.accessToken() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  activeLinkHelper.setActiveLink(location);

  return (
    <div className="min-h-screen">
      {Userfront.accessToken() && (
        <NavMenu />
      )}
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
                  status={status}
                  setStatus={setStatus}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="clients/:clientId"
            element={
              <PrivateRoute>
                <ViewClient />
              </PrivateRoute>
            }
          >
            <Route
              path="edit"
              element={
                <PrivateRoute>
                  <EditClient />
                </PrivateRoute>
              }
            />
            <Route
              path="addsession"
              element={
                <PrivateRoute>
                  <AddSession
                    status={status}
                    setStatus={setStatus}
                  />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="addclients"
            element={
              <PrivateRoute>
                <AddClient
                  userGroup={userGroup}
                  setUserGroup={setUserGroup}
                  status={status}
                  setStatus={setStatus}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="groups"
            element={
              <PrivateRoute>
                <Groups
                  userGroup={userGroup}
                  setUserGroup={setUserGroup}
                  status={status}
                  setStatus={setStatus}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="creategroup"
            element={
              <PrivateRoute>
                <CreateGroup
                  userGroup={userGroup}
                  setUserGroup={setUserGroup}
                  status={status}
                  setStatus={setStatus}
                />
              </PrivateRoute>
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