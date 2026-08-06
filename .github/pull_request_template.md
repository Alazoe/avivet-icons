## Qué cambia

<!-- Una frase. Si son varios iconos, lístalos. -->

## Por qué

<!-- El motivo, no la descripción. Va también al CHANGELOG. -->

## Capturas

<!-- OBLIGATORIO para cualquier cambio visual. Un icono sin captura no se revisa. -->

| 16 px | 24 px | 48 px |
| --- | --- | --- |
|  |  |  |

Tema claro / tema oscuro:

---

## Checklist automático

- [ ] `npm test` en verde
- [ ] `git diff --exit-code` limpio tras `npm run build`

## Checklist humano (ICON_SPEC.md §15)

- [ ] Se reconoce **a 16 px** sin leer la etiqueta
- [ ] Ningún par de trazos paralelos por debajo de 4 px
- [ ] Ninguna forma cerrada dentro de un cuerpo que se lea como un ojo
- [ ] Se ve bien en tema claro y oscuro
- [ ] Reutiliza el catálogo; la geometría propia está justificada en un comentario
- [ ] Si una forma se usa por segunda vez, se promovió a componente (§4.6)
- [ ] Entrada añadida al `CHANGELOG.md`

## Archivos generados

- [ ] No he editado a mano nada bajo `packages/*/svg`, `sprite`, `css`, `json`,
      `react/src`, `vue/src` ni `docs/`
