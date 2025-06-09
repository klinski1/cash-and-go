import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import axios from 'axios';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ login: '', password: '' });
  const navigate = useNavigate();

  // Функция валидации
  const validateForm = () => {
    const newErrors = { login: '', password: '' };
    let isValid = true;

    // Проверка login
    const loginRegex = /^[^\s@]+@[^\s@]+$/;
    if (!login) {
      newErrors.login = 'Login is required';
      isValid = false;
    } else if (!loginRegex.test(login)) {
      newErrors.login = 'Please enter a valid login';
      isValid = false;
    }

    // Проверка пароля
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain letters and numbers';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ login: '', password: '' }); // Сброс ошибок перед валидацией

    if (!validateForm()) {
      return; // Прерываем, если валидация не пройдена
    }

    try {
      const response = await axios.post('/api/auth/sign_in', {
        login,
        password,
      });
      localStorage.setItem('CashAndgoToken', response.data.access_token);
      navigate('/', { replace: true }); // Относительный путь (будет /admin-panel/)
    } catch (err) {
      setErrors({ ...errors, login: 'Invalid credentials', password: '' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            margin="normal"
            required
            error={!!errors.login}
            helperText={errors.login}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!login || !password} // Отключаем кнопку, если поля пустые
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}