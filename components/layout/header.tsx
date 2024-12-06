import Link from 'next/link';
import { MainNav } from './main-nav';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Data Migration System</span>
          </Link>
          <MainNav />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}