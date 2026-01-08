import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover
    ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
    : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-lg ${paddingClasses[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
