'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a question and answer based on a user's query.
 *
 * - generateQuestionAndAnswer - A function that takes a query and returns a generated question and answer.
 * - GenerateQuestionAndAnswerInput - The input type for the generateQuestionAndAnswer function.
 * - GenerateQuestionAndAnswerOutput - The return type for the generateQuestionAndAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionAndAnswerInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
});
export type GenerateQuestionAndAnswerInput = z.infer<typeof GenerateQuestionAndAnswerInputSchema>;

const GenerateQuestionAndAnswerOutputSchema = z.object({
  question: z.string().describe('A clear, well-formed question based on the user\'s query.'),
  answer: z.string().describe('A detailed and accurate answer to the generated question. The answer should be in HTML format.'),
});
export type GenerateQuestionAndAnswerOutput = z.infer<typeof GenerateQuestionAndAnswerOutputSchema>;

export async function generateQuestionAndAnswer(input: GenerateQuestionAndAnswerInput): Promise<GenerateQuestionAndAnswerOutput> {
  return generateQuestionAndAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionAndAnswerPrompt',
  input: {schema: GenerateQuestionAndAnswerInputSchema},
  output: {schema: GenerateQuestionAndAnswerOutputSchema},
  prompt: `You are an expert content creator for a question-and-answer platform. A user has submitted the following query: "{{query}}".

Based on this query, please perform the following tasks:
1.  Generate a clear, well-formed question that encapsulates the user's intent. The question should be something another user might realistically ask.
2.  Provide a comprehensive, accurate, and well-explained answer to that question.
3.  Format the answer using appropriate HTML tags like <p>, <ul>, <li>, and <strong> to ensure it is readable and well-structured.

Your response should be in a JSON format with two keys: "question" and "answer".`,
});

const generateQuestionAndAnswerFlow = ai.defineFlow(
  {
    name: 'generateQuestionAndAnswerFlow',
    inputSchema: GenerateQuestionAndAnswerInputSchema,
    outputSchema: GenerateQuestionAndAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
