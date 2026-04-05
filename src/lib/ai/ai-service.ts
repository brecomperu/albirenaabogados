import { ChatAnthropic } from "@langchain/anthropic";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LaborEngine } from "../legal/labor-engine";
import { RiskEngine } from "../legal/risk-engine";

const getModel = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey && process.env.NODE_ENV === 'production') {
    throw new Error('ANTHROPIC_API_KEY is not defined');
  }
  
  return new ChatAnthropic({
    anthropicApiKey: apiKey || 'dummy-key-for-build',
    modelName: "claude-3-5-sonnet-20240620",
    temperature: 0,
  });
};

const legalAnalysisPrompt = PromptTemplate.fromTemplate(`
Eres un experto en derecho laboral peruano. Analiza el siguiente contrato o documento legal y extrae la información clave.

DOCUMENTO:
{documentText}

REQUERIMIENTOS:
1. Identifica el tipo de perfil: Trabajador o Empresa.
2. Identifica cláusulas que podrían ser nulas o abusivas según el DL 728.
3. Extrae la fecha de inicio, salario y tipo de régimen.
4. Identifica riesgos potenciales para el usuario.

Formato de respuesta: JSON con campos:
profilType, salary, startDate, regime, issues (array de strings), riskLevel (Alto/Medio/Bajo).
`);

export const LegalAIService = {
  async analyzeDocument(text: string) {
    const model = getModel();
    const chain = legalAnalysisPrompt.pipe(model).pipe(new StringOutputParser());
    
    const response = await chain.invoke({ documentText: text });
    const analysis = JSON.parse(response);

    // Complement AI analysis with deterministic rule engine
    // (In a real scenario, we'd extract salary/dates from AI output first)
    const laborResults = LaborEngine.calculateGratificacion({
      salary: analysis.salary || 0,
      monthsWorked: 6, // Example
      regime: analysis.regime || 'general'
    });

    const risk = RiskEngine.calculateScore({
      missingMandatoryClauses: analysis.issues.filter((i: string) => i.includes('falta')),
      inconsistentDates: false,
      unpaidBenefitsEstimate: laborResults.total,
      unusualTerms: analysis.issues.filter((i: string) => !i.includes('falta'))
    });

    return {
      ...analysis,
      laborResults,
      derivedRisk: risk
    };
  }
};
