'use client';

import Link from 'next/link';
import type { Answer as AnswerType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ThumbsUp, Star, ShieldCheck } from 'lucide-react';
import { HtmlRenderer } from '@/components/html-renderer';
import { Card } from '@/components/ui/card';

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function Answer({ answer }: { answer: AnswerType }) {
  const answerContent = (
    <div className="flex gap-4">
      <Link href={`/users/${answer.author.id}`} className="shrink-0 pt-1">
        <Avatar>
          <AvatarImage src={answer.author.avatarUrl} alt={answer.author.name} />
          <AvatarFallback>
            {answer.author.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1 space-y-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/users/${answer.author.id}`}
              className="font-semibold hover:text-primary transition-colors"
            >
              {answer.author.name}
            </Link>
            {answer.isVerified && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                Verified
              </Badge>
            )}
            {answer.isBestAnswer && !answer.isVerified && (
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
                Best Answer
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            {answer.author.rank && (
              <span className="font-semibold">{answer.author.rank}</span>
            )}
            {answer.author.rank && answer.author.answersCount !== undefined && (
              <span className="font-bold text-muted-foreground/50">&middot;</span>
            )}
            {answer.author.answersCount !== undefined && (
              <span>{formatNumber(answer.author.answersCount)} answers</span>
            )}
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none text-foreground/90 break-words">
          <HtmlRenderer content={answer.content} />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="h-4 w-4" />
            <span>{answer.thanks} Thanks</span>
          </div>
          {answer.ratingCount > 0 && (
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>
                {answer.rating.toFixed(1)} ({answer.ratingCount} rating
                {answer.ratingCount !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  if (answer.isVerified) {
     return (
      <Card className="p-6 bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900/20">
        {answerContent}
      </Card>
    );
  }

  if (answer.isBestAnswer) {
    return (
      <Card className="p-6 bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/20">
        {answerContent}
      </Card>
    );
  }

  return <div className="p-6 border-b">{answerContent}</div>;
}
