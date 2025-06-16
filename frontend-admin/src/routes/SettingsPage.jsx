import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EditRateModal from './EditRateModal'; // Импортируем новый компонент

export default function SettingsPage() {
  const [rates, setRates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [buy, setBuy] = useState('');
  const [sell, setSell] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Флаг загрузки
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { code } = useParams();
  const decodedCode = decodeURIComponent(code); // Декодируем code из маршрута

  useEffect(() => {
    console.log('Fetching rates...');
    const fetchRates = async () => {
      try {
        const token = localStorage.getItem('CashAndgoToken');
        if (!token) {
          console.warn('No token found, redirecting to login');
          navigate('/login', { replace: true });
          return;
        }
        const response = await axios.get('/api/currencies/get_currencies_data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        if (data.result && Array.isArray(data.result)) {
          setRates(data.result);
          console.log('Rates loaded:', data.result);
          if (decodedCode) {
            const rate = data.result.find((r) => r.code === decodedCode);
            if (rate) {
              console.log('Found rate for modal:', rate);
              setSelectedRate(rate);
              setBuy(rate.buy.toString());
              setSell(rate.sell.toString());
              setOpenModal(true); // Открываем модалку после загрузки
            } else {
              console.warn(`Rate with code ${decodedCode} not found, redirecting to /`);
              navigate('/');
            }
          }
        } else {
          console.error('Unexpected API response format:', data);
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching rates:', err);
        if (err.response && (err.response.status === 401 || err.response.data.includes('html'))) {
          console.log('Detected 401 or HTML response:', err.response.data);
          localStorage.removeItem('CashAndgoToken');
          navigate('/login', { replace: true });
        }
      } finally {
        setIsLoading(false); // Завершение загрузки
      }
    };
    fetchRates();
  }, [navigate, decodedCode]);

  const handleSave = async (data) => {
    if (!selectedRate || !data) return;
    try {
      const token = localStorage.getItem('CashAndgoToken');
      await axios.post(
        '/api/rates/update-price-manually',
        {
          code: selectedRate.code,
          buy: data.buy,
          sell: data.sell,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Data saved:', data);
      const response = await axios.get('/api/currencies/get_currencies_data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRates(response.data.result);
      setOpenModal(false);
    } catch (err) {
      console.error('Error saving data:', err);
      if (err.response && (err.response.status === 401 || err.response.data.includes('html'))) {
        console.log('Detected 401 or HTML response:', err.response.data);
        localStorage.removeItem('CashAndgoToken');
        navigate('/login', { replace: true });
      }
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedRate(null);
    setBuy('');
    setSell('');
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: '#F5F5F5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Курсы
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
            onClick={() => navigate('/edit-rate/new')}
          >
            Добавить курс
          </Button>

          {rates.length === 0 ? (
            <Typography variant="body1" sx={{ color: '#666' }}>
              Нет доступных курсов.
            </Typography>
          ) : isMobile ? (
            <Box>
              {rates.map((rate) => (
                <Box
                  key={rate.code}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    Country: {rate.country_code || 'N/A'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', fontWeight: 'medium', color: '#333' }}>
                    {rate.code} - Buy: {rate.buy}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', fontWeight: 'medium', color: '#333' }}>
                    {rate.code} - Sell: {rate.sell}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                    onClick={() => navigate(`/edit-rate/${rate.code}`)}
                  >
                    Изменить
                  </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <Grid container spacing={3}>
              {rates.map((rate) => (
                <Grid item xs={12} sm={6} md={4} key={rate.code}>
                  <Box
                    sx={{
                      bgcolor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      p: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Country: {rate.country_code || 'N/A'}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', fontWeight: 'medium', color: '#333' }}>
                      {rate.code} - Buy: {rate.buy}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', fontWeight: 'medium', color: '#333' }}>
                      {rate.code} - Sell: {rate.sell}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                      onClick={() => navigate(`/edit-rate/${rate.code}`)}
                    >
                      Изменить
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          <EditRateModal
            open={openModal}
            onClose={handleClose}
            selectedRate={selectedRate}
            buy={buy}
            setBuy={setBuy}
            sell={sell}
            setSell={setSell}
            onSave={handleSave}
            isMobile={isMobile}
          />
        </Box>
      </Container>
    </Box>
  );
}