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

export function HowItWorksA() {
  return (
    <section className="bg-brand-beige py-8 lg:py-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-black mb-2">
            Как это работает
          </h2>
          <p className="text-base lg:text-lg text-brand-gray-dark">
            Простой процесс обмена валют за 4 шага
          </p>
        </div>

        {/* Vertical Steps */}
        <div className="relative">
          {/* Subtle connecting line */}
          <div className="absolute left-5 md:left-6 top-8 bottom-8 w-px bg-brand-blue/20 hidden sm:block"></div>
          
          <div className="space-y-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div key={index} className="relative">
                  {/* Step pill container */}
                  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100/50 p-3 md:p-4 hover:shadow-md transition-all duration-200 ${
                    isEven ? 'ml-8 md:ml-12' : 'mr-8 md:mr-12'
                  }`}>
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Step number and icon - left aligned */}
                      {!isEven && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-10 h-10 md:w-11 md:h-11 bg-brand-orange rounded-full flex items-center justify-center shadow-sm relative z-10">
                            <span className="text-sm md:text-base font-bold text-white">{step.number}</span>
                          </div>
                          <div className="w-7 h-7 md:w-8 md:h-8 bg-brand-blue/8 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-blue" />
                          </div>
                        </div>
                      )}

                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-brand-black mb-1 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-base text-brand-gray-dark leading-snug">
                          {step.description}
                        </p>
                      </div>

                      {/* Step number and icon - right aligned */}
                      {isEven && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-7 h-7 md:w-8 md:h-8 bg-brand-blue/8 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-blue" />
                          </div>
                          <div className="w-10 h-10 md:w-11 md:h-11 bg-brand-orange rounded-full flex items-center justify-center shadow-sm relative z-10">
                            <span className="text-sm md:text-base font-bold text-white">{step.number}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile connecting dot */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-2 sm:hidden">
                      <div className="w-1 h-1 bg-brand-blue/30 rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200/60">
          <p className="text-sm md:text-base text-brand-gray-dark mb-3">
            Среднее время обработки заявки: <span className="font-bold text-brand-orange">15 минут</span>
          </p>
          
          <div className="flex justify-center items-center gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1.5 text-brand-blue">
              <Shield className="w-3.5 h-3.5" />
              <span className="font-medium">Безопасно</span>
            </div>
            
            <div className="w-px h-3 bg-brand-gray-medium/40"></div>
            
            <div className="flex items-center gap-1.5 text-brand-blue">
              <Zap className="w-3.5 h-3.5" />
              <span className="font-medium">Быстро</span>
            </div>
            
            <div className="w-px h-3 bg-brand-gray-medium/40"></div>
            
            <div className="flex items-center gap-1.5 text-brand-blue">
              <Award className="w-3.5 h-3.5" />
              <span className="font-medium">Надежно</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}