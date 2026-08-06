import { egg, draw } from '../../components/index.mjs';

export default {
  id: 'nest',
  name: 'Nest',
  name_es: 'Nido',
  category: 'animals',
  keywords: ['nesting', 'brood', 'lay', 'box', 'nido', 'ponedero', 'postura', 'cama'],
  since: '0.2.0',

  draw() {
    // Cuenco del ponedero. El borde va ARRIBA de los huevos: si los cruza, se
    // lee "huevos delante de un plato" en vez de "huevos dentro del nido".
    const rim = { x: 32, y: 28 };

    return [
      draw({ at: rim }, (p) => p
        .M(-26, 0)
        .C(-26, 10, -14, 19, 0, 19)
        .C(14, 19, 26, 10, 26, 0)
        .Z()),

      // Tres briznas cruzando el borde. Sin ellas el cuenco se lee como un bol
      // de vajilla; con ellas, como material vegetal tejido.
      draw({ at: rim }, (p) => p.M(-19, -3.5).L(-15, 3.5)),
      draw({ at: rim }, (p) => p.M(-2, -3.5).L(2, 3.5)),
      draw({ at: rim }, (p) => p.M(15, -3.5).L(19, 3.5)),

      // Dos huevos del componente, no dos ovalos aparte: es la segunda aparicion
      // del ovoide y lo que obligo a ascenderlo a componente (§4.6).
      // Separados 5 px para que no se fusionen a 16 px.
      ...egg({ at: { x: 25, y: 33 }, height: 12 }),
      ...egg({ at: { x: 40, y: 33 }, height: 12 }),
    ];
  },
};
