import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex items-center justify-center py-4">
        <p className="text-sm text-muted-foreground">
          Made with ❤️ by{' '}
          <Link
            href="https://t.me/TheMoonlightPhoenix"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Shiva
          </Link>
        </p>
      </div>
    </footer>
  );
}
