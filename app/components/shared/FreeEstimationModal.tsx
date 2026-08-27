'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Building2,
  Home,
  Wrench,
  Sparkles,
  Phone,
  MessageCircle,
  CheckCircle2,
  MapPin,
  Ruler,
  User,
  ShieldCheck,
  Clock,
  Check,
  Copy,
  RotateCcw,
} from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';

// Project Types
const PROJECT_TYPES = [
  { id: 'Residential House', label: 'Residential', icon: Home },
  { id: 'Villa / Duplex', label: 'Villa / Duplex', icon: Sparkles },
  { id: 'Commercial Building', label: 'Commercial', icon: Building2 },
  { id: 'Renovation & Interior', label: 'Renovation', icon: Wrench },
];

// Area Options
const AREA_OPTIONS = [
  { id: '800 - 1,200 sq.ft', label: '800 - 1,200 sq.ft (2 BHK)' },
  { id: '1,200 - 2,000 sq.ft', label: '1,200 - 2,000 sq.ft (3 BHK)' },
  { id: '2,000 - 3,500 sq.ft', label: '2,000 - 3,500 sq.ft (Duplex/Villa)' },
  { id: '3,500+ sq.ft', label: '3,500+ sq.ft (Commercial/Large)' },
];

// Locations
const LOCATIONS = [
  'Udumalpet',
  'Pollachi',
  'Tiruppur',
  'Dharapuram',
  'Coimbatore',
  'Madathukulam',
  'Other',
];

interface FormData {
  name: string;
  phone: string;
  projectType: string;
  area: string;
  location: string;
}

const initialForm: FormData = {
  name: '',
  phone: '',
  projectType: 'Residential House',
  area: '1,200 - 2,000 sq.ft',
  location: 'Udumalpet',
};

export default function FreeEstimationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsSubmitted(false);
    setIsOpen(true);
  }, []);

  // Auto popup on website load after short delay
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('grn_free_estimate_modal_seen');

    let timer: NodeJS.Timeout;
    if (!hasSeenModal) {
      timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('grn_free_estimate_modal_seen', 'true');
      }, 2500);
    }

    const handleCustomOpen = () => openModal();
    window.addEventListener('open-free-estimate-modal', handleCustomOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-free-estimate-modal', handleCustomOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openModal, closeModal]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your mobile number';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Enter valid 10-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    return `🏛️ *GRN CONSTRUCTION - FREE ESTIMATE REQUEST*
━━━━━━━━━━━━━━━━━━━━
👤 *CLIENT DETAILS:*
• *Name:* ${formData.name.trim()}
• *Phone:* ${formData.phone.trim()}
• *Location:* ${formData.location}

🏗️ *REQUIREMENT:*
• *Project Type:* ${formData.projectType}
• *Approx Built-up Area:* ${formData.area}

🎁 *INCLUDED BENEFITS:*
✓ Free BOQ & Milestone Cost Estimation
✓ Free 2D Floor Plan Consultation
✓ Authentic Brand Rate Card (TATA Steel, UltraTech)
━━━━━━━━━━━━━━━━━━━━
_Requested via GRN Website Free Estimate_`;
  };

  const handleSubmitWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    const message = formatWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${COMPANY.phoneRaw}?text=${encoded}`;

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }

    setIsSubmitted(true);
  };

  const handleCopy = () => {
    const message = formatWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-dark/75 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Compact Modal Container (No vertical scrolling needed) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-[540px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden z-10 my-auto"
          >
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-light to-secondary" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3.5 right-3.5 z-20 w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-dark flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>

            {/* Inner Content */}
            <div className="p-4 sm:p-5 sm:px-6">
              {/* Header */}
              <div className="text-center space-y-1 mb-3.5 pr-4">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10.5px] font-bold uppercase tracking-wider">
                  <span>Free Construction Estimation</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-dark font-display tracking-tight leading-tight">
                  Get Your Free{' '}
                  <span className="text-primary">Building Estimate</span>
                </h3>

                <p className="text-[11.5px] sm:text-xs text-neutral-500 leading-snug">
                  Fill in your details for a transparent cost plan &amp; free 2D layout consultation.
                </p>
              </div>

              {isSubmitted ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-4 ring-emerald-50">
                    <CheckCircle2 size={26} />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-base font-bold text-dark font-display">
                      Estimate Request Ready!
                    </h4>
                    <p className="text-xs text-neutral-600">
                      Thank you, <strong>{formData.name}</strong>. Connect with our engineering desk on WhatsApp to get your detailed quote.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-xs text-neutral-700 space-y-1">
                    <p><strong className="text-dark">Project:</strong> {formData.projectType} ({formData.area})</p>
                    <p><strong className="text-dark">Location:</strong> {formData.location}</p>
                    <p><strong className="text-dark">Phone:</strong> {formData.phone}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSubmitWhatsApp()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
                    >
                      <MessageCircle size={15} />
                      Open WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-dark text-xs font-medium transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      {isCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="pt-1 flex items-center justify-center gap-3 text-[11px] text-neutral-500">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 hover:text-dark font-medium cursor-pointer"
                    >
                      <RotateCcw size={11} />
                      Another estimate
                    </button>
                    <span>•</span>
                    <a
                      href={COMPANY.callLink}
                      className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                    >
                      <Phone size={11} />
                      {COMPANY.phone}
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Compact Form */
                <form noValidate onSubmit={handleSubmitWhatsApp} className="space-y-3">
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User
                          size={13}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
                        />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your Name"
                          className={`w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                            errors.name ? 'border-red-500 bg-red-50/20' : 'border-neutral-200'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[10px] text-red-500 mt-0.5 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone
                          size={13}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className={`w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                            errors.phone ? 'border-red-500 bg-red-50/20' : 'border-neutral-200'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[10px] text-red-500 mt-0.5 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Project Type (Compact Pills) */}
                  <div>
                    <label className="block text-[11px] font-semibold text-dark mb-1">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {PROJECT_TYPES.map((type) => {
                        const Icon = type.icon;
                        const isSelected = formData.projectType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleInputChange('projectType', type.id)}
                            className={`px-2 py-1.5 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[11px] ${
                              isSelected
                                ? 'border-primary bg-primary/10 text-primary font-semibold shadow-2xs'
                                : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100/80 text-neutral-700'
                            }`}
                          >
                            <Icon size={12} className={isSelected ? 'text-primary' : 'text-neutral-500'} />
                            <span className="truncate">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 3: Built-up Area & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Area */}
                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Built-up Area
                      </label>
                      <div className="relative">
                        <Ruler
                          size={13}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                        />
                        <select
                          value={formData.area}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                          className="w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border border-neutral-200 text-xs text-dark bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
                        >
                          {AREA_OPTIONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Site Location
                      </label>
                      <div className="relative">
                        <MapPin
                          size={13}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                        />
                        <select
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border border-neutral-200 text-xs text-dark bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
                        >
                          {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Strip */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200/70 text-[10.5px] text-neutral-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-primary" /> 24-Hr BOQ Plan
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Sparkles size={11} className="text-secondary" /> Free 2D Layout
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={11} className="text-emerald-600" /> Zero Hidden Cost
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1 space-y-1.5">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all duration-150 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle size={16} className="shrink-0" />
                      <span>Get Free Estimate on WhatsApp</span>
                    </button>

                    <div className="flex items-center justify-between text-[10.5px] text-neutral-500 px-0.5">
                      <span>🔒 100% Free &amp; Confidential</span>
                      <a
                        href={COMPANY.callLink}
                        className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                      >
                        <Phone size={10} /> Call {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
