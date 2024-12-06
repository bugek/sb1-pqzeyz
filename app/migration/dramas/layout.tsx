export default function DramasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export function generateStaticParams() {
  return [
    { section: 'bugaboo-inter' },
    { section: 'bugaboo-tv' },
    { section: 'mapping' }
  ];
}