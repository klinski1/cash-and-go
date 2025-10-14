import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Banknote, 
  Building2, 
  CreditCard, 
  MapPin, 
  Clock,
  Shield,
  Lock,
  Bike,
  X
} from 'lucide-react';
import { ATMIcon } from './ATMIcon';

const cashMethods = [
  {
    icon: Building2,
    title: 'Офисы Cash&Go',
    description: 'Получите наличные в наших офисах в удобное время',
    badge: 'с 10:00 до 19:00',
    features: ['Офис на Пхукете', 'Офис в Паттайе (скоро)', 'Удобный график'],
    color: 'text-brand-blue bg-blue-50'
  },
  {
    icon: ATMIcon,
    title: 'Выдача через банкомат',
    description: 'Получите наличные в ATM без банковской карты',
    badge: 'До 10 минут',
    features: ['Дистанционная выдача', 'По всему Таиланду', 'Без комиссии'],
    color: 'text-brand-orange bg-orange-50'
  },
  {
    icon: CreditCard,
    title: 'Перевод на банковский счет',
    description: 'Прямое зачисление на счет получателя',
    badge: 'Моментально',
    features: ['На тайский счет', 'Visa Direct', 'SWIFT / Western Union'],
    color: 'text-green-600 bg-green-50'
  },
  {
    icon: Bike,
    title: 'Курьерская доставка',
    description: 'Доставим наличные по указанному адресу',
    badge: 'За 1 час',
    features: ['Безопасно', 'На дом/отель/офис', 'Проверенные курьеры'],
    color: 'text-purple-600 bg-purple-50'
  }
];

