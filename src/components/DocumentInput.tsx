'use client';

import React, { useState, useRef } from 'react';
import { Camera, Upload, FileText, Sparkles, ArrowRight, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { PRESET_SCENARIOS, PresetScenario } from '@/lib/mockData';
import { getUIText } from '@/lib/languages';
import { PlatformLogo } from './CompanyLogos';

interface DocumentInputProps {
  onAnalyze: (payload: {
    text?: string;
    imageBase64?: string;
    imageMimeType?: string;
    pdfBase64?: string;
    presetId?: string;
  }) => void;
  isLoading: boolean;
  selectedLanguage: string;
}

export const DocumentInput: React.FC<DocumentInputProps> = ({
  onAnalyze,
  isLoading,
  selectedLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'photo' | 'pdf'>('text');
  const [textInput, setTextInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const tryPresetsText = getUIText(selectedLanguage, 'tryPresets');
  const realCasesBadge = getUIText(selectedLanguage, 'realCasesBadge');
  const tabText = getUIText(selectedLanguage, 'tabText');
  const tabPhoto = getUIText(selectedLanguage, 'tabPhoto');
  const tabPdf = getUIText(selectedLanguage, 'tabPdf');
  const textPlaceholder = getUIText(selectedLanguage, 'textPlaceholder');
  const photoHeading = getUIText(selectedLanguage, 'photoHeading');
  const photoSub = getUIText(selectedLanguage, 'photoSub');
  const photoBtn = getUIText(selectedLanguage, 'photoBtn');
  const pdfHeading = getUIText(selectedLanguage, 'pdfHeading');
  const pdfSub = getUIText(selectedLanguage, 'pdfSub');
  const pdfBtn = getUIText(selectedLanguage, 'pdfBtn');
  const charCount = getUIText(selectedLanguage, 'charCount');
  const supportsMsg = getUIText(selectedLanguage, 'supportsMsg');
  const explainBtn = getUIText(selectedLanguage, 'explainBtn');
  const analyzing = getUIText(selectedLanguage, 'analyzing');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedPresetId(null);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setSelectedPresetId(null);
    }
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setSelectedPresetId(preset.id);
    setTextInput(preset.sampleInputText);
    setImagePreview(null);
    setImageFile(null);
    setPdfFile(null);
    setActiveTab('text');
    onAnalyze({
      text: preset.sampleInputText,
      presetId: preset.id,
    });
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    if (activeTab === 'photo' && imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        onAnalyze({
          imageBase64: base64String,
          imageMimeType: imageFile.type || 'image/jpeg',
          text: textInput.trim() || undefined,
        });
      };
      reader.readAsDataURL(imageFile);
    } else if (activeTab === 'pdf' && pdfFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        onAnalyze({
          pdfBase64: base64String,
          text: textInput.trim() || undefined,
        });
      };
      reader.readAsDataURL(pdfFile);
    } else if (textInput.trim()) {
      onAnalyze({
        text: textInput.trim(),
        presetId: selectedPresetId || undefined,
      });
    }
  };

  const hasValidInput =
    (activeTab === 'photo' && !!imageFile) ||
    (activeTab === 'pdf' && !!pdfFile) ||
    (activeTab === 'text' && textInput.trim().length > 10);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-10 shadow-xl border border-slate-200/90">
      {/* 1-Click Real Presets Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">
              {tryPresetsText}
            </h3>
          </div>
          <span className="rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200">
            {realCasesBadge}
          </span>
        </div>

        {/* Preset Cards with Real Company Brand Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`relative flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-gradient-to-b from-amber-50/90 to-orange-50/50 shadow-md ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-white/70 hover:bg-white hover:border-amber-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className="flex items-center gap-2">
                    <PlatformLogo platform={preset.platform} className="h-6 w-6" />
                    <span className="text-xs font-black text-slate-900">
                      {preset.platform}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                  )}
                </div>

                <div className="text-xs font-bold text-slate-800 line-clamp-1">
                  {preset.name.replace(preset.platform, '').trim()}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {preset.tagline.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative border-t border-slate-200/80 pt-6">
        {/* Input Mode Tabs */}
        <div className="flex rounded-2xl bg-slate-100/90 p-1.5 max-w-md mx-auto mb-6 shadow-inner border border-slate-200/60">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'text'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="h-4 w-4 text-amber-500" />
            <span>{tabText}</span>
          </button>

          <button
            onClick={() => setActiveTab('photo')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'photo'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="h-4 w-4 text-amber-500" />
            <span>{tabPhoto}</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'pdf'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="h-4 w-4 text-amber-500" />
            <span>{tabPdf}</span>
          </button>
        </div>

        {/* Tab 1: Text */}
        {activeTab === 'text' && (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                  setSelectedPresetId(null);
                }}
                rows={5}
                placeholder={textPlaceholder}
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
              />
              {textInput && (
                <button
                  onClick={() => {
                    setTextInput('');
                    setSelectedPresetId(null);
                  }}
                  className="absolute right-3 top-3 rounded-full bg-slate-100 p-1 text-slate-500 hover:bg-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>{supportsMsg}</span>
              <span>{textInput.length} {charCount}</span>
            </div>
          </div>
        )}

        {/* Tab 2: Photo */}
        {activeTab === 'photo' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />

            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-8 text-center cursor-pointer hover:bg-amber-50/80 transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-3 shadow-inner">
                  <Camera className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  {photoHeading}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  {photoSub}
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-amber-600"
                >
                  {photoBtn}
                </button>
              </div>
            ) : (
              <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <ImageIcon className="h-4 w-4 text-amber-500" />
                    <span>{imageFile?.name || 'Uploaded photo'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="max-h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Document preview"
                    className="max-h-64 object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: PDF */}
        {activeTab === 'pdf' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={pdfInputRef}
              accept="application/pdf"
              onChange={handlePdfChange}
              className="hidden"
            />

            {!pdfFile ? (
              <div
                onClick={() => pdfInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-8 text-center cursor-pointer hover:bg-amber-50/80 transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-3 shadow-inner">
                  <Upload className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  {pdfHeading}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  {pdfSub}
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-amber-600"
                >
                  {pdfBtn}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      {pdfFile.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {(pdfFile.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setPdfFile(null)}
                  className="rounded-full bg-red-100 p-1.5 text-red-600 hover:bg-red-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={handleSubmit}
            disabled={!hasValidInput || isLoading}
            className={`flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-extrabold text-white shadow-xl transition-all ${
              hasValidInput && !isLoading
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-orange-500/25 active:scale-95 cursor-pointer'
                : 'bg-slate-300 cursor-not-allowed text-slate-500'
            }`}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>{analyzing}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>{explainBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
