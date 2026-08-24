'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import {
  Building2,
  Home,
  Wrench,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Phone,
  CheckCircle2,
  MapPin,
  Coins,
  User,
  Mail,
  Check,
  Copy,
  RotateCcw,
  ShieldCheck,
  Clock,
  Award,
  ClipboardCheck,
} from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';

export interface ConsultationFormData {
  projectType: string;
  projectTypeOther: string;
  location: string;
  plotSize: string;
  budget: string;
  customBudget: string;
  timeline: string;
  details: string;
  name: string;
  phone: string;
  email: string;
}

const initialFormState: ConsultationFormData = {
  projectType: 'Residential',
  projectTypeOther: '',
  location: '',
  plotSize: '',
  budget: '₹40L - ₹75L',
  customBudget: '',
  timeline: '1 - 3 Months',
  details: '',
  name: '',
  phone: '',
  email: '',
};

const PROJECT_TYPES = [
  {
    id: 'Residential',
    title: 'Residential',
    description: 'Custom villas, independent houses & duplexes',
    icon: Home,
  },
  {
    id: 'Commercial',
    title: 'Commercial',
    description: 'Offices, showrooms, retail spaces & complexes',
    icon: Building2,
  },
  {
    id: 'Renovation',
    title: 'Renovation',
    description: 'Structural remodeling, extensions & modernization',
    icon: Wrench,
  },
  {
    id: 'Other',
    title: 'Other Project',
    description: 'Civil structures, layouts, roofing & specialized works',
    icon: Sparkles,
  },
];

const LOCATION_PRESETS = [
  'Udumalpet',
  'Pollachi',
  'Tiruppur',
  'Dharapuram',
  'Madathukulam',
  'Coimbatore',
];

const BUDGET_OPTIONS = [
  { id: '₹20L - ₹40L', label: '₹20L - ₹40L', sub: 'Standard compact homes' },
  { id: '₹40L - ₹75L', label: '₹40L - ₹75L', sub: 'Premium 3-4 BHK villas' },
  { id: '₹75L - ₹1.5 Cr', label: '₹75L - ₹1.5 Cr', sub: 'Luxury residences & duplexes' },
  { id: '₹1.5 Cr+', label: '₹1.5 Cr+', sub: 'Large estates & commercial builds' },
  { id: 'Custom / Need Estimate', label: 'Flexible / Need Estimate', sub: 'Engineering consultation required' },
];

const TIMELINE_OPTIONS = [
  { id: 'Immediate (< 1 Month)', label: 'Immediate', sub: 'Within 30 days' },
  { id: '1 - 3 Months', label: '1 - 3 Months', sub: 'Planning & approvals ready' },
  { id: '3 - 6 Months', label: '3 - 6 Months', sub: 'Preliminary design stage' },
  { id: 'Planning Phase (6+ Months)', label: '6+ Months', sub: 'Exploring feasibility & budgeting' },
];

const CONSULTATION_STEPS = [
  { id: 1, number: '01', title: 'Project' },
  { id: 2, number: '02', title: 'Location' },
  { id: 3, number: '03', title: 'Budget' },
  { id: 4, number: '04', title: 'Timeline' },
  { id: 5, number: '05', title: 'Contact' },
];

