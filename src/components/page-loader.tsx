// NOTE: This component is not intended to be used directly in pages.
// It is used by the PageTransition component to show a loader during page transitions.
// It is kept in a separate file to avoid adding it to the main bundle.
// For more details, see: https://github.com/vercel/next.js/discussions/17832

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function PageLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-background/50 backdrop-blur-sm',
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
