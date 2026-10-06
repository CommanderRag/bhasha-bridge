'use client';

import React from 'react';
import { AnalysisResult, RiskLevel } from '@/types';
import { Volume2, VolumeX, AlertTriangle, ShieldCheck, AlertOctagon, TrendingDown, Target, BellRing, Sparkles } from 'lucide-react';
import { getUIText } from '@/lib/languages';
import { PlatformLogo } from './CompanyLogos';

interface AnalysisDashboardProps {
  result: AnalysisResult;
  selectedLanguage: string;
  onPlayAudio: (text: string) => void;
  isPlayingAudio: boolean;
  onStopAudio: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  result,
  selectedLanguage,
  onPlayAudio,
  isPlayingAudio,
  onStopAudio,
}) => {
  const safeCount = result.clauses.filter((c) => c.riskLevel === 'safe').length;
  const cautionCount = result.clauses.filter((c) => c.riskLevel === 'caution').length;
  const riskCount = result.clauses.filter((c) => c.riskLevel === 'risk').length;
  const totalCount = result.clauses.length || 1;

  const safePercent = Math.round((safeCount / totalCount) * 100);
  const cautionPercent = Math.round((cautionCount / totalCount) * 100);
  const riskPercent = Math.round((riskCount / totalCount) * 100);

  const safeBadge = getUIText(selectedLanguage, 'safeBadge');
  const cautionBadge = getUIText(selectedLanguage, 'cautionBadge');
  const riskBadge = getUIText(selectedLanguage, 'riskBadge');
  const whatItMeans = getUIText(selectedLanguage, 'whatItMeans');
  const listenSummary = getUIText(selectedLanguage, 'listenSummary');
  const stopVoice = getUIText(selectedLanguage, 'stopVoice');
  const clauseRiskMeter = getUIText(selectedLanguage, 'clauseRiskMeter');
  const clausesAnalyzed = getUIText(selectedLanguage, 'clausesAnalyzed');
  const deductionsTitle = getUIText(selectedLanguage, 'deductionsTitle');
  const deductionsSub = getUIText(selectedLanguage, 'deductionsSub');
  const incentivesTitle = getUIText(selectedLanguage, 'incentivesTitle');
  const incentivesSub = getUIText(selectedLanguage, 'incentivesSub');
  const penaltiesTitle = getUIText(selectedLanguage, 'penaltiesTitle');
  const penaltiesSub = getUIText(selectedLanguage, 'penaltiesSub');

  const getRiskBadge = (score: RiskLevel) => {
    switch (score) {
      case 'safe':
        return {
          icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
          label: safeBadge,
          bgColor: 'bg-emerald-50 text-emerald-800 border-emerald-200 badge-glow-safe',
          dot: 'bg-emerald-500',
        };
      case 'caution':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
          label: cautionBadge,
          bgColor: 'bg-amber-50 text-amber-900 border-amber-200 badge-glow-caution',
          dot: 'bg-amber-500',
        };
      case 'risk':
      default:
        return {
          icon: <AlertOctagon className="h-5 w-5 text-red-600" />,
          label: riskBadge,
          bgColor: 'bg-red-50 text-red-900 border-red-200 badge-glow-risk',
          dot: 'bg-red-500',
        };
    }
  };

  const badge = getRiskBadge(result.overallRiskScore);

  const handleAudioToggle = () => {
    if (isPlayingAudio) {
      onStopAudio();
    } else {
      const fullNarration = `${result.headline}. ${result.spokenSummary}. ${result.financialImpact.netTakeaway}`;
      onPlayAudio(fullNarration);
    }
  };

  return (
    <div className="space-y-6 mb-10">
      {/* Top Card: Document Identity & Risk Verdict */}
      <div className="glass-card overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <PlatformLogo platform={result.platformName} className="h-7 w-7" />
              <span className="rounded-xl bg-slate-900 px-3 py-1 text-xs font-black text-white shadow-sm">
                {result.platformName}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {result.documentType}
              </span>
            </div>

            {/* Risk Badge */}
            <div
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-1.5 text-xs font-black shadow-sm ${badge.bgColor}`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${badge.dot} animate-ping`} />
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-5">
            {result.headline}
          </h2>

          {/* Spoken Summary Box with Warm Radial Gradient */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50 via-orange-50/70 to-amber-100/50 p-5 sm:p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  {whatItMeans}
                </span>
              </div>

              {/* Listen Button */}
              <button
                onClick={handleAudioToggle}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all shadow-md active:scale-95 ${
                  isPlayingAudio
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-orange-500/20'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5" />
                    <span>{stopVoice}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{listenSummary} 🔊</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-slate-800 font-semibold">
              {result.spokenSummary}
            </p>
          </div>

          {/* Risk Heatmap Progress Bar */}
          <div className="mt-6 pt-6 border-t border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-extrabold mb-2.5">
              <span className="text-slate-700">
                {clauseRiskMeter}:
              </span>
              <span className="text-slate-500">
                {result.clauses.length} {clausesAnalyzed}
              </span>
            </div>

            <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 shadow-inner border border-slate-200">
              <div
                style={{ width: `${riskPercent}%` }}
                className="bg-red-500 transition-all rounded-l-full shadow-sm"
              />
              <div
                style={{ width: `${cautionPercent}%` }}
                className="bg-amber-400 transition-all shadow-sm"
              />
              <div
                style={{ width: `${safePercent}%` }}
                className="bg-emerald-500 transition-all rounded-r-full shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold mt-2.5">
              <span className="flex items-center gap-1.5 text-red-600">
                🔴 {riskCount} {riskBadge} ({riskPercent}%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-600">
                🟡 {cautionCount} {cautionBadge} ({cautionPercent}%)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                🟢 {safeCount} {safeBadge} ({safePercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Gradient Financial Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Deductions Card */}
        <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-50/90 via-red-50/60 to-rose-100/40 p-5 shadow-md">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm font-bold">
              <TrendingDown className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-900">
                {deductionsTitle}
              </h4>
              <span className="text-[11px] text-rose-600 font-medium">{deductionsSub}</span>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-bold text-slate-800">
            {result.financialImpact.deductions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-extrabold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Incentives Card */}
        <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/90 via-yellow-50/60 to-amber-100/40 p-5 shadow-md">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm font-bold">
              <Target className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
                {incentivesTitle}
              </h4>
              <span className="text-[11px] text-amber-600 font-medium">{incentivesSub}</span>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-bold text-slate-800">
            {result.financialImpact.incentives.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-extrabold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Penalties Card */}
        <div className="rounded-3xl border border-purple-200/80 bg-gradient-to-br from-purple-50/90 via-indigo-50/60 to-purple-100/40 p-5 shadow-md">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm font-bold">
              <BellRing className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-900">
                {penaltiesTitle}
              </h4>
              <span className="text-[11px] text-purple-600 font-medium">{penaltiesSub}</span>
            </div>
          </div>
          <ul className="space-y-2 text-xs font-bold text-slate-800">
            {result.financialImpact.penalties.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-600 font-extrabold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
