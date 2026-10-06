# Bhasha Bridge (भाषा सेतु) - AI Legal Advocate for Gig Workers

An AI-powered multimodal legal explainer and contract advocate designed specifically for delivery riders, cab/auto drivers, salon professionals, and daily gig workers across India (Zomato, Swiggy, Blinkit, Urban Company, Uber, Ola, Zepto, Porter).

## 🚀 Key Features

- **Multimodal Document Ingestion**:
  - 📸 **Photo / Camera Upload**: Snap photos of paper contracts or app screenshots
  - 📄 **PDF Upload**: Upload platform agreements and weekly payout PDFs
  - ✍️ **Paste Text / SMS**: Paste deduction SMS alerts or confusing policy updates
  - ⚡ **1-Click Real Presets**: Instant real-world gig worker case studies (Swiggy, Zomato, Urban Company, Blinkit, Uber)
- **Spoken Regional Languages**:
  - Explains legal jargon in warm, street-smart spoken language (Hindi, Hinglish, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, English).
- **Traffic-Light Risk Classification**:
  - 🟢 **Safe**: Standard terms and fair requirements
  - 🟡 **Caution**: Fine-print milestone hurdles and waiting caps
  - 🔴 **High Risk**: Unilateral deductions, automated account deactivations, damage liabilities
- **Money Matters Widget**:
  - Direct breakdowns of Deductions (कटौतियां), Incentives (इंसेंटिव शर्तें), Penalties (जुर्माने), and Net Takeaway.
- **Voice Narration (TTS)**:
  - 1-click audio playback with playback speed controls (0.8x, 1.0x, 1.2x) and pause/resume.
- **Dispute & Union Sharing**:
  - 💬 **WhatsApp 1-Click Share**: Pre-formatted emoji-rich breakdown ready to forward to worker groups.
  - ✉️ **Formal Support Grievance Letter**: Professionally drafted English dispute letter to email to partner support with pre-filled ID slots.
- **Bhasha Sathi (भाषा साथी)**:
  - Interactive AI companion for follow-up questions regarding deductions, bike breakdowns, customer ratings, and worker rights.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React
- **AI Engine**: Google Gemini 3.8 Flash (`gemini-3.8-flash`) via `@google/genai`
- **Voice**: Web Speech API (`SpeechSynthesis`) with regional Indian voice mapping
- **Celebration**: `canvas-confetti`

## 🏃 Running Locally

```bash
cd /home/haze/.gemini/antigravity/scratch/bhasha-bridge

# Install dependencies
npm install

# Start development server
npm run dev

# Or build & start production server
npm run build
npm run start -- -p 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
