import { Suspense } from 'react';
import type { Metadata } from 'next';
import AiAnswerResult from './result';
import AiAnswerLoading from './loading';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: query ? `AI Answer for "${query}"` : 'AI Answer',
    description: `An AI-generated answer for the query: ${query}`,
  };
}

export default function AiAnswerPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Suspense fallback={<AiAnswerLoading query={query} />}>
        <AiAnswerResult query={query} />
      </Suspense>
    </div>
  );
}
