/**
 * Report Generator - Albirena Abogados
 * Creates structured reports from analysis results.
 */

export interface ReportData {
  profileType: string;
  analysis: any;
  risk: { score: number; level: string };
  laborResults: any;
}

export const ReportGenerator = {
  generateTextReport(data: ReportData): string {
    const { profileType, analysis, risk, laborResults } = data;
    
    return `
# INFORME DE ANÁLISIS LEGAL - ALBIRENA ABOGADOS

## 1. RESUMEN EJECUTIVO
- **Perfil detectado:** ${profileType.toUpperCase()}
- **Nivel de Riesgo:** ${risk.level} (${risk.score}/100)

## 2. HALLAZGOS CLAVE
${analysis.issues.map((i: string) => `- ${i}`).join('\n')}

## 3. CÁLCULO DE BENEFICIOS ESTIMADOS (DL 728)
- **Gratificación estimada:** S/ ${laborResults.total}
- **Base imponible:** S/ ${laborResults.base}

## 4. RECOMENDACIONES
- ${risk.level === 'Alto' ? 'Se recomienda asesoría legal inmediata.' : 'El contrato se encuentra dentro de los parámetros estándar.'}
- Revisar las cláusulas marcadas como críticas.

---
Generado automáticamente por el motor de IA de Albirena Abogados.
`;
  }
};
