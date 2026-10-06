'use client';

import React from 'react';
import { ShieldCheck, Volume2, FileText, IndianRupee } from 'lucide-react';
import { getUIText } from '@/lib/languages';
import { SwiggyLogo, ZomatoLogo, UrbanCompanyLogo, BlinkitLogo, UberLogo } from './CompanyLogos';

interface HeroBannerProps {
  language: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
}) => {
  const badge = getUIText(language, 'heroBadge');
  const title = getUIText(language, 'heroTitle');
  const subtitle = getUIText(language, 'heroSubtitle');
  const trafficLightPill = getUIText(language, 'trafficLightPill');
  const trafficLightSub = getUIText(language, 'trafficLightSub');
  const moneyDeductionPill = getUIText(language, 'moneyDeductionPill');
  const moneyDeductionSub = getUIText(language, 'moneyDeductionSub');
  const spokenVoicePill = getUIText(language, 'spokenVoicePill');
  const spokenVoiceSub = getUIText(language, 'spokenVoiceSub');
  const disputeLetterPill = getUIText(language, 'disputeLetterPill');
  const disputeLetterSub = getUIText(language, 'disputeLetterSub');
  const supportedPlatforms = getUIText(language, 'supportedPlatforms');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-8 md:p-10 text-white shadow-2xl shadow-orange-500/20 mb-8 border border-white/20">
      {/* Decorative ambient gradient orbs */}
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-yellow-300/25 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-red-600/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold backdrop-blur-md mb-4 text-white border border-white/25 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
          <span>{badge}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 drop-shadow-sm">
          {title}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-amber-50 max-w-2xl leading-relaxed mb-8 font-medium">
          {subtitle}
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="flex items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-lg p-3.5 border border-white/25 shadow-md hover:bg-white/20 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-900 font-black shadow-sm text-sm">
              🟢
            </div>
            <div className="text-left overflow-hidden">
              <div className="text-xs font-extrabold truncate">{trafficLightPill}</div>
              <div className="text-[11px] text-amber-100 font-medium truncate">{trafficLightSub}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-lg p-3.5 border border-white/25 shadow-md hover:bg-white/20 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-300 text-slate-950 font-black shadow-sm">
              <IndianRupee className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="text-xs font-extrabold truncate">{moneyDeductionPill}</div>
              <div className="text-[11px] text-amber-100 font-medium truncate">{moneyDeductionSub}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-lg p-3.5 border border-white/25 shadow-md hover:bg-white/20 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-300 text-slate-950 font-black shadow-sm">
              <Volume2 className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="text-xs font-extrabold truncate">{spokenVoicePill}</div>
              <div className="text-[11px] text-amber-100 font-medium truncate">{spokenVoiceSub}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-lg p-3.5 border border-white/25 shadow-md hover:bg-white/20 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-300 text-slate-950 font-black shadow-sm">
              <FileText className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="text-xs font-extrabold truncate">{disputeLetterPill}</div>
              <div className="text-[11px] text-amber-100 font-medium truncate">{disputeLetterSub}</div>
            </div>
          </div>
        </div>

        {/* Supported Platforms with Real Brand Logos */}
        <div className="mt-7 flex flex-wrap items-center gap-2.5 text-xs font-bold text-white pt-4 border-t border-white/20">
          <span className="text-amber-100 mr-1">{supportedPlatforms}</span>
          
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-1 backdrop-blur-sm border border-white/20">
            <ZomatoLogo className="h-4 w-4" />
            <span>Zomato</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-1 backdrop-blur-sm border border-white/20">
            <SwiggyLogo className="h-4 w-4" />
            <span>Swiggy</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-1 backdrop-blur-sm border border-white/20">
            <BlinkitLogo className="h-4 w-4" />
            <span>Blinkit</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-1 backdrop-blur-sm border border-white/20">
            <UrbanCompanyLogo className="h-4 w-4" />
            <span>Urban Company</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-1 backdrop-blur-sm border border-white/20">
            <UberLogo className="h-4 w-4" />
            <span>Uber</span>
          </div>
        </div>
      </div>
    </div>
  );
};
