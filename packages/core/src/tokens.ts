/**
 * Carga design-tokens.json y lo congela.
 * Todo valor de presentacion del proyecto sale de aqui. Ver ICON_SPEC.md §3.
 */
import raw from '../../../design-tokens.json' with { type: 'json' };

export type Tokens = typeof raw;

const deepFreeze = <T>(o: T): T => {
  Object.values(o as Record<string, unknown>).forEach((v) => {
    if (v && typeof v === 'object') deepFreeze(v);
  });
  return Object.freeze(o);
};

export const tokens: Tokens = deepFreeze(raw);

export default tokens;
