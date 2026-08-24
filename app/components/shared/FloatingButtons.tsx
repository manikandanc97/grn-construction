'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingButtons() {
  return (
    <>
      {/* Floating Call Button (Left Side) */}
      <div className="flex fixed left-3 sm:left-5 bottom-20 sm:bottom-8 z-40">
        <motion.a
          href={COMPANY.callLink}
          className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center text-white shadow-2xl group relative bg-gradient-to-br from-[#D4813A] to-[#E8974F] cursor-pointer"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(212,129,58,0.45)',
              '0 0 0 14px rgba(212,129,58,0)',
              '0 0 0 0 rgba(212,129,58,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Call Now"
        >
          <Phone size={20} className="sm:hidden" />
          <Phone size={22} className="hidden sm:block" />
          <span className="hidden sm:block absolute left-full ml-3 bg-dark text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg font-medium">
            Call Now ({COMPANY.phone})
          </span>
        </motion.a>
      </div>

      {/* Floating WhatsApp Button (Right Side) */}
      <div className="flex fixed right-3 sm:right-5 bottom-20 sm:bottom-8 z-40">
        <motion.a
          href={COMPANY.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center text-white shadow-2xl group relative bg-[#25D366] cursor-pointer"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(37,211,102,0.45)',
              '0 0 0 14px rgba(37,211,102,0)',
              '0 0 0 0 rgba(37,211,102,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon size={20} className="sm:hidden" />
          <WhatsAppIcon size={24} className="hidden sm:block" />
          <span className="hidden sm:block absolute right-full mr-3 bg-dark text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg font-medium">
            Chat on WhatsApp
          </span>
        </motion.a>
      </div>
    </>
  );
}
