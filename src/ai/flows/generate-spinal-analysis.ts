
'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a personalized spinal analysis for a user.
 *
 * - generateSpinalAnalysis - A function that processes user diagnostic data to provide an analysis.
 * - PersonalizedSpinalAnalysisInput - The input type for the generateSpinalAnalysis function.
 * - PersonalizedSpinalAnalysisOutput - The return type for the generateSpinalAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedSpinalAnalysisInputSchema = z.object({
  mainDiscomfort: z.string().describe('The primary discomfort reported by the user.'),
  duration: z.string().describe('How long the user has been experiencing the discomfort.'),
  routineImpact: z.string().describe('How much the discomfort interferes with the user\'s daily routine.'),
});
export type PersonalizedSpinalAnalysisInput = z.infer<typeof PersonalizedSpinalAnalysisInputSchema>;

const PersonalizedSpinalAnalysisOutputSchema = z.object({
  empathyStatement: z.string().describe('An empathetic statement acknowledging the user\'s situation.'),
  currentConditionSummary: z.string().describe('A personalized summary of their condition based on the quiz.'),
  identifiedProblems: z.array(z.object({
    problem: z.string(),
    description: z.string(),
  })).describe('Specific identified issues based on their input.'),
  superColunaApproach: z.string().describe('How SUPER COLUNA addresses these specific issues.'),
});
export type PersonalizedSpinalAnalysisOutput = z.infer<typeof PersonalizedSpinalAnalysisOutputSchema>;

export async function generateSpinalAnalysis(input: PersonalizedSpinalAnalysisInput): Promise<PersonalizedSpinalAnalysisOutput> {
  return personalizedSpinalAnalysisFlow(input);
}

const personalizedSpinalAnalysisPrompt = ai.definePrompt({
  name: 'personalizedSpinalAnalysisPrompt',
  input: { schema: PersonalizedSpinalAnalysisInputSchema },
  output: { schema: PersonalizedSpinalAnalysisOutputSchema },
  prompt: `Você é um especialista em saúde da coluna para o aplicativo "SUPER COLUNA".
  O usuário relatou:
  - Desconforto Principal: {{{mainDiscomfort}}}
  - Duração: {{{duration}}}
  - Impacto na Rotina: {{{routineImpact}}}

  Gere uma análise personalizada e premium. Foque no conceito de que viver com desconforto não deve ser considerado "normal".
  Aborde como o corpo começa a se adaptar à rigidez e como isso rouba a qualidade de vida.
  O tom deve ser sofisticado, premium e profundamente empático, fazendo com que o usuário se sinta visto e compreendido.
  Evite diagnósticos médicos; foque em padrões comportamentais e no alívio emocional da recuperação.
  IMPORTANTE: Toda a sua resposta deve ser em Português (Brasil).`,
});

const personalizedSpinalAnalysisFlow = ai.defineFlow(
  {
    name: 'personalizedSpinalAnalysisFlow',
    inputSchema: PersonalizedSpinalAnalysisInputSchema,
    outputSchema: PersonalizedSpinalAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await personalizedSpinalAnalysisPrompt(input);
    return output!;
  }
);
