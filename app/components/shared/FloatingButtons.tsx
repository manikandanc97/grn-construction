'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingButtons() {
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
    </>
  );
}
