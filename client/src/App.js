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
import GroupSelector from './components/GroupSelector';

export default function App() {

  const location = useLocation();

  function PrivateRoute({ children }) {
    return Userfront.accessToken() ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" />}
      />
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="addclients"
        element={
          <AddNewClient />
        }
      />
      <Route
        path="groups"
        element={
          <GroupSelector />
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
  );
}