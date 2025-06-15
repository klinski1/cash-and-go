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
  const [localBuyModifier, setLocalBuyModifier] = useState(buyModifier || initialBuyModifier || '0.00');
  const [localSellModifier, setLocalSellModifier] = useState(sellModifier || initialSellModifier || '0.00');
  const [editMode, setEditMode] = useState(false); // false = Прямые значения, true = Модификаторы
  const [hasChanges, setHasChanges] = useState(false);
  const [initialValues, setInitialValues] = useState({
    buy: '',
    sell: '',
    buyModifier: '',
    sellModifier: '',
  });

  useEffect(() => {
    // Устанавливаем начальные значения при открытии
    if (open) {
      setInitialValues({
        buy: buy || '',
        sell: sell || '',
        buyModifier: buyModifier || initialBuyModifier || '0.00',
        sellModifier: sellModifier || initialSellModifier || '0.00',
      });
      setLocalBuyModifier(buyModifier || initialBuyModifier || '0.00');
      setLocalSellModifier(sellModifier || initialSellModifier || '0.00');
      setHasChanges(false); // Сбрасываем изменения при новом открытии
      console.log('Initial values set in modal:', initialValues, { buyModifier, sellModifier, initialBuyModifier, initialSellModifier });
    }
  }, [open, buy, sell, buyModifier, sellModifier, initialBuyModifier, initialSellModifier]);

  useEffect(() => {
    // Проверяем изменения только при изменении значений
    const buyChanged = buy !== initialValues.buy;
    const sellChanged = sell !== initialValues.sell;
    const buyModChanged = localBuyModifier !== initialValues.buyModifier;
    const sellModChanged = localSellModifier !== initialValues.sellModifier;
    const changes = editMode ? (buyModChanged || sellModChanged) : (buyChanged || sellChanged);
    setHasChanges(changes);
    console.log('Checking changes:', { buyChanged, sellChanged, buyModChanged, sellModChanged, hasChanges: changes });
  }, [buy, sell, localBuyModifier, localSellModifier, editMode, initialValues]);

  const handleSave = () => {
    const dataToSave = {
      code: selectedRate?.code,
    };
    if (editMode) {
      dataToSave.buyModifier = parseFloat(localBuyModifier);
      dataToSave.sellModifier = parseFloat(localSellModifier);
      console.log('Saving modifiers:', dataToSave);
    } else {
      dataToSave.buy = parseFloat(buy);
      dataToSave.sell = parseFloat(sell);
      console.log('Saving rates:', dataToSave);
    }
    setBuyModifier(localBuyModifier);
    setSellModifier(localSellModifier);
    onSave(dataToSave); // Передаём данные в родительский компонент
  };

  const handleSwitchChange = (e) => {
    if (!hasChanges) {
      setEditMode(e.target.checked);
    } else {
      console.warn('Switch blocked due to unsaved changes');
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