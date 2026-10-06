export class TextToSpeechHelper {
  private static synth: SpeechSynthesis | null = null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  private static init() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public static speak({
    text,
    langCode = 'hi-IN',
    rate = 1.0,
    onStart,
    onEnd,
    onError,
  }: {
    text: string;
    langCode?: string;
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }) {
    this.init();
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      onError?.(new Error('Speech synthesis not supported'));
      return;
    }

    this.stop();

    // Clean markdown characters and non-verbal symbols for clearer voice output
    const cleanText = text
      .replace(/[*_#`~>]/g, '')
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')
      .replace(/[^\w\s\u0900-\u0DFF.,?!'-]/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(langCode.split('-')[0])) ||
                          voices.find(v => v.lang.includes('IN')) ||
                          null;

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    utterance.lang = langCode;

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      onError?.(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public static pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public static resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }
}
