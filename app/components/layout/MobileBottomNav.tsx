'use client';

import { useState, useEffect, useRef } from 'react';
import { Home, Hammer, Building2, Star, Phone } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: 'home', Icon: Home },
  { label: 'Services', href: 'services', Icon: Hammer },
  { label: 'Projects', href: 'projects', Icon: Building2 },
  { label: 'Reviews', href: 'reviews', Icon: Star },
  { label: 'Contact', href: 'contact', Icon: Phone },
];

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY < 50) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      const sections = NAV_ITEMS.map((i) => i.href);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setActiveSection(href);
    const el = document.getElementById(href);
    if (el) {
      const offset = href === 'home' ? 0 : 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed bottom-[max(env(safe-area-inset-bottom,16px),16px)] left-4 right-4 z-50 flex rounded-3xl border border-black/10 bg-white/95 px-1 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:hidden transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-[200%]'
      }`}
    >
      <div className="flex items-center justify-around w-full">
        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const isActive = activeSection === href;
          return (
            <button
              key={href}
              onClick={() => handleClick(href)}
              className={`flex cursor-pointer flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200 ${
                isActive ? 'bg-secondary/10' : ''
              }`}
            >
              <Icon
                size={20}
                className={`transition-colors ${
                  isActive ? 'text-secondary' : 'text-gray-500'
                } ${isActive && label === 'Reviews' ? 'fill-secondary' : 'fill-none'}`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={`text-[10px] font-semibold leading-none transition-colors ${
                  isActive ? 'text-secondary' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
              {isActive && <span className="mt-0.5 h-1 w-1 rounded-full bg-secondary" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
