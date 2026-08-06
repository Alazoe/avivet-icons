<!-- GENERADO por scripts/build.mjs — no editar a mano. ·  Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.2.1 -->
<script setup lang="ts">
withDefaults(defineProps<{ size?: number | string; title?: string }>(), { size: 24 });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0
    0
    64
    64"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="size"
    :height="size"
    :role="title ? 'img' : undefined"
    :aria-hidden="title ? undefined : true"
    focusable="false"
  >
    <title v-if="title">{{ title }}</title>
    <path d="M29 10C23 10 18 14 18 20C18 24 19 27 21 29C18 32 17 37 19 41C22 47 28 50 34 50C42 50 48 45 49 38C50 31 47 24 42 20C39 14 35 10 29 10Z"/><path d="M30 10C32.5 5.5 29.5 3 26.5 4.5"/><path d="M18 17.88L12.48 20L18 22.13Z"/><circle cx="24" cy="19" r="1.25" fill="currentColor" stroke="none"/><path d="M44 38C41.5 34 37 33 33 35"/><path d="M42.5 42C40 38.5 36.5 37.5 33.5 39"/><path d="M49 36C52.5 34.5 54.5 32 55 28.5"/><path d="M36.5 49.5L36.5 54"/><path d="M33.5 57L36.5 54L39.5 57"/><path d="M30 49.5L30 54"/><path d="M27 57L30 54L33 57"/>
  </svg>
</template>
