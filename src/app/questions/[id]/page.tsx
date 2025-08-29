import { notFound } from 'next/navigation';
import { getQuestionById, getQuestions } from '@/lib/brainly';
import { summarizeAnswers } from '@/ai/flows/summarize-answers';
import { QuestionDetails } from '@/components/question-details';
import type { Metadata } from 'next';
import { RelatedQuestions } from '@/components/related-questions';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const question = await getQuestionById(params.id);

  if (!question) {
    return {
      title: 'Question Not Found',
    };
  }

  return {
    title: `${question.title} | AskShiva`,
    description: `Answers and summary for the question: ${question.title}`,
  };
}

export default async function QuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const question = await getQuestionById(params.id);

  if (!question) {
    notFound();
  }

  // Fire off AI requests in parallel for performance
  const [summaryResult, relatedQuestionsResult] = await Promise.allSettled([
    question.answers.length > 0
      ? summarizeAnswers({
          question: question.title,
          answers: question.answers.map(a => a.content),
        })
      : Promise.resolve(null),
    getQuestions(), // Fetch recent questions
  ]);

  const summary =
    summaryResult.status === 'fulfilled' ? summaryResult.value : null;
  const relatedQuestions = (
    relatedQuestionsResult.status === 'fulfilled'
      ? relatedQuestionsResult.value
      : []
  )
    .filter(q => q.id !== question.id) // Exclude the current question
    .slice(0, 5); // Take the first 5

  return (
    <QuestionDetails
      question={question}
      summary={summary ? summary.summary : null}
    >
      {relatedQuestions && relatedQuestions.length > 0 ? (
        <RelatedQuestions questions={relatedQuestions} />
      ) : null}
    </QuestionDetails>
  );
}
