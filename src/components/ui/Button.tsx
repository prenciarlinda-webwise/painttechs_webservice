import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  icon,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-navy-800 hover:bg-orange-500 text-white focus:ring-orange-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-navy-700 hover:bg-orange-500 text-white focus:ring-orange-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-navy-800 text-navy-800 hover:bg-orange-500 hover:border-orange-500 hover:text-white focus:ring-orange-500',
    white: 'bg-white hover:bg-orange-500 hover:text-white text-navy-800 focus:ring-orange-500 shadow-lg hover:shadow-xl',
    whatsapp: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 shadow-lg hover:shadow-xl',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
