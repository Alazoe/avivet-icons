// GENERADO por scripts/build.mjs — no editar a mano.
// Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.1.0
import * as React from 'react';
import type { IconProps } from './types';

export const Clipboard = React.forwardRef<SVGSVGElement, IconProps>(function Clipboard(
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
      <path d="M24 12L18 12C15.8 12 14 13.8 14 16L14 54C14 56.2 15.8 58 18 58L46 58C48.2 58 50 56.2 50 54L50 16C50 13.8 48.2 12 46 12L40 12"/><path d="M25 11.5C25 8.5 28.1 6 32 6C35.9 6 39 8.5 39 11.5L39 14C39 15.7 37.7 17 36 17L28 17C26.3 17 25 15.7 25 14Z"/><path d="M20 30L23 33L29 27"/><path d="M33 31L44 31"/><path d="M20 43L23 46L29 40"/><path d="M33 44L44 44"/>
    </svg>
  );
});

export default Clipboard;
