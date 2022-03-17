import { useState } from 'react';
import Userfront from "@userfront/core";

import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { IClientGroup, IRotaGroup, IStatus } from './models';
import { AddClient, AddEmployee, AddGroup, AddRota, ClientDashboard, ClientGroupDashboard, ClientManager, ClientPage, Dashboard, Login, NavMenu, Notification, NotificationContainer, PasswordReset, PasswordResetRequest, RotaDashboard, RotaGroupDashboard, RotaManager, Signup } from './components';
import { ApplicationContext, endpoints, StatusContext } from './utilities';
import { getItemInStorage } from './services';

export default function App() {

  const [status, setStatus] = useState<IStatus[]>([]);
  const location = useLocation();

  // groups
  const [rotaGroup, setRotaGroup] = useState<IRotaGroup>(getItemInStorage("rotaGroup"));
  const [clientGroup, setClientGroup] = useState<IClientGroup>(getItemInStorage("clientGroup"));

  // provide state for the current application
  const [currentApplication, setCurrentApplication] = useState(undefined);

  // @ts-ignore
  const getAccess = () => Userfront.accessToken();

  function PrivateRoute({ children }: any) {
    return getAccess() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <ApplicationContext.Provider value={{ clientGroup: clientGroup, setClientGroup: setClientGroup, rotaGroup: rotaGroup, setRotaGroup: setRotaGroup }}>
      <StatusContext.Provider value={{ status: status, setStatus: setStatus }}>
        <div className="min-h-screen">
          <NotificationContainer>
            {status.map((s: IStatus, i: number) => (
              <Notification key={i} status={s} />
            ))}
          </NotificationContainer>
          {getAccess() && (
            <NavMenu currentApplication={currentApplication} />
          )}
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
                <Route path="creategroup" element={<AddGroup endpoint={endpoints.clientgroups} />} />
              </Route>

              {/* Rota manager specific routes */}
              <Route path="rotas/*" element={
                <PrivateRoute>
                  <RotaManager setCurrentApplication={setCurrentApplication} />
                </PrivateRoute>
              }>
                <Route path="dashboard" element={<RotaDashboard />} />
                <Route path="addrota" element={<AddRota />} />
                <Route path="addemployee" element={<AddEmployee />} />
                <Route path="groups" element={<RotaGroupDashboard />} />
                <Route path="creategroup" element={<AddGroup endpoint={endpoints.rotagroups} />} />
              </Route>

              {/* Unprotected routes */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="passwordresetrequest" element={<PasswordResetRequest />} />
              <Route path="passwordreset" element={<PasswordReset />} />

            </Routes>
          </div>
        </div >
      </StatusContext.Provider>
    </ApplicationContext.Provider>
  );
}