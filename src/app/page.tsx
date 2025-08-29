import Link from 'next/link';
import { getQuestions } from '@/lib/brainly';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { SearchForm } from '@/components/search-form';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AskShiva - AI-Powered Answers',
  description:
    "Stuck on a question? We've got the answers. Powered by community and enhanced by AI.",
};

export default async function Home() {
  const recentQuestions = (await getQuestions()).slice(0, 6);

  function extractTextFromHtml(html: string): string {
    if (!html) return '';
    // A simple regex to strip HTML tags for the preview.
    return html.replace(/<[^>]*>?/gm, '');
  }

  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Stuck on a question?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          We've got the answers. Powered by community and enhanced by AI.
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchForm />
        </div>
      </section>

      <section className="pb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Recent Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentQuestions.map(question => (
            <Card
              key={question.id}
              className="flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link
                    href={`/questions/${question.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {question.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  Asked by {question.author.name} on{' '}
                  {format(new Date(question.createdAt), 'PP')}
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 h-auto font-bold">
                  <Link href={`/questions/${question.id}`}>
                    View Question <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
