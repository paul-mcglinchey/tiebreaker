import Home from './components/Home.js';
import Login from './components/Login.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import allActions from './actions';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import axios from 'axios';
import endpoints from './config/endpoints.js';

export default function App() {

  const currentUser = useSelector(state => state.currentUser);

  const dispatch = useDispatch();
  const location = useLocation();

  function PrivateRoute({ children }) {
    return currentUser.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  axios.interceptors.request.use(
    config => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [endpoints.origin];
      const token = localStorage.getItem('token');

      if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  return (
    <div>
      <div>
        {currentUser.loggedIn &&
          <div className="flex justify-between px-3 py-3">
            <span>{currentUser.user.name}</span>
            <button
              onClick={() => dispatch(allActions.userActions.logOut())}
              className="px-2 border-2 border-blue-500 rounded"
            >
              Log Out
            </button>
          </div>
        }
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="login"
          element={
            <Login />
          }
        />
      </Routes>
    </div >
  );
}