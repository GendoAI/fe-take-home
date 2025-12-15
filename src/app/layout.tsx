import type { Metadata } from 'next';
import { StoreProvider } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gendo Mini Canvas',
  description: 'A collaborative image canvas application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
