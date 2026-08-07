<!-- GENERADO por scripts/build.ts — no editar a mano. ·  Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.3.0 -->
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
    <path d="M6 28C6 38 18 47 32 47C46 47 58 38 58 28Z"/><path d="M13 24.5L17 31.5"/><path d="M30 24.5L34 31.5"/><path d="M47 24.5L51 31.5"/><path d="M25 33C27.5 33 29.5 36.5 29.5 40C29.5 43 27.5 45 25 45C22.5 45 20.5 43 20.5 40C20.5 36.5 22.5 33 25 33Z"/><path d="M40 33C42.5 33 44.5 36.5 44.5 40C44.5 43 42.5 45 40 45C37.5 45 35.5 43 35.5 40C35.5 36.5 37.5 33 40 33Z"/>
  </svg>
</template>
