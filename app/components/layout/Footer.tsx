'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import { COMPANY } from '@/app/lib/constants';

// Inline SVG social icons
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

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES_LINKS = [
  { label: 'Residential Construction', href: '#services' },
  { label: 'Commercial Construction', href: '#services' },
  { label: 'Renovation', href: '#services' },
  { label: 'Turnkey Projects', href: '#services' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      if (prefersReducedMotion()) {
        gsap.set([contentRef.current?.children, bottomBarRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: EASING.power3Out },
      });

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          0
        );
      }

      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.25
        );
      }
    },
    { scope: footerRef }
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = 75;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0B131D] text-white border-t border-white/[0.08]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-16 sm:pt-20 pb-28 sm:pb-14">
        {/* Main 4-Column Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-10 pb-12 sm:pb-14"
        >
          {/* COLUMN 1: BRAND (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between opacity-0">
            <div>
              {/* Brand Logo & Name */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="inline-flex items-center gap-3 group"
              >
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/20 bg-white/5 transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <Image
                    src="/logo.jpg"
                    alt="GRN Construction"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-[16px] tracking-tight font-display leading-snug">
                    GRN Construction
                  </p>
                  <p className="text-secondary text-[11.5px] font-semibold uppercase tracking-wider">
                    Builders &amp; Contractors
                  </p>
                </div>
              </a>

              {/* 2–3 Line Description */}
              <p className="mt-4 text-white/70 text-[13px] leading-relaxed max-w-sm">
                Premier construction and architectural builders in Udumalpet. Delivering high-quality residential, commercial, and renovation projects with integrity and precision.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-6">
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
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-secondary hover:border-secondary/40 hover:bg-white/[0.04] transition-all duration-200 border border-white/10"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (Span 2) */}
          <div className="lg:col-span-2 opacity-0">
            <h3 className="text-white font-bold text-[13px] uppercase tracking-wider mb-4 font-display">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/70 hover:text-secondary text-[13px] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-secondary shrink-0"
                    />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES (Span 3) */}
          <div className="lg:col-span-3 opacity-0">
            <h3 className="text-white font-bold text-[13px] uppercase tracking-wider mb-4 font-display">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    onClick={(e) => handleNavClick(e, service.href)}
                    className="text-white/70 hover:text-secondary text-[13px] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-secondary shrink-0"
                    />
                    <span>{service.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT & CTA (Span 3) */}
          <div className="lg:col-span-3 opacity-0 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-[13px] uppercase tracking-wider mb-4 font-display">
                Contact
              </h3>
              <div className="space-y-3 text-[13px]">
                <a
                  href={COMPANY.callLink}
                  className="flex items-center gap-2.5 text-white/70 hover:text-secondary transition-colors group"
                >
                  <Phone size={14} className="text-secondary shrink-0" />
                  <span>{COMPANY.phone}</span>
                </a>

                <a
                  href={COMPANY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/70 hover:text-[#25D366] transition-colors group"
                >
                  <MessageCircle size={14} className="text-secondary shrink-0 group-hover:text-[#25D366] transition-colors" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-white/70 hover:text-secondary transition-colors group"
                >
                  <Mail size={14} className="text-secondary shrink-0" />
                  <span className="truncate">{COMPANY.email}</span>
                </a>

                <div className="flex items-start gap-2.5 text-white/70">
                  <MapPin size={14} className="text-secondary shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {COMPANY.address.city}, {COMPANY.address.state} - {COMPANY.address.pin}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-1">
              <a
                href="#requirements"
                onClick={(e) => handleNavClick(e, '#requirements')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-secondary hover:bg-secondary-light transition-all duration-200 shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 group"
              >
                <span>Start Your Project</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Thin Divider */}
        <div className="h-px bg-white/[0.08] mb-6" />

        {/* BOTTOM: Clean Bar */}
        <div
          ref={bottomBarRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/50 opacity-0"
        >
          <p>© {new Date().getFullYear()} GRN Construction. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-white/80 transition-colors"
            >
              Privacy
            </a>
            <span className="text-white/20">•</span>
            <a
              href="#"
              className="hover:text-white/80 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
