import { getDramaIds } from '@/lib/mock-data/drama-mapping';

export default function DramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export function generateStaticParams() {
  // Get all drama IDs for static generation
  const dramaIds = getDramaIds();
  return dramaIds.map(id => ({ id }));
}