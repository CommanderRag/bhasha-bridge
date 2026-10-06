import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocumentWithGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      imageBase64,
      imageMimeType,
      pdfBase64,
      languageCode = 'hi',
      apiKey,
    } = body;

    if (!text && !imageBase64 && !pdfBase64) {
      return NextResponse.json(
        { error: 'Please provide either text, an image, or a PDF document.' },
        { status: 400 }
      );
    }

    const result = await analyzeDocumentWithGemini({
      text,
      imageBase64,
      imageMimeType,
      pdfBase64,
      languageCode,
      apiKey,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error analyzing document:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze document.' },
      { status: 500 }
    );
  }
}
