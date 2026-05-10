/**
 * Labor Rules Engine - Peruvian Law (DL 728)
 * Handles calculations for CTS, Gratificaciones, and Vacaciones.
 */

export interface LaborCalculationInput {
  salary: number;
  monthsWorked: number;
  hasBonus?: boolean;
  regime: 'general' | 'mype_pequena' | 'mype_micro';
}

export const LaborEngine = {
  /**
   * Calculate CTS (Compensación por Tiempo de Servicios)
   * Formula: (Salary + 1/6 of last Gratificación) / 12 * months worked
   */
  calculateCTS(input: LaborCalculationInput) {
    const { salary, monthsWorked, regime } = input;
    let baseSalary = salary;
    
    // Add 1/6 of gratificación (assuming one full salary for general regime)
    const gratrComponent = regime === 'general' ? salary / 6 : 0;
    const computableRemuneration = baseSalary + gratrComponent;

    let total = (computableRemuneration / 12) * monthsWorked;

    if (regime === 'mype_pequena') {
      total = total / 2; // 50% for small business
    } else if (regime === 'mype_micro') {
      total = 0; // Micro business doesn't pay CTS in some contexts, or it's different. 
                 // Actually, micro-empresas don't pay CTS.
    }

    return Math.round(total * 100) / 100;
  },

  /**
   * Calculate Gratificaciones (July/December)
   * Formula: Full salary + 9% (Essalud) or 6.75% (EPS)
   */
  calculateGratificacion(input: LaborCalculationInput, healthSystem: 'essalud' | 'eps' = 'essalud') {
    const { salary, monthsWorked, regime } = input;
    let base = (salary / 6) * Math.min(monthsWorked, 6);

    if (regime === 'mype_pequena') {
      base = base / 2;
    } else if (regime === 'mype_micro') {
      base = 0; // Micro-empresas don't pay gratificaciones
    }

    const bonusPercentage = healthSystem === 'essalud' ? 0.09 : 0.0675;
    const bonus = base * bonusPercentage;

    return {
      base: Math.round(base * 100) / 100,
      bonus: Math.round(bonus * 100) / 100,
      total: Math.round((base + bonus) * 100) / 100
    };
  },

  /**
   * Calculate Vacaciones Truncas
   * General: 30 days per year. MYPE: 15 days per year.
   */
  calculateVacaciones(input: LaborCalculationInput) {
    const { salary, monthsWorked, regime } = input;
    const daysPerYear = (regime === 'general') ? 30 : 15;
    
    const monthlyRate = salary / 12;
    const daysEquivalent = (daysPerYear / 30) * monthlyRate; // This is actually simpler: (salary / 360) * days
    
    let total = (salary / 12) * monthsWorked;
    if (regime !== 'general') {
      total = total / 2;
    }

    return Math.round(total * 100) / 100;
  }
};
