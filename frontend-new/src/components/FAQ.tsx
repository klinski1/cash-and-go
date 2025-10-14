import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface FAQ {
  question: string;
  answer: string | null;
  isMap?: boolean;
}

import worldMapImage from 'figma:asset/a54efe133df2df95ef11d3745dc9de333cdf0cfc.png';

// Компонент карты мира с офисами Cash&Go
function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Страны присутствия с их регионами
  const countries = [
    // Европа
    { name: 'Россия', region: 'Европа', color: 'primary' },
    { name: 'Беларусь', region: 'Европа', color: 'primary' },
    { name: 'Германия', region: 'Европа', color: 'accent' },
    { name: 'Франция', region: 'Европа', color: 'accent' },
    { name: 'Италия', region: 'Европа', color: 'accent' },
    { name: 'Испания', region: 'Европа', color: 'accent' },
    { name: 'Великобритания', region: 'Европа', color: 'accent' },
    { name: 'Нидерланды', region: 'Европа', color: 'accent' },
    { name: 'Бельгия', region: 'Европа', color: 'accent' },
    { name: 'Швейцария', region: 'Европа', color: 'accent' },
    { name: 'Австрия', region: 'Европа', color: 'accent' },
    { name: 'Чехия', region: 'Европа', color: 'accent' },
    { name: 'Польша', region: 'Европа', color: 'accent' },
    { name: 'Греция', region: 'Европа', color: 'accent' },
    { name: 'Португалия', region: 'Европа', color: 'accent' },
    { name: 'Ирландия', region: 'Европа', color: 'accent' },
    { name: 'Болгария', region: 'Европа', color: 'accent' },
    { name: 'Румыния', region: 'Европа', color: 'accent' },
    { name: 'Сербия', region: 'Европа', color: 'accent' },
    { name: 'Хорватия', region: 'Европа', color: 'accent' },
    
    // Азия
    { name: 'Казахстан', region: 'Азия', color: 'primary' },
    { name: 'Узбекистан', region: 'Азия', color: 'primary' },
    { name: 'Киргизия', region: 'Азия', color: 'primary' },
    { name: 'Таджикистан', region: 'Азия', color: 'primary' },
    { name: 'Туркменистан', region: 'Азия', color: 'primary' },
    { name: 'Армения', region: 'Азия', color: 'primary' },
    { name: 'Азербайджан', region: 'Азия', color: 'primary' },
    { name: 'Грузия', region: 'Азия', color: 'primary' },
    { name: 'Турция', region: 'Азия', color: 'accent' },
    { name: 'Таиланд', region: 'Азия', color: 'accent' },
    { name: 'Вьетнам', region: 'Азия', color: 'accent' },
    { name: 'Сингапур', region: 'Азия', color: 'accent' },
    { name: 'Южная Корея', region: 'Азия', color: 'accent' },
    { name: 'Япония', region: 'Азия', color: 'accent' },
    { name: 'Китай', region: 'Азия', color: 'accent' },
    { name: 'Индия', region: 'Азия', color: 'accent' },
    { name: 'ОАЭ', region: 'Азия', color: 'accent' },
    
    // Америка
    { name: 'США', region: 'Америка', color: 'accent' },
    { name: 'Канада', region: 'Америка', color: 'accent' },
    { name: 'Бразилия', region: 'Америка', color: 'accent' },
    { name: 'Аргентина', region: 'Америка', color: 'accent' },
    { name: 'Мексика', region: 'Америка', color: 'accent' },
    
    // Африка
    { name: 'Египет', region: 'Африка', color: 'accent' },
    { name: 'Марокко', region: 'Африка', color: 'accent' },
    { name: 'Тунис', region: 'Африка', color: 'accent' },
    { name: 'ЮАР', region: 'Африка', color: 'accent' },
    
    // Океания
    { name: 'Австралия', region: 'Океания', color: 'accent' },
    { name: 'Новая Зеландия', region: 'Океания', color: 'accent' },
    { name: 'Кипр', region: 'Океания', color: 'accent' },
    { name: 'Израиль', region: 'Океания', color: 'accent' },
  ];
  
  // Группировка по регионам для мобильной версии
  const regionStats = countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = { count: 0, countries: [] };
    }
    acc[country.region].count++;
    acc[country.region].countries.push(country.name);
    return acc;
  }, {} as Record<string, { count: number; countries: string[] }>);
  
  const regionIcons = {
    'Европа': '🇪🇺',
    'Азия': '🌏',
    'Америка': '🌎',
    'Африка': '🌍',
    'Океания': '🏝️'
  };

  // Мобильная версия с карточками регионов
  if (isMobile) {
    return (
      <div className="w-full bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
        <div className="text-center mb-6">
          <h4 className="text-brand-blue mb-2">
            География наших офисов
          </h4>
          <p className="text-sm text-gray-600">
            Cash&Go работает в <span className="text-brand-blue font-bold">50 странах</span> мира
          </p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(regionStats).map(([region, stats]) => (
            <div 
              key={region}
              className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-brand-blue/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{regionIcons[region as keyof typeof regionIcons]}</span>
                  <div>
                    <h5 className="font-medium text-brand-blue">{region}</h5>
                    <p className="text-sm text-gray-600">{stats.count} стран</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-orange">{stats.count}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {stats.countries.slice(0, 6).map((country, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white px-2 py-1 rounded border text-gray-600"
                  >
                    {country}
                  </span>
                ))}
                {stats.countries.length > 6 && (
                  <span className="text-xs bg-brand-blue text-white px-2 py-1 rounded">
                    +{stats.countries.length - 6}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
      <div className="text-center mb-8">
        <h4 className="text-brand-blue mb-2">
          География наших офисов
        </h4>
        <p className="text-gray-600">
          Cash&Go работает в <span className="text-brand-blue font-bold">50 странах</span> мира
        </p>
      </div>
      
      <div className="relative w-full h-[500px] bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {/* Base World Map Image */}
        <img 
          src={worldMapImage} 
          alt="World Map"
          className="absolute inset-0 w-full h-full object-contain opacity-30"
        />
        
        {/* Interactive SVG Overlay */}
        <svg 
          viewBox="0 0 1000 500" 
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            {/* Country highlight colors */}
            <linearGradient id="primaryBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004db4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e5bb3" stopOpacity="0.8" />
            </linearGradient>
            
            <linearGradient id="accentOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87000" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff8c33" stopOpacity="0.8" />
            </linearGradient>
            
            <linearGradient id="primaryBlueHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e5bb3" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3f70d9" stopOpacity="0.9" />
            </linearGradient>
            
            <linearGradient id="accentOrangeHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8c33" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffaa66" stopOpacity="0.9" />
            </linearGradient>
            
            {/* Glow effect for highlights */}
            <filter id="countryGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Shadow for tooltip */}
            <filter id="tooltipShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.15"/>
            </filter>
          </defs>
          
          {/* Country Highlight Overlays - positioned to match the background map */}
          
          {/* Russia */}
          <path
            d="M520,50 L600,45 L680,55 L760,65 L840,75 L920,90 L950,110 L965,130 L960,150 L945,170 L920,185 L890,200 L860,210 L820,215 L780,220 L740,215 L700,210 L660,205 L620,200 L580,195 L540,185 L510,165 L500,145 L505,125 L515,105 L525,85 L520,65 Z"
            fill={countries.find(c => c.name === 'Россия')?.color === 'primary' 
              ? (hoveredCountry === 'Россия' ? 'url(#primaryBlueHover)' : 'url(#primaryBlue)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Россия')?.color === 'primary' ? '#004db4' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Россия' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Россия')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* USA */}
          <path
            d="M60,140 L100,135 L140,140 L180,145 L220,150 L260,155 L300,165 L330,175 L350,190 L355,210 L350,230 L340,250 L325,265 L305,275 L285,280 L265,285 L245,280 L225,275 L205,270 L185,265 L165,255 L145,245 L125,230 L110,215 L100,200 L95,180 L90,160 L85,140 Z M80,110 L120,105 L160,110 L190,120 L210,135 L205,155 L195,170 L180,175 L160,180 L140,175 L120,170 L105,160 L95,145 L90,130 L85,115 Z"
            fill={countries.find(c => c.name === 'США')?.color === 'accent' 
              ? (hoveredCountry === 'США' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'США')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'США' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('США')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Canada */}
          <path
            d="M70,40 L110,35 L150,40 L190,45 L230,50 L270,55 L310,60 L350,70 L370,85 L365,105 L355,120 L340,130 L320,135 L300,140 L280,135 L260,130 L240,125 L220,120 L200,115 L180,110 L160,105 L140,100 L120,95 L100,90 L80,85 L65,75 L60,60 Z"
            fill={countries.find(c => c.name === 'Канада')?.color === 'accent' 
              ? (hoveredCountry === 'Канада' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Канада')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Канада' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Канада')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* China */}
          <path
            d="M730,150 L770,145 L810,155 L845,165 L875,180 L895,200 L900,220 L895,240 L885,260 L870,275 L850,285 L825,295 L800,300 L775,305 L750,300 L730,290 L715,275 L710,260 L715,240 L725,220 L730,200 L730,180 L730,160 Z"
            fill={countries.find(c => c.name === 'Китай')?.color === 'accent' 
              ? (hoveredCountry === 'Китай' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Китай')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Китай' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Китай')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Europe - Germany */}
          <path
            d="M490,140 L510,138 L530,145 L545,155 L550,170 L545,185 L535,195 L520,200 L505,195 L495,185 L490,170 L490,155 Z"
            fill={countries.find(c => c.name === 'Германия')?.color === 'accent' 
              ? (hoveredCountry === 'Германия' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Германия')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Германия' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Германия')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* France */}
          <path
            d="M460,150 L485,148 L495,160 L490,175 L480,190 L465,200 L450,195 L440,180 L445,165 L455,155 Z"
            fill={countries.find(c => c.name === 'Франция')?.color === 'accent' 
              ? (hoveredCountry === 'Франция' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Франция')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Франция' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Франция')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Thailand */}
          <path
            d="M790,320 L805,325 L815,340 L820,355 L815,370 L805,380 L795,385 L785,380 L780,365 L785,350 L790,335 Z"
            fill={countries.find(c => c.name === 'Таиланд')?.color === 'accent' 
              ? (hoveredCountry === 'Таиланд' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Таиланд')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Таиланд' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Таиланд')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Australia */}
          <path
            d="M790,390 L830,385 L865,395 L895,410 L910,430 L905,450 L890,465 L870,475 L850,480 L830,475 L810,470 L795,460 L785,445 L785,430 L790,415 Z"
            fill={countries.find(c => c.name === 'Австралия')?.color === 'accent' 
              ? (hoveredCountry === 'Австралия' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Австралия')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Австралия' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Австралия')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Brazil */}
          <path
            d="M280,300 L320,295 L355,305 L385,320 L405,340 L415,365 L410,390 L400,415 L385,435 L365,450 L345,460 L325,465 L305,460 L285,455 L265,445 L250,430 L240,410 L235,390 L240,370 L250,350 L265,330 L280,315 Z"
            fill={countries.find(c => c.name === 'Бразилия')?.color === 'accent' 
              ? (hoveredCountry === 'Бразилия' ? 'url(#accentOrangeHover)' : 'url(#accentOrange)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Бразилия')?.color === 'accent' ? '#f87000' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Бразилия' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Бразилия')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Kazakhstan */}
          <path
            d="M610,150 L660,145 L710,155 L730,170 L725,190 L715,205 L700,215 L680,220 L660,215 L640,210 L625,200 L615,185 L610,170 Z"
            fill={countries.find(c => c.name === 'Казахстан')?.color === 'primary' 
              ? (hoveredCountry === 'Казахстан' ? 'url(#primaryBlueHover)' : 'url(#primaryBlue)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Казахстан')?.color === 'primary' ? '#004db4' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Казахстан' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Казахстан')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Belarus */}
          <path
            d="M550,110 L575,108 L590,115 L595,130 L590,145 L580,155 L565,160 L550,155 L540,145 L545,130 L550,115 Z"
            fill={countries.find(c => c.name === 'Беларусь')?.color === 'primary' 
              ? (hoveredCountry === 'Беларусь' ? 'url(#primaryBlueHover)' : 'url(#primaryBlue)')
              : 'transparent'}
            stroke={countries.find(c => c.name === 'Беларусь')?.color === 'primary' ? '#004db4' : 'transparent'}
            strokeWidth="2"
            filter={hoveredCountry === 'Беларусь' ? 'url(#countryGlow)' : 'none'}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry('Беларусь')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Enhanced Tooltip */}
          {hoveredCountry && (
            <g>
              <rect
                x={400}
                y={25}
                width={Math.max(hoveredCountry.length * 9 + 30, 120)}
                height="40"
                fill="#004db4"
                stroke="#f87000"
                strokeWidth="2"
                rx="10"
                filter="url(#tooltipShadow)"
              />
              <text
                x={415}
                y={50}
                fontSize="14"
                fill="#ffffff"
                fontWeight="600"
                className="pointer-events-none"
              >
                {hoveredCountry}
              </text>
              {/* Arrow pointer */}
              <polygon
                points={`${400 + Math.max(hoveredCountry.length * 9 + 30, 120) / 2},65 ${400 + Math.max(hoveredCountry.length * 9 + 30, 120) / 2 - 8},70 ${400 + Math.max(hoveredCountry.length * 9 + 30, 120) / 2 + 8},70`}
                fill="#004db4"
              />
            </g>
          )}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
        <div className="flex items-center space-x-3 bg-brand-blue/5 px-4 py-2 rounded-lg">
          <div className="w-5 h-5 rounded-sm bg-brand-blue"></div>
          <span className="text-gray-700 font-medium">СНГ страны ({countries.filter(c => c.color === 'primary').length})</span>
        </div>
        <div className="flex items-center space-x-3 bg-brand-orange/5 px-4 py-2 rounded-lg">
          <div className="w-5 h-5 rounded-sm bg-brand-orange"></div>
          <span className="text-gray-700 font-medium">Международные ({countries.filter(c => c.color === 'accent').length})</span>
        </div>
        <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
          <div className="w-5 h-5 rounded-sm bg-gray-300"></div>
          <span className="text-gray-700 font-medium">Без офисов</span>
        </div>
      </div>
    </div>
  );
}

const faqs: FAQ[] = [
  {
    question: 'В каких странах я могу воспользоваться услугой денежных переводов?',
    answer: null, // Будет отображаться карта мира
    isMap: true
  },
  {
    question: 'Какие документы нужны для обмена валют?',
    answer: 'For currency exchange, you need a valid passport or national ID. For amounts over $10,000 equivalent, additional documentation may be required according to local regulations.'
  },
  {
    question: 'Сколько времени занимает обмен валют?',
    answer: 'Most exchanges are processed within 15-30 minutes. Cash pickup at our offices is immediate after payment confirmation. Bank transfers may take up to 2 hours depending on the destination.'
  },
  {
    question: 'Какие комиссии взимаются за обмен?',
    answer: 'Our commission is already included in the exchange rate displayed. There are no hidden fees. The rate you see in the calculator is the final rate you receive.'
  },
  {
    question: 'В каких странах доступен сервис?',
    answer: 'We operate in 15+ countries including Russia, Thailand, UAE, Turkey, and others. Check our locations page for the full list of countries and cities where our services are available.'
  },
  {
    question: 'Безопасно ли пользоваться вашим сервисом?',
    answer: 'Yes, we are fully licensed and regulated. We use bank-level security measures, SSL encryption, and comply with international AML/KYC standards. All transactions are insured.'
  },
  {
    question: 'Можно ли отменить операцию обмена?',
    answer: 'Operations can be cancelled before payment confirmation. After payment is confirmed and processing begins, cancellation may incur fees. Contact our support team for assistance.'
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: 'Our support team is available 24/7 via Telegram, WhatsApp, or phone. We respond within 1 minute during business hours and provide support in Russian, English, and Thai.'
  },
  {
    question: 'Какие способы оплаты принимаются?',
    answer: 'We accept bank transfers from any Russian bank, cash payments at our offices, and some international payment methods. Cryptocurrency payments are available in select locations.'
  }
];

export function FAQ() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'} font-bold text-brand-black mb-6 uppercase text-center`}>
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-gray-600">
            Ответы на популярные вопросы о наших услугах
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-medium text-brand-black pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-600 leading-relaxed">
                {faq.isMap ? (
                  <div>
                    <p className="mb-6 text-gray-700">
                      Cash&Go предоставляет услуги денежных переводов в 47 странах мира. 
                      На карте ниже отмечены все страны, где вы можете воспользоваться нашими услугами:
                    </p>
                    <WorldMap />
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Список стран:</strong> Россия, Беларусь, Казахстан, Киргизия, Армения, Азербайджан, Грузия, 
                        Узбекистан, Таджикистан, Туркменистан, Турция, Кипр, Израиль, ОАЭ, Египет, Тунис, Марокко, 
                        Индия, Вьетнам, Камбоджа, Таиланд, Филиппины, Сингапур, Южная Корея, Япония, Китай, 
                        Бразилия, Аргентина, США, Канада, Великобритания, Ирландия, Испания, Португалия, Франция, 
                        Италия, Германия, Австрия, Швейцария, Бельгия, Нидерланды, Греция, Болгария, Румыния, 
                        Сербия, Черногория, Хорватия, Чехия, Словакия.
                      </p>
                    </div>
                  </div>
                ) : (
                  faq.answer
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://t.me/cashandgo" 
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              Написать в Telegram
            </a>
            <a 
              href="https://wa.me/66958763588" 
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}