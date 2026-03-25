import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Cabinet Refinishing Project in Nocatee FL - Before & After',
  description: 'See our kitchen cabinet refinishing transformation in Nocatee, FL. Before and after photos of a complete cabinet painting project by Paint-Techs LLC.',
  path: '/cabinet-refinishing-nocatee',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
