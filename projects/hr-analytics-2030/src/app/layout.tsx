import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { clsx } from 'clsx';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HR Predictive Analytics 2030',
  description: 'Local-first workforce planning and predictive modeling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-slate-50 text-slate-900 min-h-screen flex")}>
        <LanguageProvider>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 ml-64 min-h-screen transition-all duration-300">
            <div className="container mx-auto p-8 max-w-7xl">
              {children}
            </div>
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
