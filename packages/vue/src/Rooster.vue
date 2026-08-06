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
    <path d="M22 13C18 13 16 16 16 19C16 22 18 24 19 27C17 31 16 36 17 41C18 47 24 50 31 50C38 50 44 47 47 42C49 39 49 35 47 32C42 28 35 25 29 26C27 22 27 17 24 13Z"/><path d="M28 15C28.5 8 23 7 23 13C23 5 17.5 4.5 17.5 12.5C17 7.5 14 8.5 14.5 15"/><path d="M16 21.5C12.5 24 12.5 28.5 15.5 29Z"/><path d="M16 16.5L9.5 19L16 21.5Z"/><circle cx="20.5" cy="17.5" r="1.25" fill="currentColor" stroke="none"/><path d="M41 37C38 31 30 29 23 33"/><path d="M38.5 41C35.5 36 30 34 25 36"/><path d="M45 31C50 28 54 23 56 17"/><path d="M46.5 33C52 31 56 27 58 22"/><path d="M34 49.5L34 54.5"/><path d="M30.5 58L34 54.5L37.5 58"/><path d="M26 49.5L26 54.5"/><path d="M22.5 58L26 54.5L29.5 58"/>
  </svg>
</template>
