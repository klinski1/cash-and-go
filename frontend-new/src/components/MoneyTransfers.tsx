import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useIsMobile } from './ui/use-mobile';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Clock,
  ArrowRight,
  X,
  ArrowUpDown
} from 'lucide-react';

const highlights = [
  {
    icon: Building2,
    title: 'Любой банк РФ',
    description: 'Принимаем платежи со всех российских банков'
  },
  {
    icon: MapPin,
    title: 'Наличные в крупных городах России',
    description: 'Офисы приема в Москве, СПб и других городах'
  },
  {
    icon: Globe,
    title: '140+ офисов по миру',
    description: 'Глобальная сеть для получения валюты'
  },
  {
    icon: Clock,
    title: 'Быстрая выдача/получение',
    description: 'От 30 минут до получения наличных'
  }
];

const countriesAndCities = {
  'Россия': ['Москва', 'Санкт-Петербург', 'Астрахань', 'Барнаул', 'Благовещенск', 'Владивосток', 'Волгоград', 'Воронеж', 'Екатеринбург', 'Ижевск', 'Иркутск', 'Казань', 'Калининград', 'Кемерово', 'Краснодар', 'Красноярск', 'Нижний Новгород', 'Новосибирск', 'Омск', 'Оренбург', 'Пермь', 'Пятигорск', 'Ростов-на-Дону', 'Самара', 'Саратов', 'Сочи', 'Симферополь', 'Ставрополь', 'Томск', 'Тюмень', 'Уфа', 'Хабаровск', 'Чебоксары', 'Челябинск'],
  'Германия': ['Берлин', 'Дюссельдорф', 'Франкфурт', 'Фрайбург', 'Мюнхен', 'Кельн', 'Аугсбург', 'Дрезден'],
  'Великобритания': ['Лондон', 'Манчестер', 'Ливерпуль', 'Бирмингем'],
  'Испания': ['Барселона', 'Аликанте', 'Марбелья', 'Валенсия', 'Мадрид'],
  'Польша': ['Гданьск', 'Катовице', 'Краков', 'Жешув', 'Лодзь'],
  'Турция': ['Алания', 'Стамбул', 'Мерсин', 'Анталия', 'Бодрум'],
  'Франция': ['Ницца', 'Канны', 'Антиб', 'Париж'],
  'Швейцария': ['Цюрих', 'Женева', 'Лугано'],
  'Словакия': ['Братисава'],
  'Сербия': ['Нови-Сад', 'Белград'],
  'Бельгия': ['Брюссель', 'Антверпен'],
  'Португалия': ['Порту', 'Лиссабон'],
  'Греция': ['Афины', 'Салоники'],
  'Италия': ['Милан', 'Рим'],
  'Венгрия': ['Будапешт'],
  'Ирландия': ['Дублин'],
  'Хорватия': ['Загреб'],
  'Болгария': ['София'],
  'Эстония': ['Таллин'],
  'Кипр': ['Ларнака'],
  'Литва': ['Вильнюс'],
  'Албания': ['Тиран'],
  'Австрия': ['Вена'],
  'Чехия': ['Прага'],
  'Латвия': ['Рига'],
  'Черногория': ['Будва'],
  'Казахстан': ['Астана', 'Алматы'],
  'Грузия': ['Тбилиси', 'Батуми'],
  'Таджикистан': ['Душанбе'],
  'Узбекистан': ['Ташкент'],
  'Киргизстан': ['Бишкек'],
  'Азербайджан': ['Баку'],
  'Армения': ['Ереван'],
  'Беларусь': ['Минск'],
  'Индия': ['Гоа', 'Дели', 'Калькутта', 'Сурат', 'Ахмадабад', 'Мумбаи'],
  'Китай': ['Гуанчжоу', 'Иу'],
  'Южная Корея': ['Сеул'],
  'Таиланд': ['Пхукет', 'Панган'],
  'Япония': ['Токио'],
  'Малайзия': ['Куала-Лумпур'],
  'Филиппины': [],
  'Шри-Ланка': [],
  'Камбоджа': [],
  'Сингапур': [],
  'Вьетнам': [],
  'Гонконг': [],
  'Бали': [],
  'США': ['Нью-Йорк', 'Бостон', 'Майами', 'Вашингтон', 'Чикаго', 'Сан-Франциско', 'Лос-Анджелес'],
  'Доминиканская республика': [],
  'Бразилия': ['Рио-де-Жанейро'],
  'Канада': ['Торонто', 'Ванкувер'],
  'Аргентина': ['Буэнос-Айрес'],
  'Суринам': [],
  'Боливия': [],
  'Эквадор': ['Кито'],
  'Израиль': ['Тель-Авив', 'Хайфа'],
  'Туркменистан': ['Ашхабад'],
  'Египет': ['Каир'],
  'Катар': ['Доха'],
  'ОАЭ': ['Дубай'],
  'Марокко': [],
  'Тунис': []
};

