import { useState } from 'react';
import Userfront from "@userfront/core";

import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { ApplicationContext } from './utilities/contexts';
import { getUserGroupInStorage } from './services';
import { Application, IApplicationContext, IStatus, IUserGroup } from './models';
import {
  AddClient,
  ClientPage,
  AddGroup,
  ClientsDashboard,
  GroupDashboard,
  Login,
  NavMenu,
  PasswordReset,
  PasswordResetRequest,
  Signup,
  NotificationContainer,
  Notification,
  Dashboard,
  RotasDashboard,
  AddRota
} from './components';
import { AddEmployee } from './components/Employees';

export default function App() {

  const [status, setStatus] = useState<IStatus[]>([]);
  const [userGroup, setUserGroup] = useState<IUserGroup>(getUserGroupInStorage());
  const location = useLocation();
  const [currentApplication, setCurrentApplication] = useState<Application>();

  // @ts-ignore
  const getAccess = () => Userfront.accessToken();

  function PrivateRoute({ children }: any) {
    return getAccess() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  const AppContext: IApplicationContext = {
    userGroup: userGroup, setUserGroup: setUserGroup, status: status, setStatus: setStatus, currentApplication: currentApplication
  }

  return (
    <ApplicationContext.Provider value={AppContext}>
      <div className="min-h-screen">
        <NotificationContainer>
          {status.map((s: IStatus, i: number) => (
            <Notification key={i} status={s} />
          ))}
        </NotificationContainer>
        {getAccess() && (
          <NavMenu />
        )}
        <div className="font-sans subpixel-antialiased px-2 sm:px-6 lg:px-8">
          <Routes>
            {/* Dashboard Routes */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard setCurrentApplication={setCurrentApplication} />
              </PrivateRoute>
            } />

            {/* Client manager specific routes */}
            <Route path="clients" element={
              <PrivateRoute>
                <ClientsDashboard setCurrentApplication={setCurrentApplication} />
              </PrivateRoute>
            } />

            <Route path="clients/:clientId/*" element={
              <PrivateRoute>
                <ClientPage />
              </PrivateRoute>
            } />

            {/* Rota manager specific routes */}
            <Route path="rotas" element={
              <PrivateRoute>
                <RotasDashboard setCurrentApplication={setCurrentApplication} />
              </PrivateRoute>
            } />
            <Route path="addrota" element={
              <PrivateRoute>
                <AddRota />
              </PrivateRoute>
            } />
            <Route path="addemployee" element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            } />

            {/* Client Manager Navbar routes */}
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
                  <GroupDashboard />
                </PrivateRoute>
              }
            />
            <Route path="creategroup"
              element={
                <PrivateRoute>
                  <AddGroup />
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