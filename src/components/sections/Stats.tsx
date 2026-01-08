'use client';

import { useEffect, useState, useRef } from 'react';
import { Container } from '@/components/ui';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 5, suffix: '', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
  { value: 10, suffix: '+', label: 'Service Areas' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-navy-800 to-navy-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="2" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-gray-300 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
