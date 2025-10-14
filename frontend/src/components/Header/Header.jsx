import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderLogo from './HeaderLogo';
import LangSwitch from './LangSwitch';
import { Link } from 'react-scroll';
import { useLanguage } from '../../helpers/LanguageContext';

const telegramLink = 'https://t.me/cashandgo';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-960px
  const { language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Навигационные элементы
  const navItems = [
    { to: 'home', label: language === 'ru' ? 'КУРС' : 'HOME' },
    { to: 'calculator', label: language === 'ru' ? 'ПЕРЕСТАНОВКИ' : 'CALCULATOR' },
    { to: 'faq', label: language === 'ru' ? 'FAQ' : 'FAQ' },
    { to: 'contacts', label: language === 'ru' ? 'КОНТАКТЫ' : 'CONTACTS' },
  ];

  // Drawer для мобильного меню
  const drawer = (
    <Box
      sx={{
        width: 250,
        bgcolor: '#FFFFFF',
        height: '100%',
        pt: 4,
        px: 2,
      }}
      onClick={handleDrawerToggle}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              smooth
              duration={500}
              offset={-90}
              sx={{ py: 1 }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: '#333333', // Серый цвет
                  fontSize: '1.1rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={() => openLink(telegramLink)}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#F87000',
                borderRadius: '20px',
                px: 2,
                py: 1,
              }}
            >
              <ListItemText
                primary={language === 'ru' ? 'ОБМЕНЯТЬ ВАЛЮТУ' : 'EXCHANGE MONEY'}
                primaryTypographyProps={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: '#F9F9E5',
                  fontSize: '1rem',
                }}
              />
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        left: 0,
        width: '100%', // Полная ширина экрана
        zIndex: 12000,
        backgroundColor: '#FFFFFF', // Белый фон
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        sx={{
          maxWidth: '1440px',
          mx: 'auto', // Центрирование контента
          width: '100%',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            px: { xs: 1, sm: 2, md: '30px' },
            py: 0,
            minHeight: { xs: '50px', sm: '60px', md: '75px' },
          }}
        >
          {/* Логотип и переключатель языка */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5, md: 2 } }}>
            <HeaderLogo />           
          </Box>

          {/* Навигация для десктопа и планшета */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                gap: { xs: '1.5vw', sm: '2.5vw', md: '3.6vw' },
                flexGrow: 1,
                justifyContent: 'center',
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-90}
                  sx={{
                    color: '#333333', // Серый цвет
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '18px' },
                    textTransform: 'none',
                    '&:hover': {
                      color: '#0033A0', // Синий при ховере
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <LangSwitch/>

          {/* Кнопка бургер-меню для мобильных */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: '#333333' }} // Серый цвет
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Блок обмена валюты для десктопа и планшета */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  backgroundColor: '#F87000',
                  padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
                onClick={() => openLink(telegramLink)}
              >
                <Typography
                  sx={{
                    color: '#F9F9E5',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '0.85rem', sm: '1rem', md: '18px' },
                  }}
                >
                  {language === 'ru' ? 'ОБМЕНЯТЬ ВАЛЮТУ' : 'EXCHANGE MONEY'}
                </Typography>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Box>

      {/* Drawer для мобильного меню */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            borderRadius: '0 0 0 20px',
            bgcolor: '#FFFFFF',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;