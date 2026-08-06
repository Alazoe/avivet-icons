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
    <path d="M32 6C40 16 48 27 48 38C48 46.8 40.8 54 32 54C23.2 54 16 46.8 16 38C16 27 24 16 32 6Z"/>
  </svg>
</template>
