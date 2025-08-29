import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function AiAnswerLoading({ query }: { query?: string }) {
  return (
    <div>
      <p className="text-muted-foreground mb-4">
        AI is generating an answer for: "{query}"
      </p>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="pt-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
