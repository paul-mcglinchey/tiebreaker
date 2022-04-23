import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { Login, NotificationContainer, PasswordReset, PasswordResetRequest, Signup, PrivateApp, Authenticate } from './components';
import { useAuth } from './hooks';
import { IAuth } from './models';

export default function App() {

  return (
    <>
      <NotificationContainer />
      <div className="font-sans subpixel-antialiased">
        <Routes>
          <Route path="/*" element={
            <Authenticate
              authenticateOutput={useAuth()}
              render={({ getAccess, isLoading }: IAuth) => (
                <>
                  {!isLoading && (
                    getAccess() ? (
                      <PrivateApp />
                    ) : (
                      <Navigate to="/login" />
                    )
                  )}
                </>
              )}
            />
          } />

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