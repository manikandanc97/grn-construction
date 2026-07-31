'use client';

import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';

export default function MobileAppBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-white/5 bg-dark/95 px-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:hidden"
    >
      {/* Logo + Name */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shadow-sm shrink-0">
          <Image
            src="/logo.jpg"
            alt="GRN Construction"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm leading-tight font-display truncate">GRN Construction</p>
          <p className="text-white/60 text-[9px] tracking-wide truncate">Builders & Contractors</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center shrink-0 ml-2">
        <a
          href={COMPANY.callLink}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-br from-secondary to-secondary-light px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all"
          aria-label="Call Now"
        >
          <Phone size={13} />
          Call
        </a>
      </div>
    </div>
  );
}
