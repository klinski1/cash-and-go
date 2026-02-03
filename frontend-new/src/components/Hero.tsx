import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { ArrowRightLeft, Calculator, TrendingUp, Globe } from 'lucide-react';
import MaskGroup from '../imports/MaskGroup';
import { useIsMobile } from './ui/use-mobile';
import cashGoLogo from 'figma:asset/9dc8b90aa5ead1c1e5d6bede53953bc83ea7393d.png';


//import { useLanguage } from './ui/use-language'; // Предполагаемый контекст языка

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
  const language = 'ru'; // Заглушка для языка
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
        const response = await fetch("/api/currencies/get_currencies_data");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        console.log("Полный ответ API:", data);
        const rates = data.result || [];
        setExchangeRates(rates);

        console.log("Установленные курсы:", rates);
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
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ contain: 'paint' }}
    >
      <div className="absolute inset-0 md:hidden pointer-events-none -z-10 overflow-hidden">
        <div className="w-full h-full">
          <div
            className="w-full h-full"
            style={{
              width: '100% !important',
              height: '100% !important',
              transform: 'scale(1.6)',
              transformOrigin: 'top center',
            }}
          >
            <MaskGroup />
          </div>
        </div>
      </div>

      {/* Десктопный фон */}
      <div className="absolute inset-0 hidden md:block -z-10">
        <MaskGroup />
        <div className="absolute inset-0 bg-black/30"></div>
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
                {language === 'ru' ? (
                  <>
                    Быстрый и безопасный обмен валют с выгодными курсами.
                    <span className="block mt-2 sm:mt-0 sm:inline">
                      {' '}
                      Работаем по всему Таиланду и более чем в 15 странах с гарантией и поддержкой 24/7.
                    </span>
                  </>
                ) : (
                  <>
                    Fast and secure currency exchange with great rates.
                    <span className="block mt-2 sm:mt-0 sm:inline">
                      {' '}
                      Operating across Thailand and over 15 countries with 24/7 support.
                    </span>
                  </>
                )}
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
                    <SelectTrigger className="absolute right-1 top-1 h-10 w-25 sm:w-28 border-0 bg-gray-100 rounded-r-md shadow-sm pr-8">
                      <div className="flex items-center gap-2">
                        <img
                          src={`${import.meta.env.BASE_URL}flags/${fromCurrency === 'USDT' ? 'usdt.png' : fromCurrency.toLowerCase() + '.svg'}`}
                          alt={fromCurrency}
                          className="w-6 h-4 rounded-sm object-contain"
                        />
                        <span className="font-medium">{fromCurrency}</span>
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      {currenciesFrom.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <img
                              src={`${import.meta.env.BASE_URL}flags/${currency.code === 'USDT' ? 'usd.svg' : currency.code.toLowerCase() + '.svg'}`}
                              alt={currency.code}
                              className="w-7 h-5 rounded-sm object-contain"
                              onError={(e) => console.log('Ошибка флага:', e.currentTarget.src)}
                            />
                            <span className="font-medium">{currency.code}</span>
                          </div>
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
                    {/* ТРИГГЕР — С ФЛАГОМ И КОДОМ */}
                    <SelectTrigger className="absolute right-1 top-1 h-10 w-25 sm:w-28 border-0 bg-gray-50 rounded-r-md shadow-sm pr-8">
                      <div className="flex items-center gap-2">
                        <img
                          src={`${import.meta.env.BASE_URL}flags/${toCurrency === 'USDT' ? 'usdt.png' : toCurrency.toLowerCase() + '.svg'}`}
                          alt={toCurrency}
                          className="w-6 h-4 rounded-sm object-contain"
                        />
                        <span className="font-medium">{toCurrency}</span>
                      </div>
                    </SelectTrigger>

                    {/* СПИСОК — КРАСИВЫЕ ПУНКТЫ С ФЛАГАМИ */}
                    <SelectContent>
                      {currenciesTo.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <img
                              src={`${import.meta.env.BASE_URL}flags/${currency.code === 'USDT' ? 'usdt.png' : currency.code.toLowerCase() + '.svg'}`}
                              alt={currency.code}
                              className="w-7 h-5 rounded-sm object-contain"
                            />
                            <span className="font-medium">{currency.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Current Rate Display — теперь всегда "1 [отдаёшь] = X [получаешь]" */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-center">
                  <div className="text-xs text-blue-600 font-medium tracking-wide uppercase mb-1">
                    ТЕКУЩИЙ КУРС
                  </div>

                  <div className="text-lg font-bold text-blue-800 text-center">
                    {currentRate !== null ? (
                      <>
                        1 {fromCurrency} ={' '}
                        <span className="text-brand-orange">
                          {currentRate.toFixed(
                            fromCurrency === 'RUB' || toCurrency === 'RUB' ? 4 : 2
                          )}
                        </span>{' '}
                        {toCurrency}
                      </>
                    ) : (
                      '—'
                    )}
                  </div>

                  {/* Результат обмена */}
                  {fromAmount && toAmount && (
                    <div className="text-sm text-green-700 font-medium mt-2 py-1 px-2 bg-green-50 rounded border border-green-200">
                      {fromAmount} {fromCurrency} → {toAmount} {toCurrency}
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
              <ScrollArea className="flex-1 px-6" style={{ maxHeight: '300px' }}>
                <div className="space-y-3 pb-4">
                {exchangeRates.map((rate) => {
                    const change = rate.change || 0;
                    const isPositive = change > 0;
                    const isNegative = change < 0;
                    const absChange = Math.abs(change);

                    // ─── Логика отображения кода валюты ───
                    let displayCode = rate.code;

                    // Если содержит RUB → оставляем только RUB
                    if (rate.code.toUpperCase().includes('RUB')) {
                      displayCode = 'RUB';
                    }
                    // Специальная обработка USDT
                    else if (rate.code.toUpperCase() === 'USDT') {
                        displayCode = 'USDe'; 
                    }

                    const flagSrc = rate.country_code
                      ? `${import.meta.env.BASE_URL}flags/${rate.country_code.toLowerCase()}.svg`
                      : `${import.meta.env.BASE_URL}flags/usd.svg`;

                    return (
                      <div key={rate.code} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">

                        {/* МОБИЛЬНАЯ ВЕРСИЯ */}
                        <div className="block sm:hidden">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={flagSrc}
                                alt={rate.code}
                                className="w-9 h-6 rounded object-cover shadow-sm"
                              />
                              <div className="text-sm font-medium text-gray-900 leading-tight">
                                {displayCode}
                              </div>
                            </div>

                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg font-bold text-sm ${isPositive ? 'bg-green-100 text-green-700' :
                              isNegative ? 'bg-red-100 text-red-700' :
                                'bg-gray-200 text-gray-600'
                              }`}>
                              {change !== 0 ? (
                                <>
                                  {isPositive && (
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                                      <path d="M10 6 L4 14 L16 14 Z" fill="#16a34a" stroke="#16a34a" strokeWidth="2" />
                                    </svg>
                                  )}
                                  {isNegative && (
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                                      <path d="M10 14 L16 6 L4 6 Z" fill="#dc2626" stroke="#dc2626" strokeWidth="2" />
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

                        {/* ДЕСКТОПНАЯ ВЕРСИЯ */}
                        <div className="hidden sm:flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={flagSrc}
                              alt={rate.code}
                              className="w-10 h-7 rounded object-cover shadow-sm"
                            />
                            <div className="text-sm font-medium text-gray-900 leading-tight">
                              {displayCode}
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-right">
                            <div>
                              <div className="text-xs text-gray-600">Buy</div>
                              <div className="font-semibold text-gray-900 text-sm">{rate.buy.toFixed(5)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600">Sell</div>
                              <div className="font-semibold text-gray-900 text-sm">{rate.sell.toFixed(5)}</div>
                            </div>

                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${isPositive ? 'bg-green-100 text-green-700' :
                              isNegative ? 'bg-red-100 text-red-700' :
                                'bg-gray-200 text-gray-600'
                              }`}>
                              {change !== 0 ? (
                                <>
                                  {isPositive && (
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                                      <path d="M10 6 L4 14 L16 14 Z" fill="#16a34a" stroke="#16a34a" strokeWidth="2" />
                                    </svg>
                                  )}
                                  {isNegative && (
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                                      <path d="M10 14 L16 6 L4 6 Z" fill="#dc2626" stroke="#dc2626" strokeWidth="2" />
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
              <div className="flex-grow" />
              <div className="px-6 mt-auto">
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
