/**
 * SVGO — Nivel 3 del flujo (ICON_SPEC.md §7.4, "Optimizacion").
 *
 * Configuracion CONSERVADORA a proposito. Nuestro emisor ya produce SVG
 * minimo, asi que SVGO esta aqui para una sola cosa: acortar la trayectoria
 * (`convertPathData`) sin tocar nada que el contrato publico garantice.
 *
 * Lo que NO se le permite quitar:
 *   role      -> es la accesibilidad del archivo suelto (§12)
 *   los atributos de presentacion -> son el contrato con los tokens
 *
 * `viewBox` y `<title>` ya no hace falta protegerlos: desde SVGO 4 sus plugins
 * salieron de preset-default. Declararlos aqui solo producia un aviso por
 * icono en cada build.
 *
 * `floatPrecision` va atado a tokens.precision: si un dia se cambia la
 * precision, aqui no hay que acordarse de nada.
 */
import type { Config } from 'svgo';
import tokens from './packages/core/design-tokens.json' with { type: 'json' };

const config: Config = {
  multipass: true,
  js2svg: { pretty: false },
  floatPrecision: tokens.precision,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUnknownsAndDefaults: false,
          removeUselessStrokeAndFill: false,
          convertShapeToPath: false,
          mergePaths: false,
          collapseGroups: false,
          convertPathData: {
            floatPrecision: tokens.precision,
            // Sin `a` ni comandos relativos exoticos: la trayectoria tiene que
            // seguir siendo legible por una persona en una revision de PR.
            makeArcs: false,
            forceAbsolutePath: true,
          },
        },
      },
    },
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
  ] as Config['plugins'],
};

export default config;
