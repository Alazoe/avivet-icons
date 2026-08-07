<!-- GENERADO por scripts/build.ts — no editar a mano. ·  Fuente: packages/core/src + design-tokens.json · AviVet Icons v0.4.0 -->
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
    <circle cx="32" cy="7" r="3"/><path d="M32 10L32 17"/><path d="M15 42C15 28 22 17 32 17C42 17 49 28 49 42"/><path d="M11 42C11 48 15 52 21 52L43 52C49 52 53 48 53 42Z"/>
  </svg>
</template>
