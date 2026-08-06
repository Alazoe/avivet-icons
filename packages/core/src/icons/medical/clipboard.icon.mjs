import { check, draw } from '../../components/index.mjs';

export default {
  id: 'clipboard',
  name: 'Clipboard',
  name_es: 'Planilla de registro',
  category: 'medical',
  keywords: ['form', 'checklist', 'record', 'audit', 'planilla', 'registro', 'auditoria', 'control'],
  since: '0.1.0',

  draw() {
    const rows = [33, 46];

    return [
      // Tabla con la muesca superior para la pinza: no es un rectangle() porque
      // el borde de arriba esta interrumpido.
      draw({ at: { x: 32, y: 12 } }, (p) => p
        .M(-8, 0)
        .H(-14)
        .C(-16.2, 0, -18, 1.8, -18, 4)
        .V(42)
        .C(-18, 44.2, -16.2, 46, -14, 46)
        .H(14)
        .C(16.2, 46, 18, 44.2, 18, 42)
        .V(4)
        .C(18, 1.8, 16.2, 0, 14, 0)
        .H(8)),

      // Pinza.
      draw({ at: { x: 32, y: 11.5 } }, (p) => p
        .M(-7, 0)
        .C(-7, -3, -3.9, -5.5, 0, -5.5)
        .C(3.9, -5.5, 7, -3, 7, 0)
        .V(2.5)
        .C(7, 4.2, 5.7, 5.5, 4, 5.5)
        .H(-4)
        .C(-5.7, 5.5, -7, 4.2, -7, 2.5)
        .Z()),

      // Dos items verificados: el mismo check del catalogo, reducido a 6 px.
      ...rows.flatMap((y) => [
        ...check({ at: { x: 23, y }, size: 6 }),
        draw({ at: { x: 33, y: y - 2 } }, (p) => p.M(0, 0).H(11)),
      ]),
    ];
  },
};
