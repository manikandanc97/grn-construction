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
  DoorClosed,
  Grid,
  Factory,
  ChevronRight,
  UploadCloud,
  FileText,
  Trash2,
  X,
  FileCheck,
} from 'lucide-react';
import { COMPANY } from '@/app/lib/constants';

export interface SpecificationFormData {
  // 1. Client & Location Information
  name: string;
  email: string;
  address: string;
  phone: string;
  panchayatMunicipalityPlotArea: string;
  layoutDocumentName: string;
  layoutDocumentSize: string;
  layoutDocumentPreview: string;

  // 2. Building Configuration
  buildingType: string;
  buildingTypeOther: string;
  bhk: string;
  bhkOther: string;
  floors: string;
  floorsOther: string;
  structureType: string;
  basementHeight: string;
  basementHeightOther: string;

  // 3. Structural Elements & Materials
  roofType: string;
  roofTypeOther: string;
  wallType: string;
  wallTypeOther: string;
  steelBrand: string;
  steelBrandOther: string;
  cementBrand: string;
  cementBrandOther: string;

  // 4. Joineries & Flooring
  joineryMainDoor: string;
  joineryMainDoorOther: string;
  joineryBedroomDoor: string;
  joineryBedroomDoorOther: string;
  joineryWindows: string;
  joineryWindowsOther: string;

  flooringFloor: string;
  flooringFloorOther: string;
  flooringWall: string;
  flooringWallOther: string;
  flooringKitchenTop: string;
  flooringKitchenTopOther: string;

  // 5. Electrical, Plumbing, Sanitary & Painting
  electricalBrand: string;
  electricalBrandOther: string;
  plumbingBrand: string;
  plumbingBrandOther: string;
  sanitaryBrand: string;
  sanitaryBrandOther: string;
  paintingPreferences: string;
}

const initialFormState: SpecificationFormData = {
  name: '',
  email: '',
  address: '',
  phone: '',
  panchayatMunicipalityPlotArea: '',
  layoutDocumentName: '',
  layoutDocumentSize: '',
  layoutDocumentPreview: '',

  buildingType: 'Residential building',
  buildingTypeOther: '',
  bhk: '3 BHK',
  bhkOther: '',
  floors: 'G + 1',
  floorsOther: '',
  structureType: 'framed Structure (Column Foundation)',
  basementHeight: '3 Feet',
  basementHeightOther: '',

  roofType: 'Reinforced cement concrete (RCC)',
  roofTypeOther: '',
  wallType: 'Wirecut Brick',
  wallTypeOther: '',
  steelBrand: 'TATA TMT',
  steelBrandOther: '',
  cementBrand: 'UltraTech Cement',
  cementBrandOther: '',

  joineryMainDoor: 'Teak Wood',
  joineryMainDoorOther: '',
  joineryBedroomDoor: 'sal wood',
  joineryBedroomDoorOther: '',
  joineryWindows: 'Upvc',
  joineryWindowsOther: '',

  flooringFloor: 'Granite',
  flooringFloorOther: '',
  flooringWall: 'Tiles',
  flooringWallOther: '',
  flooringKitchenTop: 'Quartz (preferred table top)',
  flooringKitchenTopOther: '',

  electricalBrand: 'Legrand',
  electricalBrandOther: '',
  plumbingBrand: 'Ashirvad',
  plumbingBrandOther: '',
  sanitaryBrand: 'parryware',
  sanitaryBrandOther: '',
  paintingPreferences: 'Putty, Primer & Premium Emulsion for interior; Weatherproof for exterior',
};

// Form Step Definitions
const SPECIFICATION_STEPS = [
  { id: 1, number: '01', title: 'Client Info' },
  { id: 2, number: '02', title: 'Building Basics' },
  { id: 3, number: '03', title: 'Structure & Materials' },
  { id: 4, number: '04', title: 'Doors & Flooring' },
  { id: 5, number: '05', title: 'Fixtures & Paint' },
];

// Options Mapping
const BUILDING_TYPES = [
  { id: 'Residential building', label: 'Residential building', icon: Home },
  { id: 'Commercial building', label: 'Commercial building', icon: Building2 },
  { id: 'Industrial building', label: 'Industrial building', icon: Factory },
  { id: 'Renovation', label: 'Renovation', icon: Wrench },
  { id: 'other', label: 'Other', icon: Sparkles },
];

