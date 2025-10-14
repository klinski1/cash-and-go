import React from 'react';
import { Button } from './ui/button';
import { MessageCircle, Clock, Gift } from 'lucide-react';
import phoneMockup from 'figma:asset/994f38e17023097cf6e3f1d4038866f0a40793da.png';

export function TelegramApp() {
  const openTelegram = () => {
    window.open('https://t.me/cashandgo', '_blank');
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'Работает прямо в Telegram',
      description: 'Удобный интерфейс без установки дополнительных приложений'
    },
    {
      icon: Clock,
      title: 'Мгновенные обмены 24/7',
      description: 'Круглосуточный доступ к обмену валют в любое время'
    },
    {
      icon: Gift,
      title: 'Кэшбэк и бонусные баллы',
      description: 'Накапливайте баллы и получайте выгодные предложения'
    }
  ];

  return (
    <section id="telegram-app" className="bg-brand-beige py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <h2 className="mb-8 text-left -mt-16">
              <div className="text-3xl lg:text-4xl font-bold text-brand-blue">
                <div className="uppercase">ЗАРАБАТЫВАЙ ВМЕСТЕ</div>
                <div>с Cash&Go</div>
              </div>
              <div className="text-lg lg:text-xl text-brand-blue whitespace-nowrap">
                обменивая валюту в мобильном приложении
              </div>
            </h2>
            
            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-brand-black mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-brand-gray-medium text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              onClick={openTelegram}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 h-auto font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Открыть в Telegram
            </Button>
          </div>

          {/* Phone Mockup Side */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              
              {/* Phone Image */}
              <div className="relative w-96 h-auto">
                <img 
                  src={phoneMockup}
                  alt="Cash&Go Telegram App on smartphone"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Decorative Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-orange rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-6 w-12 h-12 bg-brand-blue rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-brand-orange rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Additional Glow Effect */}
              <div className="absolute top-8 bottom-8 left-0 right-0 bg-gradient-to-t from-brand-blue/5 via-transparent to-brand-orange/5 pointer-events-none rounded-[3rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}