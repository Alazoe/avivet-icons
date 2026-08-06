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
    <path d="M44 12C48 12 50 15 50 18C50 21 47 23 46 26C48 29 49 33 48 37C47 43 41 47 34 47C26 47 19 44 16 39C14 36 14 32 16 29C21 24 30 22 36 23C38 20 38 15 42 12Z"/><path d="M39.5 13.5C39 9.5 43 9 43 12.5C43 8 47 8 47 12C47 9.5 49 10 49 13.5"/><path d="M50 15.5L56.5 18L50 20.5Z"/><circle cx="45.5" cy="16.5" r="1.25" fill="currentColor" stroke="none"/><path d="M22 34C25 28 33 26 40 30"/><path d="M24.5 38C27.5 33 33 31 38 33"/><path d="M18.5 27C12.5 25 9 21 9 16C12.5 18.5 17 21.5 20.5 26"/><path d="M12.5 20.5C14.5 22 16.5 24 18 26"/><path d="M29.5 46.5L29.5 53"/><path d="M26 56.5L29.5 53L33 56.5"/><path d="M29.5 53L29.5 57"/><path d="M38 46.5L38 53"/><path d="M34.5 56.5L38 53L41.5 56.5"/><path d="M38 53L38 57"/>
  </svg>
</template>
