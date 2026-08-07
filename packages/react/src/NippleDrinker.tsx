// GENERADO por scripts/build.ts — no editar a mano.
// Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.3.1
import * as React from 'react';
import type { IconProps } from './types';

export const NippleDrinker = React.forwardRef<SVGSVGElement, IconProps>(function NippleDrinker(
  { size = 24, title, ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0
      0
      64
      64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 7L52 7C54.75 7 57 9.25 57 12L57 12C57 14.75 54.75 17 52 17L12 17C9.25 17 7 14.75 7 12L7 12C7 9.25 9.25 7 12 7Z"/><path d="M24 17L24 28"/><path d="M40 17L40 28"/><path d="M24 28L29 37L35 37L40 28"/><path d="M32 37L32 41"/><path d="M32 44C33.92 46.4 35.83 49.03 35.83 51.67C35.83 53.77 34.11 55.5 32 55.5C29.89 55.5 28.17 53.77 28.17 51.67C28.17 49.03 30.08 46.4 32 44Z"/>
    </svg>
  );
});

export default NippleDrinker;
