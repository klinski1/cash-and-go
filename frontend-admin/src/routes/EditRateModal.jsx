import { Box, Button, Modal, TextField, Typography, Switch, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';

const EditRateModal = ({
  open,
  onClose,
  selectedRate,
  buy,
  setBuy,
  sell,
  setSell,
  buyModifier,
  setBuyModifier,
  sellModifier,
  setSellModifier,
  initialBuyModifier,
  initialSellModifier,
  onSave,
  isMobile,
}) => {
  const [localBuyModifier, setLocalBuyModifier] = useState(buyModifier || '');
  const [localSellModifier, setLocalSellModifier] = useState(sellModifier || '');
  const [editMode, setEditMode] = useState(false); // false = Прямые значения, true = Модификаторы
  const [hasChanges, setHasChanges] = useState(false);
  const [initialBuy, setInitialBuy] = useState(buy);
  const [initialSell, setInitialSell] = useState(sell);
  const [initialModBuy, setInitialModBuy] = useState(buyModifier || '');
  const [initialModSell, setInitialModSell] = useState(sellModifier || '');

  useEffect(() => {
    // Устанавливаем начальные значения при открытии
    if (open) {
      setInitialBuy(buy);
      setInitialSell(sell);
      setInitialModBuy(buyModifier || '');
      setInitialModSell(sellModifier || '');
      setLocalBuyModifier(buyModifier || '');
      setLocalSellModifier(sellModifier || '');
      setHasChanges(false); // Сбрасываем изменения при новом открытии
    }
  }, [open, buy, sell, buyModifier, sellModifier]);

  useEffect(() => {
    // Проверяем изменения при изменении значений
    const buyChanged = buy !== initialBuy;
    const sellChanged = sell !== initialSell;
    const buyModChanged = localBuyModifier !== initialModBuy;
    const sellModChanged = localSellModifier !== initialModSell;
    setHasChanges(editMode ? (buyModChanged || sellModChanged) : (buyChanged || sellChanged));
  }, [buy, sell, localBuyModifier, localSellModifier, editMode, initialBuy, initialSell, initialModBuy, initialModSell]);

  const handleSave = () => {
    setBuyModifier(localBuyModifier);
    setSellModifier(localSellModifier);
    onSave();
  };

  const handleSwitchChange = (e) => {
    if (!hasChanges) {
      setEditMode(e.target.checked);
    }
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
        <FormControlLabel
          control={<Switch checked={editMode} onChange={handleSwitchChange} disabled={hasChanges} />}
          label={editMode ? 'Редактировать модификаторы' : 'Редактировать прямые значения'}
          sx={{ mb: 2 }}
        />
        {editMode ? (
          <>
            <TextField
              fullWidth
              label="Модификатор покупки"
              type="number"
              value={localBuyModifier}
              onChange={(e) => setLocalBuyModifier(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ inputProps: { step: '0.01' } }}
            />
            <TextField
              fullWidth
              label="Модификатор продажи"
              type="number"
              value={localSellModifier}
              onChange={(e) => setLocalSellModifier(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ inputProps: { step: '0.01' } }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} sx={{ color: '#666' }}>
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
            onClick={handleSave}
            disabled={!hasChanges} // Включаем только при наличии изменений
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditRateModal;