'use client';

import type { Question } from '@/types';
import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Lightbulb, ShieldCheck } from 'lucide-react';
import { Answer } from '@/components/answer';
import { format } from 'date-fns';
import { HtmlRenderer } from '@/components/html-renderer';
import { cn } from '@/lib/utils';

interface QuestionDetailsProps {
  question: Question;
  summary: string | null;
  children: ReactNode;
}

export function QuestionDetails({
  question,
  summary,
  children,
}: QuestionDetailsProps) {
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const bestAnswer = question.answers.find(a => a.isBestAnswer || a.isVerified);
  const otherAnswers = question.answers.filter(a => a.id !== bestAnswer?.id);
  const answersToShow = showAllAnswers ? otherAnswers : otherAnswers.slice(0, 1);

  const hasAsideContent = !!children;
  const hasVerifiedAnswer = question.answers.some(a => a.isVerified);

  return (
    <div
      className={cn(
        'container mx-auto px-4 py-8',
        hasAsideContent ? 'max-w-7xl' : 'max-w-4xl'
      )}
    >
      <div
        className={cn(
          'grid lg:gap-12',
          hasAsideContent ? 'lg:grid-cols-12' : 'lg:grid-cols-1'
        )}
      >
        <main
          className={cn(hasAsideContent ? 'lg:col-span-8' : 'lg:col-span-1')}
        >
          <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              {question.title}
            </h1>

            {hasVerifiedAnswer && (
              <Badge className="mt-4 px-4 py-2 text-lg" variant="secondary">
                <ShieldCheck className="mr-2 h-6 w-6 text-green-600" />
                Expert-Verified Answers
              </Badge>

            )}
          </div>
          {/* <div className="mb-8">
            <div className="prose dark:prose-invert max-w-none break-words">
              <HtmlRenderer content={question.content} />
            </div>
          </div> */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Link href={`/users/${question.author.id}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={question.author.avatarUrl}
                    alt={question.author.name}
                  />
                  <AvatarFallback>
                    {question.author.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link
                href={`/users/${question.author.id}`}
                className="hover:text-primary transition-colors"
              >
                {question.author.name}
              </Link>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span>Asked on {format(new Date(question.createdAt), 'PP')}</span>
          </div>

          {summary && (
            <Card className="mb-8 bg-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Lightbulb className="h-5 w-5" />
                  AI Summary
                </CardTitle>
                <CardDescription>
                  A quick summary of the answers below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{summary}</p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-8">
            <h2 className="text-2xl font-bold">
              {question.answers.length} Answers
            </h2>
            {bestAnswer && <Answer answer={bestAnswer} />}
            {bestAnswer && otherAnswers.length > 0 && <Separator />}

            {answersToShow.map(answer => (
              <Answer key={answer.id} answer={answer} />
            ))}

            {otherAnswers.length > 1 && (
              <Button
                variant="outline"
                onClick={() => setShowAllAnswers(!showAllAnswers)}
              >
                {showAllAnswers
                  ? 'Show fewer answers'
                  : `Show ${otherAnswers.length - 1} more answers`}
              </Button>
            )}
          </div>
        </main>

        {hasAsideContent && (
          <aside className="lg:col-span-4 mt-12 lg:mt-0">{children}</aside>
        )}
      </div>
    </div>
  );
}
