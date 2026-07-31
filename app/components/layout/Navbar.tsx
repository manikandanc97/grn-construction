'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/app/lib/constants';

const containerClass = 'mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16';
const buttonBaseClass =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 font-medium transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap';
const secondaryButtonClass =
  `${buttonBaseClass} bg-gradient-to-br from-secondary to-secondary-light text-white shadow-[0_4px_12px_rgba(212,129,58,0.25)] hover:shadow-[0_6px_16px_rgba(212,129,58,0.35)]`;
const whatsappButtonClass =
  `${buttonBaseClass} bg-green-500 text-white shadow-[0_4px_12px_rgba(34,197,94,0.25)] hover:bg-green-600 hover:shadow-[0_6px_16px_rgba(34,197,94,0.35)]`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section
      const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const }}
        className={`fixed top-0 left-0 right-0 z-50 hidden lg:flex transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className={`${containerClass} flex h-28 items-center justify-between`}>
          {/* Logo */}
          <Link
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-4 group"
          >
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow border border-white/20">
              <Image
                src="/logo.jpg"
                alt="GRN Construction Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className={`font-bold text-2xl leading-tight font-display transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}>
                GRN Construction
              </p>
              <p className={`text-sm transition-colors ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
                Builders & Contractors
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 xl:px-6 py-2.5 xl:py-3 rounded-2xl text-[15px] xl:text-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-secondary bg-secondary/10'
                      : scrolled
                      ? 'text-dark hover:text-primary hover:bg-primary/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <a
              href={COMPANY.callLink}
              className={`${secondaryButtonClass} text-[15px]`}
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile Hamburger (mid-sized screens) */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex lg:hidden transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 flex items-center justify-between h-20">
          <Link href="#home" className="flex items-center gap-3" onClick={() => handleNavClick('#home')}>
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20">
              <Image src="/logo.jpg" alt="GRN" fill className="object-cover" priority />
            </div>
            <span className={`font-bold text-lg font-display ${scrolled ? 'text-dark' : 'text-white'}`}>GRN Construction</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-lg ${scrolled ? 'text-dark' : 'text-white'}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100"
            >
              <div className="p-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium text-dark hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                  <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer"
                    className={`${whatsappButtonClass} w-full !py-3.5`}>
                    <MessageCircle size={20} /> WhatsApp
                  </a>
                  <a href={COMPANY.callLink}
                    className={`${secondaryButtonClass} w-full !py-3.5`}>
                    <Phone size={20} /> Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
