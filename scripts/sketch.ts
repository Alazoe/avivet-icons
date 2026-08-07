/**
 * NIVEL 1 — Boceto. Hoja de construccion de un icono (ICON_SPEC.md §7.4).
 *
 * Dibuja el icono sobre su reticula, con el area viva, los keylines y la tira
 * de tamanos reales. Es el paso que NO se salta: un icono se aprueba mirandolo
 * a 16 y a 128 px, no leyendo su codigo.
 *
 *   pnpm sketch -- hen
 *   pnpm sketch                (toda la biblioteca)
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import tokens from '../packages/core/src/tokens.ts';
import { paths } from '../packages/core/src/paths.ts';
import { loadIcons } from '../packages/core/src/registry.ts';
import { body } from '../packages/core/src/emit.ts';
import type { LoadedIcon } from '../packages/core/src/types.ts';

const { canvas, keyline, stroke } = tokens;
const SIZES = [128, 64, 48, 32, 24, 16];
const GUIDE = '#C2872F';
const HAIR = '#D2DAE2';

const { icons } = await loadIcons();
const wanted = process.argv[2];
const list = wanted ? icons.filter((i) => i.id === wanted) : icons;

if (!list.length) {
  console.error(
    `no existe el icono "${wanted}". Disponibles: ${icons.map((i) => i.id).join(', ')}`,
  );
  process.exit(1);
}

const ink =
  `fill="none" stroke="#101820" stroke-width="${stroke.width}" ` +
  `stroke-linecap="${stroke.linecap}" stroke-linejoin="${stroke.linejoin}"`;

const grid = (): string => {
  const step = canvas.size / 8;
  let g = '';
  for (let i = 1; i < 8; i++) {
    g +=
      `<path d="M${i * step} 0V${canvas.size}M0 ${i * step}H${canvas.size}" ` +
      `stroke="${GUIDE}" stroke-width="0.25" opacity="0.5"/>`;
  }
  const { min, max } = canvas.safeArea;
  g +=
    `<rect x="${min}" y="${min}" width="${max - min}" height="${max - min}" fill="none" ` +
    `stroke="${GUIDE}" stroke-width="0.4" stroke-dasharray="2 2"/>`;
  const sq = (canvas.size - keyline.square) / 2;
  g +=
    `<rect x="${sq}" y="${sq}" width="${keyline.square}" height="${keyline.square}" ` +
    `fill="none" stroke="${GUIDE}" stroke-width="0.25" opacity="0.6"/>`;
  g +=
    `<circle cx="${canvas.size / 2}" cy="${canvas.size / 2}" r="${keyline.circle / 2}" ` +
    `fill="none" stroke="${GUIDE}" stroke-width="0.25" opacity="0.6"/>`;
  return g;
};

const sheet = (icon: LoadedIcon): string => {
  const g = body(icon.draw());
  const scale = 6; // 64 -> 384 px de lienzo de trabajo
  const stripY = canvas.size * scale + 40;

  let strip = '';
  let x = 0;
  for (const px of SIZES) {
    strip +=
      `<g transform="translate(${x},${stripY + (128 - px)}) scale(${px / canvas.size})" ` +
      `${ink}>${g}</g>`;
    strip +=
      `<text x="${x}" y="${stripY + 146}" font-family="ui-monospace,Menlo,monospace" ` +
      `font-size="11" fill="#5A6875">${px}</text>`;
    x += px + 24;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.size * scale}" height="${stripY + 160}" font-family="ui-monospace,Menlo,monospace">
  <rect width="100%" height="100%" fill="#FFFFFF"/>
  <g transform="scale(${scale})">
    ${grid()}
    <g ${ink}>${g}</g>
  </g>
  <rect x="0.5" y="0.5" width="${canvas.size * scale - 1}" height="${canvas.size * scale - 1}" fill="none" stroke="${HAIR}"/>
  <text x="0" y="${canvas.size * scale + 24}" font-size="13" fill="#101820">${icon.id} · ${icon.name_es}</text>
  ${strip}
</svg>
`;
};

mkdirSync(paths.sketch, { recursive: true });

for (const icon of list) {
  writeFileSync(join(paths.sketch, `${icon.id}.svg`), sheet(icon));
  console.log(`  ✓ .sketch/${icon.id}.svg`);
}

console.log(`
Revisa cada hoja antes de aprobar el icono:
  · ¿se reconoce a 16 px sin leer la etiqueta?
  · ¿aguanta a 128 px sin verse pobre ni tosco?
  · ¿algun par de trazos paralelos por debajo de ${stroke.minGap} px?
  · ¿todo el dibujo dentro del area viva ${canvas.safeArea.min}–${canvas.safeArea.max}?
`);
