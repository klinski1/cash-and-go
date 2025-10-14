import React, { useState } from 'react';
import { Button } from './ui/button';
import { Globe, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import logo from 'figma:asset/9dc8b90aa5ead1c1e5d6bede53953bc83ea7393d.png';

const languages = [
  { code: 'RU', flag: '🇷🇺', name: 'Русский' },
  { code: 'EN', flag: '🇺🇸', name: 'English' },
  { code: 'TH', flag: '🇹🇭', name: 'ไทย' },
];

export function Header() {
  const [currentLang, setCurrentLang] = useState('RU');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src={logo} 
                alt="Cash&Go Exchange" 
                className="h-12 lg:h-16 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation - Centered with equal spacing */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center justify-between w-full">
              <button 
                onClick={() => scrollToSection('calculator')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium uppercase tracking-wide"
              >
                КУРС
              </button>
              <button 
                onClick={() => scrollToSection('money-shift')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium uppercase tracking-wide"
              >
                ПЕРЕСТАНОВКИ
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium uppercase tracking-wide"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium uppercase tracking-wide"
              >
                КОНТАКТЫ
              </button>
            </div>
          </nav>

          {/* Right Section - Language + CTA */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2 h-9 px-3">
                  <span className="text-lg">{currentLanguage?.flag}</span>
                  <span className="font-medium">{currentLanguage?.code}</span>
                  <Globe className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.code}</span>
                      <span className="text-xs text-gray-500">{lang.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Primary CTA */}
            <Button 
              onClick={() => scrollToSection('calculator')}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] uppercase tracking-wide"
            >
              ОБМЕНЯТЬ ВАЛЮТУ
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('calculator')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium px-4 py-2 text-left uppercase tracking-wide"
              >
                КУРС
              </button>
              <button 
                onClick={() => scrollToSection('money-shift')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium px-4 py-2 text-left uppercase tracking-wide"
              >
                ПЕРЕСТАНОВКИ
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium px-4 py-2 text-left uppercase tracking-wide"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="text-gray-700 hover:text-brand-blue transition-colors font-medium px-4 py-2 text-left uppercase tracking-wide"
              >
                КОНТАКТЫ
              </button>
              
              {/* Mobile Language Switcher */}
              <div className="px-4 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2 w-full justify-start">
                      <span className="text-lg">{currentLanguage?.flag}</span>
                      <span className="font-medium">{currentLanguage?.name}</span>
                      <Globe className="w-4 h-4 text-gray-500 ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-full">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className="flex items-center space-x-3"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}