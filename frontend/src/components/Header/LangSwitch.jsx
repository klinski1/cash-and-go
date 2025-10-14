import { useState } from 'react';
import { Box, Typography, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useLanguage } from '../../helpers/LanguageContext';

const LangSwitch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-960px
  const { language, changeLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleToggle = (event) => {
    console.log('Toggling menu, anchorEl:', event.currentTarget); // Отладка
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log('Closing menu'); // Отладка
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang.toLowerCase());
    handleClose(); // Закрываем меню при выборе языка
  };

  // Определяем отображаемый текст языка на основе текущего значения
  const displayLanguage = {
    ru: 'RU',
    us: 'US',
    th: 'TH',
  }[language] || 'RU'; // По умолчанию RU, если язык неизвестен

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        pl: { xs: 1, sm: 1.5, md: 2 },
        zIndex: 15000, // Экстремально высокий z-index
        m: '1rem', // Сохранен твой отступ
        position: 'relative', // Новый stacking context
      }}
      onClick={handleToggle}
    >
      <Typography
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 400,
          fontSize: { xs: '12px', sm: '14px', md: '16px' },
          color: '#333333',
          mr: 0.5,
        }}
      >
        {displayLanguage}
      </Typography>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: '#333333' }}
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
      </svg>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose} // Закрытие при клике вне
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        BackdropProps={{
          sx: {
            zIndex: 14999, // Чуть ниже LangSwitch
          },
        }}
        PaperProps={{
          sx: {
            mt: 1.5, // Увеличен отступ для избежания наложения
            bgcolor: '#FFFFFF',
            border: '1px solid #DDD',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            minWidth: '75px',
            zIndex: 15000, // Соответствует z-index контейнера
          },
        }}
      >
        <MenuItem
          onClick={() => handleChangeLanguage('ru')}
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: language === 'ru' ? 700 : 400,
            fontSize: { xs: '14px', sm: '16px' },
            color: language === 'ru' ? '#0033A0' : '#333333',
            px: 2,
            py: 1,
            '&:hover': {
              bgcolor: '#F0F0F0',
            },
          }}
        >
          RU
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeLanguage('us')}
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: language === 'us' ? 700 : 400,
            fontSize: { xs: '14px', sm: '16px' },
            color: language === 'us' ? '#0033A0' : '#333333',
            px: 2,
            py: 1,
            '&:hover': {
              bgcolor: '#F0F0F0',
            },
          }}
        >
          US
        </MenuItem>
        <MenuItem
          onClick={() => handleChangeLanguage('th')}
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: language === 'th' ? 700 : 400,
            fontSize: { xs: '14px', sm: '16px' },
            color: language === 'th' ? '#0033A0' : '#333333',
            px: 2,
            py: 1,
            '&:hover': {
              bgcolor: '#F0F0F0',
            },
          }}
        >
          TH
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LangSwitch;