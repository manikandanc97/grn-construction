import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Star,
} from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/app/lib/constants';

// Inline SVG social icons (lucide-react dropped brand icons in v0.400+)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const StarIcon = () => (
  <Star size={18} className="text-yellow-400 fill-yellow-400" />
);

const SERVICES_LIST = [
  'Building Construction',
  'House Construction',
  'Commercial Construction',
  'Interior Design',
  'Renovation',
  'Waterproofing',
  'Painting',
  'Civil Engineering',
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0F1923] to-[#1C2B38]">
      {/* Top decorative line */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-24 pb-36 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-white/20">
                <Image src="/logo.jpg" alt="GRN Construction" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-white text-[22px] font-display">GRN Construction</p>
                <p className="text-white/50 text-[14px]">Builders &amp; Contractors</p>
              </div>
            </div>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8">
              Trusted construction company in Udumalpet with 10+ years of experience.
              Building dreams into reality with quality, integrity and innovation.
            </p>
            {/* Rating badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-yellow-400/30 bg-yellow-400/10 mb-8">
              <StarIcon />
              <div>
                <p className="text-white font-bold text-[16px]">4.9 Rating</p>
                <p className="text-white/50 text-[14px]">41 Google Reviews</p>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { href: COMPANY.social.facebook, Icon: FacebookIcon, label: 'Facebook' },
                { href: COMPANY.social.instagram, Icon: InstagramIcon, label: 'Instagram' },
                { href: COMPANY.social.youtube, Icon: YoutubeIcon, label: 'YouTube' },
                { href: COMPANY.social.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-[20px] mb-6 font-display">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-secondary text-[16px] flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-[20px] mb-6 font-display">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES_LIST.map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-[16px] flex items-center gap-2 transition-colors group">
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-[20px] mb-6 font-display">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex gap-3 text-[16px]">
                <MapPin size={18} className="text-secondary mt-0.5 shrink-0" />
                <p className="text-white/60 leading-relaxed">{COMPANY.address.full}</p>
              </div>
              <a href={COMPANY.callLink} className="flex gap-3 text-[16px] group">
                <Phone size={18} className="text-secondary mt-0.5 shrink-0" />
                <span className="text-white/60 group-hover:text-secondary transition-colors">{COMPANY.phone}</span>
              </a>
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-[16px] group">
                <MessageCircle size={18} className="text-green-400 mt-0.5 shrink-0" />
                <span className="text-white/60 group-hover:text-green-400 transition-colors">Chat on WhatsApp</span>
              </a>
              <div className="flex gap-3 text-[16px]">
                <Clock size={18} className="text-secondary mt-0.5 shrink-0" />
                <div className="text-white/60">
                  <p>Mon-Fri: 9 AM - 7 PM</p>
                  <p>Sat: 9 AM - 5 PM</p>
                  <p>Sun: By Appointment</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={COMPANY.callLink}
              className="mt-8 inline-flex min-h-[48px] lg:min-h-[52px] items-center justify-center gap-3 rounded-[14px] px-8 py-4 font-semibold transition-all duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] bg-gradient-to-br from-secondary to-secondary-light text-white shadow-[0_8px_24px_rgba(212,129,58,0.25)] hover:shadow-[0_12px_32px_rgba(212,129,58,0.35)] hover:-translate-y-1 w-full text-[16px]"
            >
              <Phone size={20} />
              Get Free Quote
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-white/40 text-[14px]">
            Copyright {new Date().getFullYear()} GRN Construction. All rights reserved.
          </p>
          <p className="text-white/40 text-[14px] flex items-center gap-1.5">
            Made with <Heart size={12} className="text-red-400 fill-red-400" /> in Udumalpet, Tamil Nadu
          </p>
          <p className="text-white/40 text-[14px]">
            Udumalpet, Tamil Nadu - 642126
          </p>
        </div>
      </div>
    </footer>
  );
}
