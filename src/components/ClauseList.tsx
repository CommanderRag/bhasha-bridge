'use client';

import React, { useState } from 'react';
import { Clause, RiskLevel } from '@/types';
import { Volume2, ChevronDown, ChevronUp, ShieldAlert, AlertTriangle, ShieldCheck, Lightbulb, HelpCircle, FileText } from 'lucide-react';
import { getUIText } from '@/lib/languages';

interface ClauseListProps {
  clauses: Clause[];
  selectedLanguage: string;
  onPlayClauseAudio: (text: string) => void;
  currentlyPlayingId: string | null;
}

export const ClauseList: React.FC<ClauseListProps> = ({
  clauses,
  selectedLanguage,
  onPlayClauseAudio,
  currentlyPlayingId,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | RiskLevel>('all');
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});

  const clauseSectionTitle = getUIText(selectedLanguage, 'clauseSectionTitle');
  const clauseSectionSub = getUIText(selectedLanguage, 'clauseSectionSub');
  const allFilter = getUIText(selectedLanguage, 'allFilter');
  const safeBadge = getUIText(selectedLanguage, 'safeBadge');
  const cautionBadge = getUIText(selectedLanguage, 'cautionBadge');
  const riskBadge = getUIText(selectedLanguage, 'riskBadge');
  const spokenExplanationTitle = getUIText(selectedLanguage, 'spokenExplanationTitle');
  const whyItMattersTitle = getUIText(selectedLanguage, 'whyItMattersTitle');
  const proTipTitle = getUIText(selectedLanguage, 'proTipTitle');
  const showOriginal = getUIText(selectedLanguage, 'showOriginal');
  const hideOriginal = getUIText(selectedLanguage, 'hideOriginal');
  const listenSummary = getUIText(selectedLanguage, 'listenSummary');
  const stopVoice = getUIText(selectedLanguage, 'stopVoice');

  const filteredClauses = clauses.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.riskLevel === activeFilter;
  });

  const toggleQuote = (id: string) => {
    setExpandedQuotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getRiskDetails = (risk: RiskLevel) => {
    switch (risk) {
      case 'safe':
        return {
          icon: <ShieldCheck className="h-4 w-4 text-emerald-600" />,
          label: safeBadge,
          cardBorder: 'border-emerald-200/90 shadow-sm hover:border-emerald-400',
          badgeBg: 'bg-emerald-100 text-emerald-900',
          dot: 'bg-emerald-500',
        };
      case 'caution':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
          label: cautionBadge,
          cardBorder: 'border-amber-200/90 shadow-sm hover:border-amber-400',
          badgeBg: 'bg-amber-100 text-amber-900',
          dot: 'bg-amber-500',
        };
      case 'risk':
      default:
        return {
          icon: <ShieldAlert className="h-4 w-4 text-red-600" />,
          label: riskBadge,
          cardBorder: 'border-red-200/90 shadow-sm hover:border-red-400',
          badgeBg: 'bg-red-100 text-red-900',
          dot: 'bg-red-500',
        };
    }
  };

  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900">
            {clauseSectionTitle}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {clauseSectionSub}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100/90 p-1 shadow-inner border border-slate-200/60">
          <button
            onClick={() => setActiveFilter('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {allFilter} ({clauses.length})
          </button>
          <button
            onClick={() => setActiveFilter('risk')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
              activeFilter === 'risk'
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-red-700 hover:bg-red-50'
            }`}
          >
            🔴 {riskBadge} ({clauses.filter((c) => c.riskLevel === 'risk').length})
          </button>
          <button
            onClick={() => setActiveFilter('caution')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
              activeFilter === 'caution'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            🟡 {cautionBadge} ({clauses.filter((c) => c.riskLevel === 'caution').length})
          </button>
          <button
            onClick={() => setActiveFilter('safe')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all ${
              activeFilter === 'safe'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            🟢 {safeBadge} ({clauses.filter((c) => c.riskLevel === 'safe').length})
          </button>
        </div>
      </div>

      {/* Clause Cards List */}
      <div className="space-y-4">
        {filteredClauses.map((clause) => {
          const riskDetails = getRiskDetails(clause.riskLevel);
          const isQuoteOpen = expandedQuotes[clause.id];
          const isPlayingThis = currentlyPlayingId === clause.id;

          return (
            <div
              key={clause.id}
              className={`glass-card overflow-hidden rounded-3xl p-5 sm:p-6 transition-all hover:shadow-xl ${riskDetails.cardBorder}`}
            >
              <div className="space-y-4">
                {/* Header: Badge + Title + Voice Audio Button */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-black ${riskDetails.badgeBg}`}
                      >
                        <span className={`h-2 w-2 rounded-full ${riskDetails.dot}`} />
                        {riskDetails.label}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">
                      {clause.title}
                    </h4>
                  </div>

                  {/* Single Clause Voice Audio Button */}
                  <button
                    onClick={() => {
                      const speechText = `${clause.title}. ${clause.spokenExplanation}. ${clause.whyItMatters}. ${clause.actionTip}`;
                      onPlayClauseAudio(speechText);
                    }}
                    className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 shadow-sm ${
                      isPlayingThis
                        ? 'bg-red-500 border-red-500 text-white animate-pulse'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{isPlayingThis ? stopVoice : `${listenSummary} 🔊`}</span>
                  </button>
                </div>

                {/* Spoken Explanation Box */}
                <div className="rounded-2xl bg-slate-50/90 p-4 border border-slate-200/70 shadow-sm">
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    {spokenExplanationTitle}:
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {clause.spokenExplanation}
                  </p>
                </div>

                {/* 2-Column Grid: Why it matters & Pro-Tip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Why it matters */}
                  <div className="flex items-start gap-3 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/70 shadow-sm">
                    <HelpCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-black text-amber-900 mb-0.5">
                        {whyItMattersTitle}
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed font-semibold">
                        {clause.whyItMatters}
                      </div>
                    </div>
                  </div>

                  {/* Rider Pro-Tip */}
                  <div className="flex items-start gap-3 rounded-2xl bg-emerald-50/80 p-4 border border-emerald-200/70 shadow-sm">
                    <Lightbulb className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="text-xs font-black text-emerald-900 mb-0.5">
                        {proTipTitle}
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed font-semibold">
                        {clause.actionTip}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Original English Clause Snippet */}
                <div className="pt-2 border-t border-slate-200/70">
                  <button
                    onClick={() => toggleQuote(clause.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>
                      {isQuoteOpen ? hideOriginal : showOriginal}
                    </span>
                    {isQuoteOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  {isQuoteOpen && (
                    <blockquote className="mt-2.5 rounded-2xl border-l-4 border-slate-400 bg-slate-100 p-3.5 text-xs italic text-slate-700 shadow-inner">
                      &quot;{clause.originalSnippet}&quot;
                    </blockquote>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
