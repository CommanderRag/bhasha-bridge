import { AnalysisResult } from '@/types';

export interface PresetScenario {
  id: string;
  name: string;
  platform: string;
  tagline: string;
  badgeColor: string;
  sampleInputText: string;
  analysis: Record<string, AnalysisResult>;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'swiggy-sla',
    name: 'Swiggy Delivery Agreement & Penalty Clause',
    platform: 'Swiggy',
    tagline: 'Order Rejections, Shift Guarantee & Waiting Cap',
    badgeColor: 'bg-[#FC8019]',
    sampleInputText: `SWIGGY DELIVERY PARTNER SERVICE LEVEL AGREEMENT (SLA) - CLAUSE 4.2 & 7.1
4.2 Acceptance & Cancellation Penalty: Delivery Partner (DP) must maintain minimum 90% acceptance rate during booked shifts. Any order rejected after assignment incurs a fee of INR 50 deducted from weekly payouts. If 3 consecutive orders are denied, DP account shall enter 24-hour temporary throttling with zero incoming orders.
7.1 Waiting Time Reimbursement: In-store waiting fees shall be calculated only after thirty (30) minutes of recorded delay from merchant confirmation at the rate of INR 1.00 per minute, strictly capped at a maximum of INR 25.00 per delivery event.
8.4 Customer Discrepancy & Spillage: In cases where customer reports packaging damage, food contamination, or spillage, the total order value up to INR 500 shall be debited unilaterally from DP ledger without prior dispute notice.`,
    analysis: {
      en: {
        id: 'swiggy-en',
        documentType: 'Delivery Partner Agreement',
        platformName: 'Swiggy',
        overallRiskScore: 'risk',
        headline: 'High Risk: ₹50 Penalty for Order Rejections and Up to ₹500 Customer Spillage Liability',
        spokenSummary: 'This agreement heavily penalizes the delivery partner. You face a direct ₹50 fine for every rejected order, a 24-hour dispatch block if you decline 3 orders in a row, and waiting compensation is capped at just ₹25 after waiting a full 30 minutes. Customer packaging complaints trigger automatic ledger deductions of up to ₹500 without prior dispute review.',
        financialImpact: {
          deductions: ['₹50 per rejected delivery order', 'Up to ₹500 for customer packaging or spillage claims'],
          incentives: ['Shift guarantee requires strict 90% acceptance rate'],
          penalties: ['24-hour dispatch throttling after 3 consecutive rejections'],
          netTakeaway: 'You face potential ₹500 to ₹1000 in weekly clawbacks for situations often outside your control.'
        },
        clauses: [
          {
            id: 'c1',
            riskLevel: 'risk',
            title: '₹50 Penalty on Order Rejections',
            originalSnippet: 'Any order rejected after assignment incurs a fee of INR 50 deducted from weekly payouts. If 3 consecutive orders are denied, DP account shall enter 24-hour temporary throttling.',
            spokenExplanation: 'Rejecting an assigned order costs you ₹50 directly from your weekly payout, and rejecting 3 orders in a row freezes your dispatch account for 24 hours.',
            whyItMatters: 'Uncontrollable issues like heavy rain, traffic gridlock, or tyre punctures will still trigger cash fines and lost working hours.',
            actionTip: 'Always reach out to Rider Chat Support to unassign with cause rather than clicking Reject in the app.'
          },
          {
            id: 'c2',
            riskLevel: 'caution',
            title: '30-Minute Wait Time Capped at ₹25',
            originalSnippet: 'In-store waiting fees shall be calculated only after thirty (30) minutes... strictly capped at a maximum of INR 25.00.',
            spokenExplanation: 'You earn zero waiting compensation for the first 30 minutes at a restaurant, and the maximum payout is capped at just ₹25 thereafter regardless of how long you wait.',
            whyItMatters: 'Significant unpaid idle time at slow restaurant kitchens drags down your hourly income.',
            actionTip: 'Mark Arrived at Store immediately upon reaching GPS boundaries to start recorded merchant wait time.'
          },
          {
            id: 'c3',
            riskLevel: 'risk',
            title: 'Automatic ₹500 Deduction on Customer Complaints',
            originalSnippet: 'the total order value up to INR 500 shall be debited unilaterally from DP ledger without prior dispute notice.',
            spokenExplanation: 'If a customer claims food leaked or the package was crushed, the company deducts up to ₹500 from your earnings without conducting a prior investigation.',
            whyItMatters: 'Substandard packing by restaurant staff gets deducted straight from the delivery partner wallet.',
            actionTip: 'Photograph the sealed parcel at restaurant pickup and at the customer doorstep upon delivery.'
          }
        ],
        workerAdvice: [
          'Never decline 3 orders in succession; switch your app to offline mode instead.',
          'Always demand sturdy taped packaging from kitchen staff before accepting handoff.',
          'File an in-app payout grievance within 24 hours if an unjustified deduction occurs.'
        ],
        grievanceTemplate: {
          subject: 'Formal Dispute Against Penalty Deduction - Partner ID: [YOUR_ID]',
          body: `Dear Partner Support Team,\n\nI am writing to formally contest the deduction of INR [AMOUNT] debited from my weekly payout for Order ID [ORDER_ID].\n\nThe delay/rejection was caused by severe circumstances beyond my control, and photographic evidence was promptly submitted through the partner app.\n\nUnder fair work standards, unilateral penalty deductions without photographic verification violate standard partner policies. Kindly reverse the deduction within 48 hours.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `🚨 *Attention Rider Brothers: Swiggy Agreement Breakdown:*
❌ *Rejected Order:* ₹50 penalty + 24-hr account freeze
⏳ *Restaurant Delay:* First 30 mins ₹0, capped at max ₹25
⚠️ *Spillage Claim:* Up to ₹500 deducted automatically
💡 *Safety Tip:* Photograph parcels before pickup and delivery!`,
        analyzedAt: '2026-10-06'
      },
      hi: {
        id: 'swiggy-hi',
        documentType: 'डिलीवरी पार्टनर सर्विस एग्रीमेंट',
        platformName: 'Swiggy',
        overallRiskScore: 'risk',
        headline: 'सावधान! आर्डर ठुकराने पर ₹50 जुर्माना और खाना गिरने पर ₹500 तक सीधा कटेगा',
        spokenSummary: 'भाई, इस एग्रीमेंट में कंपनी ने आपके ऊपर भारी शर्तें रखी हैं। अगर आपने आर्डर मना किया तो हर आर्डर पर ₹50 कटेंगे और 3 बार मना किया तो 24 घंटे काम नहीं मिलेगा। रेस्टोरेंट में 30 मिनट इंतज़ार करने के बाद ही सिर्फ ₹1 प्रति मिनट मिलेगा और वो भी अधिकतम ₹25। और अगर ग्राहक ने कहा कि खाना गिर गया, तो बिना आपसे पूछे आपके पैसे से ₹500 काट लिए जाएंगे।',
        financialImpact: {
          deductions: ['₹50 प्रति रिजेक्टेड आर्डर', 'ग्राहक की शिकायत पर ₹500 तक का हर्जाना'],
          incentives: ['शिफ्ट गारंटी तभी मिलेगी जब 90% आर्डर स्वीकार करोगे'],
          penalties: ['3 आर्डर मना करने पर 24 घंटे आईडी बंद'],
          netTakeaway: 'हफ्ते की कमाई में से बिना सुनवाई के ₹500 से ₹1000 तक कट सकते हैं।'
        },
        clauses: [
          {
            id: 'c1',
            riskLevel: 'risk',
            title: 'आर्डर रिजेक्ट करने पर ₹50 पेनल्टी',
            originalSnippet: 'Any order rejected after assignment incurs a fee of INR 50 deducted from weekly payouts. If 3 consecutive orders are denied, DP account shall enter 24-hour temporary throttling.',
            spokenExplanation: 'अगर आपने कोई आर्डर असाइन होने के बाद कैंसिल या मना किया, तो आपकी जेब से ₹50 कटेंगे। 3 बार मना किया तो पूरे 24 घंटे के लिए कंपनी आपकी आईडी से आर्डर देना बंद कर देगी।',
            whyItMatters: 'अगर बारिश, जाम या गाड़ी खराब होने पर आपने आर्डर छोड़ा, तो कमाई तो छूटेगी ही, उलटा जुर्माना भी भरना पड़ेगा।',
            actionTip: 'अगर मजबूरी में आर्डर रिजेक्ट करना पड़े, तो पहले चैट सपोर्ट पर ब्रेकडाउन या जाम की फोटो भेजकर टिकट बनाएं।'
          },
          {
            id: 'c2',
            riskLevel: 'caution',
            title: 'दुकान पर 30 मिनट इंतज़ार का सिर्फ ₹25',
            originalSnippet: 'In-store waiting fees shall be calculated only after thirty (30) minutes... strictly capped at a maximum of INR 25.00.',
            spokenExplanation: 'रेस्टोरेंट अगर खाना बनाने में देर करे, तो पहले 30 मिनट का कोई पैसा नहीं मिलेगा। 30 मिनट के बाद सिर्फ ₹1 प्रति मिनट मिलेगा, और वो भी ज्यादा से ज्यादा ₹25 ही मिलेगा।',
            whyItMatters: 'भीड़भाड़ वाले रेस्टोरेंट में आपका कीमती समय बर्बाद होगा और उसके बदले सिर्फ ₹25 मिलेंगे।',
            actionTip: 'जैसे ही रेस्टोरेंट पहुंचें, ऐप में तुरंत अराइव्ड मार्क करें और 15 मिनट से ज्यादा देर हो तो राइडर सपोर्ट पर कॉल करें।'
          },
          {
            id: 'c3',
            riskLevel: 'risk',
            title: 'ग्राहक की शिकायत पर बिना पूछे ₹500 की सीधी कटौती',
            originalSnippet: 'the total order value up to INR 500 shall be debited unilaterally from DP ledger without prior dispute notice.',
            spokenExplanation: 'अगर ग्राहक ने ऐप में शिकायत कर दी कि खाना छलक गया या पैकेट फट गया, तो कंपनी आपसे बिना पूछे सीधे ₹500 काट लेगी।',
            whyItMatters: 'कई बार रेस्टोरेंट ही खराब पैकिंग करता है, पर नुकसान राइडर की जेब से होता है।',
            actionTip: 'रेस्टोरेंट से पार्सल लेते समय और ग्राहक को देते समय हमेशा डिलीवरी बैग और पार्सल की फोटो खींच कर रखें।'
          }
        ],
        workerAdvice: [
          'कभी भी लगातार 3 आर्डर रिजेक्ट न करें, ऐप ऑफलाइन कर दें।',
          'पार्सल सील टूटा हो तो रेस्टोरेंट से नया पैकेट मांगें।',
          'कटौती होने पर 24 घंटे के भीतर डिस्प्यूट टिकट दर्ज करें।'
        ],
        grievanceTemplate: {
          subject: 'Dispute Against Unilateral Deduction of Order Penalty - Partner ID: [YOUR_ID]',
          body: `Dear Partner Support Team,\n\nI am writing to formally contest the deduction of INR [AMOUNT] debited from my weekly payout for Order ID [ORDER_ID].\n\nKindly reverse this unilateral deduction within 48 hours.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `🚨 *सावधान साथी! Swiggy कॉन्ट्रैक्ट का सच:*
❌ *आर्डर मना किया:* ₹50 कटेंगे + 24 घंटे आईडी बंद
⏳ *रेस्टोरेंट में इंतज़ार:* 30 मिनट बाद सिर्फ ₹25 कैप
⚠️ *खाना गिरने की शिकायत:* सीधा ₹500 तक कटेगा
💡 *सुरक्षा टिप:* हमेशा पार्सल की फोटो लें और 3 आर्डर लगातार रिजेक्ट न करें!`,
        analyzedAt: '2026-10-06'
      }
    }
  },
  {
    id: 'zomato-dinner-surge',
    name: 'Zomato Dinner Peak Incentive & Milestone Trap',
    platform: 'Zomato',
    tagline: 'Milestone Targets, Acceptance Throttling & 1-Star Penalties',
    badgeColor: 'bg-[#E23744]',
    sampleInputText: `ZOMATO DINNER PEAK INCENTIVE SCHEME - GURGAON / BENGALURU SOUTH
Target Window: 18:00 to 23:00 hrs.
Condition 1: Complete 18 delivery orders within the specified 5-hour window to qualify for INR 600 mega bonus.
Condition 2: Overall shift touchpoint acceptance rate must exceed 96.0%. Order declines or missed pings reduce qualifying percentage.
Condition 3: In the event of completion of 17 orders or fewer, zero pro-rata incentive shall be disbursed. No grace order adjustments allowed.
Penalty Clause 9: Any 1-Star feedback or rider behavioral escalation registered during the weekend peak window will lead to a penalty debit of INR 200 and disqualification from weekly streak rewards.`,
    analysis: {
      en: {
        id: 'zomato-en',
        documentType: 'Incentive Scheme',
        platformName: 'Zomato',
        overallRiskScore: 'caution',
        headline: 'Caution: All-or-Nothing 18 Order Trap and ₹200 Penalty for 1-Star Reviews',
        spokenSummary: 'This bonus operates on an unforgiving all-or-nothing model: completing 17 out of 18 orders results in ₹0 bonus. You must maintain an ultra-strict 96% acceptance rate, and a single 1-star customer rating results in a ₹200 penalty and wipes out your weekly streak earnings.',
        financialImpact: {
          deductions: ['₹200 fine for any 1-star customer feedback'],
          incentives: ['₹600 bonus only if exactly 18 orders completed'],
          penalties: ['Weekly streak bonus forfeited upon customer escalation'],
          netTakeaway: 'High risk of completing 16 or 17 orders with zero bonus compensation.'
        },
        clauses: [
          {
            id: 'z1',
            riskLevel: 'risk',
            title: '17 Orders Earns ₹0 Bonus (Zero Pro-Rata Share)',
            originalSnippet: 'In the event of completion of 17 orders or fewer, zero pro-rata incentive shall be disbursed. No grace order adjustments allowed.',
            spokenExplanation: 'There is zero partial payout: missing the 18th order by even 1 minute renders all 5 hours of bonus effort completely unpaid.',
            whyItMatters: 'System dispatch often slows down in the final 30 minutes of peak windows, stranding riders at 16 or 17 orders.',
            actionTip: 'Position yourself near cloud kitchen clusters right at 17:50 to secure quick orders early.'
          },
          {
            id: 'z2',
            riskLevel: 'caution',
            title: 'Strict 96% Acceptance Threshold',
            originalSnippet: 'Overall shift touchpoint acceptance rate must exceed 96.0%. Order declines or missed pings reduce qualifying percentage.',
            spokenExplanation: 'Missing a single dispatch ping due to poor network coverage can invalidate your entire evening bonus.',
            whyItMatters: 'Forces riders to accept unfavorable long-distance or low-fare deliveries.',
            actionTip: 'Keep your phone charged and screen unlocked during peak hours.'
          },
          {
            id: 'z3',
            riskLevel: 'risk',
            title: '₹200 Fine & Streak Forfeiture for 1-Star Rating',
            originalSnippet: 'Any 1-Star feedback... will lead to a penalty debit of INR 200 and disqualification from weekly streak rewards.',
            spokenExplanation: 'Customer frustration over cold food or kitchen delays is deducted straight from your pay packet.',
            whyItMatters: 'You bear the financial penalty for restaurant kitchen delays.',
            actionTip: 'Politely remind customers at the doorstep to rate 5 stars on the app.'
          }
        ],
        workerAdvice: [
          'Do not speed dangerously for milestone targets.',
          'Document app outages or ping failures with screenshots.',
          'Contest unjustified 1-star ratings with support immediately.'
        ],
        grievanceTemplate: {
          subject: 'Review Request: Milestone Incentive Dispatch Throttling - ID [YOUR_ID]',
          body: `Dear Team,\n\nI was online for the entire peak slot but was throttled at 17 orders. Please credit the pro-rata milestone compensation.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `⚡ *Zomato Dinner Peak Trap Alert:*
🎯 Target: 18 orders for ₹600 bonus
⚠️ 17 orders = ₹0 bonus!
❌ 1 missed ping loses the bonus!
⭐ 1-star rating = ₹200 fine + streak cancelled!`,
        analyzedAt: '2026-10-06'
      },
      hi: {
        id: 'zomato-hi',
        documentType: 'इंसेंटिव और बोनस पॉलिसी',
        platformName: 'Zomato',
        overallRiskScore: 'caution',
        headline: 'सावधानी! 18 आर्डर का लालच: 17 आर्डर किए तो ₹0 बोनस मिलेगा!',
        spokenSummary: 'भाई, ये 18 आर्डर पर ₹600 बोनस वाली स्कीम बहुत चालाकी भरी है। अगर आपने 5 घंटे में 17 आर्डर भी पूरे कर लिए, पर 18वां आर्डर नहीं मिला, तो आपको ₹1 भी बोनस नहीं मिलेगा! साथ ही 96% आर्डर स्वीकार करने होंगे। और अगर किसी एक कस्टमर ने 1-स्टार रेटिंग दे दी, तो ₹200 जुर्माना कटेगा और पूरे हफ्ते का बोनस रद्द हो जाएगा।',
        financialImpact: {
          deductions: ['1-स्टार रेटिंग मिलने पर ₹200 की पेनल्टी'],
          incentives: ['18 आर्डर पर ₹600 बोनस (लेकिन 17 आर्डर पर ₹0)'],
          penalties: ['हफ्ते का पूरा स्ट्रीक बोनस रद्द हो सकता है'],
          netTakeaway: 'अंतिम घंटे में कंपनी अक्सर आर्डर देना धीमा कर देती है, जिससे मेहनत बेकार हो जाती है।'
        },
        clauses: [
          {
            id: 'z1',
            riskLevel: 'risk',
            title: '17 आर्डर किए तो ₹0 बोनस',
            originalSnippet: 'In the event of completion of 17 orders or fewer, zero pro-rata incentive shall be disbursed.',
            spokenExplanation: 'कंपनी कोई दया नहीं दिखाएगी। अगर 18 की जगह 17 आर्डर हुए, तो आपको कोई हिस्सा नहीं मिलेगा, यानी बोनस पूरा ज़ीरो हो जाएगा।',
            whyItMatters: 'रात 10:30 बजे अक्सर सिस्टम आर्डर धीमा कर देता है, जिससे पूरी 5 घंटे की भागदौड़ बेकार जाती है।',
            actionTip: 'शाम 6 बजे ही भीड़भाड़ वाले मॉल या किचन के पास रहें ताकि पहले 2 घंटे में ही ज्यादा आर्डर निकल जाएं।'
          },
          {
            id: 'z2',
            riskLevel: 'caution',
            title: '96% आर्डर स्वीकार करना अनिवार्य',
            originalSnippet: 'Overall shift touchpoint acceptance rate must exceed 96.0%.',
            spokenExplanation: 'अगर आपने 20 में से सिर्फ 1 आर्डर भी मिस किया या नेटवर्क जाने से रिंग छूट गई, तो बोनस हाथ से निकल जाएगा।',
            whyItMatters: 'सिग्नल टूटना भी आपके इंसेंटिव को खत्म कर सकता है।',
            actionTip: 'पीक आवर्स में फोन का डू-नॉट-डिस्टर्ब ऑन रखें और नेटवर्क चेक करें।'
          },
          {
            id: 'z3',
            riskLevel: 'risk',
            title: '1-स्टार रेटिंग पर ₹200 जुर्माना और बोनस कैंसिल',
            originalSnippet: 'Any 1-Star feedback... will lead to a penalty debit of INR 200 and disqualification from weekly streak rewards.',
            spokenExplanation: 'अगर किसी ग्राहक का खाना लेट हुआ या मूड खराब था और उसने 1 स्टार दे दिया, तो कंपनी आपके ₹200 काट लेगी।',
            whyItMatters: 'ग्राहक के गुस्से की सज़ा सीधे आपकी जेब पर भारी पड़ती है।',
            actionTip: 'डिलीवरी देते समय मुस्कुरा कर 5-स्टार रेटिंग की रिक्वेस्ट करें।'
          }
        ],
        workerAdvice: [
          'इंसेंटिव के चक्कर में खतरनाक ड्राइविंग न करें।',
          'रात 10:30 बजे आर्डर न आने पर स्क्रीनशॉट रखें।',
          'गलत 1-स्टार रेटिंग पर तुरंत सपोर्ट पर शिकायत दर्ज करें।'
        ],
        grievanceTemplate: {
          subject: 'Grievance: Unfair Disqualification from Peak Milestone Incentive - ID [YOUR_ID]',
          body: `Dear Operations Team,\n\nI completed 17 peak orders during yesterday's dinner slot. Despite staying active within the geo-fenced high-demand zone, order dispatch was throttled.\n\nPlease review dispatch logs and credit the deserving incentive.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `⚡ *Zomato डिनर बोनस का सच (6 PM - 11 PM):*
🎯 *टारगेट:* 18 आर्डर = ₹600 बोनस
❌ *खतरा:* 17 आर्डर हुए तो ₹0 मिलेगा!
📱 *स्वीकृति दर:* 96% ज़रूरी
⭐ *1-स्टार रेटिंग:* ₹200 जुर्माना + वीकली बोनस रद्द!`,
        analyzedAt: '2026-10-06'
      }
    }
  },
  {
    id: 'urban-company-deactivation',
    name: 'Urban Company Partner Deactivation & Kit Deduction',
    platform: 'Urban Company',
    tagline: 'Automatic ID Suspension, ₹1200 Re-training Fee & ₹25k Penalty',
    badgeColor: 'bg-black text-white',
    sampleInputText: `URBAN COMPANY SERVICE PROFESSIONAL ONBOARDING AGREEMENT
Clause 5.3 Rating Threshold & Deactivation: Professional must maintain a minimum trailing 30-day average customer rating of 4.75 stars. In the event the rating falls below 4.70 stars, the Partner ID will be automatically deactivated for a mandatory 7-day period. Re-activation requires attendance at a mandatory retraining workshop and payment of an administrative and kit recalibration fee of INR 1,200 deducted from pending settlement.
Clause 11.2 Direct Customer Engagement Prohibition: Any Partner found providing services directly to a UC client outside the platform shall be subjected to immediate permanent deactivation, forfeiture of all wallet balance, and liquidated damages of INR 25,000.`,
    analysis: {
      en: {
        id: 'uc-en',
        documentType: 'Partner Onboarding Agreement',
        platformName: 'Urban Company',
        overallRiskScore: 'risk',
        headline: 'Critical Risk: 7-Day ID Suspension Under 4.7 Rating & ₹1,200 Retraining Clawback',
        spokenSummary: 'This contract contains severe deactivation clauses. If your rolling 30-day customer rating drops below 4.70, your ID is suspended for 7 days, and you must pay ₹1,200 to get it reactivated. Off-platform direct client work triggers instant wallet balance forfeiture and legal threats of ₹25,000 in liquidated damages.',
        financialImpact: {
          deductions: ['₹1,200 kit & retraining fee for reactivation'],
          incentives: ['Access to high-ticket leads requires 4.85+ rating'],
          penalties: ['Full wallet forfeiture and ₹25,000 damages claim threat'],
          netTakeaway: 'Loss of 1 full week of income plus ₹1,200 penalty for slight rating drops.'
        },
        clauses: [
          {
            id: 'u1',
            riskLevel: 'risk',
            title: 'Automated 7-Day ID Suspension for Rating Under 4.7',
            originalSnippet: 'falls below 4.70 stars, the Partner ID will be automatically deactivated for a mandatory 7-day period.',
            spokenExplanation: 'Automated algorithms suspend your livelihood for 7 days without hearing your side if a customer gives an unfair 1-star review.',
            whyItMatters: 'Complete loss of weekly earnings due to subjective customer feedback.',
            actionTip: 'Take before-and-after photos of every service location.'
          },
          {
            id: 'u2',
            riskLevel: 'risk',
            title: '₹1,200 Fee to Reopen Suspended ID',
            originalSnippet: 'payment of an administrative and kit recalibration fee of INR 1,200 deducted from pending settlement.',
            spokenExplanation: 'You are forced to pay ₹1,200 out of pocket to unlock your account after a suspension.',
            whyItMatters: 'Adds financial penalty during an unpaid week.',
            actionTip: 'Dispute malicious ratings within 24 hours of receiving them.'
          },
          {
            id: 'u3',
            riskLevel: 'risk',
            title: 'Wallet Seizure & ₹25,000 Liquidated Damages',
            originalSnippet: 'forfeiture of all wallet balance, and liquidated damages of INR 25,000.',
            spokenExplanation: 'Performing direct offline jobs for clients leads to account closure, wallet forfeiture, and legal threats.',
            whyItMatters: 'Platforms monitor communication and strictly penalize direct contracts.',
            actionTip: 'Always direct customers to book through the official app.'
          }
        ],
        workerAdvice: [
          'Never leave a job site without customer verbal approval.',
          'Always preserve service receipts and photo evidence.',
          'Submit written appeals against unfair rating penalties.'
        ],
        grievanceTemplate: {
          subject: 'Appeal Against Arbitrary Suspension - Partner ID: [YOUR_ID]',
          body: `Dear Partner Grievance Cell,\n\nI request an immediate manual audit of the low-rating incidents leading to my suspension. Please restore my partner ID immediately.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `⚠️ *Urban Company Partner Alert:*
📉 Rating under 4.7 = 7 days zero income!
💸 ID reactivation fee: ₹1,200 deduction
🚫 Direct jobs: Wallet seizure + ₹25,000 penalty
⭐ Always ask clients for 5-star rating!`,
        analyzedAt: '2026-10-06'
      },
      hi: {
        id: 'uc-hi',
        documentType: 'सर्विस पार्टनर ऑनबोर्डिंग एग्रीमेंट',
        platformName: 'Urban Company',
        overallRiskScore: 'risk',
        headline: 'खतरा! 4.7 से कम रेटिंग पर आईडी ब्लॉक, ₹1200 ट्रेनिंग फीस और ₹25,000 जुर्माने की धमकी',
        spokenSummary: 'साथी, इस एग्रीमेंट में बहुत कड़े नियम हैं। अगर आपकी रेटिंग 4.7 से ज़रा सी भी नीचे आई, तो आपकी आईडी तुरंत 7 दिन के लिए बंद कर दी जाएगी। दोबारा शुरू करने के लिए आपको ₹1,200 अपनी जेब से भरने पड़ेंगे। और अगर कभी किसी कस्टमर का काम सीधे बाहर किया, तो कंपनी आपका सारा वॉलेट बैलेंस ज़ब्त कर लेगी और ₹25,000 का हर्जाना मांग सकती है।',
        financialImpact: {
          deductions: ['आईडी दोबारा चालू करने के लिए ₹1,200 की फीस'],
          incentives: ['केवल 4.75 स्टार रेटिंग बनाए रखने पर ही काम मिलेगा'],
          penalties: ['वॉलेट बैलेंस ज़ब्त और ₹25,000 का भारी कानूनी जुर्माना'],
          netTakeaway: 'रेटिंग थोड़ी भी गिरी तो 7 दिन की रोज़ी-रोटी बंद और ₹1,200 का नुकसान।'
        },
        clauses: [
          {
            id: 'u1',
            riskLevel: 'risk',
            title: '4.70 रेटिंग पर 7 दिन के लिए आईडी बंद',
            originalSnippet: 'falls below 4.70 stars, the Partner ID will be automatically deactivated for a mandatory 7-day period.',
            spokenExplanation: 'अगर 1-2 कस्टमर ने बेवजह खराब रेटिंग दे दी और आपका औसत 4.70 से कम हुआ, तो कंप्यूटर बिना किसी इंसान की बात सुने आपकी आईडी 7 दिन के लिए बंद कर देगा।',
            whyItMatters: 'पूरे 7 दिन तक आपकी कोई कमाई नहीं होगी, घर का खर्च चलाना मुश्किल हो जाएगा।',
            actionTip: 'हर काम खत्म करने के बाद कस्टमर से 5-स्टार रेटिंग का अनुरोध करें।'
          },
          {
            id: 'u2',
            riskLevel: 'risk',
            title: 'आईडी दोबारा चालू कराने के ₹1,200 कटेंगे',
            originalSnippet: 'Re-activation requires attendance at a mandatory retraining workshop and payment of an administrative and kit recalibration fee of INR 1,200.',
            spokenExplanation: '7 दिन की सज़ा के बाद भी फ्री में काम शुरू नहीं होगा! कंपनी आपसे ₹1,200 ट्रेनिंग और किट के नाम पर काटेगी।',
            whyItMatters: 'कमाई बंद होने के बावजूद जेब से ₹1,200 देने पड़ेंगे।',
            actionTip: 'अगर रेटिंग गलत शिकायत की वजह से गिरी है, तो तुरंत पार्टनर हेल्पलाइन पर ईमेल करें।'
          },
          {
            id: 'u3',
            riskLevel: 'risk',
            title: 'डायरेक्ट काम करने पर ₹25,000 हर्जाना व वॉलेट ज़ब्त',
            originalSnippet: 'forfeiture of all wallet balance, and liquidated damages of INR 25,000.',
            spokenExplanation: 'अगर कस्टमर का काम सीधे बाहर किया और कंपनी को पता चल गया, तो वो आपके वॉलेट का सारा पैसा रोक लेगी और ₹25,000 का नोटिस भेज सकती है।',
            whyItMatters: 'हजार-दो हजार के चक्कर में पूरे महीने की मेहनत का पैसा डूब सकता है।',
            actionTip: 'कस्टमर से हमेशा कहें कि बुकिंग ऐप के ज़रिए ही करें।'
          }
        ],
        workerAdvice: [
          'कस्टमर के घर हमेशा साफ यूनिफॉर्म और आईडी कार्ड पहनकर जाएं।',
          'काम शुरू करने से पहले और बाद में काम की फोटो ज़रूर लें।',
          'किसी भी विवाद की स्थिति में कस्टमर से बहस न करें, सपोर्ट को फोन करें।'
        ],
        grievanceTemplate: {
          subject: 'Appeal Against Automated ID Deactivation - Partner ID: [YOUR_ID]',
          body: `Dear Category Lead,\n\nMy partner ID has been suspended due to arbitrary customer ratings. Kindly review and restore my ID.\n\nSincerely,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `⚠️ *Urban Company पार्टनर्स ध्यान दें:*
📉 *रेटिंग 4.7 से कम:* आईडी 7 दिन बंद + 0 कमाई
💸 *दोबारा शुरू करने का खर्च:* ₹1,200 की जबरन कटौती
🚫 *ऑफ-ऐप काम:* वॉलेट ज़ब्त + ₹25,000 जुर्माना
⭐ *टिप:* कस्टमर से हमेशा 5-स्टार रेटिंग मांगें!`,
        analyzedAt: '2026-10-06'
      }
    }
  },
  {
    id: 'blinkit-transit-damage',
    name: 'Blinkit 10-Min Delivery & Transit Damage Deduction',
    platform: 'Blinkit',
    tagline: 'Late Arrival Penalties, Damaged Goods Debit & Dark Store Queue',
    badgeColor: 'bg-[#F8CB46] text-[#0C831F]',
    sampleInputText: `BLINKIT QUICK-COMMERCE FLEET AGREEMENT
Clause 3.4 SLA & Delivery Timelines: Standard dispatch SLA is strictly 8 to 12 minutes from store handoff. Any order exceeding 14 minutes turnaround due to DP negligence shall incur a late delivery penalty of INR 25 per order.
Clause 6.1 Damaged / Perishable Inventory: Upon customer rejection due to crushed bread, broken eggs, or melted dairy, DP shall bear 100% of the invoice replacement value up to INR 400 per incident. Store manager evaluation shall be final and binding with no appeal window.`,
    analysis: {
      en: {
        id: 'blinkit-en',
        documentType: 'Fleet Delivery Agreement',
        platformName: 'Blinkit',
        overallRiskScore: 'risk',
        headline: 'Critical Risk: 14-Minute Late Penalty and 100% Damage Debit for Groceries',
        spokenSummary: 'This quick-commerce contract shifts inventory and traffic risks directly onto the rider. Exceeding 14 minutes incurs a ₹25 penalty per order, and delicate crushed goods like bread or eggs are debited at 100% invoice replacement cost up to ₹400 with no right of appeal against store managers.',
        financialImpact: {
          deductions: ['Up to ₹400 for damaged eggs or crushed bread', '₹25 fine for deliveries exceeding 14 minutes'],
          incentives: ['Marginal speed bonuses of ₹5 to ₹10 per delivery'],
          penalties: ['Store manager decisions are binding with zero appeal rights'],
          netTakeaway: 'A single damaged egg carton or crushed loaf wipes out earnings from 4 to 5 deliveries.'
        },
        clauses: [
          {
            id: 'b1',
            riskLevel: 'risk',
            title: '₹25 Fine for Deliveries Over 14 Minutes',
            originalSnippet: 'Any order exceeding 14 minutes turnaround... shall incur a late delivery penalty of INR 25 per order.',
            spokenExplanation: 'Riders are penalized ₹25 if delivery takes over 14 minutes, regardless of traffic congestion, red lights, or elevator delays.',
            whyItMatters: 'Forces dangerous speeding and significantly increases road accident risks.',
            actionTip: 'Report roadblocks or signal delays through the in-app delay prompt immediately.'
          },
          {
            id: 'b2',
            riskLevel: 'risk',
            title: '100% Replacement Cost for Damaged Goods',
            originalSnippet: 'DP shall bear 100% of the invoice replacement value up to INR 400 per incident.',
            spokenExplanation: 'If delicate goods like bread or eggs get crushed, the rider pays up to ₹400 for replacement out of pocket.',
            whyItMatters: 'Poor dark-store packing by store staff gets unfairly deducted from driver earnings.',
            actionTip: 'Inspect bag packing before leaving the dark store; pack fragile goods on top.'
          }
        ],
        workerAdvice: [
          'Never sacrifice safety for speed bonuses.',
          'Inspect fragile items before taking handoff.',
          'Document store manager disputes immediately.'
        ],
        grievanceTemplate: {
          subject: 'Dispute Against Packaging Liability Deduction - ID [YOUR_ID]',
          body: `Dear Fleet Team,\n\nI contest the deduction for damaged goods on Order [ORDER_ID]. The items were improperly packed at the dark store. Please refund the deducted amount.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `⏱️ *Blinkit Fleet Alert:*
🚨 Over 14 min delivery: ₹25 penalty
🥚 Damaged goods: Up to ₹400 deducted
📦 Always inspect packing before leaving dark store!`,
        analyzedAt: '2026-10-06'
      },
      hi: {
        id: 'blinkit-hi',
        documentType: 'क्विक-कॉमर्स फ्लीट एग्रीमेंट',
        platformName: 'Blinkit',
        overallRiskScore: 'risk',
        headline: 'खतरा! 14 मिनट से देर हुई तो ₹25 कटेगा, अंडा-ब्रेड टूटा तो ₹400 का पूरा नुकसान आपका!',
        spokenSummary: 'साथी, इस क्विक कॉमर्स एग्रीमेंट में जान जोखिम में डालने वाली शर्तें हैं। अगर डिलीवरी 14 मिनट से लेट हुई तो ₹25 कटेंगे, भले ही रास्ते में जाम हो या सिग्नल बंद हो। और अगर थैले में अंडा फूट गया या ब्रेड दब गई, तो स्टोर मैनेजर बिना किसी अपील के ₹400 तक सीधे आपके पैसों से काट लेगा।',
        financialImpact: {
          deductions: ['सामान टूटने पर ₹400 तक पूरी कटौती', 'देर होने पर ₹25 प्रति आर्डर'],
          incentives: ['10-मिनट डिलीवरी पर मामूली 5-10 रुपये प्रति आर्डर'],
          penalties: ['स्टोर मैनेजर का फैसला अंतिम, अपील का कोई मौका नहीं'],
          netTakeaway: 'एक छोटे से नुकसान से आपकी 4-5 आर्डर की कमाई डूब जाएगी।'
        },
        clauses: [
          {
            id: 'b1',
            riskLevel: 'risk',
            title: '14 मिनट से लेट होने पर ₹25 की कटौती',
            originalSnippet: 'Any order exceeding 14 minutes turnaround... shall incur a late delivery penalty of INR 25 per order.',
            spokenExplanation: 'अगर किसी भी वजह से 14 मिनट से ज्यादा लग गए, तो कंपनी ₹25 काट लेगी।',
            whyItMatters: 'यह राइडर को तेज और खतरनाक गाड़ी चलाने पर मजबूर करता है।',
            actionTip: 'अगर जाम हो, तो तुरंत ऐप में हैवी ट्रैफिक बटन दबाएं।'
          },
          {
            id: 'b2',
            riskLevel: 'risk',
            title: 'अंडा या सामान टूटने पर पूरा हर्जाना',
            originalSnippet: 'DP shall bear 100% of the invoice replacement value up to INR 400 per incident.',
            spokenExplanation: 'अगर ग्राहक ने कहा कि अंडा फूट गया, तो नया सामान देने का पूरा पैसा आपकी कमाई से काटा जाएगा।',
            whyItMatters: 'स्टोर वाले ही पैकिंग खराब करते हैं, पर जुर्माना राइडर भरता है।',
            actionTip: 'डार्क स्टोर से बैग में सामान रखते समय खुद चेक करें।'
          }
        ],
        workerAdvice: [
          'सुरक्षा सबसे पहले: 25 रुपये बचाने के लिए लाल बत्ती कभी न तोड़ें।',
          'स्टोर से निकलते ही सामान की पैकिंग की जांच करें।',
          'गलत कटौती होने पर साथी राइडर्स को बताएं।'
        ],
        grievanceTemplate: {
          subject: 'Contesting Arbitrary Inventory Damage Deduction - DP ID [YOUR_ID]',
          body: `Dear Fleet Manager,\n\nI was charged INR [AMOUNT] for damaged goods on Order [ORDER_ID]. Kindly refund this amount.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `⏱️ *Blinkit राइडर भाइयों के लिए चेतावनी:*
🚨 14 मिनट से देर = ₹25 जुर्माना
🥚 अंडा या ब्रेड टूटा = ₹400 तक सीधा कटेगा
🛑 जान जोखिम में न डालें, सेफ चलाएं!`,
        analyzedAt: '2026-10-06'
      }
    }
  },
  {
    id: 'uber-cancellation-fee',
    name: 'Uber Driver Cancellation Fee & Fine Print',
    platform: 'Uber',
    tagline: 'Driver Cancellation Fines, Acceptance Quota & Off-App Waivers',
    badgeColor: 'bg-black text-white',
    sampleInputText: `UBER DRIVER-PARTNER POLICY - WEEKLY PAYOUT DEDUCTIONS
Section 4: Driver Cancellation Threshold: If Driver Partner cancellation rate exceeds 8.0% across any weekly settlement cycle, a penalty of 10% of gross weekly trip earnings will be deducted as Quality Assurance Recovery.
Section 9: Long Pickup Fee Guarantee: Pickup compensation shall only commence after 12 minutes of continuous driving towards the pickup point and covers distance exceeding 4.5 km. Cancellations by rider during pickup before 10 minutes yield zero cancellation indemnity to driver.`,
    analysis: {
      en: {
        id: 'uber-en',
        documentType: 'Driver Weekly Deduction Policy',
        platformName: 'Uber',
        overallRiskScore: 'caution',
        headline: 'Caution: 10% Gross Weekly Earnings Penalty if Cancellation Rate Exceeds 8%',
        spokenSummary: 'This policy imposes heavy penalties on drivers who cancel unprofitable trips. If your cancellation rate exceeds 8%, 10% of your entire gross weekly earnings is deducted. In addition, long pickups offer zero cancellation fee protection if the passenger cancels anytime before the 10-minute mark.',
        financialImpact: {
          deductions: ['10% penalty on gross weekly earnings for over 8% cancellations'],
          incentives: ['Pickup pay only after 12 continuous minutes of driving'],
          penalties: ['Zero payout if passenger cancels within 10 minutes of pickup trip'],
          netTakeaway: 'You can lose ₹1,500 on a ₹15,000 gross weekly earnings statement.'
        },
        clauses: [
          {
            id: 'ub1',
            riskLevel: 'risk',
            title: '10% Earnings Penalty for Over 8% Cancellations',
            originalSnippet: 'cancellation rate exceeds 8.0%... penalty of 10% of gross weekly trip earnings will be deducted.',
            spokenExplanation: 'Canceling more than 8 out of 100 trips triggers a massive 10% clawback on your total earnings.',
            whyItMatters: 'Drivers refusing uneconomical or congested routes face severe group deductions.',
            actionTip: 'Do not click personal cancel; wait for rider no-show timer to expire.'
          },
          {
            id: 'ub2',
            riskLevel: 'caution',
            title: 'Zero Compensation for Rider Cancellation Under 10 Mins',
            originalSnippet: 'Cancellations by rider during pickup before 10 minutes yield zero cancellation indemnity.',
            spokenExplanation: 'Passengers can cancel up to 9 minutes while you are driving towards them without paying you a single rupee.',
            whyItMatters: 'Wastes fuel and deadhead miles with no financial recourse.',
            actionTip: 'Call passengers immediately on distant pickup allocations to confirm departure.'
          }
        ],
        workerAdvice: [
          'Keep your cancellation rate strictly below 7%.',
          'Wait out the full arrival timer to secure cancellation compensation.',
          'File trip adjustment tickets for toll and unpaid deadheads.'
        ],
        grievanceTemplate: {
          subject: 'Contest 10% Earnings Quality Deduction - Partner ID [YOUR_ID]',
          body: `Dear Partner Support,\n\nI contest the 10% clawback on my payout. The cancellations were due to safety and route viability issues. Please credit back the funds.\n\nRegards,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `🚗 *Driver Partner Alert:*
⚠️ Over 8% cancellation = 10% cut on full week pay!
⛽ Rider cancel under 10 mins = ₹0 fuel compensation
💡 Wait for full timer to get cancellation fee!`,
        analyzedAt: '2026-10-06'
      },
      hi: {
        id: 'uber-hi',
        documentType: 'ड्राइवर पार्टनर वीकली डिडक्शन पॉलिसी',
        platformName: 'Uber',
        overallRiskScore: 'caution',
        headline: 'सावधानी! 8% से ज्यादा राइड कैंसिल की तो पूरी हफ्ते की कमाई का 10% कटेगा!',
        spokenSummary: 'कैब और ऑटो ड्राइवर भाइयों, ध्यान दें। अगर आपने हफ्ते में 8% से ज्यादा राइड कैंसिल की, तो कंपनी आपकी पूरे हफ्ते की कुल कमाई में से सीधा 10% काट लेगी! और अगर आप सवारी लेने 12 मिनट दूर गए और उसने 9वें मिनट में कैंसिल कर दिया, तो आपको ₹1 भी नहीं मिलेगा।',
        financialImpact: {
          deductions: ['हफ्ते की कुल कमाई का 10% तक पेनल्टी'],
          incentives: ['लंबी पिकअप फीस तभी जब 12 मिनट और 4.5 किमी से ज्यादा हो'],
          penalties: ['सवारी द्वारा 10 मिनट से पहले कैंसिल करने पर ₹0 मुआवजा'],
          netTakeaway: '₹15,000 की कमाई पर सीधा ₹1,500 का नुकसान हो सकता है।'
        },
        clauses: [
          {
            id: 'ub1',
            riskLevel: 'risk',
            title: '8% कैंसिलेशन पर कुल कमाई का 10% जुर्माना',
            originalSnippet: 'cancellation rate exceeds 8.0%... penalty of 10% of gross weekly trip earnings will be deducted.',
            spokenExplanation: 'अगर आपने 100 में से 8 से ज्यादा राइड कैंसिल कर दीं, तो कंपनी उस हफ्ते की कुल कमाई का 10% हिस्सा काट लेगी।',
            whyItMatters: 'अगर सीएनजी पंप पर लाइन हो या घाटे वाला रूट हो और आपने कैंसिल किया, तो कमाई कट जाएगी।',
            actionTip: 'सवारी न आने पर टाइमर खत्म होने के बाद ही कैंसिल करें ताकि कैंसिलेशन फीस मिले।'
          },
          {
            id: 'ub2',
            riskLevel: 'caution',
            title: '12 मिनट पिकअप जाने पर भी ₹0 का खतरा',
            originalSnippet: 'Cancellations by rider during pickup before 10 minutes yield zero cancellation indemnity.',
            spokenExplanation: 'अगर आप 10 मिनट तक सीएनजी जलाकर सवारी की तरफ बढ़ रहे हैं और उसने कैंसिल कर दिया, तो आपको कोई मुआवजा नहीं मिलेगा।',
            whyItMatters: 'ड्राइवर का ईंधन और समय दोनों बर्बाद होता है और कोई भरपाई नहीं मिलती।',
            actionTip: 'दूर की पिकअप राइड आते ही तुरंत कॉल करके पूछें कि क्या सवारी तैयार है।'
          }
        ],
        workerAdvice: [
          'अपनी कैंसिलेशन दर हमेशा 7% से नीचे रखें।',
          'सवारी न आने पर टाइमर पूरा होने का इंतज़ार करें।',
          'कटौती होने पर हेल्प सेक्शन में अपील करें।'
        ],
        grievanceTemplate: {
          subject: 'Dispute Over 10% Weekly Earnings Quality Recovery Debit - Partner ID [YOUR_ID]',
          body: `Dear Uber Support,\n\nI contest the 10% deduction on my gross weekly payout. The cancellations occurred due to unresponsive riders. Please recalculate and refund.\n\nSincerely,\nPartner ID: [YOUR_ID]`
        },
        whatsAppSummary: `🚗 *Uber/Ola ड्राइवर भाइयों के लिए जरूरी सूचना:*
⚠️ *8% से ज्यादा कैंसिलेशन:* पूरे हफ्ते की कमाई का 10% कटेगा!
⛽ *पिकअप पर सवारी ने कैंसिल किया:* 10 मिनट से पहले ₹0
💡 *टिप:* हमेशा टाइमर पूरा होने पर ही राइड कैंसिल करें!`,
        analyzedAt: '2026-10-06'
      }
    }
  }
];

export function getMockAnalysis(presetId: string, lang: string): AnalysisResult | null {
  const preset = PRESET_SCENARIOS.find(p => p.id === presetId);
  if (!preset) return null;
  // If exact language is present, return it
  if (preset.analysis[lang]) return preset.analysis[lang];
  // If lang is en or hi-en, prefer en
  if (lang === 'en' || lang === 'hi-en') return preset.analysis['en'] || preset.analysis['hi'];
  // Otherwise return hi or en
  return preset.analysis['hi'] || preset.analysis['en'] || null;
}
