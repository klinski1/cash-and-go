import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  CreditCard, 
  Banknote,
  Shield,
  Zap,
  Award
} from 'lucide-react';

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Запрос',
    description: 'Укажите сумму, валюту и способ получения денег через наш калькулятор или менеджера.'
  },
  {
    icon: CheckCircle,
    number: '02',
    title: 'Подтверждение',
    description: 'Получите персональные реквизиты и подтвердите операцию с фиксированным курсом.'
  },
  {
    icon: CreditCard,
    number: '03',
    title: 'Оплата/Передача',
    description: 'Переведите рубли на указанные реквизиты или передайте наличные в офисе.'
  },
  {
    icon: Banknote,
    number: '04',
    title: 'Получение',
    description: 'Получите валюту удобным способом: в офисе, у партнёра или курьером.'
  }
];

export function HowItWorksB() {
  return (
    <section className="bg-gradient-to-br from-brand-beige via-white to-brand-beige py-16 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-1/4 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-6">
            Как это работает
          </h2>
          <p className="text-xl text-brand-gray-dark max-w-2xl mx-auto">
            Простой процесс обмена валют за 4 шага
          </p>
        </div>

        {/* Horizontal Timeline - Mobile: Stack vertically */}
        <div className="block lg:hidden space-y-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div key={index} className="flex items-start space-x-4">
                {/* Mobile icon and number */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center shadow-lg mb-2 relative">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-brand-blue" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-1 h-8 bg-brand-blue/30 mt-4 rounded-full"></div>
                  )}
                </div>
                
                {/* Mobile content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-gray-dark text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Main timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-brand-blue rounded-full transform -translate-y-1/2"></div>
          
          <div className="relative flex justify-between items-center">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isTop = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex-1 flex flex-col items-center">
                  {/* Content above timeline (steps 1, 3) */}
                  {isTop && (
                    <div className="mb-12 text-center max-w-xs">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-brand-gray-light hover:shadow-xl transition-all duration-300">
                        <h3 className="text-lg font-bold text-brand-black mb-3">
                          {step.title}
                        </h3>
                        <p className="text-brand-gray-dark text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      {/* Connecting line to timeline */}
                      <div className="w-0.5 h-8 bg-brand-blue/40 mx-auto mt-2"></div>
                    </div>
                  )}
                  
                  {/* Timeline node */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Step number circle */}
                    <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center shadow-lg relative mb-2">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                      {/* Decorative rings */}
                      <div className="absolute inset-0 rounded-full border-4 border-brand-orange/30 scale-110"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-white/40 scale-125"></div>
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-brand-blue" />
                    </div>
                  </div>
                  
                  {/* Content below timeline (steps 2, 4) */}
                  {!isTop && (
                    <div className="mt-12 text-center max-w-xs">
                      {/* Connecting line from timeline */}
                      <div className="w-0.5 h-8 bg-brand-blue/40 mx-auto mb-2"></div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-brand-gray-light hover:shadow-xl transition-all duration-300">
                        <h3 className="text-lg font-bold text-brand-black mb-3">
                          {step.title}
                        </h3>
                        <p className="text-brand-gray-dark text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-8 border-t border-brand-gray-light">
          <p className="text-lg text-brand-gray-dark mb-6">
            Среднее время обработки заявки: <span className="font-bold text-brand-orange">15 минут</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
            <div className="flex items-center space-x-2 text-brand-blue">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Безопасно</span>
            </div>
            
            <div className="hidden sm:block w-1 h-1 bg-brand-gray-medium rounded-full"></div>
            
            <div className="flex items-center space-x-2 text-brand-blue">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Быстро</span>
            </div>
            
            <div className="hidden sm:block w-1 h-1 bg-brand-gray-medium rounded-full"></div>
            
            <div className="flex items-center space-x-2 text-brand-blue">
              <Award className="w-5 h-5" />
              <span className="font-medium">Надежно</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}