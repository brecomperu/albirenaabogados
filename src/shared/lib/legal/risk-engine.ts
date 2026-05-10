/**
 * Risk Score Engine - Albirena Abogados
 * Calculates legal risk level (0-100) based on analysis findings.
 */

export interface RiskAnalysis {
  missingMandatoryClauses: string[];
  inconsistentDates: boolean;
  unpaidBenefitsEstimate: number;
  unusualTerms: string[];
}

export const RiskEngine = {
  calculateScore(analysis: RiskAnalysis): { score: number; level: 'Bajo' | 'Medio' | 'Alto' } {
    let score = 0;

    // Penalties
    score += analysis.missingMandatoryClauses.length * 15;
    if (analysis.inconsistentDates) score += 30;
    
    // Unpaid benefits penalty (relative to a threshold, e.g., 5000 PEN)
    const benefitsPenalty = Math.min(analysis.unpaidBenefitsEstimate / 100, 20);
    score += benefitsPenalty;

    score += analysis.unusualTerms.length * 10;

    // Clamp score
    const finalScore = Math.min(score, 100);

    let level: 'Bajo' | 'Medio' | 'Alto' = 'Bajo';
    if (finalScore > 70) level = 'Alto';
    else if (finalScore > 30) level = 'Medio';

    return {
      score: finalScore,
      level
    };
  }
};
