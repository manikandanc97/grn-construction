'use client';

import { useState, useRef, useEffect } from 'react';
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
  Compass,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import SectionHeader from '@/app/components/shared/SectionHeader';
import { COMPANY } from '@/app/lib/constants';

interface PackageItem {
  id: string;
  name: string;
  tier: string;
  badge?: string;
  isPopular?: boolean;
  isLuxury?: boolean;
  price: string;
  priceNote: string;
  startingEstimate: string;
  targetDescription: string;
  accentColor: string;
  coreInclusions: {
    category: string;
    spec: string;
  }[];
  detailedSpecs: {
    category: string;
    items: string[];
  }[];
}

// Ordered strictly from LOWEST price to HIGHEST price (Low -> High)
const PACKAGES: PackageItem[] = [
  {
    id: 'standard',
    name: 'Standard Package',
    tier: 'Tier 1 • Basic Essential',
    price: '₹2,100 - ₹2,200',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹21 - 22 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Cost-effective, structurally sound construction using ISI certified materials for standard residential homes.',
    accentColor: 'from-slate-600 to-slate-700',
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
    tier: 'Tier 2 • Enhanced Red Brick',
    price: '₹2,300',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹23 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Engineered RCC framed structure with thermal wirecut red bricks and seasoned teakwood main entrance.',
    accentColor: 'from-[#1A6B7C] to-[#145361]',
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
    tier: 'Tier 3 • Flagship Standard',
    badge: 'MOST POPULAR',
    isPopular: true,
    price: '₹2,400',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹24 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Our flagship standard with primary Tata/JSW steel, seasoned teak joinery & contemporary glass elevation.',
    accentColor: 'from-primary to-primary-dark',
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
    tier: 'Tier 4 • Ultra Luxury Turnkey',
    badge: 'LUXURY SPEC',
    isLuxury: true,
    price: '₹2,500',
    priceNote: 'per sq.ft',
    startingEstimate: 'Est. ~₹25 Lakhs for 1,000 sq.ft',
    targetDescription:
      'Turnkey luxury living with Jaquar fittings, custom interior woodwork, and grand architectural exterior.',
    accentColor: 'from-secondary to-secondary-dark',
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
  const sliderRef = useRef<HTMLDivElement>(null);

  // Active index starts at 0 (Lowest price package - Standard)
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Expanded detailed specs state
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

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

  // Scroll to index without looping (stops at 0 or 3)
  const scrollToIndex = (index: number) => {
    const targetIdx = Math.max(0, Math.min(index, PACKAGES.length - 1));
    setActiveIndex(targetIdx);

    if (sliderRef.current) {
      const container = sliderRef.current;
      const child = container.children[targetIdx] as HTMLElement;
      if (child) {
        const targetScroll = child.offsetLeft - (container.clientWidth - child.clientWidth) / 2;
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PACKAGES.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  // Sync activeIndex on scroll (for swipe gestures)
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(scrollCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
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

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < PACKAGES.length - 1;

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
            description="Clear, honest specifications crafted for Udumalpet homeowners. Explore our transparent tiers arranged sequentially from standard essentials to luxury turnkey."
            centered
          />
        </div>

        {/* Slider Navigation Controls Header */}
        <div className="flex items-center justify-end gap-3 mt-6 sm:mt-8 pb-2 border-b border-slate-200/70">
          <span className="text-xs font-medium text-slate-500">
            Package <strong className="text-dark">{activeIndex + 1}</strong> of{' '}
            <strong className="text-dark">{PACKAGES.length}</strong>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              aria-label="Previous package"
              className={`p-2 rounded-lg border transition-all ${
                canPrev
                  ? 'bg-white border-slate-200 text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 shadow-2xs cursor-pointer'
                  : 'bg-slate-100 border-slate-200/60 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              aria-label="Next package"
              className={`p-2 rounded-lg border transition-all ${
                canNext
                  ? 'bg-white border-slate-200 text-dark hover:bg-slate-50 hover:scale-105 active:scale-95 shadow-2xs cursor-pointer'
                  : 'bg-slate-100 border-slate-200/60 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Interactive Slider Track (No infinite loop, strictly Low to High) */}
        <div className="relative mt-6 sm:mt-8">
          {/* Scrollable Container with Snap */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 px-1 [&::-webkit-scrollbar]:hidden"
          >
            {PACKAGES.map((pkg, idx) => {
              const isSelected = activeIndex === idx;
              const isElite = pkg.isPopular;
              const isLux = pkg.isLuxury;
              const isExpanded = !!expandedCards[pkg.id];

              return (
                <div
                  key={pkg.id}
                  onClick={() => scrollToIndex(idx)}
                  className={`snap-center shrink-0 w-[86vw] max-w-[340px] sm:w-[360px] md:w-[350px] lg:w-[320px] xl:w-[295px] flex flex-col justify-between rounded-2xl transition-all duration-300 bg-white cursor-pointer ${
                    isSelected
                      ? isElite
                        ? 'border-2 border-primary ring-2 ring-primary/20 shadow-md bg-gradient-to-b from-primary/[0.03] to-white md:scale-[1.01]'
                        : isLux
                        ? 'border-2 border-secondary ring-2 ring-secondary/20 shadow-md bg-gradient-to-b from-secondary/[0.03] to-white md:scale-[1.01]'
                        : 'border-2 border-slate-700 ring-2 ring-slate-200 shadow-md md:scale-[1.01]'
                      : 'border border-slate-200/90 shadow-2xs hover:border-slate-300 opacity-95 hover:opacity-100'
                  }`}
                >
                  {/* Top Architectural Accent Bar */}
                  <div
                    className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${
                      isElite
                        ? 'from-primary to-primary-light'
                        : isLux
                        ? 'from-secondary to-secondary-dark'
                        : isSelected
                        ? 'from-slate-700 to-slate-800'
                        : 'from-slate-300 to-slate-400'
                    }`}
                  />

                  {/* Card Content Top Area */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    {/* Tier and Badge */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {pkg.tier}
                      </span>
                      {isElite ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white shadow-2xs shrink-0">
                          <Sparkles size={10} className="shrink-0" />
                          Most Popular
                        </span>
                      ) : isLux ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-secondary text-white shadow-2xs shrink-0">
                          <Crown size={10} className="shrink-0" />
                          Luxury
                        </span>
                      ) : null}
                    </div>

                    {/* Header: Name */}
                    <h3 className="text-base sm:text-lg font-bold text-dark tracking-tight font-display mb-1.5">
                      {pkg.name}
                    </h3>

                    {/* Short Target Description */}
                    <p className="text-xs text-gray-600 leading-relaxed min-h-[40px] mb-3">
                      {pkg.targetDescription}
                    </p>

                    {/* Price & Starting Estimate Block */}
                    <div
                      className={`p-3 rounded-xl mb-4 transition-colors border ${
                        isElite
                          ? 'bg-primary/[0.06] border-primary/20'
                          : isLux
                          ? 'bg-secondary/[0.07] border-secondary/25'
                          : isSelected
                          ? 'bg-slate-100/90 border-slate-300'
                          : 'bg-slate-50/90 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="text-[10.5px] font-semibold text-gray-500 uppercase tracking-wider">
                          Rate
                        </span>
                        <span className="text-[10.5px] font-medium text-gray-500">
                          {pkg.priceNote}
                        </span>
                      </div>

                      {/* Main Big Price Typography */}
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span
                          className={`text-xl sm:text-2xl font-extrabold font-display tracking-tight ${
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
                      <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-gray-500 font-medium">Starting Cost:</span>
                        <span className="font-bold text-dark text-right">
                          {pkg.startingEstimate.replace('Est. ', '')}
                        </span>
                      </div>
                    </div>

                    {/* 7 Aligned Core Inclusions */}
                    <div className="space-y-1.5 mb-3.5 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pb-1 border-b border-slate-100 flex items-center justify-between">
                        <span>Key Inclusions</span>
                        <span className="text-[9.5px] font-normal lowercase text-gray-400">
                          7 specs
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {pkg.coreInclusions.map((item, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 leading-snug"
                          >
                            <span
                              className={`mt-0.5 shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                isElite
                                  ? 'bg-primary/10 text-primary'
                                  : isLux
                                  ? 'bg-secondary/15 text-secondary-dark'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Check size={10} strokeWidth={3} />
                            </span>
                            <div className="min-w-0 flex-1 text-[11.5px]">
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
                        className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                          isExpanded
                            ? 'bg-slate-100 text-dark'
                            : 'text-gray-600 hover:text-dark hover:bg-slate-50'
                        }`}
                        aria-expanded={isExpanded}
                      >
                        <span className="flex items-center gap-1.5 text-[11.5px]">
                          <Layers size={12} className={isElite ? 'text-primary' : 'text-gray-400'} />
                          {isExpanded ? 'Hide detailed specs' : 'View all specs & brands'}
                        </span>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>

                      {/* Expandable Specifications Area */}
                      {isExpanded && (
                        <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2.5 animate-in fade-in duration-200">
                          {pkg.detailedSpecs.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-1">
                              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                {group.category}
                              </div>
                              <ul className="space-y-1 text-slate-700">
                                {group.items.map((specItem, sIdx) => (
                                  <li
                                    key={sIdx}
                                    className="flex items-start gap-1.5 text-[11px] leading-relaxed"
                                  >
                                    <span className="text-primary mt-1 text-[7px]">•</span>
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
                  <div className="p-4 sm:p-5 pt-0 space-y-2">
                    {/* Primary CTA */}
                    <a
                      href={getWhatsAppPackageUrl(pkg.name, pkg.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs active:scale-[0.99] ${
                        isElite
                          ? 'bg-primary text-white hover:bg-primary-dark shadow-sm'
                          : isLux
                          ? 'bg-secondary text-white hover:bg-secondary-dark shadow-sm'
                          : 'bg-dark text-white hover:bg-dark-muted'
                      }`}
                    >
                      <MessageCircle size={14} />
                      <span>Inquire on WhatsApp</span>
                    </a>

                    {/* Secondary CTA */}
                    <Link
                      href="#requirements"
                      className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Customize in Form</span>
                      <ArrowRight size={12} className="text-slate-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Pagination Dots & Mobile Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              aria-label="Previous package"
              className={`p-1.5 rounded-lg border transition-all sm:hidden ${
                canPrev
                  ? 'bg-white border-slate-200 text-dark active:scale-95 shadow-2xs'
                  : 'bg-slate-100 border-slate-200/60 text-slate-300 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Slide Dots Indicator (Low to High: 1 -> 4) */}
            <div className="flex items-center gap-2">
              {PACKAGES.map((pkg, idx) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
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
              disabled={!canNext}
              aria-label="Next package"
              className={`p-1.5 rounded-lg border transition-all sm:hidden ${
                canNext
                  ? 'bg-white border-slate-200 text-dark active:scale-95 shadow-2xs'
                  : 'bg-slate-100 border-slate-200/60 text-slate-300 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
