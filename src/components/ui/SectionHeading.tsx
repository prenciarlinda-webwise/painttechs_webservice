interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignClass = centered ? 'text-center' : 'text-left';
  const titleColor = light ? 'text-white' : 'text-navy-800';
  const subtitleColor = light ? 'text-gray-200' : 'text-gray-600';

  return (
    <div className={`mb-8 sm:mb-12 ${alignClass} ${className}`}>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${titleColor} mb-3 sm:mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg md:text-xl ${subtitleColor} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
