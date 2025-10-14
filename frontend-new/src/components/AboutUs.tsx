import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Shield, Award, Star, Quote, ChevronLeft, ChevronRight, Users, Globe, Clock, CheckCircle, Building2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import brandIllustration from 'figma:asset/cdfa712f424ec5fc448963045f7a8b0351cbc606.png';
import officeMain from 'figma:asset/a793b92e94bcce1cfdde984c7a79aa6115cf0c2c.png';
import officeReception from 'figma:asset/5b2c86cb2763a1730241fd056f6c58bde30c04f3.png';
import officeLounge from 'figma:asset/1c06301f2acdbe923c96231db724d4c84f52a97b.png';
import officeWaitingArea from 'figma:asset/ab30dc3c512deca67df9ddb5b8720346411fed8f.png';
import officeExterior from 'figma:asset/10b77c38d1a1d4108c2130b746a17d021414add2.png';
import officeCurrencyBoard from 'figma:asset/1300b5e1b5940d3e74bf27db7b3b2ab8c4c942d6.png';

const testimonials = [
  {
    name: "Анна К.",
    location: "Москва → Пхукет",
    text: "Очень удобно! Заказала обмен онлайн, получила баты в офисе на Пхукете через час. Курс был лучше банковского.",
    rating: 5
  },
  {
    name: "Дмитрий М.",
    location: "СПб → Бангкок",
    text: "Пользуюсь Cash&Go уже второй год. Надежно, быстро, всегда корректные курсы. Менеджеры отвечают моментально.",
    rating: 5
  },
  {
    name: "Елена Р.",
    location: "Екатеринбург → Пхукет",
    text: "Сначала сомневалась, но все прошло отлично. Документы в порядке, деньги получила точно в срок. Рекомендую!",
    rating: 5
  },
  {
    name: "Михаил С.",
    location: "Москва → Паттайя",
    text: "Отличный сервис! Перевожу деньги регулярно для бизнеса. Курсы всегда выгодные, поддержка работает круглосуточно.",
    rating: 5
  },
  {
    name: "Ольга В.",
    location: "Новосибирск → Пхукет",
    text: "Быстро и безопасно. Получила баты в течение 2 часов после заявки. Все документы на руки, никаких проблем.",
    rating: 5
  },
  {
    name: "Александр П.",
    location: "Казань → Бангкок",
    text: "Пользуюсь Cash&Go для покупки недвижимости в Таиланде. Большие суммы переводят без вопросов, все легально.",
    rating: 5
  },
  {
    name: "Виктория С.",
    location: "Красноярск → Пхукет",
    text: "Впервые переводила такую сумму за границу и очень волновалась. Cash&Go все объяснили, провели за руку. Супер!",
    rating: 5
  },
  {
    name: "Игорь Л.",
    location: "Ростов → Паттайя",
    text: "Работаю с Cash&Go третий год. Никогда не подводили, курсы честные, деньги приходят быстро. Очень доволен!",
    rating: 5
  },
  {
    name: "Татьяна Н.",
    location: "Воронеж → Бангкок",
    text: "Переехала в Таиланд на ПМЖ, регулярно переводила деньги через Cash&Go. Всегда оперативно и без комиссий.",
    rating: 5
  },
  {
    name: "Сергей К.",
    location: "Челябинск → Пхукет",
    text: "Покупал кондо, нужно было перевести крупную сумму. Cash&Go сделали все максимально быстро и безопасно.",
    rating: 5
  },
  {
    name: "Мария Ф.",
    location: "Тюмень → Самуи",
    text: "Отличные ребята! Помогли с переводом на покупку авто. Все документы оформили правильно, никаких проблем.",
    rating: 5
  },
  {
    name: "Владимир З.",
    location: "Уфа → Бангкок",
    text: "Пользуюсь Cash&Go для бизнеса уже 4 года. Самые лучшие курсы на рынке и безупречная репутация!",
    rating: 5
  }
];

