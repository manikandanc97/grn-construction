'use client';

import { useState, useEffect } from 'react';
import { Home, Hammer, Building2, Phone } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: 'home', Icon: Home },
  { label: 'Services', href: 'services', Icon: Hammer },
  { label: 'Projects', href: 'projects', Icon: Building2 },
  { label: 'Contact', href: 'contact', Icon: Phone },
];

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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
      className="fixed bottom-[max(env(safe-area-inset-bottom,16px),16px)] left-2 right-2 z-50 flex rounded-3xl border border-black/10 bg-white/95 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:hidden"
    >
      <div className="flex items-center justify-between w-full">
        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const isActive = activeSection === href;
          return (
            <button
              key={href}
              onClick={() => handleClick(href)}
              className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-all duration-200 ${
                isActive ? 'bg-secondary/10' : ''
              }`}
            >
              <Icon
                size={20}
                className={`transition-colors ${
                  isActive ? 'text-secondary' : 'text-gray-500'
                } fill-none`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={`text-[10px] font-semibold leading-none transition-colors ${
                  isActive ? 'text-secondary' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
