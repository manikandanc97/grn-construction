interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const textColor = light ? 'text-white' : 'text-dark';
  const descColor = light ? 'text-white/70' : 'text-gray-500';

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} mb-12`}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="h-px w-8 bg-secondary"></span>
          <span
            className="text-sm font-bold tracking-widest uppercase text-secondary"
          >
            {badge}
          </span>
          <span className="h-px w-8 bg-secondary"></span>
        </div>
      )}
      <h2
        className={`text-[30px] md:text-[38px] lg:text-[48px] font-bold font-display leading-tight ${textColor}`}
      >
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-br from-secondary to-secondary-light bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className={`mt-5 text-[16px] md:text-[17px] lg:text-[18px] leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
