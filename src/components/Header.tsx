'use client';

import React from 'react';
import { SUPPORTED_LANGUAGES, getUIText } from '@/lib/languages';
import { ShieldAlert, Languages, Key, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  onReset: () => void;
  showReset: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  onOpenApiKeyModal,
  hasApiKey,
  onReset,
  showReset,
}) => {
  const brandName = getUIText(selectedLanguage, 'brandName');
  const brandTagline = getUIText(selectedLanguage, 'brandTagline');
  const newScanText = getUIText(selectedLanguage, 'newScan');
  const addKeyText = getUIText(selectedLanguage, 'addKey');
  const keyReadyText = getUIText(selectedLanguage, 'keyReady');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform">
            <ShieldAlert className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {brandTagline}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {showReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
              <span>{newScanText}</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute left-2.5 text-amber-600">
              <Languages className="h-4 w-4" />
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white/90 py-2 pl-8 pr-7 text-xs font-bold text-slate-800 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer hover:border-amber-400 transition-colors"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* API Key Status */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-sm ${
              hasApiKey
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-500/20 active:scale-95'
            }`}
          >
            {hasApiKey ? (
              <>
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>{keyReadyText}</span>
              </>
            ) : (
              <>
                <Key className="h-3.5 w-3.5" />
                <span>{addKeyText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
