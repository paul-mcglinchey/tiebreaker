import {
  Routes,
  Route
} from 'react-router-dom';

import { Login, NotificationContainer, PasswordReset, PasswordResetRequest, Signup, PrivateApp } from './components';

export default function App() {

  return (
    <>
      <NotificationContainer />
      <div className="font-sans subpixel-antialiased">
        <Routes>
          <Route path="/*" element={<PrivateApp />} />

          {/* Unprotected routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="passwordresetrequest" element={<PasswordResetRequest />} />
          <Route path="passwordreset" element={<PasswordReset />} />
        </Routes>
      </div>
    </>
  );
}