const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Other:'];

const FLOOR_OPTIONS = [
  'Ground floor',
  'First floor only',
  'Stilt + Ground floor',
  'G + 1',
  'G+2',
  'Other:',
];

const STRUCTURE_OPTIONS = [
  {
    id: 'Load bearing (RR masoanry Foundation)',
    label: 'Load bearing (RR masonry Foundation)',
    desc: 'Traditional brick/stone masonry foundation for 1-2 floors',
  },
  {
    id: 'framed Structure (Column Foundation)',
    label: 'Framed Structure (Column Foundation)',
    desc: 'Reinforced concrete columns & beams for strength & longevity',
  },
];

const BASEMENT_HEIGHT_OPTIONS = ['2.5 Feet', '3 Feet', '3.5 Feet', '4 Feet', '5 Feet', 'Other:'];

const ROOF_OPTIONS = [
  'Reinforced cement concrete (RCC)',
  'G.I Roof Sheet (Color sheet)',
  'Manglore Tile Roof (Clay Tile)',
  'PEB Structure',
  'Other:',
];

const WALL_OPTIONS = [
  'Wirecut Brick',
  'Solid block',
  "Flyash brick'",
  'AAC Block',
  'Interlock block',
  'other',
];

const STEEL_OPTIONS = [
  'TATA TMT',
  'JSW NeoSteel',
  'Aiswaryam / Amman / Agni',
  'Other:',
];

const CEMENT_OPTIONS = [
  'UltraTech Cement',
  'Ramco Cement',
  'Coromandel / Dalmia',
  'Chettinad Cement',
  'Other:',
];

const JOINERY_OPTIONS = [
  'Teak Wood',
  'sal wood',
  'mahogany wood',
  'Upvc',
  'Steel Windows Premium',
  'other',
];

const FLOORING_OPTIONS = [
  'Tiles',
  'Granite',
  'Quartz (preferred table top)',
  'marble',
  'other',
];

const ELECTRICAL_OPTIONS = ['Finolex', 'GM', 'Legrand', 'Other:'];
const PLUMBING_OPTIONS = ['Finolex', 'Supreme', 'Ashirvad', 'Other:'];
const SANITARY_OPTIONS = ['parryware', 'hindware', 'kohler', 'Other:'];

