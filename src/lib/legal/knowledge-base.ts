export interface LegalNorm {
  id: string;
  title: string;
  content: string;
  source: 'SUNAFIL' | 'DL728' | 'CONSTITUTION';
}

export const LegalKnowledgeBase = {
  /**
   * Get specific details for a known labor regime
   */
  getRegimeDetails(regime: 'general' | 'mype_pequena' | 'mype_micro') {
    const regimes = {
      general: {
        vacations: '30 days',
        cts: '1 salary per year',
        gratificaciones: '2 salaries per year',
      },
      mype_pequena: {
        vacations: '15 days',
        cts: '0.5 salary per year',
        gratificaciones: '1 salary per year',
      },
      mype_micro: {
        vacations: '15 days',
        cts: 'Exempt',
        gratificaciones: 'Exempt',
      }
    };
    return regimes[regime] || regimes.general;
  }
};
