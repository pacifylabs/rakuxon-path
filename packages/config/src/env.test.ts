import { describe, expect, it } from 'vitest';

import {
  MissingEnvVarError,
  NonPublicEnvVarError,
  apiBaseUrl,
  cloudinaryCloudName,
  optionalEnv,
  requireEnv,
} from './env.js';

describe('requireEnv', () => {
  it('returns the value when the variable is set', () => {
    expect(requireEnv('NEXT_PUBLIC_API_BASE_URL', { NEXT_PUBLIC_API_BASE_URL: 'https://api.test' }))
      .toBe('https://api.test');
  });

  it('throws a named error when the variable is absent', () => {
    expect(() => requireEnv('NEXT_PUBLIC_API_BASE_URL', {})).toThrow(MissingEnvVarError);
  });

  it('treats a blank value as missing', () => {
    expect(() => requireEnv('NEXT_PUBLIC_API_BASE_URL', { NEXT_PUBLIC_API_BASE_URL: '   ' }))
      .toThrow(MissingEnvVarError);
  });

  it('names the offending variable in the message so the fix is obvious', () => {
    expect(() => requireEnv('NEXT_PUBLIC_API_BASE_URL', {}))
      .toThrow(/NEXT_PUBLIC_API_BASE_URL/);
  });

  it('refuses to read a non-public variable, so no secret can leak into a client bundle', () => {
    expect(() => requireEnv('CLOUDINARY_API_SECRET', { CLOUDINARY_API_SECRET: 'shhh' }))
      .toThrow(NonPublicEnvVarError);
  });
});

describe('optionalEnv', () => {
  it('returns undefined rather than throwing when unset', () => {
    expect(optionalEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', {})).toBeUndefined();
  });

  it('normalises a blank value to undefined', () => {
    expect(optionalEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: '' }))
      .toBeUndefined();
  });

  it('still refuses non-public names', () => {
    expect(() => optionalEnv('DATABASE_URL', { DATABASE_URL: 'postgres://x' }))
      .toThrow(NonPublicEnvVarError);
  });
});

describe('apiBaseUrl', () => {
  it('throws when NEXT_PUBLIC_API_BASE_URL is missing', () => {
    expect(() => apiBaseUrl({})).toThrow(MissingEnvVarError);
  });

  it('resolves lazily, so a surface that never calls it can build without the variable', () => {
    expect(() => cloudinaryCloudName({})).not.toThrow();
  });
});
