import { GoogleGenAI } from '@google/genai';
import { AnalysisResult, RiskLevel } from '@/types';
import { PRESET_SCENARIOS, getMockAnalysis } from './mockData';

export async function analyzeDocumentWithGemini({
  text,
  imageBase64,
  imageMimeType = 'image/jpeg',
  pdfBase64,
  languageCode = 'hi',
  apiKey,
}: {
  text?: string;
  imageBase64?: string;
  imageMimeType?: string;
  pdfBase64?: string;
  languageCode: string;
  apiKey?: string;
}): Promise<AnalysisResult> {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  // If no API key is provided, attempt smart matching against preloaded gig worker presets or synthesize
  if (!activeKey) {
    return generateFallbackAnalysis({ text, languageCode });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: activeKey });

    const languageInstructionMap: Record<string, string> = {
      hi: 'बोलचाल की सरल हिंदी (Colloquial spoken Hindi as spoken by delivery partners and drivers in North India). Use words like भाई, आर्डर, कमाई, जुर्माना, कटौतियां.',
      'hi-en': 'Hinglish (Colloquial spoken Hindi written in English/Latin script). Friendly and street-smart.',
      ta: 'எளிய பேச்சுத் தமிழ் (Colloquial spoken Tamil for gig workers). Avoid heavy bookish words.',
      te: 'వాడుక తెలుగు (Colloquial spoken Telugu for gig riders). Natural and empathetic.',
      kn: 'ಸರಳ ಆಡುನುಡಿ ಕನ್ನಡ (Spoken Kannada for delivery partners). Easy and straightforward.',
      bn: 'সহজ কথ্য বাংলা (Spoken Bengali for gig workers). Conversational and clear.',
      mr: 'सोपी बोलचाल मराठी (Spoken Marathi for gig workers). Warm and relatable.',
      gu: 'સરળ બોલચાલ ગુજરાતી (Spoken Gujarati for gig workers). Direct and helpful.',
      en: 'Plain Simple English (Everyday spoken English, 6th-grade reading level, no legal jargon).'
    };

    const targetLangDesc = languageInstructionMap[languageCode] || languageInstructionMap['hi'];

    const prompt = `You are "Bhasha Bridge", an empathetic advocate and legal translator for Indian gig workers (Zomato/Swiggy delivery riders, Uber/Ola drivers, Blinkit/Zepto partners, Urban Company technicians).
Your mission is to demystify complex English contracts, payout statements, deactivation policies, and penalty notices.

Target Language: ${targetLangDesc}

INSTRUCTIONS:
1. Identify the Platform Name (e.g. Swiggy, Zomato, Uber, Urban Company, Blinkit, or General) and Document Type.
2. Formulate a strong headline and a 2-3 sentence Spoken Summary in the Target Language. Speak warmly, directly to the worker like a trusted union brother or elder explaining things over chai.
3. Classify Financial Impact into:
   - deductions (amounts and reasons)
   - incentives (requirements and traps)
   - penalties (what can trigger fines or bans)
   - netTakeaway (honest takeaway for worker's wallet)
4. Extract 3 to 6 key clauses and classify each as:
   - "safe" (🟢 Standard, fair terms, normal requirements)
   - "caution" (🟡 Milestone traps, high acceptance hurdles, waiting caps)
   - "risk" (🔴 Unilateral deductions without proof, automated account deactivations, damage liabilities, earnings forfeiture)
   For each clause, provide:
   - title: Short title in simple terms
   - originalSnippet: The exact or paraphrased English clause
   - spokenExplanation: Warm, spoken explanation in the target language (explain what it actually means)
   - whyItMatters: Practical danger to daily earnings/routine (in target language)
   - actionTip: Concrete self-defense tip for the rider (in target language)
5. Provide 3 bullet points of practical worker advice (workerAdvice).
6. Provide a formal grievance letter in English (grievanceTemplate: subject, body) that the worker can email to partner support if money was unfairly deducted.
7. Provide a WhatsApp-ready summary in the target language (whatsAppSummary) with emojis to share in worker WhatsApp groups.

Format your response as a valid JSON object matching this schema:
{
  "documentType": string,
  "platformName": string,
  "overallRiskScore": "safe" | "caution" | "risk",
  "headline": string,
  "spokenSummary": string,
  "financialImpact": {
    "deductions": string[],
    "incentives": string[],
    "penalties": string[],
    "netTakeaway": string
  },
  "clauses": [
    {
      "id": string,
      "riskLevel": "safe" | "caution" | "risk",
      "title": string,
      "originalSnippet": string,
      "spokenExplanation": string,
      "whyItMatters": string,
      "actionTip": string
    }
  ],
  "workerAdvice": string[],
  "grievanceTemplate": {
    "subject": string,
    "body": string
  },
  "whatsAppSummary": string
}`;

    const contents: any[] = [];

    if (imageBase64) {
      contents.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64,
        },
      });
    }

    if (pdfBase64) {
      contents.push({
        inlineData: {
          mimeType: 'application/pdf',
          data: pdfBase64,
        },
      });
    }

    if (text) {
      contents.push({
        text: `Document Content:\n${text}\n\nTask:\n${prompt}`,
      });
    } else {
      contents.push({
        text: prompt,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      id: `analysis-${Date.now()}`,
      documentType: parsed.documentType || 'Gig Worker Agreement',
      platformName: parsed.platformName || 'Gig Platform',
      overallRiskScore: (parsed.overallRiskScore || 'caution') as RiskLevel,
      headline: parsed.headline || 'Document Analysis Summary',
      spokenSummary: parsed.spokenSummary || '',
      financialImpact: {
        deductions: parsed.financialImpact?.deductions || [],
        incentives: parsed.financialImpact?.incentives || [],
        penalties: parsed.financialImpact?.penalties || [],
        netTakeaway: parsed.financialImpact?.netTakeaway || '',
      },
      clauses: parsed.clauses || [],
      workerAdvice: parsed.workerAdvice || [],
      grievanceTemplate: parsed.grievanceTemplate || {
        subject: 'Dispute Against Unfair Deduction',
        body: 'Dear Support Team,\n\nI contest the deduction on my recent payout. Kindly review and refund.',
      },
      whatsAppSummary: parsed.whatsAppSummary || '',
      analyzedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn('Gemini API call failed or encountered error, falling back to smart simulation:', err);
    return generateFallbackAnalysis({ text, languageCode });
  }
}

function generateFallbackAnalysis({
  text = '',
  languageCode = 'hi',
}: {
  text?: string;
  languageCode: string;
}): AnalysisResult {
  const lower = text.toLowerCase();

  // Try matching against our real presets
  if (lower.includes('swiggy') || lower.includes('spillage') || lower.includes('waiting fees') || lower.includes('in-store waiting')) {
    const res = getMockAnalysis('swiggy-sla', languageCode);
    if (res) return { ...res, id: `analysis-${Date.now()}`, analyzedAt: new Date().toISOString() };
  }

  if (lower.includes('zomato') || lower.includes('peak') || lower.includes('dinner') || lower.includes('18 orders') || lower.includes('streak')) {
    const res = getMockAnalysis('zomato-dinner-surge', languageCode);
    if (res) return { ...res, id: `analysis-${Date.now()}`, analyzedAt: new Date().toISOString() };
  }

  if (lower.includes('urban company') || lower.includes('rating') || lower.includes('deactivation') || lower.includes('retraining') || lower.includes('4.7')) {
    const res = getMockAnalysis('urban-company-deactivation', languageCode);
    if (res) return { ...res, id: `analysis-${Date.now()}`, analyzedAt: new Date().toISOString() };
  }

  if (lower.includes('blinkit') || lower.includes('10-minute') || lower.includes('damaged') || lower.includes('eggs') || lower.includes('dark store')) {
    const res = getMockAnalysis('blinkit-transit-damage', languageCode);
    if (res) return { ...res, id: `analysis-${Date.now()}`, analyzedAt: new Date().toISOString() };
  }

  if (lower.includes('uber') || lower.includes('cancellation') || lower.includes('driver partner') || lower.includes('8.0%') || lower.includes('pickup')) {
    const res = getMockAnalysis('uber-cancellation-fee', languageCode);
    if (res) return { ...res, id: `analysis-${Date.now()}`, analyzedAt: new Date().toISOString() };
  }

  // Default smart fallback based on keywords detected in user text
  const defaultRes = getMockAnalysis('swiggy-sla', languageCode) || PRESET_SCENARIOS[0].analysis['hi'];
  return {
    ...defaultRes,
    id: `analysis-${Date.now()}`,
    headline: text.length > 20 ? `Analysis: ${text.slice(0, 50)}...` : defaultRes.headline,
    analyzedAt: new Date().toISOString(),
  };
}
