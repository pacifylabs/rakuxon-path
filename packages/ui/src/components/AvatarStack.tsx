import clsx from 'clsx';
import Image from 'next/image';

export interface AvatarStackItem {
  src: string;
  alt: string;
}

export interface AvatarStackProps {
  avatars: readonly AvatarStackItem[];
  /** Social-proof line rendered beside the faces. */
  caption?: string;
  className?: string;
}

/**
 * Overlapping avatar faces + a social-proof line (docs/04b § 3.1).
 *
 * Each face keeps its own alt text; they are content, not decoration, because
 * the caption alone does not convey that these are real students.
 */
export function AvatarStack({ avatars, caption, className }: AvatarStackProps) {
  return (
    <div className={clsx('flex items-center gap-4', className)}>
      <ul className="flex items-center">
        {avatars.map((avatar, index) => (
          <li
            key={avatar.src}
            className={clsx(
              'overflow-hidden rounded-full border-2 border-surface bg-surface-muted',
              index > 0 && '-ml-3',
            )}
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
          </li>
        ))}
      </ul>
      {caption && <p className="text-sm text-text-muted">{caption}</p>}
    </div>
  );
}
