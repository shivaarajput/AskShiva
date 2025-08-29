import { Skeleton } from '@/components/ui/skeleton';

export default function QuestionLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="lg:col-span-8">
          <div className="space-y-4 mb-8">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <div className="space-y-4 mb-8">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>

          <Skeleton className="h-32 w-full mb-8" />

          <div className="space-y-8">
            <Skeleton className="h-8 w-1/4" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <aside className="lg:col-span-4 mt-12 lg:mt-0">
          <Skeleton className="h-64 w-full" />
        </aside>
      </div>
    </div>
  );
}
