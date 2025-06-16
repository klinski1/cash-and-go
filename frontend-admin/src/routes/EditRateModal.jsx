import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const EditRateModal = ({
  open,
  onClose,
  selectedRate,
  buy,
  setBuy,
  sell,
  setSell,
  onSave,
  isMobile,
}) => {
  const [initialBuy, setInitialBuy] = useState('');
  const [initialSell, setInitialSell] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Устанавливаем начальные значения при открытии
    if (open) {
      setInitialBuy(buy || '');
      setInitialSell(sell || '');
      setHasChanges(false); // Сбрасываем изменения при новом открытии
      console.log('Initial values set in modal:', { initialBuy, initialSell });
    }
  }, [open, buy, sell]);

  useEffect(() => {
    // Проверяем изменения только при изменении значений
    const buyChanged = buy !== initialBuy && buy !== '';
    const sellChanged = sell !== initialSell && sell !== '';
    const changes = buyChanged || sellChanged;
    setHasChanges(changes);
    console.log('Checking changes:', { buyChanged, sellChanged, hasChanges: changes });
  }, [buy, sell, initialBuy, initialSell]);

  const handleSave = () => {
    const dataToSave = {
      code: selectedRate?.code,
      buy: parseFloat(buy),
      sell: parseFloat(sell),
    };
    console.log('Saving rates:', dataToSave);
    onSave(dataToSave); // Передаём данные в родительский компонент
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-rate-modal"
      aria-describedby="edit-rate-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : 400,
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="edit-rate-modal" variant="h6" component="h2" sx={{ mb: 2, color: '#333' }}>
          Редактировать курс для {selectedRate?.code}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          После сохранения значений дальнейшее ручное редактирование не потребуется — модификаторы будут
          автоматически рассчитаны на основе этих данных при следующем обновлении.
        </Typography>
        <TextField
          fullWidth
          label="Buy"
          type="number"
          value={buy}
          onChange={(e) => setBuy(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{ inputProps: { step: '0.01' } }}
        />
        <TextField
          fullWidth
          label="Sell"
          type="number"
          value={sell}
          onChange={(e) => setSell(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{ inputProps: { step: '0.01' } }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} sx={{ color: '#666' }}>
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditRateModal;