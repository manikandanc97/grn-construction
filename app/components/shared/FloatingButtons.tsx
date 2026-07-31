'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingButtons() {
  const [showQuoteBar, setShowQuoteBar] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowQuoteBar(currentScrollY > 400);

      if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 100) {
        setIsBottomNavVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY < 50) {
        setIsBottomNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quoteBarBottom = isBottomNavVisible ? 'bottom-[88px]' : 'bottom-[16px]';
  const whatsappBottom = showQuoteBar 
    ? (isBottomNavVisible ? 'bottom-[150px]' : 'bottom-[78px]')
    : (isBottomNavVisible ? 'bottom-[88px]' : 'bottom-[16px]');

  return (
    <>
      {/* Desktop Floating Buttons (right side) */}
      <div className="hidden sm:flex fixed right-5 bottom-8 z-50 flex-col gap-3">
        <motion.a
          href={COMPANY.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white shadow-2xl group relative bg-[#25D366]"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ['0 0 0 0 rgba(37,211,102,0.4)', '0 0 0 12px rgba(37,211,102,0)', '0 0 0 0 rgba(37,211,102,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="WhatsApp"
        >
          <WhatsAppIcon size={24} />
          <span className="absolute right-full mr-3 bg-dark text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </motion.a>

        <motion.a
          href={COMPANY.callLink}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white shadow-2xl group relative bg-gradient-to-br from-[#D4813A] to-[#E8974F]"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ['0 0 0 0 rgba(212,129,58,0.4)', '0 0 0 12px rgba(212,129,58,0)', '0 0 0 0 rgba(212,129,58,0)'] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          aria-label="Call Now"
        >
          <Phone size={22} />
          <span className="absolute right-full mr-3 bg-dark text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call Now
          </span>
        </motion.a>
      </div>

      {/* Mobile Floating WhatsApp */}
      <motion.a
        href={COMPANY.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`sm:hidden fixed right-4 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl bg-[#25D366] transition-all duration-300 ${whatsappBottom}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 0 0 0 rgba(37,211,102,0.4)', '0 0 0 10px rgba(37,211,102,0)', '0 0 0 0 rgba(37,211,102,0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </motion.a>

      {/* Mobile Sticky Quote Bar */}
      <AnimatePresence>
        {showQuoteBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`sm:hidden fixed left-0 right-0 z-40 px-4 pb-2 transition-all duration-300 ${quoteBarBottom}`}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white text-sm font-semibold bg-gradient-to-br from-secondary to-secondary-light shadow-[0_6px_24px_rgba(212,129,58,0.4)]"
            >
              <Phone size={16} />
              Get Free Quote - Call Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
