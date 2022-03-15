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
  AddRota,
  ClientManager,
  RotaManager
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
            <Route path="clients/*" element={
              <PrivateRoute>
                <ClientManager setCurrentApplication={setCurrentApplication}/>
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<ClientsDashboard />}/>
              <Route path=":clientId/*" element={<ClientPage />}/>
              <Route path="addclients" element={<AddClient />}/>
              <Route path="groups" element={<GroupDashboard />}/>
              <Route path="creategroup" element={<AddGroup />}/>
            </Route>

            {/* Rota manager specific routes */}
            <Route path="rotas/*" element={
              <PrivateRoute>
                <RotaManager setCurrentApplication={setCurrentApplication}/>
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<RotasDashboard />}/>
              <Route path="addrota" element={<AddRota />}/>
              <Route path="addemployee" element={<AddEmployee />}/>
            </Route>

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