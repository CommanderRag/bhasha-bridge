'use client';

import React from 'react';

/**
 * Mapping of platform names to their brand primary colors. Used by other components for
 * consistent theming.
 */
export const PLATFORM_COLORS: Record<string, string> = {
  swiggy: '#FC8019', // orange
  zomato: '#E23744', // red
  urbancompany: '#000000', // black
  uc: '#000000', // fallback for Urban Company abbreviation
  blinkit: '#F8CB46', // yellow
  uber: '#000000', // black
  ola: '#0D9488', // teal (example)
  rapido: '#FFCE00', // bright yellow
  zepto: '#6B21A8', // purple
  porter: '#1E40AF', // blue
  dunzo: '#0D9488', // green teal
};

interface LogoProps {
  /** Additional Tailwind classes – typically size classes like `h-5 w-5`. */
  className?: string;
}

/** Simple colored badge with a single-letter or short abbreviation. */
function TextBadge({
  bgColor,
  text,
  className = 'h-5 w-5',
}: {
  bgColor: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-${bgColor} text-white p-1 shadow-sm shrink-0 ${className}`.replace(
        /#([0-9A-Fa-f]{3,6})/g,
        (m) => m.replace('#', '')
      )}
      style={{ backgroundColor: bgColor }}
    >
      <span className="font-bold text-xs tracking-wider uppercase">{text}</span>
    </div>
  );
}

/** Individual brand badge components – they forward any custom className (size) */
export const SwiggyLogo: React.FC<LogoProps> = ({ className = 'h-5 w-5' }) => (
  <TextBadge bgColor={PLATFORM_COLORS.swiggy} text="S" className={className} />
);

export const ZomatoLogo: React.FC<LogoProps> = ({ className = 'h-5 w-5' }) => (
  <TextBadge
    bgColor={PLATFORM_COLORS.zomato}
    text="Zomato"
    className={className}
  />
);

export const UrbanCompanyLogo: React.FC<LogoProps> = ({ className = 'h-5 w-5' }) => (
  <TextBadge bgColor={PLATFORM_COLORS.urbancompany} text="UC" className={className} />
);

export const BlinkitLogo: React.FC<LogoProps> = ({ className = 'h-5 w-5' }) => (
  <TextBadge bgColor={PLATFORM_COLORS.blinkit} text="B" className={className} />
);

export const UberLogo: React.FC<LogoProps> = ({ className = 'h-5 w-5' }) => (
  <TextBadge bgColor={PLATFORM_COLORS.uber} text="U" className={className} />
);

/**
 * PlatformLogo dispatcher – matches on common substrings and renders the appropriate badge.
 * If a platform is unknown, it falls back to a generic two‑letter badge.
 */
export const PlatformLogo: React.FC<{ platform: string; className?: string }> = ({
  platform,
  className = 'h-5 w-5',
}) => {
  const p = platform.toLowerCase();
  if (p.includes('swiggy')) return <SwiggyLogo className={className} />;
  if (p.includes('zomato')) return <ZomatoLogo className={className} />;
  if (p.includes('urban') || p.includes('uc')) return (
    <UrbanCompanyLogo className={className} />
  );
  if (p.includes('blinkit')) return <BlinkitLogo className={className} />;
  if (p.includes('uber')) return <UberLogo className={className} />;
  if (p.includes('ola')) return (
    <TextBadge bgColor={PLATFORM_COLORS.ola} text="O" className={className} />
  );
  if (p.includes('rapido')) return (
    <TextBadge bgColor={PLATFORM_COLORS.rapido} text="R" className={className} />
  );
  if (p.includes('zepto')) return (
    <TextBadge bgColor={PLATFORM_COLORS.zepto} text="Z" className={className} />
  );
  if (p.includes('porter')) return (
    <TextBadge bgColor={PLATFORM_COLORS.porter} text="P" className={className} />
  );
  if (p.includes('dunzo')) return (
    <TextBadge bgColor={PLATFORM_COLORS.dunzo} text="D" className={className} />
  );
  // fallback – first two letters of the platform name
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-gray-500 text-white p-1 shadow-sm shrink-0 ${className}`}
    >
      <span className="font-bold text-xs uppercase">
        {platform.slice(0, 2)}
      </span>
    </div>
  );
};
