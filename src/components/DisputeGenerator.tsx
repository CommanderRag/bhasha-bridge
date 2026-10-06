'use client';

import React, { useState } from 'react';
import { GrievanceTemplate } from '@/types';
import { Share2, Copy, Check, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { getUIText } from '@/lib/languages';

interface DisputeGeneratorProps {
  whatsAppSummary: string;
  grievanceTemplate: GrievanceTemplate;
  platformName: string;
  selectedLanguage: string;
}

export const DisputeGenerator: React.FC<DisputeGeneratorProps> = ({
  whatsAppSummary,
  grievanceTemplate,
  platformName,
  selectedLanguage,
}) => {
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [partnerId, setPartnerId] = useState('');
  const [orderId, setOrderId] = useState('');

  const shareWhatsAppTitle = getUIText(selectedLanguage, 'shareWhatsAppTitle');
  const shareWhatsAppSub = getUIText(selectedLanguage, 'shareWhatsAppSub');
  const copyText = getUIText(selectedLanguage, 'copyText');
  const copiedText = getUIText(selectedLanguage, 'copiedText');
  const openWhatsApp = getUIText(selectedLanguage, 'openWhatsApp');

  const disputeTitle = getUIText(selectedLanguage, 'disputeTitle');
  const disputeSub = getUIText(selectedLanguage, 'disputeSub');
  const partnerIdLabel = getUIText(selectedLanguage, 'partnerIdLabel');
  const orderIdLabel = getUIText(selectedLanguage, 'orderIdLabel');
  const copyLetter = getUIText(selectedLanguage, 'copyLetter');
  const sendEmail = getUIText(selectedLanguage, 'sendEmail');

  const customizedBody = grievanceTemplate.body
    .replace(/\[YOUR_ID\]/g, partnerId || '[YOUR_PARTNER_ID]')
    .replace(/\[ORDER_ID\]/g, orderId || '[ORDER_ID]')
    .replace(/\[YOUR_NAME\]/g, 'Partner')
    .replace(/\[YOUR_PHONE\]/g, '');

  const customizedSubject = grievanceTemplate.subject
    .replace(/\[YOUR_ID\]/g, partnerId || '[YOUR_PARTNER_ID]');

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsAppSummary);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsAppSummary)}`;
    window.open(url, '_blank');
  };

  const handleCopyEmail = () => {
    const fullText = `Subject: ${customizedSubject}\n\n${customizedBody}`;
    navigator.clipboard.writeText(fullText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleOpenMailClient = () => {
    const mailto = `mailto:support@${platformName.toLowerCase().replace(/\s+/g, '')}.com?subject=${encodeURIComponent(
      customizedSubject
    )}&body=${encodeURIComponent(customizedBody)}`;
    window.location.href = mailto;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* WhatsApp Share Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-lg border border-emerald-200/90 bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/20 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">
                {shareWhatsAppTitle}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {shareWhatsAppSub}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white/90 p-4 text-xs font-mono text-emerald-950 whitespace-pre-wrap leading-relaxed shadow-inner mb-4 max-h-56 overflow-y-auto">
            {whatsAppSummary}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCopyWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-black text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            {copiedWhatsApp ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span>{copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{copyText}</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-2.5 text-xs font-black text-white hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{openWhatsApp}</span>
          </button>
        </div>
      </div>

      {/* Formal Dispute Letter Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-lg border border-amber-200/90 bg-gradient-to-br from-white via-amber-50/30 to-orange-100/20 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">
                {disputeTitle}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {disputeSub}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[11px] font-black text-slate-600">
                {partnerIdLabel}:
              </label>
              <input
                type="text"
                placeholder="DP-98321"
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-600">
                {orderIdLabel}:
              </label>
              <input
                type="text"
                placeholder="ORD-44589"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner mb-4 max-h-40 overflow-y-auto">
            <div className="font-black text-slate-900 mb-1">
              Subject: {customizedSubject}
            </div>
            {customizedBody}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCopyEmail}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-black text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
          >
            {copiedEmail ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span>{copiedText}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{copyLetter}</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenMailClient}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-xs font-black text-white hover:from-amber-600 hover:to-orange-600 shadow-md shadow-orange-500/20 transition-all active:scale-95"
          >
            <Mail className="h-4 w-4" />
            <span>{sendEmail}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
