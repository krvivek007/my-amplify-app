import type { ReactNode } from 'react';
import './globals.css';
import AmplifyProvider from '@/components/AmplifyProvider';

export const metadata = {
  title: 'My Amplify App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}
