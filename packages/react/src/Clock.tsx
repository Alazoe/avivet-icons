// GENERADO por scripts/build.ts — no editar a mano.
// Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.3.1
import * as React from 'react';
import type { IconProps } from './types';

export const Clock = React.forwardRef<SVGSVGElement, IconProps>(function Clock(
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
      <circle cx="32" cy="32" r="23"/><path d="M32 17L32 33L43 39"/>
    </svg>
  );
});

export default Clock;
