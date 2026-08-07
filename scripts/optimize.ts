/**
 * NIVEL 3 — Optimizacion (ICON_SPEC.md §7.4).
 *
 * Pasa el SVG por SVGO con la configuracion conservadora de svgo.config.js.
 * Vive en `scripts` porque SVGO es herramienta de build: no debe viajar en el
 * paquete publicado. Los tests importan de aqui para optimizar exactamente
 * igual que el build: si no, la comprobacion 16 (artefactos sincronizados)
 * compararia peras con manzanas.
 */
import { optimize } from 'svgo';
import config from '../svgo.config.ts';

export const optimizeSvg = (svg: string): string => optimize(svg, config).data;

/** Cuantos bytes ahorro la optimizacion. Solo informativo, para el build. */
export const savings = (before: string, after: string): number =>
  Buffer.byteLength(before) - Buffer.byteLength(after);
