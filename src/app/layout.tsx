import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButtonWithForm from '@/components/features/WhatsAppButtonWithForm';
import JsonLd from '@/components/seo/JsonLd';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/schema';
import { defaultMetadata } from '@/lib/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD */}
        <JsonLd data={generateLocalBusinessSchema()} />
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebsiteSchema()} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <WhatsAppButtonWithForm />
      </body>
    </html>
  );
}
