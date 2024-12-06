'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Database, Users, Tv, GitCompare } from 'lucide-react';

const sections = [
  {
    title: 'Shows',
    href: '/migration/shows',
    icon: Database
  },
  {
    title: 'Actors',
    href: '/migration/actors',
    icon: Users
  },
  {
    title: 'Bugaboo Inter',
    href: '/migration/dramas/bugaboo-inter',
    icon: Tv
  },
  {
    title: 'Bugaboo TV',
    href: '/migration/dramas/bugaboo-tv',
    icon: Tv
  },
  {
    title: 'Drama Mapping',
    href: '/migration/dramas/mapping',
    icon: GitCompare
  }
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {sections.map(({ title, href, icon: Icon }) => (
        <Button
          key={href}
          variant={pathname === href ? "secondary" : "ghost"}
          asChild
          className="w-full justify-start"
        >
          <Link
            href={href}
            className={cn(
              "flex items-center space-x-2",
              pathname === href 
                ? "text-primary font-medium" 
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{title}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}