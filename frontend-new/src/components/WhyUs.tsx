import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Clock, 
  Globe2, 
  MessageCircle,
  Award,
  Users,
  Timer
} from 'lucide-react';

const pillars = [
  {
    icon: Shield,
    title: 'Лицензированный сервис',
    subtitle: 'Работаем по правилам и стандартам',
    description: 'Официальная лицензия на финансовые операции. Соблюдаем все международные стандарты безопасности и прозрачности.',
    metrics: ['Лицензия ЦБ РФ', 'ISO 27001', 'Аудит Big4']
  },
  {
    icon: Clock,
    title: 'Скорость и прозрачность',
    subtitle: 'Понятные курсы и сроки',
    description: 'Честные курсы без скрытых комиссий. Обработка заявок в течение 15 минут. Полная прозрачность всех операций.',
    metrics: ['15 мин', '0% скрытых комиссий', '24/7 статусы']
  },
  {
    icon: Globe2,
    title: 'География и доступность',
    subtitle: '30+ точек и глобальные маршруты',
    description: 'Широкая сеть офисов и партнеров по всему миру. Обмен валют в любой точке планеты с единым стандартом сервиса.',
    metrics: ['15 стран', '200+ точек', '50+ валют']
  },
  {
    icon: MessageCircle,
    title: 'Поддержка',
    subtitle: 'Реальные менеджеры в мессенджерах',
    description: 'Персональные менеджеры в Telegram и WhatsApp. Поддержка на русском, английском и тайском языках 24/7.',
    metrics: ['< 1 мин ответ', '3 языка', 'Персональный менеджер']
  }
];

const achievements = [
  { icon: Users, value: '50,000+', label: 'Довольных клиентов' },
  { icon: Globe2, value: '15', label: 'Стран присутствия' },
  { icon: Timer, value: '< 30', label: 'Минут на обмен' },
  { icon: Award, value: '4.9', label: 'Рейтинг сервиса' }
];

export function WhyUs() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-6">
            Почему мы
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            4 ключевые причины выбрать Cash&Go для обмена валют
          </p>
        </div>

        {/* Main Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-blue/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-brand-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-black mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-brand-blue font-medium mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {pillar.metrics.map((metric, metricIndex) => (
                      <Badge 
                        key={metricIndex}
                        variant="secondary" 
                        className="mr-2 mb-2 bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
                      >
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div key={index} className="text-center p-6 bg-brand-beige rounded-xl">
                <IconComponent className="w-8 h-8 text-brand-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-brand-black mb-1">
                  {achievement.value}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Story */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Cash&Go — это международная финтех-компания, специализирующаяся на обмене валют 
            и денежных переводах. Мы объединяем традиционную надежность банковских операций 
            с современными технологиями и скоростью цифровых сервисов.
          </p>
        </div>
      </div>
    </section>
  );
}