import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { ArrowRightLeft, Calculator, TrendingUp, Globe } from 'lucide-react';
import MaskGroup from '../imports/MaskGroup';
import MobileBackgroundMaskGroup from '../imports/MaskGroup-139-19';
import { useIsMobile } from './ui/use-mobile';
import cashGoLogo from 'figma:asset/9dc8b90aa5ead1c1e5d6bede53953bc83ea7393d.png';
//import { useLanguage } from './ui/use-language'; // Предполагаемый контекст языка

const codeMapping = {
  RUB: ['RUB(online transfer)', 'RUB(cash settlement)'],
  USD: ['USD'],
  EUR: ['EUR'],
  THB: ['THB'],
  JPY: ['JPY'],
  USDT: ['USDT'],
};

const currenciesFrom = [
  { code: 'RUB', name: 'Российский рубль', flag: '🇷🇺' },
  { code: 'USD', name: 'Доллар США', flag: '🇺🇸' },
  { code: 'EUR', name: 'Евро', flag: '🇪🇺' },
  { code: 'THB', name: 'Тайский бат', flag: '🇹🇭' },
  { code: 'USDT', name: 'Tether USD', flag: '💰' },
];

const currenciesTo = [
  { code: 'THB', name: 'Тайский бат', flag: '🇹🇭' },
  { code: 'RUB', name: 'Российский рубль', flag: '🇷🇺' },
  { code: 'USD', name: 'Доллар США', flag: '🇺🇸' },
  { code: 'EUR', name: 'Евро', flag: '🇪🇺' },
  { code: 'USDT', name: 'Tether USD', flag: '💰' },
];


