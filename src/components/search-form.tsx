'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQuery = searchParams.get('q');

  useEffect(() => {
    if (currentQuery && inputRef.current) {
      inputRef.current.value = currentQuery;
    }
  }, [currentQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    if (query) {
      router.push(`/search/ai-answer?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="search"
        name="query"
        placeholder="Ask AI a question..."
        className="w-full pl-10 h-11 pr-20"
        defaultValue={currentQuery ?? ''}
      />
      <Button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8"
        variant="default"
      >
        Ask
      </Button>
    </form>
  );
}
