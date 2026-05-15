interface BrushDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export default function BrushDivider({
  color = '#ea711e',
  flip = false,
  className = '',
}: BrushDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none w-full overflow-hidden leading-[0] ${className}`}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 22 C 100 4, 200 36, 320 18 S 540 6, 660 24 S 880 38, 1000 16 S 1180 30, 1200 22 L 1200 40 L 0 40 Z"
          fill={color}
          opacity="0.92"
        />
        <circle cx="180" cy="14" r="2.4" fill={color} opacity="0.6" />
        <circle cx="540" cy="10" r="1.8" fill={color} opacity="0.5" />
        <circle cx="900" cy="13" r="2.2" fill={color} opacity="0.55" />
      </svg>
    </div>
  );
}
