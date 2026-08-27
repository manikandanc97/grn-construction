'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import { COMPANY, NAV_LINKS } from '@/app/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const desktopHeaderRef = useRef<HTMLElement>(null);
  const tabletHeaderRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    if (desktopHeaderRef.current) {
      gsap.fromTo(
        desktopHeaderRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: EASING.power3Out }
      );
    }
    if (tabletHeaderRef.current) {
      gsap.fromTo(
        tabletHeaderRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: EASING.power3Out }
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section
      const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
      for (const id of sections.reverse()) {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 75;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header
        ref={desktopHeaderRef}
        className={`fixed top-0 left-0 right-0 z-50 hidden lg:flex transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/90 py-2.5'
            : 'bg-dark/40 backdrop-blur-md border-b border-white/10 py-3.5'
        }`}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-white/20 group-hover:border-secondary/50 transition-colors">
              <Image
                src="/logo.jpg"
                alt="GRN Construction Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p
                className={`font-bold text-base leading-tight font-display tracking-tight transition-colors ${
                  scrolled ? 'text-dark' : 'text-white'
                }`}
              >
                GRN Construction
              </p>
              <p
                className={`text-xs font-semibold tracking-wider uppercase transition-colors ${
                  scrolled ? 'text-secondary' : 'text-white/80'
                }`}
              >
                Builders &amp; Contractors
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav
            className={`flex items-center gap-1 xl:gap-1.5 p-1 rounded-full border transition-all ${
              scrolled
                ? 'bg-slate-100/90 border-slate-200/90'
                : 'bg-white/[0.08] border-white/15'
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-normal transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-secondary text-white shadow-sm font-semibold'
                      : scrolled
                      ? 'text-neutral-700 hover:text-secondary hover:bg-black/5'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={COMPANY.callLink}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-secondary hover:bg-secondary-light px-4 py-2 text-[13px] font-semibold tracking-wide text-white shadow-[0_2px_10px_rgba(212,129,58,0.35)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(212,129,58,0.45)] hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Phone size={13.5} className="stroke-[2.5]" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Hamburger (mid-sized screens) */}
      <header
        ref={tabletHeaderRef}
        className={`fixed top-0 left-0 right-0 z-50 hidden sm:flex lg:hidden transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2.5'
            : 'bg-dark/50 backdrop-blur-md border-b border-white/10 py-3'
        }`}
      >
        <div className="w-full px-5 flex items-center justify-between">
          <Link
            href="#home"
            className="flex items-center gap-2.5"
            onClick={() => handleNavClick('#home')}
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/20">
              <Image src="/logo.jpg" alt="GRN" fill className="object-cover" priority />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-base leading-tight font-display ${
                  scrolled ? 'text-dark' : 'text-white'
                }`}
              >
                GRN Construction
              </span>
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  scrolled ? 'text-secondary' : 'text-white/80'
                }`}
              >
                Builders &amp; Contractors
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={COMPANY.callLink}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-secondary to-secondary-light px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
            >
              <Phone size={13} />
              <span>Call</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-1.5 rounded-lg border transition-colors ${
                scrolled
                  ? 'text-dark border-gray-200 hover:bg-gray-100'
                  : 'text-white border-white/20 hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100 transition-all duration-300">
            <div className="p-4 flex flex-col gap-1 max-w-md mx-auto">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-secondary/10 text-secondary font-semibold'
                        : 'text-neutral-800 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-gray-100">
                <a
                  href={COMPANY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2.5 shadow-sm transition-all"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={COMPANY.callLink}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-secondary to-secondary-light text-white text-xs font-semibold py-2.5 shadow-sm transition-all"
                >
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

