import { useReducer, useState } from 'react';
import Userfront from "@userfront/core";

import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { IClientGroup, IRotaGroup, IStatus } from './models';
import { AddClient, AddClientGroup, AddEmployee, AddRota, AddRotaGroup, ClientDashboard, ClientGroupDashboard, ClientManager, ClientPage, Dashboard, Login, NavMenu, PasswordReset, PasswordResetRequest, RotaDashboard, RotaGroupDashboard, RotaManager, Signup } from './components';
import { ApplicationContext, StatusContext } from './utilities';
import { getItemInStorage, StatusService } from './services';

export default function App() {

  const progressReducer = (progress: number, update: number): number => {
    return progress + update;
  }

  const [status, setStatus] = useState<IStatus[]>([]);
  const location = useLocation();

  // groups
  const [rotaGroup, setRotaGroup] = useState<IRotaGroup>(getItemInStorage("rotaGroup"));
  const [clientGroup, setClientGroup] = useState<IClientGroup>(getItemInStorage("clientGroup"));

  // provide state for the current application
  const [currentApplication, setCurrentApplication] = useState(undefined);
  const [progress, setProgress] = useReducer(progressReducer, 0);

  // @ts-ignore
  const getAccess = () => Userfront.accessToken();

  function PrivateRoute({ children }: any) {
    return getAccess() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  // status service
  const statusService = new StatusService();

  return (
    <ApplicationContext.Provider value={{ clientGroup: clientGroup, setClientGroup: setClientGroup, rotaGroup: rotaGroup, setRotaGroup: setRotaGroup }}>
      <StatusContext.Provider value={{ status: status, setStatus: setStatus, progress: progress, setProgress: setProgress }}>
        <div className="min-h-screen">
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
                <Route path="groups" element={<ClientGroupDashboard statusService={statusService} />} />
                <Route path="creategroup" element={<AddClientGroup statusService={statusService} />} />
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
                <Route path="groups" element={<RotaGroupDashboard statusService={statusService} />} />
                <Route path="creategroup" element={<AddRotaGroup statusService={statusService} />} />
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