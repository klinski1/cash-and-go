import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  FileText, 
  CheckCircle, 
  CreditCard, 
  Banknote,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Запрос',
    description: 'Укажите сумму, валюты и способ получения денег через наш калькулятор или менеджера'
  },
  {
    icon: CheckCircle,
    number: '02',
    title: 'Подтверждение',
    description: 'Получите персональные реквизиты и подтвердите операцию с фиксированным курсом'
  },
  {
    icon: CreditCard,
    number: '03',
    title: 'Оплата/Передача',
    description: 'Переведите рубли на указанные реквизиты или передайте наличные в офисе'
  },
  {
    icon: Banknote,
    number: '04',
    title: 'Получение',
    description: 'Получите валюту удобным способом: в офисе, у партнера или курьером'
  }
];

export function HowItWorks() {
  return (
    <section className="bg-brand-beige py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-6">
            Как это работает
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Простой процесс обмена валют за 4 шага
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-brand-orange mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-brand-black mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow for non-mobile */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-brand-blue" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Среднее время обработки заявки: <span className="font-semibold text-brand-blue">15 минут</span>
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>🔒 Безопасно</span>
            <span>⚡ Быстро</span>
            <span>💯 Надежно</span>
          </div>
        </div>
      </div>
    </section>
  );
}