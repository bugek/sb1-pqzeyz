import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Database, Users, Tv } from 'lucide-react';
import { MigrationOverview } from '@/components/stats/migration-overview';
import { SectionStats } from '@/components/layout/section-stats';

const sections = [
  {
    title: 'Shows Migration',
    description: 'Manage and migrate TV shows and movies data',
    href: '/migration/shows',
    icon: Database,
    stats: {
      total: 250,
      processed: 150,
      failed: 20,
      pending: 80
    }
  },
  {
    title: 'Actors Migration',
    description: 'Manage and migrate actor profiles and information',
    href: '/migration/actors',
    icon: Users,
    stats: {
      total: 500,
      processed: 300,
      failed: 50,
      pending: 150
    }
  },
  {
    title: 'Dramas Migration',
    description: 'Manage and migrate TV drama series data',
    href: '/migration/dramas',
    icon: Tv,
    stats: {
      total: 150,
      processed: 80,
      failed: 15,
      pending: 55
    }
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Data Migration System</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Migration Overview</h2>
          <MigrationOverview />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(({ title, description, href, icon: Icon, stats }) => (
            <Link key={href} href={href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Icon className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <SectionStats {...stats} />
                <CardContent className="pt-0">
                  <Button variant="secondary" className="w-full">
                    Manage {title.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}