import { generateQuestionAndAnswer } from '@/ai/flows/generate-question-answer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HtmlRenderer } from '@/components/html-renderer';
import { BrainCircuit, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default async function AiAnswerResult({ query }: { query?: string }) {
  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">Ready to ask AI?</h2>
        <p className="text-muted-foreground mt-2">
          Use the search bar above to ask a question.
        </p>
      </div>
    );
  }

  const result = await generateQuestionAndAnswer({ query });

  if (!result || !result.question || !result.answer) {
    return (
       <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Generation Failed</AlertTitle>
        <AlertDescription>
          The AI failed to generate an answer for your query. Please try again with a different query.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
        <p className="text-muted-foreground mb-4">
        Showing AI-generated answer for: "{query}"
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
            {result.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="shrink-0 pt-1">
               <Avatar className="h-10 w-10">
                 <AvatarFallback className="bg-primary/10">
                   <BrainCircuit className="h-6 w-6 text-primary" />
                 </AvatarFallback>
               </Avatar>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">AI Assistant</span>
                 <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                Verified
              </Badge>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
                Best Answer
              </Badge>
              </div>
              <div className="prose dark:prose-invert max-w-none text-foreground/90 break-words">
                <HtmlRenderer content={result.answer} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span>AI Generated</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