export function AboutUs() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Определение мобильной версии
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getItemsPerPage = () => {
    return isMobile ? 1 : 3;
  };

  const nextTestimonials = () => {
    const itemsPerPage = getItemsPerPage();
    setCurrentTestimonialIndex((prev) => (prev + itemsPerPage) % testimonials.length);
  };

  const prevTestimonials = () => {
    const itemsPerPage = getItemsPerPage();
    setCurrentTestimonialIndex((prev) => (prev - itemsPerPage + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    const itemsPerPage = getItemsPerPage();
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentTestimonialIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  // Автоматическое пролистывание отзывов
  useEffect(() => {
    if (isTestimonialPaused) return;

    const interval = setInterval(() => {
      nextTestimonials();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTestimonialIndex, isTestimonialPaused]);

  return (
    <>
      {/* About Us Section - Beige Background */}
      <section id="about" className="bg-brand-beige py-16 lg:py-20 relative overflow-hidden">
        {/* Декоративные пунктирные круги - паттерн 1: лево-центральный */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 1. Большой круг слева вверху */}
          <svg 
            className="absolute -left-48 -top-12 w-[600px] h-[600px]"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle 
              cx="300" 
              cy="300" 
              r="260"
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="10 16"
              strokeLinecap="round"
              fill="none"
              opacity="0.2"
            />
          </svg>
          
          {/* 2. Средний круг по центру */}
          <svg 
            className="absolute left-1/2 top-1/3 transform -translate-x-1/2 w-[400px] h-[400px]"
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle 
              cx="200" 
              cy="200" 
              r="170"
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="8 14"
              strokeLinecap="round"
              fill="none"
              opacity="0.15"
            />
          </svg>
          
          {/* 3. Маленький круг справа внизу */}
          <svg 
            className="absolute -right-24 bottom-16 w-[350px] h-[350px]"
            viewBox="0 0 350 350"
            fill="none"
          >
            <circle 
              cx="175" 
              cy="175" 
              r="140"
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="6 12"
              strokeLinecap="round"
              fill="none"
              opacity="0.18"
            />
          </svg>
          
          {/* 4. Дополнительный круг слева внизу */}
          <svg 
            className="absolute -left-20 bottom-32 w-[250px] h-[250px]"
            viewBox="0 0 250 250"
            fill="none"
          >
            <circle 
              cx="125" 
              cy="125" 
              r="100"
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="5 10"
              strokeLinecap="round"
              fill="none"
              opacity="0.12"
            />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Content - Text Information */}
            <div className="space-y-8">
              {/* Main Title - Same size as CashMethods */}
              <div>
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'} font-bold text-brand-blue mb-6 uppercase text-center`}>
                  О НАС
                </h2>
              </div>

              {/* Compact Key Features List */}
              <div className="space-y-6">
                
                {/* Licensed Service */}
                <div>
                  <h3 className="text-xl font-bold text-brand-black mb-2 flex items-center">
                    <Shield className="w-5 h-5 text-brand-orange mr-3" />
                    Лицензированный сервис
                  </h3>
                  <p className="text-brand-gray-dark leading-relaxed">
                    Полное соответствие финансовому законодательству Королевства Таиланд с соблюдением международных стандартов AML/KYC.
                  </p>
                  <div className="flex items-center mt-2 text-brand-orange font-medium text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>3+ года надежной работы</span>
                  </div>
                </div>

                {/* Global Network */}
                <div>
                  <h3 className="text-xl font-bold text-brand-black mb-2 flex items-center">
                    <Globe className="w-5 h-5 text-brand-orange mr-3" />
                    Глобальная сеть партнеров
                  </h3>
                  <p className="text-brand-gray-dark leading-relaxed">
                    2 собственных офиса в Таиланде и 140+ офисов партнеров по всему миру. 
                    Быстрые операции в ключевых финансовых центрах.
                  </p>
                  <div className="flex items-center mt-2 text-brand-orange font-medium text-sm">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>Офисы в более чем 50 странах</span>
                  </div>
                </div>

                {/* Security & Trust */}
                <div>
                  <h3 className="text-xl font-bold text-brand-black mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-orange mr-3" />
                    Безопасность и доверие
                  </h3>
                  <p className="text-brand-gray-dark leading-relaxed">
                    Более 10,000 довольных клиентов. SSL-шифрование, мониторинг 24/7 
                    и полная документальная отчетность.
                  </p>
                  <div className="flex items-center mt-2 text-brand-orange font-medium text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>99.9% успешных операций</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Brand Illustration */}
            <div className="relative flex flex-col items-center">
              {/* Main illustration - positioned higher */}
              <div className="relative mb-8">
                <img 
                  src={brandIllustration}
                  alt="Cash&Go Exchange Service"
                  className="w-full h-auto max-w-lg mx-auto -mt-8 md:mt-0"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))'
                  }}
                />
                
                {/* Subtle decorative elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-orange/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-blue/10 rounded-full blur-xl"></div>
              </div>

              {/* Text content below image - no background block */}
              <div className="hidden md:block text-center space-y-4 max-w-lg">
                <h3 className="text-2xl font-bold text-brand-black">
                  Cash&Go – the way you EXchange
                </h3>
                <p className="text-brand-gray-dark text-lg leading-relaxed">
                  Выберите надежного партнера для ваших финансовых операций в Таиланде и по всему миру.<br />
                  <span className="text-brand-blue font-bold">Прозрачность, скорость и безопасность</span> – наши главные принципы.
                </p>
              </div>
            </div>

          </div>

          {/* Office Interior Gallery */}
          <div className="mt-4 md:mt-20">
            <div className="text-center mb-12">
              <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'} font-bold text-brand-black mb-4 leading-tight uppercase text-center`}>
                Офисы <span className="text-brand-orange">Cash&Go</span>
              </h3>
            </div>

            {/* Desktop Gallery Grid */}
            <div className="relative hidden md:block">
              {/* Main Gallery Container */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-6 md:h-[600px] lg:h-[700px]">
                
                {/* Description text with features - only on desktop, above main image */}
                <div className="hidden md:block md:col-span-6 md:row-span-2 md:col-start-4 md:row-start-1 md:h-auto flex items-center justify-center px-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-brand-orange/20 text-center">
                    <p className="text-brand-gray-dark leading-relaxed mb-4">
                      Наши офисы спроектированы с учетом комфорта клиентов и современных требований безопасности, создавая атмосферу доверия и профессионализма
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-orange">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Лаунж-зоны</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        <span>Максимальная безопасность</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Быстрое обслуживание</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Large main image */}
                <div className="col-span-6 row-span-4 col-start-4 row-start-3 h-auto relative group overflow-hidden rounded-2xl">
                  <img
                    src={officeMain}
                    alt="Главный офис Cash&Go - зона обслуживания клиентов"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Reception image */}
                <div className="col-span-3 row-span-3 col-start-1 row-start-1 h-auto relative group overflow-hidden rounded-2xl">
                  <img
                    src={officeReception}
                    alt="Cash&Go - зона ресепшн и консультаций"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Waiting area image */}
                <div className="col-span-3 row-span-3 col-start-10 row-start-1 h-auto relative group overflow-hidden rounded-2xl">
                  <img
                    src={officeWaitingArea}
                    alt="Cash&Go - уютная зона ожидания с брендовым интерьером"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Lounge image */}
                <div className="col-span-3 row-span-3 col-start-1 row-start-4 h-auto relative group overflow-hidden rounded-2xl">
                  <img
                    src={officeLounge}
                    alt="Cash&Go - VIP зона ожидания для клиентов"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Exterior image */}
                <div className="col-span-3 row-span-3 col-start-10 row-start-4 h-auto relative group overflow-hidden rounded-2xl">
                  <img
                    src={officeExterior}
                    alt="Cash&Go - витрина офиса с фирменным дизайном"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Decorative elements with brand colors */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-orange/5 rounded-full blur-2xl"></div>
            </div>

            {/* Mobile Gallery - Horizontal Scroll */}
            <div className="md:hidden">
              {/* Description text for mobile */}
              <div className="mb-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-brand-orange/20 text-center">
                  <p className="text-brand-gray-dark leading-relaxed text-sm mb-3">
                    Наши офисы спроектированы с учетом комфорта клиентов и современных требований безопасности
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-brand-orange">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      <span>Лаунж-зоны</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      <span>Безопасность</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Быстрое обслуживание</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal scrolling gallery */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                  {/* Main office image */}
                  <div className="flex-shrink-0 w-[85vw] max-w-sm h-56 relative group overflow-hidden rounded-xl">
                    <img
                      src={officeMain}
                      alt="Главный офис Cash&Go - зона обслуживания клиентов"
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      Главный офис
                    </div>
                  </div>

                  {/* Reception image */}
                  <div className="flex-shrink-0 w-[85vw] max-w-sm h-56 relative group overflow-hidden rounded-xl">
                    <img
                      src={officeReception}
                      alt="Cash&Go - зона ресепшн и консультаций"
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      Ресепшн
                    </div>
                  </div>

                  {/* Waiting area image */}
                  <div className="flex-shrink-0 w-[85vw] max-w-sm h-56 relative group overflow-hidden rounded-xl">
                    <img
                      src={officeWaitingArea}
                      alt="Cash&Go - уютная зона ожидания с брендовым интерьером"
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      Зона ожидания
                    </div>
                  </div>

                  {/* Lounge image */}
                  <div className="flex-shrink-0 w-[85vw] max-w-sm h-56 relative group overflow-hidden rounded-xl">
                    <img
                      src={officeLounge}
                      alt="Cash&Go - VIP зона ожидания для клиентов"
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      VIP зона
                    </div>
                  </div>

                  {/* Exterior image */}
                  <div className="flex-shrink-0 w-[85vw] max-w-sm h-56 relative group overflow-hidden rounded-xl">
                    <img
                      src={officeExterior}
                      alt="Cash&Go - витрина офиса с фирменным дизайном"
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      Витрина офиса
                    </div>
                  </div>

                  {/* Currency board image */}
                  <div className="flex-shrink-0 w-[85vw] max-w-sm h-56 relative group overflow-hidden rounded-xl">
                    <img
                      src={officeCurrencyBoard}
                      alt="Cash&Go - операционная зона с табло курсов валют"
                      className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-medium">
                      Табло курсов
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="text-center mt-3">
                <p className="text-xs text-brand-gray-medium">
                  ← Прокрутите для просмотра всех фото →
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-4 lg:pt-12 lg:pb-20 bg-brand-beige relative overflow-hidden">
        {/* Декоративные пунктирные круги - паттерн 2: право-центральный */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 1. Большой круг справа вверху */}
          <svg 
            className="absolute -right-56 -top-20 w-[700px] h-[700px]"
            viewBox="0 0 700 700"
            fill="none"
          >
            <circle 
              cx="350" 
              cy="350" 
              r="300"
              stroke="#f87000" 
              strokeWidth="3"
              strokeDasharray="14 20"
              strokeLinecap="round"
              fill="none"
              opacity="0.22"
            />
          </svg>
          
          {/* 2. Средний круг слева по центру */}
          <svg 
            className="absolute -left-32 top-1/2 transform -translate-y-1/2 w-[450px] h-[450px]"
            viewBox="0 0 450 450"
            fill="none"
          >
            <circle 
              cx="225" 
              cy="225" 
              r="190"
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="9 15"
              strokeLinecap="round"
              fill="none"
              opacity="0.16"
            />
          </svg>
          
          {/* 3. Маленький круг по центру внизу */}
          <svg 
            className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 w-[320px] h-[320px]"
            viewBox="0 0 320 320"
            fill="none"
          >
            <circle 
              cx="160" 
              cy="160" 
              r="130"
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="7 13"
              strokeLinecap="round"
              fill="none"
              opacity="0.14"
            />
          </svg>
          
          {/* 4. Дополнительный маленький круг справа внизу */}
          <svg 
            className="absolute -right-16 bottom-20 w-[280px] h-[280px]"
            viewBox="0 0 280 280"
            fill="none"
          >
            <circle 
              cx="140" 
              cy="140" 
              r="110"
              stroke="#f87000" 
              strokeWidth="2"
              strokeDasharray="5 11"
              strokeLinecap="round"
              fill="none"
              opacity="0.10"
            />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h3 className={`${isMobile ? 'text-2xl' : 'text-2xl lg:text-3xl'} font-bold text-brand-black mb-4 uppercase tracking-wide text-center`}>
              ОТЗЫВЫ КЛИЕНТОВ <span className="text-brand-orange">CASH&GO</span>
            </h3>
            <p className="text-lg text-brand-gray-dark max-w-2xl mx-auto">
              Тысячи довольных клиентов доверяют нам свои финансовые операции
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div 
            className="relative"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVisibleTestimonials().map((testimonial, index) => (
                <Card key={`${currentTestimonialIndex}-${index}`} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-brand-orange mb-2" />
                    </div>
                    
                    <p className="text-brand-gray-dark mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-brand-black">{testimonial.name}</p>
                        <p className="text-sm text-brand-gray-medium">{testimonial.location}</p>
                      </div>
                      
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={() => {
                  prevTestimonials();
                  setIsTestimonialPaused(true);
                  setTimeout(() => setIsTestimonialPaused(false), 3000);
                }}
                className="w-12 h-12 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(testimonials.length / getItemsPerPage()) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonialIndex(index * getItemsPerPage());
                      setIsTestimonialPaused(true);
                      setTimeout(() => setIsTestimonialPaused(false), 3000);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentTestimonialIndex / getItemsPerPage()) === index
                        ? 'bg-brand-blue scale-125' 
                        : 'bg-brand-gray-medium hover:bg-brand-blue/60'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => {
                  nextTestimonials();
                  setIsTestimonialPaused(true);
                  setTimeout(() => setIsTestimonialPaused(false), 3000);
                }}
                className="w-12 h-12 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}