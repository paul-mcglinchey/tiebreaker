import {
  Routes,
  Route
} from 'react-router-dom';

import { Login, PasswordReset, PasswordResetRequest, Signup, PrivateApp, NotificationContainer } from './components';

export default function App() {

  return (
    <div className="font-sans antialiased">
      <NotificationContainer />
      <Routes>
        <Route path="/*" element={<PrivateApp />} />

        {/* Unprotected routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="passwordresetrequest" element={<PasswordResetRequest />} />
        <Route path="passwordreset" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}