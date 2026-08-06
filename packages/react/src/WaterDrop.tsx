// GENERADO por scripts/build.mjs — no editar a mano.
// Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.1.0
import * as React from 'react';
import type { IconProps } from './types';

export const WaterDrop = React.forwardRef<SVGSVGElement, IconProps>(function WaterDrop(
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
      <path d="M32 6C40 16 48 27 48 38C48 46.8 40.8 54 32 54C23.2 54 16 46.8 16 38C16 27 24 16 32 6Z"/>
    </svg>
  );
});

export default WaterDrop;
