import { Inter } from 'next/font/google';
import BootstrapClient from '@/utils/BootstrapClient';
import { getAuth } from '@/lib/auth/auth';
import '@/styles/globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fashion Recommender',
  description: 'Personalized, eco-friendly fashion recommendations',
};

export default async function RootLayout({ children }) {
  const auth = await getAuth();

  return (
    <html lang="en" className="h-100">
      <body className={`${inter.className} d-flex flex-column h-100`}>
        <BootstrapClient />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}