// GENERADO por scripts/build.mjs — no editar a mano.
// Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.2.0
import * as React from 'react';
import type { IconProps } from './types';

export const Hen = React.forwardRef<SVGSVGElement, IconProps>(function Hen(
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
      <path d="M20 12C16 12 14 15 14 18C14 21 17 23 18 26C16 29 15 33 16 37C17 43 23 47 30 47C38 47 45 44 48 39C50 36 50 32 48 29C43 24 34 22 28 23C26 20 26 15 22 12Z"/><path d="M24.5 13.5C25 9.5 21 9 21 12.5C21 8 17 8 17 12C17 9.5 15 10 15 13.5"/><path d="M14 15.5L7.5 18L14 20.5Z"/><circle cx="18.5" cy="16.5" r="1.25" fill="currentColor" stroke="none"/><path d="M42 34C39 28 31 26 24 30"/><path d="M39.5 38C36.5 33 31 31 26 33"/><path d="M45.5 27C49.5 24 53.5 20 55.5 15"/><path d="M45 29C49.5 27 54.5 23 57 19"/><path d="M44.5 31C49.5 30 54.5 28 57.5 24"/><path d="M34.5 46.5L34.5 53"/><path d="M31 56.5L34.5 53L38 56.5"/><path d="M26 46.5L26 53"/><path d="M22.5 56.5L26 53L29.5 56.5"/>
    </svg>
  );
});

export default Hen;
