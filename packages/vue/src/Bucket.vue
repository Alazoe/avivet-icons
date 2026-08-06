<!-- GENERADO por scripts/build.mjs — no editar a mano. ·  Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.1.0 -->
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
    <path d="M13.5 20C13.5 4 50.5 4 50.5 20"/><path d="M13 20C13 17.8 21.5 16 32 16C42.5 16 51 17.8 51 20C51 22.2 42.5 24 32 24C21.5 24 13 22.2 13 20Z"/><path d="M13 20L19 51C19.4 53.3 21.4 55 23.8 55L40.2 55C42.6 55 44.6 53.3 45 51L51 20"/>
  </svg>
</template>
