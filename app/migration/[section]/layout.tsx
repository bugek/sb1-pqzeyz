export default function MigrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export function generateStaticParams() {
  return [
    { section: 'shows' },
    { section: 'actors' },
    { section: 'dramas' },
  ];
}