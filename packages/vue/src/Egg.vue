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
    <path d="M32 8C42 8 50 22 50 36C50 48 42 56 32 56C22 56 14 48 14 36C14 22 22 8 32 8Z"/>
  </svg>
</template>
