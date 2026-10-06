'use client';

import React, { useState } from 'react';
import { AnalysisResult, ChatMessage } from '@/types';
import { Bot, User, Send, Volume2, HelpCircle } from 'lucide-react';
import { getUIText } from '@/lib/languages';

interface SathiChatProps {
  contextDocument: AnalysisResult;
  selectedLanguage: string;
  apiKey?: string;
  onPlayAudio: (text: string) => void;
}

export const SathiChat: React.FC<SathiChatProps> = ({
  contextDocument,
  selectedLanguage,
  apiKey,
  onPlayAudio,
}) => {
  const sathiTitle = getUIText(selectedLanguage, 'sathiTitle');
  const sathiSub = getUIText(selectedLanguage, 'sathiSub');
  const sathiContext = getUIText(selectedLanguage, 'sathiContext');
  const sathiPromptsTitle = getUIText(selectedLanguage, 'sathiPromptsTitle');
  const askPlaceholder = getUIText(selectedLanguage, 'askPlaceholder');
  const listenSummary = getUIText(selectedLanguage, 'listenSummary');

  const getWelcomeText = () => {
    if (selectedLanguage === 'en') {
      return `Hello partner! I am your **Bhasha Companion**. I have analyzed your ${contextDocument.platformName} document. Feel free to ask any question about deductions, penalties, or rules!`;
    }
    if (selectedLanguage === 'ta') {
      return `வணக்கம் தோழா! நான் உங்கள் **பாஷா தோழன்**. உங்கள் ${contextDocument.platformName} ஆவணத்தை ஆய்வு செய்துள்ளேன். பிடித்தம் அல்லது விதிகள் குறித்து எதையும் கேளுங்கள்!`;
    }
    if (selectedLanguage === 'te') {
      return `నమస్కారం సోదరా! నేను మీ **భాషా సాయి**. మీ ${contextDocument.platformName} పత్రాన్ని పరిశీలించాను. నిబంధనలు లేదా కోతల గురించి ఏమైనా అడగండి!`;
    }
    return `नमस्ते भाई! मैं हूँ आपका **भाषा साथी**। मैंने आपका ${contextDocument.platformName} का डॉक्यूमेंट पढ़ लिया है। आपको इस एग्रीमेंट, पे-आउट कटौती, या नियमों के बारे में जो भी पूछना हो, बेझिझक पूछें!`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: getWelcomeText(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestedQuestions = () => {
    if (selectedLanguage === 'en') {
      return [
        'Can the platform suspend my account without warning?',
        'How do I contest this deduction and get refunded?',
        'What should I do if my vehicle punctures during delivery?',
        'Does this contract offer accidental medical insurance?',
      ];
    }
    if (selectedLanguage === 'ta') {
      return [
        'அறிவிப்பு இன்றி ஐடியை முடக்க முடியுமா?',
        'பிடித்தம் செய்யப்பட்ட தொகையை எவ்வாறு திரும்பப் பெறுவது?',
        'வண்டியில் பழுது ஏற்பட்டால் அபராதம் விதிக்கப்படுமா?',
        'இதில் விபத்து காப்பீடு உள்ளதா?',
      ];
    }
    if (selectedLanguage === 'te') {
      return [
        'నోటీసు లేకుండా ఐడీని బ్లాక్ చేయవచ్చా?',
        'కట్ చేసిన డబ్బును ఎలా తిరిగి పొందాలి?',
        'వాహనం పంచర్ అయితే జరిమానా విధిస్తారా?',
        'ఇందులో ప్రమాద బీమా ఉందా?',
      ];
    }
    return [
      'क्या कंपनी बिना बताए मेरी आईडी बंद कर सकती है?',
      'इस कटौती के पैसे वापस कैसे मांगूं?',
      'अगर रास्ते में गाड़ी पंचर हो जाए तो क्या जुर्माना लगेगा?',
      'क्या इस एग्रीमेंट में दुर्घटना बीमा मिलता है?',
    ];
  };

  const handleSendMessage = async (textToSend?: string) => {
    const question = textToSend || input.trim();
    if (!question || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          contextDocument,
          languageCode: selectedLanguage,
          apiKey,
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'Response could not be generated.';

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'Network issue. Please try again or use the grievance letter below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-200/90">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">
                {sathiTitle}
              </h3>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 border border-emerald-200">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {sathiSub}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">
          {sathiContext}: {contextDocument.platformName}
        </span>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 text-xs font-black text-slate-600 mb-2.5">
          <HelpCircle className="h-4 w-4 text-amber-500" />
          <span>{sathiPromptsTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {getSuggestedQuestions().map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-amber-400 hover:bg-amber-50/70 transition-all text-left shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Message History */}
      <div className="space-y-3.5 max-h-96 overflow-y-auto p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 mb-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-black text-xs shadow-sm">
                AI
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-tr-sm'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div
                className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t ${
                  msg.sender === 'user'
                    ? 'border-white/20 text-white/80'
                    : 'border-slate-100 text-slate-400'
                } text-[10px]`}
              >
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => onPlayAudio(msg.text)}
                    className="flex items-center gap-1 font-bold text-amber-600 hover:underline"
                  >
                    <Volume2 className="h-3 w-3" /> {listenSummary}
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white font-bold text-xs shadow-sm">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 p-2 font-semibold">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={askPlaceholder}
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isLoading}
          className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all shadow-md ${
            input.trim() && !isLoading
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 active:scale-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
