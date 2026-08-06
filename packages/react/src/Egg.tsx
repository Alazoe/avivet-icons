// GENERADO por scripts/build.mjs — no editar a mano.
// Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.2.1
import * as React from 'react';
import type { IconProps } from './types';

export const Egg = React.forwardRef<SVGSVGElement, IconProps>(function Egg(
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
      <path d="M32 8C42 8 50 22 50 36C50 48 42 56 32 56C22 56 14 48 14 36C14 22 22 8 32 8Z"/>
    </svg>
  );
});

export default Egg;
