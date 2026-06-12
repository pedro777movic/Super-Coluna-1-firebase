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
  currentConditionSummary: z.string().describe('A personalized summary of their "lombar cycle" based on the quiz.'),
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
  prompt: `You are an expert in spinal health for the "SUPER COLUNA" app.
  The user reported:
  - Main Discomfort: {{{mainDiscomfort}}}
  - Duration: {{{duration}}}
  - Routine Impact: {{{routineImpact}}}

  Generate a personalized, premium analysis. Focus on the "Cycle of the Resting Back" (O ciclo da lombar que nunca descansa).
  Keep it empathetic, non-medical, and encouraging. Focus on consistency and the benefits of a guided routine.
  The tone should be sophisticated and premium.`,
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
