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
    <path d="M24 12L18 12C15.8 12 14 13.8 14 16L14 54C14 56.2 15.8 58 18 58L46 58C48.2 58 50 56.2 50 54L50 16C50 13.8 48.2 12 46 12L40 12"/><path d="M25 15.5C25 9 28 5.5 32 5.5C36 5.5 39 9 39 15.5Z"/><path d="M20 30L23 33L29 27"/><path d="M33 31L44 31"/><path d="M20 43L23 46L29 40"/><path d="M33 44L44 44"/>
  </svg>
</template>
