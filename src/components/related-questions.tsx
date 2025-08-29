import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';
import type { Question } from '@/types';

interface RelatedQuestionsProps {
  questions: Question[];
}

export function RelatedQuestions({ questions }: RelatedQuestionsProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Compass className="h-5 w-5" />
          Related Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {questions.map(question => (
            <li key={question.id}>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto text-left whitespace-normal"
              >
                <Link href={`/questions/${question.id}`}>{question.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
