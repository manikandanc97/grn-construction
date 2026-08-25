'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import {
  Sparkles,
  Check,
  Crown,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileSpreadsheet,
  Compass,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import SectionHeader from '@/app/components/shared/SectionHeader';
import { COMPANY } from '@/app/lib/constants';

interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  isLuxury?: boolean;
  price: string;
  priceNote: string;
  startingEstimate: string;
  targetDescription: string;
  coreInclusions: {
    category: string;
    spec: string;
  }[];
  detailedSpecs: {
    category: string;
    items: string[];
  }[];
}

const PACKAGES: PackageItem[] = [
  {
    id: 'standard',
    name: 'Standard Package',
    price: '₹2,100 - ₹2,200',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹21 - 22 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Cost-effective, structurally sound construction using ISI certified materials for standard residential homes.',
    coreInclusions: [
      { category: 'Structure', spec: 'Load bearing solid block structure' },
      { category: 'Steel', spec: 'ISI Fe 550 Standard TMT Steel' },
      { category: 'Walls', spec: 'High-density solid concrete blocks' },
      { category: 'Joinery', spec: 'UPVC windows & ISI standard flush doors' },
      { category: 'Flooring', spec: "2' x 2' Vitrified tiles (₹50/sq.ft)" },
      { category: 'Sanitary', spec: 'ISI branded sanitaryware & CP fittings' },
      { category: 'Elevation', spec: 'Clean exterior finish & basic plaster' },
    ],
    detailedSpecs: [
      {
        category: 'Structural & Masonry',
        items: [
          'Solid concrete blocks for load-bearing walls',
          'Ramco / Chettinad ISI grade cement',
          'River sand / graded M-Sand for mortar & concrete',
          'Standard 10-foot floor-to-ceiling clear height',
        ],
      },
      {
        category: 'Doors, Windows & Finish',
        items: [
          'Country wood frame with flush panel doors',
          'Sliding UPVC 2-track windows with clear glass',
          'Asian Paints Tractor Emulsion for interior walls',
          '1 coat exterior primer with Ace weather shield',
        ],
      },
      {
        category: 'Electrical & Plumbing',
        items: [
          'Finolex / Kundan ISI flame-retardant wiring',
          'Modular switches & DB box with MCB protection',
          'Supreme / Finolex PVC & CPVC water supply lines',
          'Dedicated overhead Sintex / equivalent water tank',
        ],
      },
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: '₹2,300',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹23 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Engineered RCC framed structure with thermal wirecut red bricks and seasoned teakwood main entrance.',
    coreInclusions: [
      { category: 'Structure', spec: 'Engineered RCC framed column structure' },
      { category: 'Steel', spec: 'Amman / Aishwaryam / Equivalent Fe 550' },
      { category: 'Walls', spec: 'Kiln-baked wirecut red clay bricks' },
      { category: 'Joinery', spec: 'Graded teak main door & mahogany windows' },
      { category: 'Flooring', spec: "Premium 4' x 2' Vitrified tiles (₹65/sq.ft)" },
      { category: 'Sanitary', spec: 'Parryware ceramic sanitary collection' },
      { category: 'Elevation', spec: 'Modern parapet work & weather-coat finish' },
    ],
    detailedSpecs: [
      {
        category: 'Structural & Masonry',
        items: [
          'RCC framed structure with isolated footings & plinth beam',
          'Wirecut red bricks for superior natural insulation',
          'Ramco Supergrade / UltraTech 53 Grade cement',
          'Double washed M-Sand & 20mm blue metal aggregate',
        ],
      },
      {
        category: 'Woodwork & Finishes',
        items: [
          'Graded Teakwood main door frame and carved shutter',
          'Mahogany wood window frames with safety MS grills',
          '2 coats Birla White Putty with primer base',
          'Asian Paints Apcolite interior & Apex exterior finish',
        ],
      },
      {
        category: 'Electrical & Plumbing',
        items: [
          'Finolex copper wiring with Anchor Roma modular switches',
          'Heavy gauge Finolex / Supreme plumbing pipes',
          'Dr. Fixit 2-coat waterproofing for terrace & wet areas',
          'Pre-plumbed solar water heater & inverter wiring',
        ],
      },
    ],
  },
  {
    id: 'elite',
    name: 'Elite Package',
    badge: 'MOST POPULAR',
    isPopular: true,
    price: '₹2,400',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹24 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Our flagship standard with primary Tata/JSW steel, seasoned teak joinery & contemporary glass elevation.',
    coreInclusions: [
      { category: 'Structure', spec: 'Heavy-duty engineered RCC framed frame' },
      { category: 'Steel', spec: 'Primary Tata Tiscon / JSW Neosteel Fe 550D' },
      { category: 'Walls', spec: 'Grade-A kiln-baked wirecut red bricks' },
      { category: 'Joinery', spec: '100% seasoned teak doors & woodwork' },
      { category: 'Flooring', spec: "Glazed Vitrified (GVT) 4' x 2' (₹85/sq.ft)" },
      { category: 'Sanitary', spec: 'Parryware / Hindware wall-hung range' },
      { category: 'Elevation', spec: 'Architectural glass fitting & CNC facade' },
    ],
    detailedSpecs: [
      {
        category: 'Structural Excellence',
        items: [
          'Primary Tata Tiscon / JSW Neosteel Fe 550D high-ductility steel',
          'First quality kiln-baked wirecut red clay bricks',
          'Ramco Supergrade 53 OPC/PPC with chemical curing aid',
          'Anti-termite soil treatment & 3-layer chemical waterproofing',
        ],
      },
      {
        category: 'Joinery & Architectural Finishes',
        items: [
          'Fully seasoned 1st quality teakwood frames & carved doors',
          'Toughened glass balcony railings with SS 304 fittings',
          '2 coats Birla Putty + Asian Paints Royale Luxury Emulsion',
          'Exterior Asian Paints Apex Ultima weather-proof coating',
        ],
      },
      {
        category: 'Services & Project Assurance',
        items: [
          'Finolex / Havells wiring with Legrand modular switches',
          'Astral / Finolex CPVC pipes with diverters in all baths',
          'Dedicated Site Engineer supervision with weekly photo reports',
          '10-Year structural warranty & 1-year complimentary maintenance',
        ],
      },
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    badge: 'LUXURY SPEC',
    isLuxury: true,
    price: '₹2,500',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹25 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Turnkey luxury living with Jaquar fittings, custom interior woodwork, and grand architectural exterior.',
    coreInclusions: [
      { category: 'Structure', spec: 'Seismic-resistant heavy RCC framed structure' },
      { category: 'Steel', spec: '100% Tata Tiscon Fe 550D Primary Steel' },
      { category: 'Walls', spec: 'High-compression wirecut red bricks' },
      { category: 'Joinery', spec: 'Handcrafted teak doors & soundproof UPVC' },
      { category: 'Flooring', spec: "Italian marble look 4' x 2' GVT (₹110/sq.ft)" },
      { category: 'Sanitary', spec: 'Jaquar / Kohler luxury series fittings' },
      { category: 'Elevation', spec: 'Grand facade glass + TV unit & wardrobes' },
    ],
    detailedSpecs: [
      {
        category: 'Premium Structural Specs',
        items: [
          '100% Tata Tiscon Fe 550D Primary TMT reinforcement',
          'Ramco Supergrade 53 cement with computer-controlled batching',
          '11-foot clear ceiling height for superior ventilation',
          'Comprehensive 4-stage waterproofing (Basement, Bath, Balcony, Terrace)',
        ],
      },
      {
        category: 'Interior Woodwork & Finishes',
        items: [
          'Modular TV entertainment unit & master bedroom wardrobes included',
          'Heavy designer teakwood double-door main entrance',
          'Soundproof multi-chamber UPVC windows with Saint-Gobain glass',
          'Asian Paints Royale Luxury Emulsion with PU Italian wood polish',
        ],
      },
      {
        category: 'Luxury Fittings & Smart Readiness',
        items: [
          'Jaquar / Kohler thermostatic shower diverters & vanity counter basins',
          'Legrand Arteor / Schneider smart-ready modular switches',
          'Video door phone wiring & EV vehicle charging conduit readiness',
          'Direct Director-level milestone audits & priority handover',
        ],
      },
    ],
  },
];

export default function PackagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Active center index (starts on Elite package index 2 so it's in the center)
  const [activeIndex, setActiveIndex] = useState<number>(2);
  // Expanded detailed specs state
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  // Side-by-side matrix drawer state
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: EASING.power3Out,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // Infinite carousel next / prev
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PACKAGES.length) % PACKAGES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PACKAGES.length);
  };

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getWhatsAppPackageUrl = (pkgName: string, price: string) => {
    const text = encodeURIComponent(
      `Hello GRN Construction, I would like to get a detailed quotation & BOQ for the ${pkgName} (${price}/sq.ft). Please share the estimate and floor plan consultation.`
    );
    return `https://wa.me/${COMPANY.phoneRaw}?text=${text}`;
  };

  // 3-card visible window with activeIndex in the CENTER:
  // Left: (activeIndex - 1 + 4) % 4
  // Center: activeIndex
  // Right: (activeIndex + 1) % 4
  const leftIdx = (activeIndex - 1 + PACKAGES.length) % PACKAGES.length;
  const centerIdx = activeIndex;
  const rightIdx = (activeIndex + 1) % PACKAGES.length;

  const visibleCards = [
    { pkg: PACKAGES[leftIdx], position: 'left', originalIndex: leftIdx },
    { pkg: PACKAGES[centerIdx], position: 'center', originalIndex: centerIdx },
    { pkg: PACKAGES[rightIdx], position: 'right', originalIndex: rightIdx },
  ];

  return (
    <section
      ref={sectionRef}
      id="packages"
      className="relative bg-[#FAFAF8] py-14 md:py-20 lg:py-24 border-t border-slate-200/80 text-dark overflow-hidden"
    >
      {/* Subtle Architectural Drafting Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #0F1923 1px, transparent 1px), linear-gradient(to bottom, #0F1923 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="opacity-0">
          <SectionHeader
            badge="TRANSPARENT PRICING"
            badgeIcon={Compass}
            title="Engineered Construction Packages"
            highlight="Tailored to Perfection."
            description="Clear, honest specifications crafted for Udumalpet homeowners. Compare materials, structural engineering, and starting estimates at a glance."
            centered
          />
        </div>

        {/* 3-Card Centered Loop Carousel Viewport */}
        <div className="relative mt-8 md:mt-10">
          {/* Floating Previous Arrow Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous package"
            className="hidden sm:flex absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-md text-dark items-center justify-center hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Floating Next Arrow Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next package"
            className="hidden sm:flex absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-md text-dark items-center justify-center hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronRight size={22} />
          </button>

          {/* Cards Grid: 3 Cards on Desktop/Tablet with Center Active Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch transition-all duration-300">
            {visibleCards.map(({ pkg, position, originalIndex }) => {
              const isCenter = position === 'center';
              const isElite = pkg.isPopular;
              const isLux = pkg.isLuxury;
              const isExpanded = !!expandedCards[pkg.id];

              return (
                <div
                  key={`${pkg.id}-${position}`}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(originalIndex);
                  }}
                  className={`relative flex flex-col justify-between rounded-2xl transition-all duration-300 bg-white ${
                    !isCenter
                      ? 'cursor-pointer opacity-85 hover:opacity-100 hidden md:flex border border-slate-200/80 shadow-2xs hover:border-slate-300'
                      : isElite
                      ? 'flex border-2 border-primary ring-2 ring-primary/20 shadow-md bg-gradient-to-b from-primary/[0.03] to-white md:scale-[1.02] z-20'
                      : isLux
                      ? 'flex border-2 border-secondary ring-2 ring-secondary/20 shadow-md bg-gradient-to-b from-amber-500/[0.02] to-white md:scale-[1.02] z-20'
                      : 'flex border-2 border-slate-400 ring-2 ring-slate-200 shadow-md md:scale-[1.02] z-20'
                  }`}
                >
                  {/* Top Architectural Accent Bar */}
                  <div
                    className={`h-1.5 w-full rounded-t-2xl ${
                      isElite
                        ? 'bg-primary'
                        : isLux
                        ? 'bg-secondary'
                        : isCenter
                        ? 'bg-slate-700'
                        : 'bg-slate-200'
                    }`}
                  />

                  {/* Card Content Top Wrapper */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Header: Name + Badge */}
                    <div className="flex items-start justify-between gap-2 min-h-[32px] mb-2">
                      <div>
                        <h3 className="text-lg sm:text-[19px] font-bold text-dark tracking-tight font-display">
                          {pkg.name}
                        </h3>
                        {isCenter && (
                          <span className="text-[10.5px] font-semibold text-primary block mt-0.5">
                            Selected Plan
                          </span>
                        )}
                      </div>

                      {isElite ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-primary text-white shadow-2xs shrink-0">
                          <Sparkles size={11} className="shrink-0" />
                          Most Popular
                        </span>
                      ) : isLux ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-secondary text-white shadow-2xs shrink-0">
                          <Crown size={11} className="shrink-0" />
                          Luxury
                        </span>
                      ) : null}
                    </div>

                    {/* Short Target Description */}
                    <p className="text-xs text-gray-600 leading-relaxed min-h-[44px] mb-4">
                      {pkg.targetDescription}
                    </p>

                    {/* Price & Starting Estimate Block */}
                    <div
                      className={`p-3.5 rounded-xl mb-5 transition-colors border ${
                        isElite
                          ? 'bg-primary/[0.06] border-primary/20'
                          : isLux
                          ? 'bg-secondary/[0.07] border-secondary/25'
                          : isCenter
                          ? 'bg-slate-100/90 border-slate-300'
                          : 'bg-slate-50/90 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                          Rate
                        </span>
                        <span className="text-[11px] font-medium text-gray-500">
                          {pkg.priceNote}
                        </span>
                      </div>

                      {/* Main Big Price Typography */}
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span
                          className={`text-2xl sm:text-[26px] font-extrabold font-display tracking-tight ${
                            isElite
                              ? 'text-primary'
                              : isLux
                              ? 'text-secondary-dark'
                              : 'text-dark'
                          }`}
                        >
                          {pkg.price}
                        </span>
                      </div>

                      {/* Approximate Starting Project Cost */}
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11.5px]">
                        <span className="text-gray-500 font-medium">Starting Cost:</span>
                        <span className="font-bold text-dark text-right">
                          {pkg.startingEstimate.replace('Est. ', '')}
                        </span>
                      </div>
                    </div>

                    {/* 7 Aligned Core Inclusions */}
                    <div className="space-y-2 mb-4 flex-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 pb-1 border-b border-slate-100 flex items-center justify-between">
                        <span>Key Inclusions</span>
                        <span className="text-[10px] font-normal lowercase text-gray-400">
                          7 specs
                        </span>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {pkg.coreInclusions.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug"
                          >
                            <span
                              className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isElite
                                  ? 'bg-primary/10 text-primary'
                                  : isLux
                                  ? 'bg-secondary/15 text-secondary-dark'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="font-semibold text-slate-900 mr-1">
                                {item.category}:
                              </span>
                              <span className="text-gray-600">{item.spec}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* "View All Inclusions" Expandable Action */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(pkg.id);
                        }}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                          isExpanded
                            ? 'bg-slate-100 text-dark'
                            : 'text-gray-600 hover:text-dark hover:bg-slate-50'
                        }`}
                        aria-expanded={isExpanded}
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers size={13} className={isElite ? 'text-primary' : 'text-gray-400'} />
                          {isExpanded ? 'Hide detailed specs' : 'View all inclusions & brands'}
                        </span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {/* Expandable Specifications Area */}
                      {isExpanded && (
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-3 animate-in fade-in duration-200">
                          {pkg.detailedSpecs.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-1.5">
                              <div className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                                {group.category}
                              </div>
                              <ul className="space-y-1 text-slate-700">
                                {group.items.map((specItem, sIdx) => (
                                  <li
                                    key={sIdx}
                                    className="flex items-start gap-1.5 text-[11.5px] leading-relaxed"
                                  >
                                    <span className="text-primary mt-1 text-[8px]">•</span>
                                    <span>{specItem}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions (Bottom Pinned) */}
                  <div className="p-5 sm:p-6 pt-0 space-y-2">
                    {/* Primary CTA */}
                    <a
                      href={getWhatsAppPackageUrl(pkg.name, pkg.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs active:scale-[0.99] ${
                        isElite
                          ? 'bg-primary text-white hover:bg-primary-dark shadow-sm'
                          : isLux
                          ? 'bg-secondary text-white hover:bg-secondary-dark shadow-sm'
                          : 'bg-dark text-white hover:bg-dark-muted'
                      }`}
                    >
                      <MessageCircle size={15} />
                      <span>Inquire via WhatsApp</span>
                    </a>

                    {/* Secondary CTA */}
                    <Link
                      href="#requirements"
                      className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Customize in Form</span>
                      <ArrowRight size={13} className="text-slate-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Bottom Controls: Prev/Next & Dots Indicator */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous package"
              className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-dark hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Slide Dots Indicator */}
            <div className="flex items-center gap-2">
              {PACKAGES.map((pkg, idx) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to ${pkg.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next package"
              className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-dark hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix Toggle Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowFullMatrix(!showFullMatrix)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <FileSpreadsheet size={15} className="text-primary" />
            <span>
              {showFullMatrix
                ? 'Hide Side-by-Side Comparison Table'
                : 'Compare All 4 Packages in a Unified Table'}
            </span>
            {showFullMatrix ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Full Side-by-Side Comparison Table (Expanded) */}
        {showFullMatrix && (
          <div className="mt-6 p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto animate-in fade-in duration-300">
            <div className="min-w-[700px]">
              <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-dark">
                    Complete Specification Matrix
                  </h4>
                  <p className="text-xs text-gray-500">
                    Comprehensive cross-package material &amp; brand breakdown.
                  </p>
                </div>
                <span className="text-xs text-primary font-semibold">
                  GRN Construction Standard BOQ
                </span>
              </div>

              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-dark">
                    <th className="py-2.5 px-3 font-bold text-gray-500 uppercase text-[10.5px]">
                      Parameter
                    </th>
                    <th className="py-2.5 px-3 font-bold">Standard</th>
                    <th className="py-2.5 px-3 font-bold">Premium</th>
                    <th className="py-2.5 px-3 font-bold text-primary bg-primary/5">
                      Elite (Most Popular)
                    </th>
                    <th className="py-2.5 px-3 font-bold text-secondary-dark">Luxury</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Rate / sq.ft
                    </td>
                    <td className="py-2 px-3 font-bold text-dark">₹2,100 - ₹2,200</td>
                    <td className="py-2 px-3 font-bold text-dark">₹2,300</td>
                    <td className="py-2 px-3 font-bold text-primary bg-primary/5">₹2,400</td>
                    <td className="py-2 px-3 font-bold text-secondary-dark">₹2,500</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Starting (1,000 sq.ft)
                    </td>
                    <td className="py-2 px-3">~₹21 - 22 Lakhs</td>
                    <td className="py-2 px-3">~₹23 Lakhs</td>
                    <td className="py-2 px-3 font-semibold bg-primary/5">~₹24 Lakhs</td>
                    <td className="py-2 px-3 font-semibold">~₹25 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Structural System
                    </td>
                    <td className="py-2 px-3">Load bearing solid blocks</td>
                    <td className="py-2 px-3">RCC framed columns</td>
                    <td className="py-2 px-3 bg-primary/5">Engineered heavy RCC framed</td>
                    <td className="py-2 px-3">Seismic-resistant RCC frame</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Steel Brand
                    </td>
                    <td className="py-2 px-3">ISI Fe 550 Steel</td>
                    <td className="py-2 px-3">Amman / Aishwaryam</td>
                    <td className="py-2 px-3 font-semibold text-dark bg-primary/5">
                      Tata Tiscon / JSW Neosteel
                    </td>
                    <td className="py-2 px-3 font-semibold text-dark">100% Tata Tiscon Fe 550D</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Wall Construction
                    </td>
                    <td className="py-2 px-3">Solid Concrete Blocks</td>
                    <td className="py-2 px-3">Wirecut Red Bricks</td>
                    <td className="py-2 px-3 bg-primary/5">1st Quality Wirecut Red Bricks</td>
                    <td className="py-2 px-3">High-density Wirecut Red Bricks</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Cement Brands
                    </td>
                    <td className="py-2 px-3">Ramco / Chettinad</td>
                    <td className="py-2 px-3">Ramco Supergrade / UltraTech</td>
                    <td className="py-2 px-3 bg-primary/5">Ramco Supergrade 53 Grade</td>
                    <td className="py-2 px-3">UltraTech / Ramco Supergrade 53</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Main Door &amp; Windows
                    </td>
                    <td className="py-2 px-3">Country wood &amp; UPVC</td>
                    <td className="py-2 px-3">Teak main door &amp; Mahogany</td>
                    <td className="py-2 px-3 font-semibold bg-primary/5">
                      Seasoned Teakwood (Full)
                    </td>
                    <td className="py-2 px-3 font-semibold">
                      Carved Teakwood + Saint-Gobain UPVC
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Flooring Specs
                    </td>
                    <td className="py-2 px-3">2x2 Vitrified (₹50/sq.ft)</td>
                    <td className="py-2 px-3">4x2 Vitrified (₹65/sq.ft)</td>
                    <td className="py-2 px-3 bg-primary/5">4x2 Glazed GVT (₹85/sq.ft)</td>
                    <td className="py-2 px-3">4x2 / 5x2.5 Luxury GVT (₹110/sq.ft)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Sanitaryware &amp; CP
                    </td>
                    <td className="py-2 px-3">ISI Standard Branded</td>
                    <td className="py-2 px-3">Parryware Ceramic Range</td>
                    <td className="py-2 px-3 bg-primary/5">Parryware / Hindware Wall-hung</td>
                    <td className="py-2 px-3 font-semibold text-secondary-dark">
                      Jaquar / Kohler Luxury Series
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-gray-600 bg-slate-50/50">
                      Elevation &amp; Extras
                    </td>
                    <td className="py-2 px-3">Basic exterior finish</td>
                    <td className="py-2 px-3">Modern parapet elevation</td>
                    <td className="py-2 px-3 bg-primary/5">Architectural Glass + CNC work</td>
                    <td className="py-2 px-3 font-semibold">
                      Facade Glass + TV Unit &amp; Wardrobe
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Assurance Card */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
              <Compass size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-dark">
                Have custom architectural drawings or specific brand preferences?
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Submit your exact room dimensions, soil conditions, and joinery choices in our Client Specification Form for a tailored itemized BOQ.
              </p>
            </div>
          </div>
          <Link
            href="#requirements"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-2xs"
          >
            <span>Open Specification Form</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
