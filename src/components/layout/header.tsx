import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';
import { HeaderActions } from './header-actions';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="font-bold font-headline text-xl tracking-tight">
            AskShiva
          </span>
        </Link>
        <HeaderActions />
      </div>
    </header>
  );
}
