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
  symptoms: z.array(z.string()).describe('A list of symptoms reported by the user, e.g., "lower back pain", "stiffness in the morning", "poor posture".'),
  lifestyleFactors: z.array(z.string()).describe('Relevant lifestyle factors reported by the user, e.g., "sedentary job", "frequent heavy lifting", "stress".'),
  quizSummary: z.string().describe('A summarized text description of the user\u0027s quiz results and key findings related to their spinal health.'),
});
export type PersonalizedSpinalAnalysisInput = z.infer<typeof PersonalizedSpinalAnalysisInputSchema>;

const PersonalizedSpinalAnalysisOutputSchema = z.object({
  empathyStatement: z.string().describe('An empathetic statement acknowledging the user\u0027s pain and validating their experience, e.g., "Many people experience similar discomforts, and it\u0027s completely understandable to feel concerned."'),
  currentConditionSummary: z.string().describe('A personalized, concise summary of the user\u0027s perceived spinal health condition and discomfort based on the quiz data.'),
  identifiedProblems: z.array(z.object({
    problem: z.string().describe('A specific problem identified, e.g., "Poor Posture", "Sedentary Lifestyle", "Muscle Imbalance".'),
    description: z.string().describe('A brief explanation of how this problem contributes to their discomfort.'),
  })).describe('A list of specific problems or potential root causes identified from the user\u0027s input.'),
  superColunaApproach: z.string().describe('A brief explanation of how SUPER COLUNA\u0027s features and methodology can effectively address the identified problems and lead to recovery and improved quality of life.'),
  keyVisualConcepts: z.array(z.string()).describe('A list of keywords or short phrases suggesting visual elements to accompany the analysis, e.g., "slouching figure icon", "timeline of recovery", "strength-building graphic". These are suggestions for the UI to interpret.'),
});
export type PersonalizedSpinalAnalysisOutput = z.infer<typeof PersonalizedSpinalAnalysisOutputSchema>;

export async function generateSpinalAnalysis(input: PersonalizedSpinalAnalysisInput): Promise<PersonalizedSpinalAnalysisOutput> {
  return personalizedSpinalAnalysisFlow(input);
}

const personalizedSpinalAnalysisPrompt = ai.definePrompt({
  name: 'personalizedSpinalAnalysisPrompt',
  input: { schema: PersonalizedSpinalAnalysisInputSchema },
  output: { schema: PersonalizedSpinalAnalysisOutputSchema },
  prompt: `You are an expert in spinal health and rehabilitation, acting as a compassionate AI assistant for the "SUPER COLUNA" premium mobile app. Your goal is to provide a personalized diagnostic overview based on user-provided quiz data.\n\nThe user has completed a diagnostic quiz and reported the following:\nSymptoms: {{#each symptoms}}- {{{this}}}\n{{/each}}Lifestyle Factors: {{#each lifestyleFactors}}- {{{this}}}\n{{/each}}Quiz Summary: {{{quizSummary}}}\n\nYour task is to generate a comprehensive analysis in a premium, modern, and empathetic tone, avoiding medical jargon where possible. Focus on making the user feel understood and showing how SUPER COLUNA is tailored to their specific needs.\n\nBased on the provided information, output a structured JSON response containing:\n1. An empathetic opening statement.\n2. A concise summary of the user's current spinal health condition.\n3. A list of identified problems or potential root causes, each with a brief explanation.\n4. An explanation of how SUPER COLUNA's approach directly addresses these problems.\n5. A list of key visual concepts that can accompany this analysis in a UI, making it more engaging and understandable.\n\nEnsure the output adheres strictly to the defined JSON schema.`,
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