export function CashMethods() {
  const [isOfficeDialogOpen, setIsOfficeDialogOpen] = useState(false);
  const [isATMDialogOpen, setIsATMDialogOpen] = useState(false);
  const [isBankDialogOpen, setIsBankDialogOpen] = useState(false);
  const [isCourierDialogOpen, setIsCourierDialogOpen] = useState(false);
  
  // Desktop dialogs for contact options
  const [isOfficeDesktopDialogOpen, setIsOfficeDesktopDialogOpen] = useState(false);
  const [isATMDesktopDialogOpen, setIsATMDesktopDialogOpen] = useState(false);
  const [isBankDesktopDialogOpen, setIsBankDesktopDialogOpen] = useState(false);
  const [isCourierDesktopDialogOpen, setIsCourierDesktopDialogOpen] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOfficeClick = () => {
    if (isMobile) {
      setIsOfficeDialogOpen(true);
    } else {
      setIsOfficeDesktopDialogOpen(true);
    }
  };

  const handleATMClick = () => {
    if (isMobile) {
      setIsATMDialogOpen(true);
    } else {
      setIsATMDesktopDialogOpen(true);
    }
  };

  const handleBankClick = () => {
    if (isMobile) {
      setIsBankDialogOpen(true);
    } else {
      setIsBankDesktopDialogOpen(true);
    }
  };

  const handleCourierClick = () => {
    if (isMobile) {
      setIsCourierDialogOpen(true);
    } else {
      setIsCourierDesktopDialogOpen(true);
    }
  };

  const handleTelegramContact = () => {
    window.open('https://t.me/cashandgo', '_blank');
    closeAllDialogs();
    setIsOfficeDialogOpen(false);
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/66958763588', '_blank');
    closeAllDialogs();
    setIsOfficeDialogOpen(false);
  };

  const closeAllDialogs = () => {
    setIsATMDialogOpen(false);
    setIsBankDialogOpen(false);
    setIsCourierDialogOpen(false);
    // Close desktop dialogs
    setIsOfficeDesktopDialogOpen(false);
    setIsATMDesktopDialogOpen(false);
    setIsBankDesktopDialogOpen(false);
    setIsCourierDesktopDialogOpen(false);
  };

  return (
    <section id="methods" className="bg-brand-beige pt-16 lg:pt-24 pb-8 lg:pb-12 relative overflow-hidden -mt-[33px] md:mt-0">
      {/* Декоративные пунктирные круги как на референсе Flight Coffee - 4 окружности */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Основной большой пунктирный круг справа */}
        <svg 
          className="absolute -right-64 top-8 w-[800px] h-[800px]"
          viewBox="0 0 800 800"
          fill="none"
        >
          <circle 
            cx="400" 
            cy="400" 
            r="360"
            stroke="#f87000" 
            strokeWidth="3"
            strokeDasharray="12 18"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
          />
        </svg>
        
        {/* 2. Средний круг справа, смещенный */}
        <svg 
          className="absolute -right-32 top-32 w-[500px] h-[500px]"
          viewBox="0 0 500 500"
          fill="none"
        >
          <circle 
            cx="250" 
            cy="250" 
            r="220"
            stroke="#f87000" 
            strokeWidth="2"
            strokeDasharray="8 14"
            strokeLinecap="round"
            fill="none"
            opacity="0.18"
          />
        </svg>
        
        {/* 3. Маленький круг справа внизу */}
        <svg 
          className="absolute -right-16 bottom-20 w-[300px] h-[300px]"
          viewBox="0 0 300 300"
          fill="none"
        >
          <circle 
            cx="150" 
            cy="150" 
            r="130"
            stroke="#f87000" 
            strokeWidth="2"
            strokeDasharray="6 12"
            strokeLinecap="round"
            fill="none"
            opacity="0.15"
          />
        </svg>
        
        {/* 4. Круг слева для баланса композиции */}
        <svg 
          className="absolute -left-40 top-24 w-[400px] h-[400px]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle 
            cx="200" 
            cy="200" 
            r="180"
            stroke="#f87000" 
            strokeWidth="2"
            strokeDasharray="10 16"
            strokeLinecap="round"
            fill="none"
            opacity="0.12"
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'} font-bold mb-6 uppercase text-center`}>
            <span className="text-brand-blue">Способы получения</span> <span className="text-brand-black">наличных бат</span>
          </h2>
          {!isMobile && (
            <>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Выберите наиболее удобный способ получения валюты.
              </p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Все методы безопасны и подтверждены нашей лицензией.
              </p>
            </>
          )}
        </div>

        <div className={`grid gap-4 lg:gap-8 ${isMobile ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {cashMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card key={index} className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white ${isMobile ? 'aspect-square' : ''}`}>
                <CardContent className={`text-center ${isMobile ? 'p-4 h-full flex flex-col justify-center items-center' : 'p-6'}`}>
                  {isMobile ? (
                    // Мобильная версия - компактная с центрированием
                    <div className="flex flex-col items-center justify-center h-full space-y-2">
                      <div className={`w-12 h-12 rounded-full ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className="px-2 py-1 text-xs bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 rounded-full"
                      >
                        {method.badge}
                      </Badge>
                      
                      <h3 className="font-semibold text-brand-black text-base leading-tight text-center">
                        {index === 2 
                          ? method.title.replace('банковский', '').replace('  ', ' ').trim()
                          : method.title
                        }
                      </h3>
                      
                      <Button 
                        onClick={() => {
                          if (index === 0) handleOfficeClick();
                          else if (index === 1) handleATMClick();
                          else if (index === 2) handleBankClick();
                          else if (index === 3) handleCourierClick();
                          else scrollToCalculator();
                        }}
                        variant="outline" 
                        className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors py-2 px-3 text-sm"
                      >
                        Выбрать
                      </Button>
                    </div>
                  ) : (
                    // Десктопная версия - оригинальная
                    <>
                      <div>
                        <div className={`w-16 h-16 rounded-full ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        
                        <div className="mb-4">
                          <Badge 
                            variant="secondary" 
                            className="mb-3 bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
                          >
                            {method.badge}
                          </Badge>
                          <h3 className="font-semibold text-brand-black mb-2 text-xl">
                            {method.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {method.description}
                          </p>
                        </div>

                        {/* Маркеры - показываем только на десктопе */}
                        <div className="space-y-2 mb-6">
                          {method.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                              <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => {
                          if (index === 0) handleOfficeClick();
                          else if (index === 1) handleATMClick();
                          else if (index === 2) handleBankClick();
                          else if (index === 3) handleCourierClick();
                          else scrollToCalculator();
                        }}
                        variant="outline" 
                        className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                      >
                        Выбрать способ
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 mb-0 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-brand-blue" />
            <span>Лицензированный сервис MC225670080</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-brand-blue" />
            <span>Работаем 24/7</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-brand-blue" />
            <span>Защита сделки</span>
          </div>
        </div>
      </div>

      {/* Dialog для мобильной версии офисов */}
      <Dialog open={isOfficeDialogOpen} onOpenChange={setIsOfficeDialogOpen}>
        <DialogContent 
          className="w-[90vw] max-w-md mx-auto p-0 border-none shadow-none overflow-hidden [&>button]:hidden"
          style={{
            backgroundColor: '#F9F9E5',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.12)',
          }}
        >
          {/* Header */}
          <DialogHeader className="relative p-6 pb-4">
            <button
              onClick={() => setIsOfficeDialogOpen(false)}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-brand-orange hover:opacity-75 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
            
            <DialogTitle 
              className="text-brand-blue mb-2 pr-8"
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '1.2'
              }}
            >
              Офисы Cash&Go
            </DialogTitle>
            
            <DialogDescription 
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: isMobile ? '16px' : '14px',
                lineHeight: '1.4',
                color: '#666666'
              }}
            >
              Получите наличные в наших офисах в удобное время
            </DialogDescription>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 pb-6">
            {/* Время работы */}
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-brand-orange mr-2" />
                <Badge 
                  variant="secondary" 
                  className="bg-brand-orange/10 text-brand-orange"
                >
                  с 10:00 до 19:00
                </Badge>
              </div>
            </div>

            {/* Преимущества */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
              <h4 className={`font-semibold text-brand-black mb-3 ${isMobile ? 'text-lg' : ''}`}>Преимущества:</h4>
              <div className="space-y-2">
                {cashMethods[0].features.map((feature, index) => (
                  <div key={index} className={`flex items-center space-x-2 text-gray-600 ${isMobile ? 'text-base' : 'text-sm'}`}>
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            {isMobile ? (
              <div className="space-y-3">
                <button
                  onClick={handleTelegramContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#0088cc',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <span>Оставить заявку в Telegram</span>
                </button>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#25D366',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
                  </svg>
                  <span>Оставить заявку в WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={scrollToCalculator}
                  className="w-full flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-lg"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)',
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#FFFFFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E65F00 0%, #D55400 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)';
                  }}
                >
                  <span>Рассчитать стоимость</span>
                </button>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 transition-colors duration-200"
                  style={{
                    height: '36px',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
                  </svg>
                  <span>Оставить заявку в WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog для банкомата */}
      <Dialog open={isATMDialogOpen} onOpenChange={setIsATMDialogOpen}>
        <DialogContent 
          className="w-[90vw] max-w-md mx-auto p-0 border-none shadow-none overflow-hidden [&>button]:hidden"
          style={{
            backgroundColor: '#F9F9E5',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.12)',
          }}
        >
          <DialogHeader className="relative p-6 pb-4">
            <button
              onClick={() => setIsATMDialogOpen(false)}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-brand-orange hover:opacity-75 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
            
            <DialogTitle 
              className="text-brand-blue mb-2 pr-8"
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '1.2'
              }}
            >
              Выдача через банкомат
            </DialogTitle>
            
            <DialogDescription 
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: isMobile ? '16px' : '14px',
                lineHeight: '1.4',
                color: '#666666'
              }}
            >
              Получите наличные в ATM без банковской карты
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-brand-orange mr-2" />
                <Badge 
                  variant="secondary" 
                  className="bg-brand-orange/10 text-brand-orange"
                >
                  До 10 минут
                </Badge>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
              <h4 className={`font-semibold text-brand-black mb-3 ${isMobile ? 'text-lg' : ''}`}>Преимущества:</h4>
              <div className="space-y-2">
                {cashMethods[1].features.map((feature, index) => (
                  <div key={index} className={`flex items-center space-x-2 text-gray-600 ${isMobile ? 'text-base' : 'text-sm'}`}>
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {isMobile ? (
              <div className="space-y-3">
                <button
                  onClick={handleTelegramContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#0088cc',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <span>Оставить заявку в Telegram</span>
                </button>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#25D366',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
                  </svg>
                  <span>Оставить заявку в WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={scrollToCalculator}
                  className="w-full flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-lg"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)',
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#FFFFFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E65F00 0%, #D55400 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)';
                  }}
                >
                  <span>Рассчитать стоимость</span>
                </button>

                <button
                  onClick={handleTelegramContact}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 transition-colors duration-200"
                  style={{
                    height: '36px',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <span>Оставить заявку в Telegram</span>
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog для банковского перевода */}
      <Dialog open={isBankDialogOpen} onOpenChange={setIsBankDialogOpen}>
        <DialogContent 
          className="w-[90vw] max-w-md mx-auto p-0 border-none shadow-none overflow-hidden [&>button]:hidden"
          style={{
            backgroundColor: '#F9F9E5',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.12)',
          }}
        >
          <DialogHeader className="relative p-6 pb-4">
            <button
              onClick={() => setIsBankDialogOpen(false)}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-brand-orange hover:opacity-75 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
            
            <DialogTitle 
              className="text-brand-blue mb-2 pr-8"
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '1.2'
              }}
            >
              Перевод на банковский счет
            </DialogTitle>
            
            <DialogDescription 
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: isMobile ? '16px' : '14px',
                lineHeight: '1.4',
                color: '#666666'
              }}
            >
              Прямое зачисление на счет получателя
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-brand-orange mr-2" />
                <Badge 
                  variant="secondary" 
                  className="bg-brand-orange/10 text-brand-orange"
                >
                  Моментально
                </Badge>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
              <h4 className={`font-semibold text-brand-black mb-3 ${isMobile ? 'text-lg' : ''}`}>Преимущества:</h4>
              <div className="space-y-2">
                {cashMethods[2].features.map((feature, index) => (
                  <div key={index} className={`flex items-center space-x-2 text-gray-600 ${isMobile ? 'text-base' : 'text-sm'}`}>
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {isMobile ? (
              <div className="space-y-3">
                <button
                  onClick={handleTelegramContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#0088cc',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <span>Оставить заявку в Telegram</span>
                </button>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#25D366',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
                  </svg>
                  <span>Оставить заявку в WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={scrollToCalculator}
                  className="w-full flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-lg"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)',
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#FFFFFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E65F00 0%, #D55400 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)';
                  }}
                >
                  <span>Рассчитать стоимость</span>
                </button>

                <button
                  onClick={handleTelegramContact}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 transition-colors duration-200"
                  style={{
                    height: '36px',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <span>Оставить заявку в Telegram</span>
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog для курьерской доставки */}
      <Dialog open={isCourierDialogOpen} onOpenChange={setIsCourierDialogOpen}>
        <DialogContent 
          className="w-[90vw] max-w-md mx-auto p-0 border-none shadow-none overflow-hidden [&>button]:hidden"
          style={{
            backgroundColor: '#F9F9E5',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.12)',
          }}
        >
          <DialogHeader className="relative p-6 pb-4">
            <button
              onClick={() => setIsCourierDialogOpen(false)}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-brand-orange hover:opacity-75 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
            
            <DialogTitle 
              className="text-brand-blue mb-2 pr-8"
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '1.2'
              }}
            >
              Курьерская доставка
            </DialogTitle>
            
            <DialogDescription 
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: isMobile ? '16px' : '14px',
                lineHeight: '1.4',
                color: '#666666'
              }}
            >
              Доставим наличные по указанному адресу
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-brand-orange mr-2" />
                <Badge 
                  variant="secondary" 
                  className="bg-brand-orange/10 text-brand-orange"
                >
                  За 1 час
                </Badge>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
              <h4 className={`font-semibold text-brand-black mb-3 ${isMobile ? 'text-lg' : ''}`}>Преимущества:</h4>
              <div className="space-y-2">
                {cashMethods[3].features.map((feature, index) => (
                  <div key={index} className={`flex items-center space-x-2 text-gray-600 ${isMobile ? 'text-base' : 'text-sm'}`}>
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {isMobile ? (
              <div className="space-y-3">
                <button
                  onClick={handleTelegramContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#0088cc',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <span>Оставить заявку в Telegram</span>
                </button>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full flex items-center justify-center space-x-2 transition-colors duration-200 hover:opacity-90"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: '#25D366',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
                  </svg>
                  <span>Оставить заявку в WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={scrollToCalculator}
                  className="w-full flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-lg"
                  style={{
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)',
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#FFFFFF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E65F00 0%, #D55400 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #F87000 0%, #E65F00 100%)';
                  }}
                >
                  <span>Рассчитать стоимость</span>
                </button>

                <button
                  onClick={handleTelegramContact}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 transition-colors duration-200"
                  style={{
                    height: '36px',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#FFFFFF'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                  <span>Оставить заявку в Telegram</span>
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Desktop Contact Dialogs - Compact versions */}
      
      {/* Office Desktop Dialog */}
      <Dialog open={isOfficeDesktopDialogOpen} onOpenChange={setIsOfficeDesktopDialogOpen}>
        <DialogContent className="w-[400px] max-w-md mx-auto p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-brand-blue text-lg font-semibold mb-2">
              Офисы Cash&Go
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Свяжитесь с нами для получения наличных в офисе
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            <button
              onClick={handleTelegramContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#0088cc] hover:bg-[#007bb5] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
              <span>Оставить заявку в Telegram</span>
            </button>

            <button
              onClick={handleWhatsAppContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#22c55e] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
              </svg>
              <span>Оставить заявку в WhatsApp</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ATM Desktop Dialog */}
      <Dialog open={isATMDesktopDialogOpen} onOpenChange={setIsATMDesktopDialogOpen}>
        <DialogContent className="w-[400px] max-w-md mx-auto p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-brand-blue text-lg font-semibold mb-2">
              Выдача через банкомат
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Свяжитесь с нами для получения наличных через ATM
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            <button
              onClick={handleTelegramContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#0088cc] hover:bg-[#007bb5] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
              <span>Оставить заявку в Telegram</span>
            </button>

            <button
              onClick={handleWhatsAppContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#22c55e] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
              </svg>
              <span>Оставить заявку в WhatsApp</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Desktop Dialog */}
      <Dialog open={isBankDesktopDialogOpen} onOpenChange={setIsBankDesktopDialogOpen}>
        <DialogContent className="w-[400px] max-w-md mx-auto p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-brand-blue text-lg font-semibold mb-2">
              Перевод на банковский счет
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Свяжитесь с нами для перевода на банковский счет
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            <button
              onClick={handleTelegramContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#0088cc] hover:bg-[#007bb5] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
              <span>Оставить заявку в Telegram</span>
            </button>

            <button
              onClick={handleWhatsAppContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#22c55e] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
              </svg>
              <span>Оставить заявку в WhatsApp</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Courier Desktop Dialog */}
      <Dialog open={isCourierDesktopDialogOpen} onOpenChange={setIsCourierDesktopDialogOpen}>
        <DialogContent className="w-[400px] max-w-md mx-auto p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-brand-blue text-lg font-semibold mb-2">
              Курьерская доставка
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Свяжитесь с нами для доставки наличных курьером
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            <button
              onClick={handleTelegramContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#0088cc] hover:bg-[#007bb5] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
              <span>Оставить заявку в Telegram</span>
            </button>

            <button
              onClick={handleWhatsAppContact}
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#22c55e] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.426"/>
              </svg>
              <span>Оставить заявку в WhatsApp</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}