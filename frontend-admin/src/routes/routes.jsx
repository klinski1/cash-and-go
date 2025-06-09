import LoginPage from './LoginPage';
import SettingsPage from './SettingsPage';
import Header from './Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('CashAndgoToken');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [token, navigate]);

  if (!isAuthenticated) {
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