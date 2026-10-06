import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      contextDocument,
      languageCode = 'hi',
      apiKey,
    } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const activeKey = apiKey || process.env.GEMINI_API_KEY;

    if (activeKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: activeKey });
        const systemPrompt = `You are "Bhasha Sathi" (भाषा साथी), a knowledgeable, warm, street-smart union elder and legal companion for Indian gig workers (delivery riders, taxi/auto drivers, salon partners).
The worker has shared this analyzed document:
Platform: ${contextDocument?.platformName || 'Gig Platform'}
Summary: ${contextDocument?.spokenSummary || 'Gig contract'}
Clauses: ${JSON.stringify(contextDocument?.clauses || [])}

The worker asks: "${message}"

INSTRUCTIONS:
1. Respond directly, empathetically, and conversationally in the requested language code (${languageCode}).
2. Use street-smart vocabulary (e.g. bhai/dost, booking, payout, rider app, support ticket).
3. Be clear on worker rights: explain practical self-defense tips, how to document proof, what to say to partner support, and how to protect daily earnings.
4. Keep the answer punchy (2-4 paragraphs maximum).`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ text: systemPrompt }],
        });

        return NextResponse.json({ reply: response.text || 'Maaf kijiyega, reply generate nahi ho paya.' });
      } catch (e) {
        console.warn('Gemini chat failed, falling back to smart response:', e);
      }
    }

    // Smart realistic gig-worker assistant fallback
    const reply = getFallbackChatResponse(message, contextDocument, languageCode);
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function getFallbackChatResponse(
  message: string,
  contextDoc: any,
  langCode: string
): string {
  const m = message.toLowerCase();
  const platform = contextDoc?.platformName || 'कंपनी';

  if (langCode === 'en') {
    if (m.includes('block') || m.includes('suspend') || m.includes('deactivat')) {
      return `Under standard gig policies, ${platform} uses automated algorithms that can flag IDs based on customer ratings or high rejection rates. However, automated suspension without human grievance hearing violates fair work guidelines. **Immediate action**: File a formal ticket with rider support attaching screenshots of your recent ratings and demand a human review by your city fleet lead.`;
    }
    if (m.includes('deduct') || m.includes('cut') || m.includes('money') || m.includes('fine')) {
      return `Unilateral deductions without photographic evidence are disputable. Make sure you raise an in-app dispute within 24 to 48 hours of the weekly payout statement. Always include your Partner ID, Order ID, and photos of merchant handover.`;
    }
    return `Regarding your question on "${message}": Under your ${platform} agreement, always prioritize your safety first. Maintain photo proof of all pickups and deliveries, and never hesitate to raise a ticket if an unfair penalty is levied.`;
  }

  // Hindi default
  if (m.includes('id') || m.includes('बंद') || m.includes('ब्लॉक') || m.includes('block') || m.includes('suspend')) {
    return `भाई, ${platform} की पॉलिसी में कई बार कंप्यूटर अपने आप रेटिंग या आर्डर कैंसिलेशन देखकर आईडी अस्थायी रूप से बंद कर देता है। \n\n**आपको क्या करना चाहिए:** \n1. तुरंत ऐप के हेल्प सेक्शन में जाकर टिकट बनाएं। \n2. अपने एरिया के फ्लीट मैनेजर या टीएल (TL) को फोन करें। \n3. अगर कस्टमर ने झूठी शिकायत की थी, तो बताएं कि आपके पास डिलीवरी की पूरी फोटो मौजूद है। बिना इंसानी जांच के रोज़ी-रोटी छीनना गलत है।`;
  }

  if (m.includes('पैसा') || m.includes('कट') || m.includes('कटौती') || m.includes('deduct') || m.includes('जुर्माना') || m.includes('fine')) {
    return `दोस्त, अगर ${platform} ने आपके पैसे काटे हैं, तो चुपचाप न बैठें। \n\n**ये 3 कदम उठाएं:**\n1. पे-आउट स्टेटमेंट आने के 48 घंटे के भीतर 'Payout Dispute' का टिकट खोलें।\n2. आर्डर नंबर (Order ID) और कटौती की रकम साफ लिखें।\n3. हमने जो नीचे शिकायत पत्र (Grievance Letter) तैयार किया है, उसे कॉपी करके सपोर्ट ईमेल पर भेजें। कई मामलों में जब राइडर सबूत के साथ मेल करता है, तो कंपनी पैसे वापस क्रेडिट कर देती है।`;
  }

  if (m.includes('बारिश') || m.includes('rain') || m.includes('मौसम') || m.includes('जाम') || m.includes('traffic')) {
    return `खराब मौसम या भारी जाम में अपनी जान जोखिम में डालकर डिलीवरी न करें। अगर आर्डर लेट हो रहा है, तो आर्डर मिलने के 2 मिनट के अंदर ऐप में 'Heavy Traffic / Heavy Rain' रिपोर्ट करें। इससे सिस्टम को पता रहता है और देर होने पर जुर्माना कटने का चांस कम हो जाता है।`;
  }

  return `भाई, आपके सवाल "${message}" पर हमारी सलाह है कि हमेशा अपने काम का डिजिटल सबूत रखें (जैसे आर्डर पिकअप की फोटो और लोकेशन का स्क्रीनशॉट)। ${platform} के साथ किसी भी विवाद में यही स्क्रीनशॉट आपकी सबसे बड़ी ताकत बनते हैं। नीचे दिए गए शिकायत पत्र का उपयोग करके आप सपोर्ट टीम से आधिकारिक जवाब मांग सकते हैं।`;
}
