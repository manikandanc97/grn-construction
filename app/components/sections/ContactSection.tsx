'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Compass,
  CheckCircle2,
  FileText,
  Navigation,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import { COMPANY } from '@/app/lib/constants';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set([headerRef.current, cardsRef.current, mapCardRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: EASING.power3Out },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75 },
          0
        );
      }

      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.15
        );
      }

      if (mapCardRef.current) {
        tl.fromTo(
          mapCardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.25
        );
      }
    },
    { scope: sectionRef }
  );

  const handleScrollToRequirements = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('requirements');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#requirements';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F8FA] to-[#FAF8F5] text-slate-900 py-12 sm:py-14 lg:py-16 border-t border-slate-200/80 overflow-hidden"
    >
      {/* Dynamic architectural blueprint dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1A6B7C 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="opacity-0 text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-sm backdrop-blur-sm">
            <Sparkles size={12} className="text-secondary shrink-0" />
            <span>CONNECT WITH OUR CIVIL ENGINEERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-display text-slate-900 tracking-tight leading-[1.18]">
            Let’s Build Something{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h2>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Visit our Udumalpet office or get in touch directly with our civil engineering team for site visits, structural consultations, and project planning.
          </p>
        </div>

        {/* Top Quick-Action Channels Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6 sm:mb-7">
          {/* Phone Call Card */}
          <a
            href={COMPANY.callLink}
            className="group flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border border-white/20"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <Phone size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-white/80 truncate">
                  Direct Line
                </span>
                <span className="block text-xs sm:text-[13px] font-bold text-white leading-tight truncate">
                  Call Engineer
                </span>
              </div>
            </div>
            <ArrowRight size={14} className="text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0 hidden sm:block" />
          </a>

          {/* WhatsApp Chat Card */}
          <a
            href={COMPANY.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border border-white/20"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <MessageCircle size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-white/90 truncate">
                  Instant Support
                </span>
                <span className="block text-xs sm:text-[13px] font-bold text-white leading-tight truncate">
                  WhatsApp Chat
                </span>
              </div>
            </div>
            <ArrowRight size={14} className="text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0 hidden sm:block" />
          </a>

          {/* Email Support Card */}
          <a
            href={`mailto:${COMPANY.email}`}
            className="group flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl bg-primary hover:bg-primary-light text-white shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border border-white/20"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <Mail size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-white/80 truncate">
                  Email Support
                </span>
                <span className="block text-xs sm:text-[13px] font-bold text-white leading-tight truncate">
                  Send Email
                </span>
              </div>
            </div>
            <ArrowRight size={14} className="text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0 hidden sm:block" />
          </a>

          {/* Location Directions */}
          <a
            href={COMPANY.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border border-white/10"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <Navigation size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-white/80 truncate">
                  Google Maps
                </span>
                <span className="block text-xs sm:text-[13px] font-bold text-white leading-tight truncate">
                  Get Directions
                </span>
              </div>
            </div>
            <ExternalLink size={14} className="text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 hidden sm:block" />
          </a>
        </div>

        {/* 2-Column Responsive Layout: Contact Details & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* LEFT: Office Information (5 cols) */}
          <div
            ref={cardsRef}
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-md opacity-0"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                  Engineering Office Details
                </h3>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Open Mon - Sat
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                  <MapPin size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Main Office Address
                  </span>
                  <p className="text-xs sm:text-[13px] text-slate-800 font-medium leading-relaxed">
                    {COMPANY.address.full}
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Consultation &amp; Queries
                  </span>
                  <a
                    href={COMPANY.callLink}
                    className="text-xs sm:text-sm text-slate-900 font-bold hover:text-primary transition-colors block"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 text-slate-600">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Email Enquiries
                  </span>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-xs sm:text-[13px] text-slate-800 font-medium hover:text-primary transition-colors break-all block"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-600">
                  <Clock size={15} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Consultation Hours
                  </span>
                  <p className="text-xs sm:text-[12.5px] text-slate-700 leading-snug">
                    <span className="font-semibold text-slate-900">Mon – Sat:</span> 9:00 AM – 7:00 PM <br />
                    <span className="text-slate-500 text-[11px]"><span className="font-semibold text-slate-700">Sunday:</span> By Pre-scheduled Appointment</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Licensed Civil Engineering Firm</span>
              <span className="text-primary font-semibold">Udumalpet</span>
            </div>
          </div>

          {/* RIGHT: Large Interactive Google Map Card (7 cols) */}
          <div
            ref={mapCardRef}
            className="lg:col-span-7 rounded-2xl bg-white text-slate-900 p-3.5 sm:p-4 shadow-md border border-slate-200/90 flex flex-col justify-between relative opacity-0 min-h-[300px] lg:min-h-[330px]"
          >
            {/* Map Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100 px-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
                  <Compass size={14} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-display text-slate-900">
                    GRN Construction Studio Map
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Vakil Nagarajan Street, Udumalpet
                  </p>
                </div>
              </div>

              <a
                href={COMPANY.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary text-[11px] font-bold border border-primary/25 transition-colors self-start sm:self-auto"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={11} />
              </a>
            </div>

            {/* Embedded Iframe Container */}
            <div className="flex-1 w-full rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 min-h-[220px] sm:min-h-[240px]">
              <iframe
                src={COMPANY.mapEmbedUrl}
                width="100%"
                height="100%"
                className="border-0 w-full h-full min-h-[220px] sm:min-h-[240px] filter contrast-[1.02]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GRN Construction Location Map - Udumalpet"
              />
            </div>

            {/* Bottom Info Footnote */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 px-1 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                Serving Udumalpet, Pollachi, Dharapuram &amp; Tiruppur Dt.
              </span>
              <span className="text-[10px] text-slate-400">
                Near Uma Traders
              </span>
            </div>
          </div>
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="mt-6 sm:mt-8 rounded-xl bg-white border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-around gap-3 text-center sm:text-left text-xs text-slate-700">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-secondary shrink-0" />
              <span><strong>100% Free</strong> Site Inspection &amp; Consultation</span>
            </div>
            <div className="hidden md:block w-px h-3.5 bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-primary shrink-0" />
              <span><strong>Licensed</strong> Civil Engineers &amp; Architects</span>
            </div>
            <div className="hidden md:block w-px h-3.5 bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-amber-600 shrink-0" />
              <span><strong>Quick Response</strong> via WhatsApp &amp; Direct Phone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
