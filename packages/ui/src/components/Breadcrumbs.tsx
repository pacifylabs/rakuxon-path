export interface Crumb {
  label: string;
  href: string;
}

export interface BreadcrumbsProps {
  trail: readonly Crumb[];
  /** The page you are on. Rendered as text, not a link. */
  current: string;
  className?: string;
}

/** Orientation for nested routes such as /destinations/[country]. */
export function Breadcrumbs({ trail, current, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
        {trail.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <a
              href={crumb.href}
              className="rounded-sm underline transition-colors duration-fast ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {crumb.label}
            </a>
            <span aria-hidden="true">/</span>
          </li>
        ))}
        <li aria-current="page" className="font-medium text-text">
          {current}
        </li>
      </ol>
    </nav>
  );
}