export function MoneyTransfers() {
  const isMobile = useIsMobile();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fromCountry, setFromCountry] = useState<string>('');
  const [fromCity, setFromCity] = useState<string>('');
  const [toCountry, setToCountry] = useState<string>('');
  const [toCity, setToCity] = useState<string>('');

  // Reset cities when country changes
  useEffect(() => {
    if (fromCountry) {
      const cities = countriesAndCities[fromCountry as keyof typeof countriesAndCities] || [];
      if (cities.length === 0) {
        // If no cities, use country name as city
        setFromCity(fromCountry);
      } else {
        setFromCity('');
      }
    } else {
      setFromCity('');
    }
  }, [fromCountry]);

  useEffect(() => {
    if (toCountry) {
      const cities = countriesAndCities[toCountry as keyof typeof countriesAndCities] || [];
      if (cities.length === 0) {
        // If no cities, use country name as city
        setToCity(toCountry);
      } else {
        setToCity('');
      }
    } else {
      setToCity('');
    }
  }, [toCountry]);

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openRouteCalculator = () => {
    setIsPopupOpen(true);
    setFromCountry('');
    setFromCity('');
    setToCountry('');
    setToCity('');
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setFromCountry('');
    setFromCity('');
    setToCountry('');
    setToCity('');
  };

  const handleContactTelegram = () => {
    window.open('https://t.me/cashandgo', '_blank');
  };



  const isFormComplete = fromCountry && fromCity && toCountry && toCity;
  const fromCities = countriesAndCities[fromCountry as keyof typeof countriesAndCities] || [];
  const toCities = countriesAndCities[toCountry as keyof typeof countriesAndCities] || [];

  return (
    <section id="money-shift" className="relative bg-brand-blue overflow-hidden">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white rounded-full"></div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
          <defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
              <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
          <path d="M100,100 Q400,50 700,150" stroke="white" strokeWidth="2" fill="none" opacity="0.2"/>
          <path d="M150,300 Q400,250 650,320" stroke="white" strokeWidth="2" fill="none" opacity="0.2"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-4 lg:pb-12 relative">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-5xl'} font-bold text-white mb-6 leading-tight uppercase text-center`}>
            <span className="text-white">Денежные </span>
            <span className="text-brand-orange">перестановки</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-5xl mx-auto leading-snug lg:leading-relaxed">
            Обменивайте наличные во всех крупных городах России. 
            140+ офисов приема и выдачи наличных по всему миру.
          </p>
        </div>

        {/* Info Grid */}
        <div className={`grid gap-4 lg:gap-8 mb-16 ${isMobile ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 ${isMobile ? 'aspect-square' : ''}`}>
                <CardContent className={`text-center ${isMobile ? 'p-4 h-full flex flex-col justify-center items-center' : 'p-6'}`}>
                  {isMobile ? (
                    // Мобильная версия - компактная квадратная
                    <div className="flex flex-col items-center justify-center h-full space-y-2">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="font-semibold text-white text-sm leading-tight text-center">
                        {item.title}
                      </h3>
                      
                      <p className="text-blue-100 text-xs leading-tight text-center">
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    // Десктопная версия - оригинальная
                    <>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="flex justify-center">
            <Button 
              size="lg"
              onClick={openRouteCalculator}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Выбрать направление
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <div className="mt-8 text-blue-100 text-sm">
            <p>🌍 Доступно в 50+ странах мира • ⚡ Обработка за 15 минут • 🔒 100% безопасность</p>
          </div>
        </div>

        {/* World map visualization (simplified) */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="relative w-96 h-48">
              {/* Simplified world map dots */}
              <div className="absolute top-16 left-20 w-3 h-3 bg-brand-orange rounded-full animate-pulse"></div>
              <div className="absolute top-20 left-32 w-3 h-3 bg-brand-orange rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-12 left-48 w-3 h-3 bg-brand-orange rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-24 left-60 w-3 h-3 bg-brand-orange rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-32 left-72 w-3 h-3 bg-brand-orange rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Calculator Popup */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent 
          className="w-[720px] h-[650px] p-0 border-none shadow-none overflow-hidden [&>button]:hidden"
          style={{
            backgroundColor: '#F9F9E5',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.12)',
          }}
        >
          {/* Header */}
          <div className="relative p-6 pb-4">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-brand-orange hover:opacity-75 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
            
            <DialogTitle 
              className="text-brand-blue mb-2"
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '1.2'
              }}
            >
              Укажите направление перевода
            </DialogTitle>
            
            <p 
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.4',
                color: '#666666'
              }}
            >
              Выберите страну и город отправки и получения
            </p>
            
            <DialogDescription className="sr-only">
              Калькулятор маршрута денежного перевода
            </DialogDescription>
          </div>

          {/* Route Selection Form */}
          <div className="px-6 flex-1">
            <div className="space-y-3">
              {/* From Field */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-brand-orange rounded-full mr-2"></div>
                  <label 
                    className="text-brand-blue"
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    Откуда
                  </label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Select value={fromCountry} onValueChange={setFromCountry}>
                    <SelectTrigger className="h-10 bg-gray-50 border-gray-200 text-sm">
                      <SelectValue placeholder="Выберите стран" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {Object.keys(countriesAndCities).map((country) => (
                        <SelectItem key={country} value={country} className="cursor-pointer hover:bg-[#FFFDF7]">
                          <span 
                            style={{
                              fontFamily: 'Inter',
                              fontWeight: 700,
                              fontStyle: 'italic',
                              color: '#004DB4'
                            }}
                          >
                            {country}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={fromCity} onValueChange={setFromCity} disabled={!fromCountry}>
                    <SelectTrigger className="h-10 bg-gray-50 border-gray-200 text-sm">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {fromCities.length > 0 ? (
                        fromCities.map((city) => (
                          <SelectItem key={city} value={city} className="cursor-pointer hover:bg-[#FFFDF7]">
                            <span 
                              style={{
                                fontFamily: 'Inter',
                                fontWeight: 400,
                                color: '#333333'
                              }}
                            >
                              {city}
                            </span>
                          </SelectItem>
                        ))
                      ) : fromCountry ? (
                        <SelectItem value={fromCountry} className="cursor-pointer hover:bg-[#FFFDF7]">
                          <span 
                            style={{
                              fontFamily: 'Inter',
                              fontWeight: 400,
                              color: '#333333'
                            }}
                          >
                            {fromCountry}
                          </span>
                        </SelectItem>
                      ) : null}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-8 h-8 bg-brand-orange rounded-full">
                  <ArrowUpDown className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* To Field */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <label 
                    className="text-brand-blue"
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    Куда
                  </label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Select value={toCountry} onValueChange={setToCountry}>
                    <SelectTrigger className="h-10 bg-gray-50 border-gray-200 text-sm">
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {Object.keys(countriesAndCities).map((country) => (
                        <SelectItem key={country} value={country} className="cursor-pointer hover:bg-[#FFFDF7]">
                          <span 
                            style={{
                              fontFamily: 'Inter',
                              fontWeight: 700,
                              fontStyle: 'italic',
                              color: '#004DB4'
                            }}
                          >
                            {country}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={toCity} onValueChange={setToCity} disabled={!toCountry}>
                    <SelectTrigger className="h-10 bg-gray-50 border-gray-200 text-sm">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {toCities.length > 0 ? (
                        toCities.map((city) => (
                          <SelectItem key={city} value={city} className="cursor-pointer hover:bg-[#FFFDF7]">
                            <span 
                              style={{
                                fontFamily: 'Inter',
                                fontWeight: 400,
                                color: '#333333'
                              }}
                            >
                              {city}
                            </span>
                          </SelectItem>
                        ))
                      ) : toCountry ? (
                        <SelectItem value={toCountry} className="cursor-pointer hover:bg-[#FFFDF7]">
                          <span 
                            style={{
                              fontFamily: 'Inter',
                              fontWeight: 400,
                              color: '#333333'
                            }}
                          >
                            {toCountry}
                          </span>
                        </SelectItem>
                      ) : null}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="px-6 pb-4">
            {/* Action Block */}
            {isFormComplete && (
              <div className="space-y-3">
                {/* Compact Info & CTA */}
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center mr-2">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <h3 
                        className="text-brand-blue"
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: 700,
                          fontSize: '16px'
                        }}
                      >
                        Готово! Оставьте заявку для консультации
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      Проконсультируем по курсу и оформим перестановку
                    </p>

                    <div className="bg-blue-50 rounded p-2">
                      <p className="text-xs text-brand-blue flex items-center justify-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Обычно отвечаем в течение 5 минут
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="space-y-1.5">
                  <button
                    onClick={handleContactTelegram}
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                    </svg>
                    <span>Оставить заявку в мессенджере</span>
                  </button>

                  <button
                    onClick={() => window.open('https://wa.me/66958763588', '_blank')}
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
                    <span>Альтернативно в WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}