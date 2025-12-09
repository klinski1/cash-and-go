import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Calculator, MessageCircle, ArrowUpDown } from 'lucide-react';

export function MobileQuickActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSectionCentered = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
  
    const elementRect = element.getBoundingClientRect();
    const elementCenter = elementRect.top + elementRect.height / 2;
    const windowCenter = window.innerHeight / 2;
  
    const offset = elementCenter - windowCenter;
  
    window.scrollBy({
      top: offset,
      behavior: 'smooth'
    });
  };


  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth',   block: 'start' });
    }
  };

  const scrollToContacts = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth',  block: 'start' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-2">
        <div className="grid grid-cols-3 gap-1">
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col items-center justify-center py-2 px-1 h-16 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={() => scrollToSectionCentered('calculator')}
          >
            <Calculator className="w-4 h-4 mb-1" />
            <span className="text-xs leading-tight">Калькулятор</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col items-center justify-center py-2 px-1 h-16 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={() => scrollToSectionCentered('contacts')}
          >
            <MessageCircle className="w-4 h-4 mb-1" />
            <span className="text-xs leading-tight">Связаться</span>
          </Button>
          
          <Button
            size="sm"
            className="flex flex-col items-center justify-center py-2 px-1 h-16 bg-brand-orange hover:bg-brand-orange/90 text-white"
            onClick={() => scrollToSectionCentered('calculator')}
          >
            <ArrowUpDown className="w-4 h-4 mb-1" />
            <span className="text-xs leading-tight">Обменять</span>
          </Button>
        </div>
      </div>
    </div>
  );
}