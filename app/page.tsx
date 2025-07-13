
import FeaturesSection from "@/components/featured";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonial";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PCMate – Best PC & Laptop Builder for Your Budget',
  description:
    'Tell us your budget, location, and use-case — we’ll suggest the best PC build or laptop for you. Smart, fast and fully personalized recommendations.',
  keywords: [
    'PC builder',
    'Laptop recommendation',
    'Budget PC guide',
    'Build your own PC',
    'Bangladesh PC builder',
    'Custom PC suggestion',
    'Laptop buying guide',
    'PCMate',
    'AI PC recommendation',
  ],
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    title: 'PCMate – Best PC & Laptop Builder',
    description:
      'Instant PC or Laptop recommendations based on your budget, location, and needs.',
    url: 'https://yourdomain.com',
    siteName: 'PCMate',
    images: [
      {
        url: 'https://yourdomain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PCMate preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PCMate – Build or Buy the Right PC',
    description:
      'Smart guide to find the best PC build or laptop based on your specific use-case and budget.',
    images: ['https://yourdomain.com/og-image.png'],
    creator: '@yourTwitterHandle',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  authors: [{ name: 'Md Razu Islam', url: 'https://razuislam.vercel.app/' }],
  creator: 'PCMate Team',
  publisher: 'PCMate',
  category: 'technology',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-background-dark dark:text-foreground-dark text-foreground">
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <Testimonials />
    </main>
  );
}