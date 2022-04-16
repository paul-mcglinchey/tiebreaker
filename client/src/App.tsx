import { useState } from 'react';
import Userfront from "@userfront/core";

import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { AddClient, AddRota, ClientDashboard, ClientGroupDashboard, ClientManager, ClientPage, Dashboard, Employees, Login, NavMenu, NotificationContainer, PasswordReset, PasswordResetRequest, RotaDashboard, RotaGroupDashboard, RotaManager, RotaPage, Signup } from './components';
import { AdminPanel } from './components/AdminPanel';
import { StatusProvider } from './utilities';

export default function App() {
  const location = useLocation();

  // provide state for the current application
  const [currentApplication, setCurrentApplication] = useState(undefined);

  // @ts-ignore
  const getAccess = () => Userfront.accessToken();

  const PrivateRoute = ({ children }: any) => {
    return getAccess() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  const AdminRoute = ({ children }: any) => {
    return (Userfront.user.hasRole && Userfront.user.hasRole("admin")) ? children : <Navigate to="/" state={{ from: location }} />
  }

  return (
      <StatusProvider>
        <div className="">
          {getAccess() && (
            <NavMenu currentApplication={currentApplication} />
          )}
          <NotificationContainer />
          <div className="font-sans subpixel-antialiased px-2 sm:px-6 lg:px-8">
            <Routes>
              {/* Dashboard Routes */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />

              {/* Client manager specific routes */}
              <Route path="clients/*" element={
                <PrivateRoute>
                  <ClientManager setCurrentApplication={setCurrentApplication} />
                </PrivateRoute>
              }>
                <Route path="dashboard" element={<ClientDashboard />} />
                <Route path=":clientId/*" element={<ClientPage />} />
                <Route path="addclients" element={<AddClient />} />
                <Route path="groups" element={<ClientGroupDashboard />} />
              </Route>

              {/* Rota manager specific routes */}
              <Route path="rotas/*" element={
                <PrivateRoute>
                  <RotaManager setCurrentApplication={setCurrentApplication} />
                </PrivateRoute>
              }>
                <Route path="dashboard" element={<RotaDashboard />} />
                <Route path=":rotaId/*" element={<RotaPage />} />
                <Route path="addrota" element={<AddRota />} />
                <Route path="employees" element={<Employees />} />
                <Route path="employees/:isAddEmployeeOpen" element={<Employees />} />
                <Route path="groups" element={<RotaGroupDashboard />} />
              </Route>

              {/* Unprotected routes */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="passwordresetrequest" element={<PasswordResetRequest />} />
              <Route path="passwordreset" element={<PasswordReset />} />

              {/* Admin Routes */}
              <Route path="adminpanel" element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } />
            </Routes>
          </div>
        </div >
      </StatusProvider>
  );
}