export default function ClientRequirementSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<SpecificationFormData>(initialFormState);
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

  const handleInputChange = (field: keyof SpecificationFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInKb = Math.round(file.size / 1024);
    const sizeStr = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        setForm((prev) => ({
          ...prev,
          layoutDocumentName: file.name,
          layoutDocumentSize: sizeStr,
          layoutDocumentPreview: (loadEvt.target?.result as string) || '',
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({
        ...prev,
        layoutDocumentName: file.name,
        layoutDocumentSize: sizeStr,
        layoutDocumentPreview: '',
      }));
    }
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({
      ...prev,
      layoutDocumentName: '',
      layoutDocumentSize: '',
      layoutDocumentPreview: '',
    }));
  };

  const validateStep = (step: number, updateErrors: boolean = true): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!(form?.name || '').trim()) {
        errors.name = 'Please enter your full name';
      }
      if (!(form?.phone || '').trim()) {
        errors.phone = 'Please enter your phone number';
      } else if ((form.phone || '').replace(/[^0-9]/g, '').length < 8) {
        errors.phone = 'Please enter a valid phone number (minimum 8 digits)';
      }
      if (!(form?.address || '').trim()) {
        errors.address = 'Please enter your address';
      }
    }

    if (step === 2) {
      if (!form?.buildingType) {
        errors.buildingType = 'Please select a building type';
      }
      if (form?.buildingType === 'other' && !(form?.buildingTypeOther || '').trim()) {
        errors.buildingTypeOther = 'Please specify building type';
      }
      if (!(form?.basementHeight || '').trim()) {
        errors.basementHeight = 'Basement height is required';
      }
      if (form?.basementHeight === 'Other:' && !(form?.basementHeightOther || '').trim()) {
        errors.basementHeightOther = 'Please specify basement height';
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
      setCurrentStep((prev) => Math.min(prev + 1, SPECIFICATION_STEPS.length));
    }
  };

  const prevStep = () => {
    setValidationErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resolveVal = (main?: string, custom?: string) => {
    if (!main) return '';
    if (main === 'Other:' || main === 'other') {
      return custom && custom.trim() ? custom : 'Other (Custom)';
    }
    return main;
  };

  const generateWhatsAppMessage = () => {
    const buildingTypeRes = resolveVal(form.buildingType, form.buildingTypeOther);
    const bhkRes = resolveVal(form.bhk, form.bhkOther);
    const floorsRes = resolveVal(form.floors, form.floorsOther);
    const basementHeightRes = resolveVal(form.basementHeight, form.basementHeightOther);
    const roofRes = resolveVal(form.roofType, form.roofTypeOther);
    const wallRes = resolveVal(form.wallType, form.wallTypeOther);
    const steelRes = resolveVal(form.steelBrand, form.steelBrandOther);
    const cementRes = resolveVal(form.cementBrand, form.cementBrandOther);

    const mainDoorRes = resolveVal(form.joineryMainDoor, form.joineryMainDoorOther);
    const bedDoorRes = resolveVal(form.joineryBedroomDoor, form.joineryBedroomDoorOther);
    const windowsRes = resolveVal(form.joineryWindows, form.joineryWindowsOther);

    const floorFloorRes = resolveVal(form.flooringFloor, form.flooringFloorOther);
    const floorWallRes = resolveVal(form.flooringWall, form.flooringWallOther);
    const floorKitchenRes = resolveVal(form.flooringKitchenTop, form.flooringKitchenTopOther);

    const elecRes = resolveVal(form.electricalBrand, form.electricalBrandOther);
    const plumbRes = resolveVal(form.plumbingBrand, form.plumbingBrandOther);
    const saniRes = resolveVal(form.sanitaryBrand, form.sanitaryBrandOther);

    return `🏛️ *GRN CONSTRUCTION - SPECIFICATION FORM SUBMISSION*
━━━━━━━━━━━━━━━━━━━━
👤 *CLIENT & SITE DETAILS:*
• *Name:* ${form.name || ''}
• *Phone:* ${form.phone || ''}
${form.email ? `• *Email:* ${form.email}` : ''}
• *Address:* ${form.address || ''}
${form.panchayatMunicipalityPlotArea ? `• *Panchayat/Municipality & Plot Area:* ${form.panchayatMunicipalityPlotArea}` : ''}
${form.layoutDocumentName ? `• *Attached Layout / Document:* ${form.layoutDocumentName} (${form.layoutDocumentSize || 'File Attached'}) - (Sharing photo in chat)` : ''}

🏗️ *BUILDING CONFIGURATION:*
• *Building Type:* ${buildingTypeRes}
• *BHK:* ${bhkRes}
• *Floors:* ${floorsRes}
• *Structure Type:* ${form.structureType || ''}
• *Basement Height:* ${basementHeightRes}

🧱 *MATERIALS & STRUCTURE:*
• *Roof Structure:* ${roofRes}
• *Wall Structure:* ${wallRes}
• *Steel:* ${steelRes}
• *Cement:* ${cementRes}

🚪 *JOINERIES:*
• *Main Door:* ${mainDoorRes}
• *Bedroom Door Frame:* ${bedDoorRes}
• *Windows & Ventilators:* ${windowsRes}

✨ *FLOORING & SURFACES:*
• *Floor:* ${floorFloorRes}
• *Wall (Dadoing/Bath):* ${floorWallRes}
• *Kitchen Table Top:* ${floorKitchenRes}

⚡ *UTILITIES & FINISHES:*
• *Electrical:* ${elecRes}
• *Plumbing:* ${plumbRes}
• *Sanitary:* ${saniRes}
• *Painting:* ${form.paintingPreferences || 'Standard primer, putty & emulsion'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via GRN Construction Specification Form_`;
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
      className="relative bg-white py-12 md:py-14 lg:py-16 border-t border-slate-200/60 overflow-hidden"
    >
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#1A6B7C_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Title */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-sm backdrop-blur-sm">
            <ClipboardCheck size={12} className="text-secondary shrink-0" />
            <span>GRN CONSTRUCTION - SPECIFICATION FORM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-dark font-display tracking-tight leading-[1.18]">
            Specify the Details of{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Your Building.
            </span>
          </h2>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            You can choose the price of your building yourself by specifying the details below. Our civil engineers will prepare a customized cost sheet tailored to your exact brand &amp; structural preferences.
          </p>
        </div>

        {/* Main 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT: Structural Guidance & Trust Panel */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-neutral-50/80 p-4 sm:p-5 relative overflow-hidden opacity-0"
          >
            <div>
              {/* Sleek Configurator Header Pill */}
              <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <ShieldCheck size={14} className="text-secondary shrink-0" />
                  <span>Custom BOQ Calculator</span>
                </div>
                <p className="text-[11.5px] sm:text-xs text-neutral-600 leading-snug">
                  Select your preferred structural materials and finishes. We calculate transparent milestone pricing for you.
                </p>
              </div>

              {/* Form Navigation Overview */}
              <div className="space-y-1.5 mb-4">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5" aria-hidden="true">
                  Form Steps
                </p>
                {SPECIFICATION_STEPS.map((s) => {
                  const isCurrent = currentStep === s.id;
                  const isDone = currentStep > s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleStepClick(s.id)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                          : isDone
                          ? 'border-neutral-200 bg-white text-gray-700 hover:border-neutral-300'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-mono ${
                            isCurrent
                              ? 'bg-primary text-white'
                              : isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {isDone ? '✓' : s.number}
                        </span>
                        <span className="text-[11.5px] sm:text-xs">{s.title}</span>
                      </div>
                      <ChevronRight size={12} className={isCurrent ? 'text-primary' : 'text-neutral-300'} />
                    </div>
                  );
                })}
              </div>

              {/* Value Highlights */}
              <div className="space-y-2 pt-3 border-t border-neutral-200/70 text-[11px] sm:text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <Award size={13} className="text-primary mt-0.5 shrink-0" />
                  <span>Verified A-Grade materials &amp; authentic brands</span>
                </div>
                <div className="flex items-start gap-2">
                  <Coins size={13} className="text-secondary mt-0.5 shrink-0" />
                  <span>Itemized rate cards with zero hidden clauses</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={13} className="text-primary mt-0.5 shrink-0" />
                  <span>Preliminary BOQ estimation within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Direct Phone Assistance */}
            <div className="mt-4 pt-3 border-t border-neutral-200/70 flex items-center justify-between text-xs text-gray-600">
              <span className="text-[11px]">Need guidance?</span>
              <a
                href={COMPANY.callLink}
                className="inline-flex items-center gap-1 text-primary font-semibold hover:underline text-[11px] sm:text-xs"
              >
                <Phone size={11} />
                {COMPANY.phone}
              </a>
            </div>
          </div>

          {/* RIGHT: Specification Multi-Step Form */}
          <div
            ref={rightColRef}
            className="lg:col-span-8 rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-6 lg:p-7 flex flex-col justify-between relative shadow-xs opacity-0"
          >

            {/* Form Steps Rendering */}
            {submitted ? (
              /* Success / WhatsApp Ready State */
              <div className="py-8 sm:py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto ring-8 ring-green-50/60">
                  <CheckCircle2 size={32} />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-2xl font-bold text-dark font-display">
                    Building Specifications Form Ready!
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Thank you, <strong className="text-dark">{form.name}</strong>. Your customized structural, joinery, and material specifications are compiled. Send them directly to our engineering desk via WhatsApp or copy the summary.
                  </p>
                </div>

                {/* Specification Summary Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 border border-neutral-200 text-left text-xs text-gray-700 space-y-2 max-w-lg mx-auto">
                  <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-200/60">
                    <p><strong className="text-dark">Name:</strong> {form.name}</p>
                    <p><strong className="text-dark">Phone:</strong> {form.phone}</p>
                    <p><strong className="text-dark">Building:</strong> {resolveVal(form.buildingType, form.buildingTypeOther)}</p>
                    <p><strong className="text-dark">BHK:</strong> {resolveVal(form.bhk, form.bhkOther)}</p>
                    <p><strong className="text-dark">Structure:</strong> {(form.structureType || '').includes('framed') ? 'Framed Column' : 'Load Bearing'}</p>
                    <p><strong className="text-dark">Basement:</strong> {resolveVal(form.basementHeight, form.basementHeightOther)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-neutral-600">
                    <p><strong>Roof:</strong> {resolveVal(form.roofType, form.roofTypeOther)}</p>
                    <p><strong>Wall:</strong> {resolveVal(form.wallType, form.wallTypeOther)}</p>
                    <p><strong>Steel:</strong> {resolveVal(form.steelBrand, form.steelBrandOther)}</p>
                    <p><strong>Main Door:</strong> {resolveVal(form.joineryMainDoor, form.joineryMainDoorOther)}</p>
                    <p><strong>Floor:</strong> {resolveVal(form.flooringFloor, form.flooringFloorOther)}</p>
                    <p><strong>Sanitary:</strong> {resolveVal(form.sanitaryBrand, form.sanitaryBrandOther)}</p>
                    {form.layoutDocumentName && (
                      <p className="col-span-2 text-primary font-semibold pt-1 border-t border-neutral-200/60">
                        <strong>Attached Layout / Plan:</strong> {form.layoutDocumentName} ({form.layoutDocumentSize})
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer hover:shadow hover:-translate-y-0.5"
                  >
                    <MessageCircle size={17} />
                    Send on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-dark font-semibold text-sm transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    {isCopied ? 'Copied to Clipboard' : 'Copy Specifications'}
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-dark font-medium transition-colors"
                  >
                    <RotateCcw size={13} />
                    Fill another specification form
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep === SPECIFICATION_STEPS.length) {
                    handleSubmit(e);
                  } else {
                    nextStep();
                  }
                }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="min-h-[380px]">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: Client Information & Location */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 01 / 05
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Client &amp; Site Details
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Please provide your contact info and the plot/site location details.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          {/* Name* */}
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Your full name"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                                  validationErrors.name ? 'border-red-500' : 'border-neutral-200'
                                }`}
                              />
                            </div>
                            {validationErrors.name && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{validationErrors.name}</p>
                            )}
                          </div>

                          {/* Phone Number* */}
                          <div>
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="+91 98765 43210"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                                  validationErrors.phone ? 'border-red-500' : 'border-neutral-200'
                                }`}
                              />
                            </div>
                            {validationErrors.phone && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{validationErrors.phone}</p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Email <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                              />
                            </div>
                          </div>

                          {/* Address* */}
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <MapPin size={15} className="absolute left-3.5 top-3 text-gray-400" />
                              <textarea
                                rows={2}
                                value={form.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Your current residential address or site location"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
                                  validationErrors.address ? 'border-red-500' : 'border-neutral-200'
                                }`}
                              />
                            </div>
                            {validationErrors.address && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{validationErrors.address}</p>
                            )}
                          </div>

                          {/* Is your building under Which panchayat or municipality ? and write the Plot area */}
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-dark mb-1.5">
                              Is your building under Which panchayat or municipality ? and write the Plot area
                            </label>
                            <input
                              type="text"
                              value={form.panchayatMunicipalityPlotArea}
                              onChange={(e) =>
                                handleInputChange('panchayatMunicipalityPlotArea', e.target.value)
                              }
                              placeholder="e.g. Udumalpet Municipality / 1200 sq.ft (or cents)"
                              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                            />
                          </div>

                          {/* Layout / Document / Site Photo Upload */}
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-dark mb-1.5 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <UploadCloud size={15} className="text-primary" />
                                <span>Upload Site Layout / Floor Sketch / Documents</span>
                              </span>
                              <span className="text-[10.5px] text-gray-400 font-normal">Optional (Photo / Sketch / PDF)</span>
                            </label>

                            {form.layoutDocumentName ? (
                              /* Uploaded Preview State */
                              <div className="p-3 rounded-xl border border-primary/30 bg-primary/[0.04] flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  {form.layoutDocumentPreview ? (
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-primary/20 bg-white shrink-0">
                                      <Image
                                        src={form.layoutDocumentPreview}
                                        alt="Uploaded Layout Preview"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                                      <FileText size={22} />
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-dark truncate">
                                      {form.layoutDocumentName}
                                    </p>
                                    <p className="text-[11px] text-gray-500 font-medium">
                                      {form.layoutDocumentSize || 'Ready to send'} •{' '}
                                      <span className="text-emerald-600 font-semibold">Attached</span>
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={handleRemoveFile}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                                  aria-label="Remove uploaded layout document"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ) : (
                              /* Empty Dropzone / Selector State */
                              <div className="relative">
                                <label className="flex flex-col items-center justify-center w-full px-4 py-4 rounded-xl border-2 border-dashed border-neutral-200 hover:border-primary/50 bg-neutral-50/70 hover:bg-neutral-50 transition-all cursor-pointer group">
                                  <div className="flex flex-col items-center justify-center text-center space-y-1">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                      <UploadCloud size={18} />
                                    </div>
                                    <p className="text-xs font-semibold text-neutral-700">
                                      Click to upload layout photo, site sketch or approval copy
                                    </p>
                                    <p className="text-[10.5px] text-gray-400">
                                      Supports JPG, PNG, WEBP or PDF (Max 10MB)
                                    </p>
                                  </div>
                                  <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            )}

                            <p className="text-[11px] text-neutral-500 mt-1.5 flex items-center gap-1 leading-snug">
                              <span>💡</span>
                              <span>
                                Have a hand-drawn sketch or photo? Upload here and also attach in WhatsApp for fast engineer review.
                              </span>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Building Type & Basics */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 02 / 05
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Building Basics &amp; Structure
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Specify the type of building, number of BHK, floors, and basement height.
                          </p>
                        </div>

                        {/* Type of building do you want * */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-2">
                            Type of building do you want <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {BUILDING_TYPES.map((t) => {
                              const isSelected = form.buildingType === t.id;
                              const Icon = t.icon;
                              return (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => handleInputChange('buildingType', t.id)}
                                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                                    isSelected
                                      ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/20'
                                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                                  }`}
                                >
                                  <Icon size={16} className={isSelected ? 'text-primary' : 'text-neutral-500'} />
                                  <span className="text-xs sm:text-sm">{t.label}</span>
                                </button>
                              );
                            })}
                          </div>
                          {form.buildingType === 'other' && (
                            <div className="mt-2">
                              <input
                                type="text"
                                value={form.buildingTypeOther}
                                onChange={(e) => handleInputChange('buildingTypeOther', e.target.value)}
                                placeholder="Please specify your building type"
                                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs sm:text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                              />
                              {validationErrors.buildingTypeOther && (
                                <p className="text-xs text-red-500 mt-1">{validationErrors.buildingTypeOther}</p>
                              )}
                            </div>
                          )}
                          {validationErrors.buildingType && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{validationErrors.buildingType}</p>
                          )}
                        </div>

                        {/* Mention the number of BHK */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            Mention the number of BHK (Bedroom, Hall, Kitchen)
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {BHK_OPTIONS.map((opt) => {
                              const isSelected = form.bhk === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleInputChange('bhk', opt)}
                                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {form.bhk === 'Other:' && (
                            <div className="mt-2">
                              <input
                                type="text"
                                value={form.bhkOther}
                                onChange={(e) => handleInputChange('bhkOther', e.target.value)}
                                placeholder="e.g. 5 BHK, Studio room, etc."
                                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs sm:text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                              />
                            </div>
                          )}
                        </div>

                        {/* How many floors do you want to build ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            How many floors do you want to build ?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {FLOOR_OPTIONS.map((fl) => {
                              const isSelected = form.floors === fl;
                              return (
                                <button
                                  key={fl}
                                  type="button"
                                  onClick={() => handleInputChange('floors', fl)}
                                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {fl}
                                </button>
                              );
                            })}
                          </div>
                          {form.floors === 'Other:' && (
                            <div className="mt-2">
                              <input
                                type="text"
                                value={form.floorsOther}
                                onChange={(e) => handleInputChange('floorsOther', e.target.value)}
                                placeholder="Specify number of floors"
                                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs sm:text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                              />
                            </div>
                          )}
                        </div>

                        {/* What kind of structure do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What kind of structure do you want ?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {STRUCTURE_OPTIONS.map((st) => {
                              const isSelected = form.structureType === st.id;
                              return (
                                <button
                                  key={st.id}
                                  type="button"
                                  onClick={() => handleInputChange('structureType', st.id)}
                                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/20'
                                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-semibold">{st.label}</div>
                                  <div className="text-[11px] text-gray-500 font-normal mt-0.5">{st.desc}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* How much height of the basement required ?* */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            How much height of the basement required ? <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {BASEMENT_HEIGHT_OPTIONS.map((bh) => {
                              const isSelected = form.basementHeight === bh;
                              return (
                                <button
                                  key={bh}
                                  type="button"
                                  onClick={() => handleInputChange('basementHeight', bh)}
                                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {bh}
                                </button>
                              );
                            })}
                          </div>
                          {form.basementHeight === 'Other:' && (
                            <div className="mt-2">
                              <input
                                type="text"
                                value={form.basementHeightOther}
                                onChange={(e) => handleInputChange('basementHeightOther', e.target.value)}
                                placeholder="Specify basement height (e.g. 4.5 Feet)"
                                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs sm:text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                              />
                            </div>
                          )}
                          {validationErrors.basementHeight && (
                            <p className="text-xs text-red-500 mt-1 font-medium">
                              {validationErrors.basementHeight}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Roof, Wall, Steel & Cement */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Step 03 / 05
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Roof, Wall, Steel &amp; Cement
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Choose the structural components and branded raw materials for construction.
                          </p>
                        </div>

                        {/* What type of Roof Structure do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What type of Roof Structure do you want ?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ROOF_OPTIONS.map((rf) => {
                              const isSelected = form.roofType === rf;
                              return (
                                <button
                                  key={rf}
                                  type="button"
                                  onClick={() => handleInputChange('roofType', rf)}
                                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/20'
                                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                                  }`}
                                >
                                  {rf}
                                </button>
                              );
                            })}
                          </div>
                          {form.roofType === 'Other:' && (
                            <input
                              type="text"
                              value={form.roofTypeOther}
                              onChange={(e) => handleInputChange('roofTypeOther', e.target.value)}
                              placeholder="Specify roof structure"
                              className="mt-2 w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                            />
                          )}
                        </div>

                        {/* What type of Wall structure do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What type of Wall structure do you want ?
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {WALL_OPTIONS.map((wl) => {
                              const isSelected = form.wallType === wl;
                              return (
                                <button
                                  key={wl}
                                  type="button"
                                  onClick={() => handleInputChange('wallType', wl)}
                                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/20'
                                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                                  }`}
                                >
                                  {wl}
                                </button>
                              );
                            })}
                          </div>
                          {form.wallType === 'other' && (
                            <input
                              type="text"
                              value={form.wallTypeOther}
                              onChange={(e) => handleInputChange('wallTypeOther', e.target.value)}
                              placeholder="Specify wall structure"
                              className="mt-2 w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                            />
                          )}
                        </div>

                        {/* What kind of steel do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What kind of steel do you want ?
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                            {STEEL_OPTIONS.map((st) => {
                              const isSelected = form.steelBrand === st;
                              return (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => handleInputChange('steelBrand', st)}
                                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/20'
                                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                                  }`}
                                >
                                  {st}
                                </button>
                              );
                            })}
                          </div>
                          {form.steelBrand === 'Other:' && (
                            <input
                              type="text"
                              value={form.steelBrandOther}
                              onChange={(e) => handleInputChange('steelBrandOther', e.target.value)}
                              placeholder="Specify steel brand"
                              className="mt-2 w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                            />
                          )}
                        </div>

                        {/* What kind of cement do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What kind of cement do you want ?
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                            {CEMENT_OPTIONS.map((cm) => {
                              const isSelected = form.cementBrand === cm;
                              return (
                                <button
                                  key={cm}
                                  type="button"
                                  onClick={() => handleInputChange('cementBrand', cm)}
                                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/20'
                                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-800'
                                  }`}
                                >
                                  {cm}
                                </button>
                              );
                            })}
                          </div>
                          {form.cementBrand === 'Other:' && (
                            <input
                              type="text"
                              value={form.cementBrandOther}
                              onChange={(e) => handleInputChange('cementBrandOther', e.target.value)}
                              placeholder="Specify cement brand (e.g. Nagarjuna, ACC)"
                              className="mt-2 w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                            />
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Joineries & Flooring */}
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
                            Step 04 / 05
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Doors, Windows &amp; Flooring
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Specify individual joinery preferences and surface finishes.
                          </p>
                        </div>

                        {/* What Kind of joineries do you want ? */}
                        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                          <div className="flex items-center gap-2">
                            <DoorClosed size={16} className="text-primary" />
                            <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                              What Kind of joineries do you want ?
                            </h4>
                          </div>

                          {/* 1. Main Door */}
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              • Main Door
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {JOINERY_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleInputChange('joineryMainDoor', opt)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    form.joineryMainDoor === opt
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 2. Bedroom Door Frame */}
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              • Bed Room Door Frame
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {JOINERY_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleInputChange('joineryBedroomDoor', opt)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    form.joineryBedroomDoor === opt
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 3. Windows & Ventilators */}
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              • Windows &amp; Ventilators
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {JOINERY_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleInputChange('joineryWindows', opt)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    form.joineryWindows === opt
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* What Kind of Flooring do you want ? */}
                        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                          <div className="flex items-center gap-2">
                            <Grid size={16} className="text-secondary" />
                            <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                              What Kind of Flooring do you want ?
                            </h4>
                          </div>

                          {/* 1. Floor */}
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              • Floor
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {FLOORING_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleInputChange('flooringFloor', opt)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    form.flooringFloor === opt
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 2. Wall */}
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              • Wall (Bathrooms / Dadoing)
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {FLOORING_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleInputChange('flooringWall', opt)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    form.flooringWall === opt
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 3. Kitchen Table top */}
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              • Kitchen table top
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {FLOORING_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleInputChange('flooringKitchenTop', opt)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    form.flooringKitchenTop === opt
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 5: Electrical, Plumbing, Sanitary & Painting */}
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
                            Step 05 / 05
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-dark font-display mt-0.5">
                            Electrical, Plumbing, Sanitary &amp; Paint
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Choose electrical &amp; bathroom fitting brands and specify painting details.
                          </p>
                        </div>

                        {/* What kind of electrical items do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What kind of electrical items do you want ?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {ELECTRICAL_OPTIONS.map((el) => {
                              const isSelected = form.electricalBrand === el;
                              return (
                                <button
                                  key={el}
                                  type="button"
                                  onClick={() => handleInputChange('electricalBrand', el)}
                                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {el}
                                </button>
                              );
                            })}
                          </div>
                          {form.electricalBrand === 'Other:' && (
                            <input
                              type="text"
                              value={form.electricalBrandOther}
                              onChange={(e) => handleInputChange('electricalBrandOther', e.target.value)}
                              placeholder="Specify electrical brand"
                              className="mt-2 w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                            />
                          )}
                        </div>

                        {/* What kind of plumbing items do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What kind of plumbing items do you want ?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {PLUMBING_OPTIONS.map((pl) => {
                              const isSelected = form.plumbingBrand === pl;
                              return (
                                <button
                                  key={pl}
                                  type="button"
                                  onClick={() => handleInputChange('plumbingBrand', pl)}
                                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {pl}
                                </button>
                              );
                            })}
                          </div>
                          {form.plumbingBrand === 'Other:' && (
                            <input
                              type="text"
                              value={form.plumbingBrandOther}
                              onChange={(e) => handleInputChange('plumbingBrandOther', e.target.value)}
                              placeholder="Specify plumbing brand"
                              className="mt-2 w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                            />
                          )}
                        </div>

                        {/* What kind of sanitary items do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1.5">
                            What kind of sanitary items do you want ?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {SANITARY_OPTIONS.map((sn) => {
                              const isSelected = form.sanitaryBrand === sn;
                              return (
                                <button
                                  key={sn}
                                  type="button"
                                  onClick={() => handleInputChange('sanitaryBrand', sn)}
                                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-primary text-white font-semibold'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {sn}
                                </button>
                              );
                            })}
                          </div>
                          {form.sanitaryBrand === 'Other:' && (
                            <input
                              type="text"
                              value={form.sanitaryBrandOther}
                              onChange={(e) => handleInputChange('sanitaryBrandOther', e.target.value)}
                              placeholder="Specify sanitary brand"
                              className="mt-2 w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs text-dark placeholder-neutral-400 focus:outline-none focus:border-primary"
                            />
                          )}
                        </div>

                        {/* What kind of painting do you want ? */}
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">
                            What kind of painting do you want ?
                          </label>
                          <p className="text-[11px] text-gray-500 mb-1.5">
                            Examples: White cement coating, Putty, primer, Emulsion and Enamel paints are whichever areas required
                          </p>
                          <textarea
                            rows={3}
                            value={form.paintingPreferences}
                            onChange={(e) => handleInputChange('paintingPreferences', e.target.value)}
                            placeholder="e.g. 2 coats putty, 1 coat primer, Asian Paints Royale emulsion for interior, Apex for exterior"
                            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm text-dark placeholder-neutral-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-3 mt-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={15} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < SPECIFICATION_STEPS.length ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer hover:shadow"
                    >
                      Next Step
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer hover:shadow hover:-translate-y-0.5"
                    >
                      <MessageCircle size={16} />
                      Submit via WhatsApp
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
