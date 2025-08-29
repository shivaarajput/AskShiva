'use client';

import { usePathname } from 'next/navigation';
import { SearchForm } from '@/components/search-form';
import { ThemeToggle } from '@/components/theme-toggle';

export function HeaderActions() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="flex w-full items-center justify-end gap-4">
      {!isHomePage && (
        <div className="w-full max-w-lg">
          <SearchForm />
        </div>
      )}
      <div className="flex flex-1 items-center justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
