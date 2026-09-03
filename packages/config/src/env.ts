/**
 * Public environment access for the frontend.
 *
 * Only `NEXT_PUBLIC_*` values may live here: everything in this package is
 * inlined into client bundles at build time. A Cloudinary API key or secret
 * must never be read through it (see docs/05-architecture.md § Env).
 */

export class MissingEnvVarError extends Error {
  readonly variableName: string;

  constructor(variableName: string) {
    super(
      `Missing required environment variable "${variableName}". ` +
        `Add it to .env.local (see .env.example).`,
    );
    this.name = 'MissingEnvVarError';
    this.variableName = variableName;
  }
}

/** Names this package is permitted to read. Anything else is a programming error. */
const PUBLIC_PREFIX = 'NEXT_PUBLIC_';

export class NonPublicEnvVarError extends Error {
  constructor(variableName: string) {
    super(
      `Refusing to read "${variableName}": frontend config may only read ` +
        `${PUBLIC_PREFIX}* variables, which are safe to inline into the client bundle.`,
    );
    this.name = 'NonPublicEnvVarError';
  }
}

type EnvSource = Record<string, string | undefined>;

function assertPublicName(name: string): void {
  if (!name.startsWith(PUBLIC_PREFIX)) {
    throw new NonPublicEnvVarError(name);
  }
}

/** Reads a required public variable, throwing a named error when it is absent or blank. */
export function requireEnv(name: string, source: EnvSource = process.env): string {
  assertPublicName(name);
  const value = source[name];
  if (value === undefined || value.trim() === '') {
    throw new MissingEnvVarError(name);
  }
  return value;
}

/** Reads an optional public variable, normalising blank strings to `undefined`. */
export function optionalEnv(name: string, source: EnvSource = process.env): string | undefined {
  assertPublicName(name);
  const value = source[name];
  return value === undefined || value.trim() === '' ? undefined : value;
}

/**
 * The BE API origin. Resolved lazily so that surfaces which make no API calls
 * — the public landing page, for one — can build without it being set.
 */
export function apiBaseUrl(source: EnvSource = process.env): string {
  return requireEnv('NEXT_PUBLIC_API_BASE_URL', source);
}

/** Cloudinary cloud name. Public by design; the secret stays on the backend. */
export function cloudinaryCloudName(source: EnvSource = process.env): string | undefined {
  return optionalEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', source);
}
