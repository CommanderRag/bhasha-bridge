'use client';

import React from 'react';
import { Volume2, Pause, Play, Square, FastForward, X } from 'lucide-react';

interface VoicePlayerProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  playbackRate: number;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onChangeRate: (rate: number) => void;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({
  isPlaying,
  isPaused,
  currentText,
  playbackRate,
  onPause,
  onResume,
  onStop,
  onChangeRate,
}) => {
  if (!isPlaying && !isPaused) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-slate-900/95 p-3.5 text-white shadow-2xl backdrop-blur-md dark:border-amber-500/30">
        {/* Left: Waveform & text preview */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-900 font-bold">
            <Volume2 className="h-5 w-5 animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-amber-400 h-2 animate-bounce" />
                <span className="w-1 bg-amber-400 h-3 animate-bounce [animation-delay:0.15s]" />
                <span className="w-1 bg-amber-400 h-1.5 animate-bounce [animation-delay:0.3s]" />
              </span>
              <span>आवाज़ में सुन रहे हैं (Voice Narration)</span>
            </div>
            <p className="truncate text-xs text-slate-300 max-w-xs mt-0.5">
              {currentText || 'बोलकर समझाया जा रहा है...'}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Rate button */}
          <button
            onClick={() => {
              const rates = [0.8, 1.0, 1.2];
              const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
              onChangeRate(rates[nextIdx]);
            }}
            className="rounded-lg bg-slate-800 px-2 py-1 text-[11px] font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Speed"
          >
            {playbackRate}x
          </button>

          {/* Pause / Resume */}
          {isPaused ? (
            <button
              onClick={onResume}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
              title="Resume"
            >
              <Play className="h-4 w-4 fill-white" />
            </button>
          ) : (
            <button
              onClick={onPause}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors shadow-sm"
              title="Pause"
            >
              <Pause className="h-4 w-4 fill-slate-900" />
            </button>
          )}

          {/* Stop / Close */}
          <button
            onClick={onStop}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
            title="Stop & Close"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
