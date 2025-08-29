'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing answers to a question.
 *
 * - summarizeAnswers - A function that takes a question and its answers as input and returns a concise summary.
 * - SummarizeAnswersInput - The input type for the summarizeAnswers function.
 * - SummarizeAnswersOutput - The return type for the summarizeAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAnswersInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
  answers: z.array(z.string()).describe('An array of answers to the question.'),
});
export type SummarizeAnswersInput = z.infer<typeof SummarizeAnswersInputSchema>;

const SummarizeAnswersOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the answers.'),
});
export type SummarizeAnswersOutput = z.infer<typeof SummarizeAnswersOutputSchema>;

export async function summarizeAnswers(input: SummarizeAnswersInput): Promise<SummarizeAnswersOutput> {
  return summarizeAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAnswersPrompt',
  input: {schema: SummarizeAnswersInputSchema},
  output: {schema: SummarizeAnswersOutputSchema},
  prompt: `Summarize the following answers to the question: {{{question}}}.\n\nAnswers:\n{{#each answers}}{{{this}}}\n{{/each}}\n\nSummary:`,
});

const summarizeAnswersFlow = ai.defineFlow(
  {
    name: 'summarizeAnswersFlow',
    inputSchema: SummarizeAnswersInputSchema,
    outputSchema: SummarizeAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
