export default function DramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export function generateStaticParams() {
  return [
    { section: 'bugaboo-inter' }
  ];
}