export default function ClientRequirementSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<ConsultationFormData>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set([headerRef.current, leftColRef.current, rightColRef.current], {
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

      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.15
        );
      }

      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.25
        );
      }
    },
    { scope: sectionRef }
  );

  const handleInputChange = (field: keyof ConsultationFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateStep = (step: number, updateErrors: boolean = true): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!form.projectType) {
        errors.projectType = 'Please select your project type';
      }
      if (form.projectType === 'Other' && !form.projectTypeOther.trim()) {
        errors.projectTypeOther = 'Please specify what you are planning';
      }
    }

    if (step === 2) {
      if (!form.location.trim()) {
        errors.location = 'Please specify the project location or city';
      }
    }

    if (step === 3) {
      if (!form.budget) {
        errors.budget = 'Please select an approximate budget';
      }
    }

    if (step === 4) {
      if (!form.timeline) {
        errors.timeline = 'Please select your expected timeline';
      }
    }

    if (step === 5) {
      if (!form.name.trim()) {
        errors.name = 'Please enter your full name';
      }
      if (!form.phone.trim()) {
        errors.phone = 'Please enter your phone number';
      } else if (form.phone.replace(/[^0-9]/g, '').length < 8) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    if (updateErrors) {
      setValidationErrors(errors);
    }
    return Object.keys(errors).length === 0;
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep === currentStep) return;

    if (targetStep < currentStep) {
      setValidationErrors({});
      setCurrentStep(targetStep);
      return;
    }

    // Moving forward: validate current step and intermediate steps
    for (let s = currentStep; s < targetStep; s++) {
      if (!validateStep(s, true)) {
        return;
      }
    }

    setValidationErrors({});
    setCurrentStep(targetStep);
  };

  const nextStep = () => {
    if (validateStep(currentStep, true)) {
      setValidationErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, CONSULTATION_STEPS.length));
    }
  };

  const prevStep = () => {
    setValidationErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const generateWhatsAppMessage = () => {
    const resolvedType =
      form.projectType === 'Other' && form.projectTypeOther
        ? `Other (${form.projectTypeOther})`
        : form.projectType;

    return `🏛️ *NEW PROJECT CONSULTATION REQUEST*
━━━━━━━━━━━━━━━━━━━━
👤 *CLIENT DETAILS:*
• *Name:* ${form.name}
• *Phone:* ${form.phone}
${form.email ? `• *Email:* ${form.email}` : ''}

📐 *PROJECT OVERVIEW:*
• *Planning:* ${resolvedType}
• *Location:* ${form.location}
${form.plotSize ? `• *Plot Size / Area:* ${form.plotSize}` : ''}
• *Budget Range:* ${form.budget}${form.customBudget ? ` (${form.customBudget})` : ''}
• *Expected Timeline:* ${form.timeline}

📝 *PROJECT NOTES:*
${form.details ? form.details : 'Requesting initial consultation and project discussion.'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via GRN Construction Project Consultation_`;
  };

  const getWhatsAppUrl = () => {
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${COMPANY.phoneRaw}?text=${encoded}`;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(currentStep)) return;

    const url = getWhatsAppUrl();
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }
    setSubmitted(true);
  };

  const handleCopy = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleReset = () => {
    setForm(initialFormState);
    setCurrentStep(1);
    setSubmitted(false);
    setValidationErrors({});
  };

  return (
    <section
      ref={sectionRef}
      id="requirements"
      className="relative bg-white py-16 md:py-20 lg:py-24 border-t border-slate-200/60 overflow-hidden"
    >
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#1A6B7C_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Title */}
        <div ref={headerRef} className="max-w-3xl mb-10 lg:mb-12 opacity-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm backdrop-blur-sm">
            <ClipboardCheck size={13} className="text-secondary shrink-0" />
            <span>START YOUR PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-dark font-display tracking-tight leading-[1.15]">
            Tell Us About{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Your Project.
            </span>
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-[16px] text-gray-600 font-normal leading-relaxed max-w-2xl">
            Share your building vision and requirement details for a personalized civil engineering consultation and transparent estimate.
          </p>
        </div>

        {/* Main 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: Strong Visual & Project Preview */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-neutral-50/50 p-6 sm:p-8 relative overflow-hidden opacity-0"
          >
            {/* Image Container with architectural framing */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 shadow-sm border border-neutral-200/80">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85&auto=format&fit=crop"
                alt="GRN Premium Construction Project"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
              
              {/* Image Floating Statement Tag */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-dark text-xs font-semibold shadow-sm">
                  <ShieldCheck size={14} className="text-primary" />
                  Free Initial Site Consultation
                </span>
                <p className="mt-2 text-white font-display font-medium text-sm sm:text-base leading-snug drop-shadow-sm">
                  &ldquo;From first idea to final handover.&rdquo;
                </p>
              </div>
            </div>

            {/* Value Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Award size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dark">Direct Engineer Oversight</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Personalized consultations with licensed civil engineers in Udumalpet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Coins size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dark">Transparent Material Estimates</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Clear milestone budgeting with zero hidden costs or surprise charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dark">Rapid 24-Hour Response</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Our team reviews your submission and provides preliminary project advice promptly.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Footer */}
            <div className="mt-8 pt-5 border-t border-neutral-200/70 flex items-center justify-between text-xs text-gray-600">
              <span>Need immediate assistance?</span>
              <a
                href={COMPANY.callLink}
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
              >
                <Phone size={13} />
                {COMPANY.phone}
              </a>
            </div>
          </div>

          {/* RIGHT: Modern Multi-Step Consultation Form */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative shadow-[0_2px_16px_rgba(0,0,0,0.03)] opacity-0"
          >
            {/* Minimal Numbered Progress Indicator */}
            {!submitted && (
              <div className="mb-8">
                <div className="flex items-center justify-between gap-1 sm:gap-2 pb-4 border-b border-neutral-100">
                  {CONSULTATION_STEPS.map((step) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleStepClick(step.id)}
                        className={`flex items-center gap-1.5 text-left transition-colors cursor-pointer py-1 ${
                          isActive
                            ? 'text-primary font-bold'
                            : isCompleted
                            ? 'text-neutral-700 font-medium hover:text-primary'
                            : 'text-neutral-400'
                        }`}
                      >
                        <span
                          className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-primary text-white'
                              : isCompleted
                              ? 'bg-neutral-100 text-neutral-800'
                              : 'bg-neutral-50 text-neutral-400'
                          }`}
                        >
                          {step.number}
                        </span>
                        <span className="hidden sm:inline text-xs">{step.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Form Steps */}
            {submitted ? (
              /* Success / Confirmation State */
              <div className="py-8 sm:py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto ring-8 ring-green-50/60">
                  <CheckCircle2 size={32} />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-2xl font-bold text-dark font-display">
                    Consultation Request Ready!
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Thank you, <strong className="text-dark">{form.name}</strong>. Your project details have been organized. Connect directly via WhatsApp or give us a quick call.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-xs text-gray-700 space-y-1.5 max-w-md mx-auto">
                  <p>
                    <strong className="text-dark">Project:</strong> {form.projectType}
                    {form.projectType === 'Other' && form.projectTypeOther ? ` (${form.projectTypeOther})` : ''}
                  </p>
                  <p><strong className="text-dark">Location:</strong> {form.location}</p>
                  <p><strong className="text-dark">Budget:</strong> {form.budget}</p>
                  <p><strong className="text-dark">Timeline:</strong> {form.timeline}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer hover:shadow hover:-translate-y-0.5"
                  >
                    <MessageCircle size={17} />
                    Open WhatsApp Chat
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-dark font-semibold text-sm transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    {isCopied ? 'Copied to Clipboard' : 'Copy Project Details'}
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-dark font-medium transition-colors"
                  >
                    <RotateCcw size={13} />
                    Start another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep === CONSULTATION_STEPS.length) {
                    handleSubmit(e);
                  } else {
                    nextStep();
                  }
                }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: What are you planning? */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 01
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            What are you planning?
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Choose the category that best describes your upcoming project.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {PROJECT_TYPES.map((type) => {
                            const isSelected = form.projectType === type.id;
                            const Icon = type.icon;

                            return (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => handleInputChange('projectType', type.id)}
                                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[96px] ${
                                  isSelected
                                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                                        isSelected ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'
                                      }`}
                                    >
                                      <Icon size={15} />
                                    </div>
                                    <span className="text-sm font-semibold text-dark">{type.title}</span>
                                  </div>
                                  <span
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                      isSelected
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-neutral-300'
                                    }`}
                                  >
                                    {isSelected && '✓'}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                  {type.description}
                                </p>
                              </button>
                            );
                          })}
                        </div>

                        {form.projectType === 'Other' && (
                          <div className="pt-2">
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Please specify your requirement
                            </label>
                            <input
                              type="text"
                              value={form.projectTypeOther}
                              onChange={(e) => handleInputChange('projectTypeOther', e.target.value)}
                              placeholder="Your requirement details"
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                            />
                            {validationErrors.projectTypeOther && (
                              <p className="text-xs text-red-500 mt-1 font-medium">
                                {validationErrors.projectTypeOther}
                              </p>
                            )}
                          </div>
                        )}

                        {validationErrors.projectType && (
                          <p className="text-xs text-red-500 font-medium">{validationErrors.projectType}</p>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 2: Project location */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 02
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Where is your project located?
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            We operate across Udumalpet, Pollachi, Tiruppur, and surrounding regions.
                          </p>
                        </div>

                        <div className="space-y-4 pt-1">
                          {/* Quick selection pills */}
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-2">
                              Select prominent region or type your specific area:
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {LOCATION_PRESETS.map((loc) => {
                                const isSelected = form.location === loc;
                                return (
                                  <button
                                    key={loc}
                                    type="button"
                                    onClick={() => handleInputChange('location', loc)}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-primary text-white'
                                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                    }`}
                                  >
                                    {loc}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Specific Location Input */}
                          <div>
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Specific Location / Site Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <MapPin
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                              <input
                                type="text"
                                value={form.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                placeholder="Your location / address"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                                  validationErrors.location ? 'border-red-500' : 'border-neutral-200'
                                }`}
                              />
                            </div>
                            {validationErrors.location && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{validationErrors.location}</p>
                            )}
                          </div>

                          {/* Plot area (optional) */}
                          <div>
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Plot Size / Built-up Area <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              value={form.plotSize}
                              onChange={(e) => handleInputChange('plotSize', e.target.value)}
                              placeholder="Your plot size / area"
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Approximate budget */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 03
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Approximate budget
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            This helps us tailor material specifications and architectural scope accurately.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {BUDGET_OPTIONS.map((item, index) => {
                            const isSelected = form.budget === item.id;
                            const isLast = index === BUDGET_OPTIONS.length - 1;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleInputChange('budget', item.id)}
                                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                                  isLast ? 'sm:col-span-2' : ''
                                } ${
                                  isSelected
                                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                                    : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                                }`}
                              >
                                <div>
                                  <p className="text-sm font-semibold text-dark">{item.label}</p>
                                  <p className="text-xs text-gray-500">{item.sub}</p>
                                </div>
                                <span
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                                    isSelected
                                      ? 'border-primary bg-primary text-white'
                                      : 'border-neutral-300'
                                  }`}
                                >
                                  {isSelected && '✓'}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {validationErrors.budget && (
                          <p className="text-xs text-red-500 font-medium">{validationErrors.budget}</p>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 4: Expected timeline */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 04
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Expected timeline
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            When are you planning to begin construction or ground-breaking?
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {TIMELINE_OPTIONS.map((item) => {
                            const isSelected = form.timeline === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleInputChange('timeline', item.id)}
                                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[85px] ${
                                  isSelected
                                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                                    : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-dark">{item.label}</span>
                                  <span
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                      isSelected
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-neutral-300'
                                    }`}
                                  >
                                    {isSelected && '✓'}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 mt-1">{item.sub}</span>
                              </button>
                            );
                          })}
                        </div>

                        {validationErrors.timeline && (
                          <p className="text-xs text-red-500 font-medium">{validationErrors.timeline}</p>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 5: Tell us about your project & Contact info */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 05
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Tell us about your project
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Share any specific ideas, floor preferences, or questions for our engineers.
                          </p>
                        </div>

                        <div className="space-y-3.5 pt-1">
                          {/* Project Description */}
                          <div>
                            <textarea
                              rows={3}
                              value={form.details}
                              onChange={(e) => handleInputChange('details', e.target.value)}
                              placeholder="Your project requirements or message"
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                            />
                          </div>

                          {/* Contact Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Full Name */}
                            <div>
                              <label className="block text-xs font-semibold text-dark mb-1">
                                Full Name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <User
                                  size={15}
                                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                />
                                <input
                                  type="text"
                                  value={form.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                  placeholder="Your Name"
                                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                                    validationErrors.name ? 'border-red-500' : 'border-neutral-200'
                                  }`}
                                />
                              </div>
                              {validationErrors.name && (
                                <p className="text-xs text-red-500 mt-1 font-medium">{validationErrors.name}</p>
                              )}
                            </div>

                            {/* Phone Number */}
                            <div>
                              <label className="block text-xs font-semibold text-dark mb-1">
                                Phone Number <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Phone
                                  size={15}
                                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                />
                                <input
                                  type="tel"
                                  value={form.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  placeholder="Your Phone Number"
                                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                                    validationErrors.phone ? 'border-red-500' : 'border-neutral-200'
                                  }`}
                                />
                              </div>
                              {validationErrors.phone && (
                                <p className="text-xs text-red-500 mt-1 font-medium">{validationErrors.phone}</p>
                              )}
                            </div>
                          </div>

                          {/* Email (Optional) */}
                          <div>
                            <label className="block text-xs font-semibold text-dark mb-1">
                              Email Address <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                              <Mail
                                size={15}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                              />
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Your Email Address"
                                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-200 text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={15} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < CONSULTATION_STEPS.length ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      Continue
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5"
                    >
                      Request a Free Consultation →
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
