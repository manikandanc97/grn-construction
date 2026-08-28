'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileCheck,
  Building,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  User,
  ShieldCheck,
  Clock,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  FileText,
  Layers,
  Compass,
} from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';

const APPROVAL_SERVICES = [
  { id: 'DTCP / LPA Approval', label: 'DTCP / LPA Approval', desc: 'Directorate of Town & Country Planning' },
  { id: 'Panchayat / Municipality Approval', label: 'Panchayat / Municipality', desc: 'Local body building permission' },
  { id: '2D & 3D Architectural Blueprints', label: '2D / 3D Floor Plan & Elevation', desc: 'Architectural drawings & working plans' },
  { id: 'Bank Loan Estimation & Valuation', label: 'Bank Loan Estimation', desc: 'Engineered BOQ & valuation for housing loans' },
  { id: 'Structural Stability Certificate', label: 'Structural Design & Stability', desc: 'Column design, soil test & civil stability' },
  { id: 'Patta / Land Regularization', label: 'Patta & Layout Regularization', desc: 'Unapproved plot regularisation & subdivision' },
];

const LOCALITY_OPTIONS = [
  'Udumalpet Municipality',
  'Pollachi Area',
  'Tiruppur District',
  'Dharapuram Area',
  'Madathukulam Panchayat',
  'Gudimangalam Area',
  'Other / Nearby',
];

interface ApprovalFormData {
  name: string;
  phone: string;
  serviceType: string;
  plotArea: string;
  locality: string;
  notes: string;
}

const initialApprovalForm: ApprovalFormData = {
  name: '',
  phone: '',
  serviceType: 'DTCP / LPA Approval',
  plotArea: '',
  locality: 'Udumalpet Municipality',
  notes: '',
};

export default function PlanApprovalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ApprovalFormData>(initialApprovalForm);
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

  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener('open-plan-approval-modal', handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-plan-approval-modal', handleOpen);
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

  const handleInputChange = (field: keyof ApprovalFormData, value: string) => {
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
      newErrors.phone = 'Please enter your phone number';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Enter valid 10-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    return `🏛️ *GRN CONSTRUCTION - PLAN APPROVAL & BLUEPRINTS CONSULTATION*
━━━━━━━━━━━━━━━━━━━━
👤 *CLIENT DETAILS:*
• *Name:* ${formData.name.trim()}
• *Phone:* ${formData.phone.trim()}
• *Location:* ${formData.locality}
${formData.plotArea.trim() ? `• *Plot Size / Built-up Area:* ${formData.plotArea.trim()}` : ''}

📋 *SERVICE REQUIRED:*
• *Work Type:* ${formData.serviceType}
${formData.notes.trim() ? `• *Additional Notes:* ${formData.notes.trim()}` : ''}

🏛️ *SCOPE OF ASSISTANCE:*
✓ Certified Engineer Blueprints & 2D/3D Drawings
✓ Statutory DTCP, LPA & Local Panchayat/Municipality Compliance
✓ Faster Sanctions & Transparent Paperwork
━━━━━━━━━━━━━━━━━━━━
_Submitted via GRN Website Plan Approval Portal_`;
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
    setFormData(initialApprovalForm);
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-[580px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden z-10 my-auto"
          >
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-primary to-primary-dark" />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3.5 right-3.5 z-20 w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-dark flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>

            {/* Content Body */}
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="text-center space-y-1 mb-4 pr-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-dark text-[10.5px] font-bold uppercase tracking-wider">
                  <FileCheck size={12} className="text-secondary" />
                  <span>Statutory &amp; Architectural Services</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-dark font-display tracking-tight leading-tight">
                  Plan Approval &amp; <span className="text-secondary">Blueprints</span>
                </h3>

                <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                  DTCP approvals, Panchayat/Municipality sanctions, 2D/3D floor layouts &amp; bank loan estimates prepared by certified civil engineers.
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
                      Plan Approval Inquiry Compiled!
                    </h4>
                    <p className="text-xs text-neutral-600">
                      Thank you, <strong>{formData.name}</strong>. Connect with our municipal liaison engineer directly on WhatsApp.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-xs text-neutral-700 space-y-1">
                    <p><strong className="text-dark">Service:</strong> {formData.serviceType}</p>
                    <p><strong className="text-dark">Locality:</strong> {formData.locality}</p>
                    <p><strong className="text-dark">Phone:</strong> {formData.phone}</p>
                    {formData.plotArea && <p><strong className="text-dark">Plot Size:</strong> {formData.plotArea}</p>}
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
                      New Inquiry
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
                /* Plan Approval Form */
                <form noValidate onSubmit={handleSubmitWhatsApp} className="space-y-3.5">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-[11.5px] font-semibold text-dark mb-1.5">
                      Select Plan Approval / Drawing Service <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {APPROVAL_SERVICES.map((srv) => {
                        const isSelected = formData.serviceType === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleInputChange('serviceType', srv.id)}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-center ${
                              isSelected
                                ? 'border-secondary bg-secondary/10 text-secondary-dark ring-1 ring-secondary/20 shadow-2xs font-semibold'
                                : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/70 text-neutral-700'
                            }`}
                          >
                            <span className="text-xs font-bold leading-tight">{srv.label}</span>
                            <span className="text-[10px] text-neutral-500 leading-tight mt-0.5">{srv.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your Name"
                          className={`w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all ${
                            errors.name ? 'border-red-500 bg-red-50/20' : 'border-neutral-200'
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-red-500 mt-0.5 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className={`w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all ${
                            errors.phone ? 'border-red-500 bg-red-50/20' : 'border-neutral-200'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-500 mt-0.5 font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Locality & Plot Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Jurisdiction / Locality
                      </label>
                      <div className="relative">
                        <MapPin size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                        <select
                          value={formData.locality}
                          onChange={(e) => handleInputChange('locality', e.target.value)}
                          className="w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border border-neutral-200 text-xs text-dark bg-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all cursor-pointer"
                        >
                          {LOCALITY_OPTIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-dark mb-1">
                        Plot Size / Dimensions <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Compass size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          value={formData.plotArea}
                          onChange={(e) => handleInputChange('plotArea', e.target.value)}
                          placeholder="e.g. 30x40, 1200 sq.ft, 3.5 cents"
                          className="w-full pl-7 pr-2.5 py-1.5 sm:py-2 rounded-lg border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlights Strip */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200/70 text-[10.5px] text-neutral-600 font-medium">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={11} className="text-secondary" /> DTCP &amp; Panchayat Approved
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Sparkles size={11} className="text-primary" /> Vaastu Compliant
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-emerald-600" /> Fast Clearance
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1 space-y-1.5">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all duration-150 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle size={16} className="shrink-0" />
                      <span>Consult on WhatsApp for Plan Approval</span>
                    </button>

                    <div className="flex items-center justify-between text-[10.5px] text-neutral-500 px-0.5">
                      <span>🏛️ 100% Legal &amp; Architectural Guidance</span>
                      <a
                        href={COMPANY.callLink}
                        className="inline-flex items-center gap-1 text-secondary-dark hover:underline font-semibold"
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