export function Hero() {
  const isMobile = useIsMobile();
  //const { language } = useLanguage();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('THB');
  const [exchangeRates, setExchangeRates] = useState([]);
  const  language  = 'ru'; // Заглушка для языка
 // Маппинг кодов для соответствия с API
const getCurrencyRate = (code) => {
  let searchCode = code;
  if (code === 'RUB') {
    if (language === 'ru') {
      searchCode = 'RUB(online transfer)';
      //searchCode = 'RUB(онлайн перевод)';
    } else {
      searchCode = 'RUB(online transfer)';
    }
  }
  return exchangeRates.find((c) => c.code === searchCode) || exchangeRates.find((c) => c.code === code);
};

const currencies = [
  { code: 'RUB', flag: 'https://flagicons.lipis.dev/flags/4x3/ru.svg' },
  { code: 'USD', flag: 'https://flagicons.lipis.dev/flags/4x3/us.svg' },
  { code: 'EUR', flag: 'https://flagicons.lipis.dev/flags/4x3/eu.svg' },
  { code: 'USDT', flag: '/images/usdt.jpg' },
  { code: 'THB', flag: 'https://flagicons.lipis.dev/flags/4x3/th.svg' },
];

// Обработчик конвертации
const handleConvert = (value, fromCurrency, toCurrency) => {
  setFromAmount(value);

  if (!value) {
    setToAmount('');
    return;
  }

  if (fromCurrency === toCurrency) {
    setToAmount(value);
    return;
  }

  if (fromCurrency === 'USDT' && toCurrency === 'USD') {
    const result = parseFloat(value) * 1.019;
    setToAmount(result.toFixed(2));
    return;
  }
  if (fromCurrency === 'USD' && toCurrency === 'USDT') {
    const result = parseFloat(value) * 0.981;
    setToAmount(result.toFixed(2));
    return;
  }

  const currentRate = getCurrentRateValue();

  if (toCurrency === 'RUB') {
    const result = parseFloat(value) * currentRate;
    setToAmount(result.toFixed(2));
    return;
  }

  if (toCurrency === 'THB' && fromCurrency !== 'THB') {
    const sourceRate = getCurrencyRate(fromCurrency);
    if (!sourceRate) {
      setToAmount('');
      return;
    }
    let result = parseFloat(value) * sourceRate.buy;
    if (fromCurrency === 'RUB') {
      result = parseFloat(value) / sourceRate.buy;
    }
    setToAmount(result.toFixed(2));
    return;
  }

  if (fromCurrency === 'THB' && toCurrency !== 'THB') {
    const targetRate = getCurrencyRate(toCurrency);
    if (!targetRate) {
      setToAmount('');
      return;
    }
    let result;
    if (toCurrency === 'RUB') {
      result = parseFloat(value) * targetRate.sell;
    } else {
      result = parseFloat(value) * (1 / targetRate.sell);
    }
    setToAmount(result.toFixed(2));
    return;
  }

  const fromRate = getCurrencyRate(fromCurrency);
  const toRate = getCurrencyRate(toCurrency);
  if (!fromRate || !toRate) {
    setToAmount('');
    return;
  }
  let valueInTHB = parseFloat(value) * fromRate.buy;
  if (fromCurrency === 'RUB') {
    valueInTHB = parseFloat(value) / fromRate.buy;
  }
  let result = valueInTHB / toRate.sell;
  setToAmount(result.toFixed(2));
};

// Получение текущего курса
const getCurrentRateValue = () => {
  if (fromCurrency === toCurrency) return 1;

  if (fromCurrency === 'USD' && toCurrency === 'USDT') {
    return 0.981;
  }
  if (fromCurrency === 'USDT' && toCurrency === 'USD') {
    return 1.019;
  }

  if (fromCurrency === 'THB' && toCurrency !== 'THB') {
    const targetRate = getCurrencyRate(toCurrency);
    if (!targetRate) return null;
    if (toCurrency === 'RUB') {
      return targetRate.sell;
    }
    return 1 / targetRate.sell;
  }

  if (toCurrency === 'THB' && fromCurrency !== 'THB') {
    const sourceRate = getCurrencyRate(fromCurrency);
    if (!sourceRate) return null;
    if (fromCurrency === 'RUB') {
      return sourceRate.buy;
    }
    return sourceRate.buy;
  }

  const fromRate = getCurrencyRate(fromCurrency);
  const toRate = getCurrencyRate(toCurrency);
  if (!fromRate || !toRate) return null;

  let valueInTHB;
  if (fromCurrency === 'RUB') {
    valueInTHB = 1 / fromRate.buy;
  } else {
    valueInTHB = fromRate.buy;
  }

  let finalRate;
  if (toCurrency === 'RUB') {
    finalRate = valueInTHB * toRate.sell;
  } else {
    finalRate = valueInTHB / toRate.sell;
  }

  return finalRate;
};

const currentRate = getCurrentRateValue();

// Переключение валют
const handleSwitchCurrencies = () => {
  setFromCurrency(toCurrency);
  setToCurrency(fromCurrency);
  const oldAmount = fromAmount;
  handleConvert(oldAmount, toCurrency, fromCurrency);
};

useEffect(() => {
  const fetchCurrencyRates = async () => {
    try {
      const data = {
        "is_error": false,
        "result": [
          { "code": "RUB(online transfer)", "buy": 2.7061, "sell": 2.4442, "change": +11 },
          { "code": "RUB(cash settlement)", "buy": 2.9962, "sell": 2.3779, "change": -8 },
          { "code": "USD",                "buy": 32.1505, "sell": 32.8026, "change": +5 },
          { "code": "EUR",                "buy": 37.3179, "sell": 38.0663, "change": -12 },
          { "code": "USDT",               "buy": 31.5212, "sell": 33.6389, "change": +23 },
          { "code": "THB",                "buy": 1.0000,  "sell": 1.0000,  "change": 0 }
        ],
        "updated": "2025-10-13 15:42:39.472245+07:00"
      };
      setExchangeRates(data.result || []);
    } catch (error) {
      console.error('Error fetching currency rates:', error);
    }
  };
  fetchCurrencyRates();
}, []);



  const scrollToMethods = () => {
    const element = document.getElementById('methods');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openTelegram = () => {
    window.open('https://t.me/cashandgo', '_blank');
  };

  return (
    <section id="hero" className="relative overflow-x-hidden min-h-[calc(100vh+5rem)] md:min-h-0">
      <div className="absolute inset-0 md:hidden overflow-hidden">
  <div className="min-h-[calc(100vh+5rem)] w-full">
  <div className="absolute inset-0 scale-[1.6] origin-top">
  <MobileBackgroundMaskGroup />
</div>
  </div>
</div>

      <div className="absolute inset-0 hidden md:block">
        <MaskGroup />
        <div className="absolute inset-0 bg-black/30"></div> {/* Темный оверлей для читаемости текста */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-16 md:pb-6 relative z-10 min-h-[calc(100vh+5rem)] md:min-h-0 flex flex-col justify-center">
        <div className="text-center mb-8">
          {isMobile ? (
            <>
              <div className="flex flex-col items-center mb-4">
                <img 
                  src={cashGoLogo} 
                  alt="Cash&Go" 
                  className="h-28 w-auto my-2 -mt-6 sm:mt-2"
                />
                <h1 className="text-2xl font-bold text-white tracking-wide sm:tracking-tight leading-tight drop-shadow-lg -mt-4 sm:mt-0">
                  {language === 'ru' ? 'ЛИЦЕНЗИРОВАННЫЙ СЕРВИС ОБМЕНА ВАЛЮТ' : 'LICENSED CURRENCY EXCHANGE SERVICE'}
                </h1>
              </div>
              <div className="max-w-sm mx-auto mt-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-brand-blue/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center space-x-1.5 shadow-sm">
                    <Globe className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-medium text-white">{language === 'ru' ? 'Таиланд и 15+ стран' : 'Thailand +15 countries'}</span>
                  </div>
                  <div className="bg-brand-orange/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center space-x-1.5 shadow-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-medium text-white">{language === 'ru' ? 'лучшие курсы' : 'best rates'}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                {language === 'ru' ? 'МЕЖДУНАРОДНЫЙ ЛИЦЕНЗИРОВАННЫЙ СЕРВИС ОБМЕНА ВАЛЮТ' : 'INTERNATIONAL LICENSED CURRENCY EXCHANGE SERVICE'}
              </h1>
              <div className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed drop-shadow-md text-center">
                {language === 'ru' ? 'Быстрый и безопасный обмен валют с выгодными курсами.' : 'Fast and secure currency exchange with great rates.'}<br />
                <span className="whitespace-nowrap">{language === 'ru' ? 'Работаем по всему Таиланду и более чем в 15 странах с гарантией и поддержкой 24/7.' : 'Operating across Thailand and over 15 countries with 24/7 support.'}</span>
              </div>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl lg:max-w-none lg:mx-8 xl:mx-16 mx-auto mb-0">
        <Card id="calculator" className="shadow-xl border-0 backdrop-blur-sm bg-white/95 h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-brand-blue text-lg">
            <Calculator className="w-5 h-5" />
            <span>Калькулятор обмена</span>
          </CardTitle>
        </CardHeader>
  <CardContent className="space-y-3 flex-1 flex flex-col">
    {/* From Currency */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Отдаете</label>
      <div className="relative">
        <Input
          type="number"
          placeholder="0.00"
          value={fromAmount}
          onChange={(e) => handleConvert(e.target.value, fromCurrency, toCurrency)}
          className="h-12 pr-24 text-base"
        />
        <Select value={fromCurrency} onValueChange={setFromCurrency}>
        <SelectTrigger className="absolute right-1 top-1 h-10 w-25 sm:w-28 border-0 bg-gray-100 rounded-r-md shadow-sm">
          <SelectValue />
        </SelectTrigger>
          <SelectContent>
            {currenciesFrom.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <span className="flex items-center space-x-2">
                  <span>{currency.flag}</span>
                  <span>{currency.code}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Swap Button */}
    <div className="flex justify-center">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full w-10 h-10 p-0 border-2 hover:bg-gray-50"
        onClick={handleSwitchCurrencies}
      >
        <ArrowRightLeft className="w-4 h-4 rotate-90" />
      </Button>
    </div>

    {/* To Currency */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Получаете</label>
      <div className="relative">
        <Input
          type="number"
          placeholder="0.00"
          value={toAmount}
          readOnly
          className="h-12 pr-24 bg-gray-50 text-base"
        />
        <Select value={toCurrency} onValueChange={setToCurrency}>
        <SelectTrigger className="absolute right-1 top-1 h-10 w-25 sm:w-28 border-0 bg-gray-50 rounded-r-md shadow-sm">
          <SelectValue />
        </SelectTrigger>
          <SelectContent>
            {currenciesTo.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <span className="flex items-center space-x-2">
                  <span>{currency.flag}</span>
                  <span>{currency.code}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Current Rate Display */}
    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
      <div className="text-center">
        <div className="text-xs text-blue-600 font-medium tracking-wide uppercase mb-1">
          ТЕКУЩИЙ КУРС
        </div>
        <div className="text-lg font-bold text-blue-800">
          {fromCurrency === 'RUB' && toCurrency === 'THB' ? (
            `1 THB = ${(1 / currentRate).toFixed(4)} RUB`
          ) : (
            `1 ${fromCurrency} = ${currentRate ? currentRate.toFixed(fromCurrency === 'RUB' || fromCurrency === 'THB' ? 4 : 2) : '0'} ${toCurrency}`
          )}
        </div>
        {fromAmount && toAmount && (
          <div className="text-sm text-green-700 font-medium mt-2 py-1 px-2 bg-green-50 rounded border border-green-200">
            {fromAmount} {fromCurrency} = {toAmount} {toCurrency}
          </div>
        )}
        <div className="text-xs text-blue-600 mt-1">
          Обновлено: {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex space-x-3 pt-2">
      <Button 
        onClick={scrollToMethods}
        className="flex-1 bg-brand-blue hover:bg-brand-blue/90 h-11 font-medium"
      >
        Способы получения
      </Button>
      <Button 
        onClick={openTelegram}
        className="flex-1 bg-brand-orange hover:bg-brand-orange/90 h-11 font-medium"
      >
        Обменять сейчас
      </Button>
    </div>
  </CardContent>
</Card>
          <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-brand-blue text-lg">
                <TrendingUp className="w-5 h-5" />
                <span>{language === 'ru' ? 'Актуальные курсы' : 'Current rates'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
            <ScrollArea className="flex-1 px-6" style={{ maxHeight: '280px' }}>
              <div className="space-y-3 pb-4">
                {exchangeRates.map((rate, index) => {
                  const change = rate.change || 0;
                  const isPositive = change > 0;
                  const isNegative = change < 0;
                  const absChange = Math.abs(change);

                  return (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      
                      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
                      <div className="block sm:hidden">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-base">
                              {currenciesFrom.find(c => c.code === rate.code)?.flag || 'Currency'}
                            </span>
                            <div className="text-sm font-medium text-gray-900">
                              {rate.code}
                            </div>
                          </div>

                          {/* Треугольник + число — мобилка */}
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg font-bold text-sm ${
                            isPositive ? 'bg-green-100 text-green-700' : 
                            isNegative ? 'bg-red-100 text-red-700' : 
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {change !== 0 ? (
                              <>
                                {isPositive && (
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 6 L4 14 L16 14 Z" fill="#16a34a" stroke="#16a34a" strokeWidth="2"/>
                                  </svg>
                                )}
                                {isNegative && (
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 14 L16 6 L4 6 Z" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                                  </svg>
                                )}
                                <span>{isNegative ? '' : '+'}{absChange}</span>
                              </>
                            ) : (
                              <span>—</span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <div className="text-center flex-1">
                            <div className="text-xs text-gray-600 mb-1">Покупка</div>
                            <div className="font-semibold text-gray-900">{rate.buy.toFixed(5)}</div>
                          </div>
                          <div className="w-px bg-gray-300 mx-3"></div>
                          <div className="text-center flex-1">
                            <div className="text-xs text-gray-600 mb-1">Продажа</div>
                            <div className="font-semibold text-gray-900">{rate.sell.toFixed(5)}</div>
                          </div>
                        </div>
                      </div>

                      {/* ДЕСКТОПНАЯ ВЕРСИЯ — та, что у тебя уже работает идеально */}
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">
                            {currenciesFrom.find(c => c.code === rate.code)?.flag || 'Currency'}
                          </span>
                          <div className="text-sm font-medium text-gray-900">
                            {rate.code}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-right">
                          <div>
                            <div className="text-xs text-gray-600">Buy</div>
                            <div className="font-semibold text-gray-900 text-sm">{rate.buy.toFixed(5)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Sell</div>
                            <div className="font-semibold text-gray-900 text-sm">{rate.sell.toFixed(5)}</div>
                          </div>

                          {/* Вот этот блок у тебя уже работает — оставляем как есть */}
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${
                            isPositive ? 'bg-green-100 text-green-700' : 
                            isNegative ? 'bg-red-100 text-red-700' : 
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {change !== 0 ? (
                              <>
                                {isPositive && (
                                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 6 L4 14 L16 14 Z" fill="#16a34a" stroke="#16a34a" strokeWidth="2"/>
                                  </svg>
                                )}
                                {isNegative && (
                                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 14 L16 6 L4 6 Z" fill="#dc2626" stroke="#dc2626" strokeWidth="2"/>
                                  </svg>
                                )}
                                <span>{isNegative ? '' : '+'}{absChange}</span>
                              </>
                            ) : (
                              <span>—</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
              
              <div className="px-6 pb-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <strong>{language === 'ru' ? 'Обновлено:' : 'Updated:'}</strong> {new Date().toLocaleTimeString('ru-RU')} BKK
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {language === 'ru' ? 'Курсы обновляются каждые 30 секунд' : 'Rates update every 30 seconds'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Hero;