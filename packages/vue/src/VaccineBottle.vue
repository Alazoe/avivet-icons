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
    <path d="M25 7L39 7L39 15L25 15Z"/><path d="M28 15L28 19.5C22.5 21.5 19 26 19 31.5L19 50C19 52.8 21.2 55 24 55L40 55C42.8 55 45 52.8 45 50L45 31.5C45 26 41.5 21.5 36 19.5L36 15"/><path d="M19 34C25 31.5 39 31.5 45 34"/><path d="M32 40L32 48M28 44L36 44"/>
  </svg>
</template>
