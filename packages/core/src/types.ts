/**
 * El vocabulario del sistema. Todo lo que un componente puede devolver y todo
 * lo que una receta debe declarar. Ver ICON_SPEC.md §4 y §9.
 */

/** Punto en coordenadas de lienzo (0–64). */
export interface Point {
  x: number;
  y: number;
}

/** Figura de trayectoria. `onCurve` y `control` permiten validar el area viva. */
export interface PathShape {
  tag: 'path';
  d: string;
  onCurve: Point[];
  control: Point[];
}

/** Circulo. `solid` marca la unica forma rellena de la biblioteca: el ojo. */
export interface CircleShape {
  tag: 'circle';
  cx: number;
  cy: number;
  r: number;
  solid: boolean;
  onCurve: Point[];
  control: Point[];
}

export type Shape = PathShape | CircleShape;

/** El lapiz. Comandos absolutos respecto del ancla; ver ICON_SPEC.md §4.3. */
export interface Pen {
  M(x: number, y: number): Pen;
  L(x: number, y: number): Pen;
  H(x: number): Pen;
  V(y: number): Pen;
  C(x1: number, y1: number, x2: number, y2: number, x: number, y: number): Pen;
  Q(x1: number, y1: number, x: number, y: number): Pen;
  Z(): Pen;
  add(segment: (pen: Pen) => unknown): Pen;
  d(): string;
  shape(): PathShape;
}

export interface PenOptions {
  at?: Point;
  scale?: number;
  /** `FACING` refleja la pieza en horizontal sin reescribir sus numeros. */
  flip?: number;
}

/** Opciones minimas de una pieza colocada sobre un ancla. */
export interface PieceOptions {
  at: Point;
  scale?: number;
}

/** Un tramo cubico: dos puntos de control y el punto final. */
export type CubicSegment = [number, number, number, number, number, number];

/** Comandos de una pieza: una funcion que dibuja con el lapiz. */
export type PenCommands = (pen: Pen) => Pen;

/** Anclas que publica un contorno: donde se engancha cada pieza. */
export interface Anchors {
  crown: Point;
  beak: Point;
  /** Donde cuelga la barbilla. Solo la declaran las aves que la llevan. */
  wattle?: Point;
  eye: Point;
  wing: Point;
  tail: Point;
  legs: Point[];
}

/** Un tramo de contorno: no dibuja solo, se encadena en el mismo <path>. */
export interface ContourPart {
  anchors: Partial<Anchors>;
  draw(pen: Pen): Pen;
}

export interface Silhouette {
  variant: BirdVariant;
  shapes: Shape[];
  anchors: Anchors;
}

export type BirdVariant = 'adult' | 'rooster' | 'chick';
export type CombSize = 'single' | 'big' | 'pea' | 'tuft';
export type WingVariant = 'leaf' | 'simple' | 'adult' | 'chick';
export type TailVariant = 'hen' | 'chick' | 'rooster';
export type FootKind = 'splayed' | 'profile' | false;

export interface FootOptions extends PieceOptions {
  spread?: number;
  drop?: number;
  center?: number;
  /** El tercer dedo se pierde a 16 px: por eso 2 es el defecto. */
  toes?: 2 | 3;
}

export interface LegOptions extends FootOptions {
  length?: number;
  foot?: FootKind;
  /** Solo en el acabado de perfil: longitud del dedo hacia adelante. */
  toe?: number;
}

export type Category =
  'animals' | 'water' | 'medical' | 'nutrition' | 'buildings' | 'biosecurity' | 'production' | 'ui';

/**
 * Presupuesto de complejidad de un icono. Solo se declara para SUPERAR el techo
 * global, y siempre con motivo: una excepcion sin `reason` es complejidad que
 * nadie decidio (ICON_SPEC.md §11.21).
 */
export interface IconBudget {
  maxSegments?: number;
  maxBytes?: number;
  reason: string;
}

/** Una receta. Es lo unico que se escribe a mano para crear un icono. */
export interface IconRecipe {
  id: string;
  name: string;
  name_es: string;
  category: Category;
  keywords: string[];
  since: string;
  /** `bird` en las aves: las reglas de anatomia son suyas, no de la categoria. */
  taxon?: 'bird';
  deprecated?: string;
  budget?: IconBudget;
  draw(): Shape[];
}

/** Receta ya cargada por el registro, con su ruta en disco. */
export interface LoadedIcon extends IconRecipe {
  file: string;
}

/** Entrada del manifest publicado. */
export interface ManifestIcon {
  id: string;
  name: string;
  name_es: string;
  category: Category;
  keywords: string[];
  since: string;
  deprecated?: string;
  path: string;
  viewBox: string;
  body: string;
}

export interface Manifest {
  library: string;
  version: string;
  license: string;
  tokens: { canvas: number; stroke: number; color: string };
  count: number;
  categories: Record<string, { name_es: string; order: number }>;
  icons: ManifestIcon[];
}
