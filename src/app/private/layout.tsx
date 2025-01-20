export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="bg-background-default">
      <body>{children}</body>
    </html>
  );
}
