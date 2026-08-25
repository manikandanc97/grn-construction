import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  gradientVariant?: 'teal-amber' | 'amber' | 'teal';
}

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  highlight,
  description,
  centered = true,
  light = false,
  gradientVariant = 'teal-amber',
}: SectionHeaderProps) {
  const textColor = light ? 'text-white' : 'text-dark';
  const descColor = light ? 'text-slate-300' : 'text-gray-600';

  const gradientClass =
    gradientVariant === 'amber'
      ? 'bg-gradient-to-r from-secondary-light via-secondary to-amber-400 bg-clip-text text-transparent'
      : gradientVariant === 'teal'
      ? 'bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent'
      : 'bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent';

  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-6 sm:mb-8`}>
      {badge && (
        <div>
          {light ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-secondary-light text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
              <BadgeIcon size={12} className="text-secondary shrink-0" />
              <span>{badge}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm backdrop-blur-sm">
              <BadgeIcon size={12} className="text-secondary shrink-0" />
              <span>{badge}</span>
            </div>
          )}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-display leading-[1.18] tracking-tight ${textColor}`}
      >
        {title}{' '}
        {highlight && <span className={gradientClass}>{highlight}</span>}
      </h2>
      {description && (
        <p
          className={`mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-[14.5px] leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${descColor} font-normal`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

