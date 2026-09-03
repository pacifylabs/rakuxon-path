import clsx from 'clsx';

export interface ProgressRingProps {
  /** 0–100. Values outside the range are clamped. */
  value: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Circular progress dial for the hero "Match Score" card (docs/04b § 3.1).
 *
 * Exposed as a progressbar with its value, so the percentage is available to
 * assistive technology and not carried by the drawing alone.
 */
export function ProgressRing({
  value,
  label = 'Match score',
  size = 64,
  strokeWidth = 6,
  className,
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={clsx('relative shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} aria-hidden="true" focusable="false">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-sm font-bold text-text">
        {clamped}%
      </span>
    </div>
  );
}
