'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult } from '@/types';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { DocumentInput } from '@/components/DocumentInput';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { ClauseList } from '@/components/ClauseList';
import { DisputeGenerator } from '@/components/DisputeGenerator';
import { SathiChat } from '@/components/SathiChat';
import { VoicePlayer } from '@/components/VoicePlayer';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { TextToSpeechHelper } from '@/lib/tts';
import { PRESET_SCENARIOS, getMockAnalysis } from '@/lib/mockData';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';
import confetti from 'canvas-confetti';
import { ShieldCheck, Heart, Sparkles, AlertCircle } from 'lucide-react';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('hi');
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [currentPresetId, setCurrentPresetId] = useState<string | null>(null);

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isPausedAudio, setIsPausedAudio] = useState<boolean>(false);
  const [currentSpokenText, setCurrentSpokenText] = useState<string>('');
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [currentlyPlayingClauseId, setCurrentlyPlayingClauseId] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('bhasha_bridge_gemini_key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== 'undefined') {
      if (key) {
        localStorage.setItem('bhasha_bridge_gemini_key', key);
      } else {
        localStorage.removeItem('bhasha_bridge_gemini_key');
      }
    }
  };

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);

    // If currently viewing a preset, switch the analysis to the newly selected language if available
    if (currentPresetId) {
      const updatedMock = getMockAnalysis(currentPresetId, code);
      if (updatedMock) {
        setAnalysisResult(updatedMock);
      }
    }
  };

  const handleAnalyze = async (payload: {
    text?: string;
    imageBase64?: string;
    imageMimeType?: string;
    pdfBase64?: string;
    presetId?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    handleStopAudio();

    // Check if preset selected
    if (payload.presetId) {
      setCurrentPresetId(payload.presetId);
      // Small realistic pause for AI effect
      setTimeout(() => {
        const mock = getMockAnalysis(payload.presetId!, selectedLanguage);
        if (mock) {
          setAnalysisResult(mock);
          setIsLoading(false);
          if (mock.overallRiskScore === 'safe') {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
          }
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else {
          setIsLoading(false);
        }
      }, 600);
      return;
    }

    setCurrentPresetId(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          languageCode: selectedLanguage,
          apiKey: apiKey || undefined,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to analyze document.');
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);

      if (result.overallRiskScore === 'safe') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getVoiceLangCode = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    return lang?.voiceLangCode || 'hi-IN';
  };

  const handlePlayAudio = (text: string, clauseId?: string) => {
    handleStopAudio();
    setCurrentSpokenText(text);
    if (clauseId) {
      setCurrentlyPlayingClauseId(clauseId);
    }

    TextToSpeechHelper.speak({
      text,
      langCode: getVoiceLangCode(selectedLanguage),
      rate: playbackRate,
      onStart: () => {
        setIsPlayingAudio(true);
        setIsPausedAudio(false);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setIsPausedAudio(false);
        setCurrentlyPlayingClauseId(null);
      },
      onError: () => {
        setIsPlayingAudio(false);
        setIsPausedAudio(false);
        setCurrentlyPlayingClauseId(null);
      },
    });
  };

  const handlePauseAudio = () => {
    TextToSpeechHelper.pause();
    setIsPausedAudio(true);
    setIsPlayingAudio(false);
  };

  const handleResumeAudio = () => {
    TextToSpeechHelper.resume();
    setIsPausedAudio(false);
    setIsPlayingAudio(true);
  };

  const handleStopAudio = () => {
    TextToSpeechHelper.stop();
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
    setCurrentlyPlayingClauseId(null);
    setCurrentSpokenText('');
  };

  const handleChangePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlayingAudio && currentSpokenText) {
      handlePlayAudio(currentSpokenText);
    }
  };

  const handleReset = () => {
    handleStopAudio();
    setAnalysisResult(null);
    setCurrentPresetId(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={!!apiKey}
        onReset={handleReset}
        showReset={!!analysisResult}
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 flex-1">
        <HeroBanner
          language={selectedLanguage}
          onPlayIntroAudio={() => {
            const greeting =
              SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.sampleGreeting ||
              'नमस्ते भाई! भाषा ब्रिज में आपका स्वागत है।';
            handlePlayAudio(
              `${greeting} यहाँ आप अपने डिलीवरी और राइडर कॉन्ट्रैक्ट, पे-आउट कटौती और पेनल्टी को आसान बोलचाल में समझ सकते हैं।`
            );
          }}
        />

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <DocumentInput
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          selectedLanguage={selectedLanguage}
        />

        {/* Results Section */}
        {analysisResult && (
          <div ref={resultsRef} className="pt-2 animate-in fade-in duration-300">
            <AnalysisDashboard
              result={analysisResult}
              selectedLanguage={selectedLanguage}
              onPlayAudio={(text) => handlePlayAudio(text)}
              isPlayingAudio={isPlayingAudio}
              onStopAudio={handleStopAudio}
            />

            <ClauseList
              clauses={analysisResult.clauses}
              selectedLanguage={selectedLanguage}
              onPlayClauseAudio={(text) => handlePlayAudio(text)}
              currentlyPlayingId={currentlyPlayingClauseId}
            />

            <DisputeGenerator
              whatsAppSummary={analysisResult.whatsAppSummary}
              grievanceTemplate={analysisResult.grievanceTemplate}
              platformName={analysisResult.platformName}
            />

            <SathiChat
              contextDocument={analysisResult}
              selectedLanguage={selectedLanguage}
              apiKey={apiKey}
              onPlayAudio={(text) => handlePlayAudio(text)}
            />
          </div>
        )}
      </main>

      {/* Floating Audio Player */}
      <VoicePlayer
        isPlaying={isPlayingAudio}
        isPaused={isPausedAudio}
        currentText={currentSpokenText}
        playbackRate={playbackRate}
        onPause={handlePauseAudio}
        onResume={handleResumeAudio}
        onStop={handleStopAudio}
        onChangeRate={handleChangePlaybackRate}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={apiKey}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 py-8 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            <span>Bhasha Bridge</span>
            <span className="text-amber-500">•</span>
            <span>भाषा सेतु</span>
            <span className="text-amber-500">•</span>
            <span className="flex items-center gap-1 text-red-500">
              Made with <Heart className="h-3 w-3 fill-current inline" /> for India&apos;s Gig Workers
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            यह टूल जानकारी और जागरूकता के उद्देश्य से बनाया गया है। गंभीर कानूनी विवाद में अपनी स्थानीय ट्रेड यूनियन या कानूनी सलाहकार से संपर्क करें।
          </p>
        </div>
      </footer>
    </div>
  );
}
