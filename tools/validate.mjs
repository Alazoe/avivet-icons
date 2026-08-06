/**
 * AviVet Icons — validador del ADN grafico.
 * Aplica automaticamente el checklist de DESIGN.md seccion 7.
 *
 *   node tools/validate.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

const REQUIRED_ROOT_ATTRS = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
};

const COLOR_LITERAL = /(#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|:\s*(black|white|red|blue|green|gray|grey)\b)/i;
const LIVE_MIN = 3;
const LIVE_MAX = 61;

/** Devuelve { attrs, inner } del <svg> raiz. */
export function parseSvg(source) {
  const open = source.match(/<svg\b([^>]*)>/i);
  if (!open) throw new Error('no se encontro la etiqueta <svg>');
  const attrs = {};
  for (const m of open[1].matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) attrs[m[1]] = m[2];
  const inner = source.slice(open.index + open[0].length, source.lastIndexOf('</svg>'));
  return { attrs, inner };
}

/** Valida un icono. Devuelve { errors: [], warnings: [] }. */
export function validateIcon(source) {
  const errors = [];
  const warnings = [];
  let parsed;
  try {
    parsed = parseSvg(source);
  } catch (e) {
    return { errors: [e.message], warnings };
  }
  const { attrs, inner } = parsed;

  for (const [attr, expected] of Object.entries(REQUIRED_ROOT_ATTRS)) {
    if (attrs[attr] !== expected) {
      errors.push(`<svg> debe llevar ${attr}="${expected}" (encontrado: ${attrs[attr] ?? 'ausente'})`);
    }
  }

  if (COLOR_LITERAL.test(inner)) errors.push('color literal: solo se permite currentColor');
  if (/\sstyle\s*=/.test(inner)) errors.push('atributo style= prohibido (rompe currentColor)');
  if (/\sid\s*=/.test(inner)) errors.push('atributo id= prohibido (colisiona en el sprite)');
  if (/<(image|text|foreignObject)\b/i.test(inner)) errors.push('elementos <image>/<text> prohibidos: solo geometria');
  if (/stroke-width\s*=\s*"(?!2")/.test(inner)) errors.push('grosor distinto de 2 px en un hijo');

  // Unica excepcion de relleno: el ojo (circulo solido r <= 1.5)
  for (const m of inner.matchAll(/<(\w+)\b([^>]*)fill\s*=\s*"(?!none")([^"]*)"([^>]*)>/g)) {
    const [tag, , value] = [m[1], m[2], m[3]];
    const whole = m[0];
    const r = Number((whole.match(/\br\s*=\s*"([\d.]+)"/) || [])[1]);
    const isEye = tag === 'circle' && value === 'currentColor' && r > 0 && r <= 1.5;
    if (!isEye) errors.push(`fill="${value}" en <${tag}>: solo se permite el ojo (circle r<=1.5)`);
  }

  // Area viva 4 -> 60 (con 1 px de tolerancia para puntos de control)
  const coords = [...inner.matchAll(/\sd\s*=\s*"([^"]*)"/g)]
    .flatMap((m) => m[1].match(/-?\d*\.?\d+/g) || [])
    .map(Number);
  const out = coords.filter((n) => n < LIVE_MIN || n > LIVE_MAX);
  if (out.length) warnings.push(`coordenadas fuera del area viva (${LIVE_MIN}-${LIVE_MAX}): ${[...new Set(out)].join(', ')}`);

  if (!inner.trim()) errors.push('el icono esta vacio');

  return { errors, warnings };
}

export function listIconFiles(dir = join(ROOT, 'src')) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listIconFiles(full));
    else if (entry.endsWith('.svg')) out.push(full);
  }
  return out.sort();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let errores = 0;
  let avisos = 0;
  for (const file of listIconFiles()) {
    const { errors, warnings } = validateIcon(readFileSync(file, 'utf8'));
    const rel = relative(ROOT, file);
    for (const e of errors) { console.error(`  ERROR  ${rel}: ${e}`); errores++; }
    for (const w of warnings) { console.warn(`  aviso  ${rel}: ${w}`); avisos++; }
  }
  const total = listIconFiles().length;
  if (errores) {
    console.error(`\n✗ ${errores} error(es) en ${total} archivos.`);
    process.exit(1);
  }
  console.log(`✓ ${total} archivos cumplen el ADN de AviVet Icons${avisos ? ` (${avisos} aviso(s))` : ''}.`);
}
