// GENERADO por scripts/build.mjs — no editar a mano.
// Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.1.0
import * as React from 'react';
import type { IconProps } from './types';

export const VaccineBottle = React.forwardRef<SVGSVGElement, IconProps>(function VaccineBottle(
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
      <path d="M27 7L37 7C38.1 7 39 7.9 39 9L39 13C39 14.1 38.1 15 37 15L27 15C25.9 15 25 14.1 25 13L25 9C25 7.9 25.9 7 27 7Z"/><path d="M28 15L28 19.5C22.5 21.5 19 26 19 31.5L19 50C19 52.8 21.2 55 24 55L40 55C42.8 55 45 52.8 45 50L45 31.5C45 26 41.5 21.5 36 19.5L36 15"/><path d="M19 34C25 31.5 39 31.5 45 34"/><path d="M32 40L32 48M28 44L36 44"/>
    </svg>
  );
});

export default VaccineBottle;
