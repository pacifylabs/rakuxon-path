export interface LogoMarkProps {
  /** Rendered size in px. Drawn on a 64-unit grid, so it scales cleanly. */
  size?: number;
  className?: string;
}

/**
 * The Rakuxon Path mark: an arched doorway opening onto a path, with a
 * mortarboard set in the opening — ambition on one side of the door,
 * admission on the other.
 *
 * The supplied artwork nests this inside a letter R. Hand-tracing that
 * letterform did not hold together at 24px, so this keeps the idea and drops
 * the letter; the wordmark beside it already carries the name. Drawn from
 * theme tokens rather than a raster file, so it re-colours with the theme.
 * Replace with the real asset when it is available on disk.
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="64" height="64" rx="15" fill="var(--color-primary)" />

      {/*
        Doorway and path are one continuous shape: the opening narrows at the
        threshold and widens as it comes toward you.
      */}
      <path
        d="M23 46V31a9 9 0 0 1 18 0v15c1 7 4.5 12 9 18H14c4.5-6 8-11 9-18Z"
        fill="var(--color-on-primary)"
      />

      {/* Mortarboard in the opening. */}
      <g transform="translate(32 33)">
        <path d="M-7 0 0-3.4 7 0 0 3.4Z" fill="var(--color-accent)" />
        <path
          d="M-4.1 1.5v3.2C-4.1 5.9-2.3 7 0 7s4.1-1.1 4.1-2.3V1.5L0 3.4Z"
          fill="var(--color-accent)"
        />
        <path d="M7 0v4" stroke="var(--color-accent)" strokeWidth="1.1" strokeLinecap="round" />
      </g>
    </svg>
  );
}
