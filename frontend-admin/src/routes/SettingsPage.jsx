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
import api from './api'; // Импортируем кастомный axios
import EditRateModal from './EditRateModal'; // Импортируем новый компонент

export default function SettingsPage() {
  const [rates, setRates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [buy, setBuy] = useState('');
  const [sell, setSell] = useState('');
  const [buyModifier, setBuyModifier] = useState('');
  const [sellModifier, setSellModifier] = useState('');
  const [initialBuyModifier, setInitialBuyModifier] = useState('');
  const [initialSellModifier, setInitialSellModifier] = useState('');
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
        const response = await api.get('/currencies/get_currencies_data', {
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
              await fetchModifiers(); // Убеждаемся, что модификаторы загружены
              console.log('Modifiers before modal open:', { buyModifier, sellModifier, initialBuyModifier, initialSellModifier });
              setOpenModal(true); // Открываем модалку после загрузки
            } else {
              console.warn(`Rate with code ${decodedCode} not found, redirecting to /`);
              navigate('/');
            }
          }
        } else {
          console.error('Unexpected API response format:', data);
          setRates([]);
        }
      } catch (err) {
        console.error('Error fetching rates:', err);
        localStorage.removeItem('CashAndgoToken');
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false); // Завершение загрузки
      }
    };
    fetchRates();
  }, [navigate, decodedCode]);

  const fetchModifiers = async () => {
    try {
      const token = localStorage.getItem('CashAndgoToken');
      const response = await api.get(`/rates/modifiers/${decodedCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { buy_modifier, sell_modifier } = response.data;
      setInitialBuyModifier(buy_modifier?.toString() || '0.00'); // Устанавливаем значение по умолчанию
      setBuyModifier(buy_modifier?.toString() || '0.00');
      setInitialSellModifier(sell_modifier?.toString() || '0.00');
      setSellModifier(sell_modifier?.toString() || '0.00');
      console.log('Modifiers fetched:', { buy_modifier, sell_modifier });
    } catch (err) {
      console.error('Error fetching modifiers:', err);
      setInitialBuyModifier('0.00'); // Значение по умолчанию при ошибке
      setBuyModifier('0.00');
      setInitialSellModifier('0.00');
      setSellModifier('0.00');
    }
  };

  const handleSave = async (data) => {
    if (!selectedRate || !data) return;
    try {
      const token = localStorage.getItem('CashAndgoToken');
      if (data.buy !== undefined && data.sell !== undefined) {
        // Сохранение прямых значений
        await api.post(
          `/api/rates/update-rates`,
          {
            code: selectedRate.code,
            buy: data.buy,
            sell: data.sell,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Rates updated:', data);
      } else if (data.buyModifier !== undefined && data.sellModifier !== undefined) {
        // Сохранение модификаторов
        await api.post(
          `/api/rates/modifiers/update-ticker-modifiers`,
          {
            code: selectedRate.code,
            buy_modifier: data.buyModifier,
            sell_modifier: data.sellModifier,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Modifiers updated:', data);
      }
      const response = await api.get('/currencies/get_currencies_data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRates(response.data.result);
      setOpenModal(false);
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedRate(null);
    setBuy('');
    setSell('');
    setBuyModifier(initialBuyModifier);
    setSellModifier(initialSellModifier);
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
            buyModifier={buyModifier}
            setBuyModifier={setBuyModifier}
            sellModifier={sellModifier}
            setSellModifier={setSellModifier}
            initialBuyModifier={initialBuyModifier}
            initialSellModifier={initialSellModifier}
            onSave={handleSave}
            isMobile={isMobile}
          />
        </Box>
      </Container>
    </Box>
  );
}