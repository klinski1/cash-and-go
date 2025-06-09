// Header.jsx
import { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post('/api/auth/refresh', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newToken = response.data.token; // Предполагаем, что API возвращает новый токен
          localStorage.setItem('token', newToken);
          console.log('Token refreshed:', newToken);
        }
      } catch (err) {
        console.error('Error refreshing token:', err);
        localStorage.removeItem('token'); // Очистка токена при ошибке
        navigate('/admin-panel/login', { replace: true });
      }
    };

    // Немедленный запрос при монтировании
    refreshToken();

    // Периодический запрос каждые 15 минут
    const interval = setInterval(refreshToken, 900000); // 15 минут = 900000 мс
    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [navigate]);

  const handleRefresh = () => {
    window.location.reload(); // Перезагрузка страницы
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-panel/login', { replace: true });
  };

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" color="inherit">
            CG {/* Логотип (замените на изображение или другое название) */}
          </Typography>
        </Box>
        <Button color="inherit" onClick={handleRefresh}>
          Обновить
        </Button>
        <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;