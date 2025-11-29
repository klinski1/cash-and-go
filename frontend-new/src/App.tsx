import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CashMethods } from './components/CashMethods';
import { TelegramApp } from './components/TelegramApp';
import { MoneyTransfers } from './components/MoneyTransfers';
import { AboutUs } from './components/AboutUs';
import { FAQ } from './components/FAQ';
import { MobileQuickActions } from './components/MobileQuickActions';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import logo from 'figma:asset/9dc8b90aa5ead1c1e5d6bede53953bc83ea7393d.png';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige overflow-x-hidden">
      <Header />
      
      <main>
        <Hero />
        <CashMethods />
        <TelegramApp />
        {/* Оранжевый разделитель между блоками */}
        <div className="w-full h-[5px] bg-brand-orange"></div>
        <MoneyTransfers />
        {/* Оранжевый разделитель между синим и бежевым блоками */}
        <div className="w-full h-[5px] bg-brand-orange"></div>
        <AboutUs />
        <FAQ />
      </main>

      {/* Trust & Compliance Section */}
      <section className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-brand-blue" />
              <span className="font-medium text-brand-black">Лицензированный сервис обмена валют в Королевстве Таиланд</span>
            </div>
            <p className="text-sm text-gray-600 max-w-4xl leading-relaxed">
              Cash&Go Exchange работает в соответствии с тайским финансовым законодательством 
              с полным соблюдением требований по борьбе с отмыванием денег (AML) 
              и идентификации клиентов (KYC). Все транзакции защищены 
              и контролируются согласно международным стандартам.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-gray-500">
              <span>🔒 SSL шифрование</span>
              <span>🛡️ Соответствие AML/KYC</span>
              <span>✅ Лицензия в Таиланде</span>
              <span>🌍 Международные стандарты</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-brand-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src={logo} 
                  alt="Cash&Go Exchange" 
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Лицензированный сервис обмена валют в Королевстве Таиланд
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Обмен валют
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('money-shift')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Денежные перестановки
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('methods')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Способы получения
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    О нас
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-medium mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button 
                    onClick={() => scrollToSection('faq')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contacts')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Контакты
                  </button>
                </li>
              </ul>
              
              {/* Social Media */}
              <div className="mt-6">
                <div className="flex space-x-3">
                  <a 
                    href="https://t.me/cashandgo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-blue transition-colors group"
                  >
                    <svg className="w-4 h-4 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.499 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.245-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://wa.me/66958763588" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors group"
                  >
                    <svg className="w-4 h-4 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com/cashandgo.exchange" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors group"
                  >
                    <svg className="w-4 h-4 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+66 95-876-3588</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@cashandgo.exchange</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">5/27A Fisherman Way, Moo 5 Wiset Rd, Rawai, Muang, Phuket 83130, Thailand</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © Cash&Go exchange Co.,Ltd. - all rights reserved
            </p>
          </div>
        </div>
      </footer>

      <MobileQuickActions />
    </div>
  );
}