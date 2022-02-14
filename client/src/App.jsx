import { useState } from 'react';
import Userfront from "@userfront/core";
import { activeLinkHelper, getUserGroupInStorage } from './utilities';

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
  PasswordResetRequest,
  ClientPage
} from './components';
import { ApplicationContext } from './utilities/contexts';

export default function App() {

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
    <ApplicationContext.Provider value={{ userGroup: userGroup, setUserGroup: setUserGroup, status: status, setStatus: setStatus }}>
      <div className="min-h-screen">
        {Userfront.accessToken() && (
          <NavMenu />
        )}
        <div className="font-sans subpixel-antialiased px-2 sm:px-6 lg:px-8">
          <Routes>
            
            {/* Dashboard Routes */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
            }/>

            {/* Client specific routes */}
            <Route path="clients/:clientId/*" element={
              <PrivateRoute>
                <ClientPage />
              </PrivateRoute>
            }>
              <Route index element={<ViewClient />} />
              <Route path="view" element={<ViewClient />} />
              <Route path="edit" element={<EditClient />} />
              <Route path="addsession" element={<AddSession />} />
            </Route>

            {/* Navbar routes */}
            <Route path="addclients"
              element={
                <PrivateRoute>
                  <AddClient />
                </PrivateRoute>
              }
            />
            <Route path="groups"
              element={
                <PrivateRoute>
                  <Groups />
                </PrivateRoute>
              }
            />
            <Route path="creategroup"
              element={
                <PrivateRoute>
                  <CreateGroup />
                </PrivateRoute>
              }
            />

            {/* Unprotected routes */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="passwordresetrequest" element={<PasswordResetRequest />} />
            <Route path="passwordreset" element={<PasswordReset />} />

          </Routes>
        </div>
      </div >
    </ApplicationContext.Provider>
  );
}