'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Building,
  User,
  Send,
  Check,
  Copy,
  RotateCcw,
  Compass,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import { COMPANY } from '@/app/lib/constants';

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

const PROJECT_TYPE_OPTIONS = [
  'Residential Villa / House',
  'Commercial Building',
  'Turnkey Design & Build',
  'Interior Architecture & Fit-out',
  'Structural Renovation & Extension',
  'Industrial / Layout Development',
  'Other Construction Enquiry',
];

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    projectType: 'Residential Villa / House',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set([headerRef.current, leftCardRef.current, rightCardRef.current], {
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

      if (leftCardRef.current) {
        tl.fromTo(
          leftCardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.15
        );
      }

      if (rightCardRef.current) {
        tl.fromTo(
          rightCardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.25
        );
      }
    },
    { scope: sectionRef }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateWhatsAppMessage = () => {
    return `🏛️ *NEW PROJECT ENQUIRY - GRN CONSTRUCTION*
━━━━━━━━━━━━━━━━━━━━
👤 *CLIENT DETAILS:*
• *Name:* ${form.name.trim()}
• *Phone:* ${form.phone.trim()}
${form.email.trim() ? `• *Email:* ${form.email.trim()}\n` : ''}
📐 *PROJECT TYPE:*
• ${form.projectType || 'General Construction Enquiry'}

📝 *PROJECT REQUIREMENTS:*
${form.message.trim() ? form.message.trim() : 'I would like to schedule a site consultation and discuss project estimation.'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via GRN Construction Website_`;
  };

  const getWhatsAppUrl = () => {
    const message = generateWhatsAppMessage();
    return `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const whatsappUrl = getWhatsAppUrl();

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = whatsappUrl;
    }

    setSubmitted(true);
    setLoading(false);
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F8FA] to-[#FAF8F5] text-slate-900 py-16 sm:py-20 lg:py-24 border-t border-slate-200/80 overflow-hidden"
    >
      {/* Dynamic architectural blueprint dot grid */}
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
        <div ref={headerRef} className="opacity-0 text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm backdrop-blur-sm">
            <Sparkles size={13} className="text-secondary shrink-0" />
            <span>CONNECT WITH OUR CIVIL ENGINEERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[42px] font-extrabold font-display text-slate-900 tracking-tight leading-[1.18]">
            Let’s Build Something{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-[16px] text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Get in touch for complimentary site inspections, architectural consultations, and transparent cost estimates in Udumalpet.
          </p>
        </div>

        {/* Unified 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT: Contact & Studio Info Hub (5 cols) */}
          <div
            ref={leftCardRef}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-200/50 relative overflow-hidden opacity-0"
          >
            {/* Top Info */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    Direct Contact Hub
                  </h3>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live & Active
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connect instantly through direct line or WhatsApp messaging.
                </p>
              </div>

              {/* Quick Communication Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={COMPANY.callLink}
                  className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-md shadow-secondary/20 hover:shadow-secondary/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 overflow-hidden border border-white/20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <Phone size={17} className="text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider font-semibold text-white/80">
                        Phone Call
                      </span>
                      <span className="block text-[13.5px] font-bold text-white leading-tight">
                        Call Direct
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={15} className="text-white/80 group-hover:translate-x-1 transition-transform shrink-0" />
                </a>

                <a
                  href={COMPANY.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 overflow-hidden border border-white/20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <MessageCircle size={17} className="text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider font-semibold text-white/90">
                        Instant Chat
                      </span>
                      <span className="block text-[13.5px] font-bold text-white leading-tight">
                        WhatsApp
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={15} className="text-white/80 group-hover:translate-x-1 transition-transform shrink-0" />
                </a>
              </div>

              {/* Information Rows */}
              <div className="space-y-3.5 pt-2 border-t border-slate-100">
                {/* Address */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary group-hover:scale-105 transition-transform">
                    <MapPin size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Main Engineering Office
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                      {COMPANY.address.full}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mt-0.5 text-secondary group-hover:scale-105 transition-transform">
                    <Phone size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Primary Contact Number
                    </span>
                    <a
                      href={COMPANY.callLink}
                      className="text-xs sm:text-[13.5px] text-slate-900 font-bold hover:text-primary transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 text-slate-600 group-hover:scale-105 transition-transform">
                    <Mail size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Email Inquiries
                    </span>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-xs sm:text-[13px] text-slate-700 font-medium hover:text-primary transition-colors break-all"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-600 group-hover:scale-105 transition-transform">
                    <Clock size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Consultation Hours
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-snug">
                      Mon – Sat: 9:00 AM – 7:00 PM <br />
                      <span className="text-slate-500 text-[11.5px]">Sunday: By Appointment</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Mini-Map Card at bottom of Left Column */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative group shadow-sm">
                <div className="flex items-center justify-between px-3.5 py-2 bg-slate-100/90 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Compass size={14} className="text-secondary" />
                    <span className="text-xs font-bold text-slate-700">
                      Udumalpet Location Map
                    </span>
                  </div>
                  <a
                    href={COMPANY.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
                <div className="w-full h-[130px] relative">
                  <iframe
                    src={COMPANY.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    className="border-0 w-full h-full filter contrast-[1.02]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GRN Construction Location Map"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Project Consultation Form (7 cols) */}
          <div
            ref={rightCardRef}
            className="lg:col-span-7 rounded-3xl bg-white text-slate-900 p-6 sm:p-7 lg:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/90 flex flex-col relative opacity-0"
          >
            {!submitted ? (
              <div className="flex flex-col h-full justify-between">
                {/* Form Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                      Project Consultation Form
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Fill out your details to receive an engineer-backed response within 24 hours.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold shrink-0 self-start sm:self-auto">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    Free Consultation
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-4 flex-1 flex flex-col">
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Your Full Name <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Manikandan"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email & Project Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Project Scope / Type <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <select
                            name="projectType"
                            required
                            value={form.projectType}
                            onChange={handleChange}
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all appearance-none cursor-pointer"
                          >
                            {PROJECT_TYPE_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex-1 flex flex-col min-h-[130px]">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Project Details & Site Requirements
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Briefly describe your land location, square footage, expected floors, or timeline..."
                        className="w-full flex-1 min-h-[130px] p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit CTA & Trust Footer */}
                  <div className="space-y-3 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full group relative inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl px-6 py-3 font-bold text-base text-white bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-md shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer overflow-hidden"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                          </svg>
                          Preparing WhatsApp Details...
                        </span>
                      ) : (
                        <>
                          <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Submit & Chat on WhatsApp</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {/* Trust guarantees bar */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2.5 text-[12px] text-slate-500 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                        <ShieldCheck size={14} className="text-secondary" />
                        100% Free Initial Estimate
                      </span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span>Site Visits in Udumalpet & Region</span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span>No Obligation</span>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Success confirmation state */
              <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 my-auto space-y-5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
                  <CheckCircle2 size={36} />
                </div>

                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-2xl font-bold font-display text-slate-900">
                    Consultation Brief Ready!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Thank you, <strong className="text-slate-900">{form.name}</strong>. Your project outline is ready to send. Connect with our engineering team directly via WhatsApp.
                  </p>
                </div>

                <div className="w-full max-w-md p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2 mx-auto">
                  <p><strong className="text-slate-900">Name:</strong> {form.name}</p>
                  <p><strong className="text-slate-900">Phone:</strong> {form.phone}</p>
                  {form.email && <p><strong className="text-slate-900">Email:</strong> {form.email}</p>}
                  <p><strong className="text-slate-900">Project Type:</strong> {form.projectType}</p>
                  {form.message && (
                    <p className="pt-2 border-t border-slate-200">
                      <strong className="text-slate-900">Details:</strong> {form.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer hover:-translate-y-0.5"
                  >
                    <MessageCircle size={17} />
                    Open WhatsApp Chat
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    {isCopied ? 'Copied to Clipboard' : 'Copy Brief'}
                  </button>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        phone: '',
                        email: '',
                        projectType: 'Residential Villa / House',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    Start another enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


