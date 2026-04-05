import { NextRequest, NextResponse } from 'next/server';
import { PDFExtractor } from '@/lib/ai/pdf-extractor';
import { LegalAIService } from '@/lib/ai/ai-service';
import { Sanitizer } from '@/lib/security/sanitizer';
import { AntivirusService } from '@/lib/security/antivirus';
import { ReportGenerator } from '@/lib/legal/report-generator';
import { Logger } from '@/lib/security/logger';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      Logger.warn('Analysis attempt with no file');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    Logger.info(`Starting analysis for file: ${file.name}`);
    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Antivirus Scan
    const avResult = await AntivirusService.scanBuffer(buffer);
    if (!avResult.safe) {
      Logger.error('Security threat detected in file', { fileName: file.name });
      return NextResponse.json({ error: 'Security threat detected in file' }, { status: 403 });
    }

    // 2. Extract Text
    const text = await PDFExtractor.smartExtract(buffer);
    Logger.info('Text extracted successfully', { textLength: text.length });

    // 3. AI Analysis
    const analysis = await LegalAIService.analyzeDocument(text);
    Logger.info('AI Analysis completed');

    // 4. Generate Report
    const report = ReportGenerator.generateTextReport({
      profileType: analysis.profilType,
      analysis,
      risk: analysis.derivedRisk,
      laborResults: analysis.laborResults
    });

    // 5. Sanitize Output
    const sanitizedAnalysis = Sanitizer.sanitizeObject(analysis);

    Logger.info('Analysis request finished successfully');
    return NextResponse.json({
      success: true,
      analysis: sanitizedAnalysis,
      reportSummary: report
    });

  } catch (error: any) {
    Logger.error('Analysis API Error', error);
    return NextResponse.json({ error: 'Internal server error during analysis' }, { status: 500 });
  }
}
