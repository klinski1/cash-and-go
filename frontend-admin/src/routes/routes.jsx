import LoginPage from './LoginPage';
import SettingsPage from './SettingsPage';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  if (!token) {
    navigate('/admin-panel/login', { replace: true });
    return null;
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
};

const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit-rate/:code',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;