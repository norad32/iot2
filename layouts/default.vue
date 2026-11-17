<template>
  <div class="slidev-layout marp-layout" :class="{ 'marp-title': $page === 1 }">
    <div class="marp-content">
      <slot />
    </div>
    <span v-if="$page > 1" class="marp-page-number" aria-hidden="true">{{ $page }}</span>
  </div>
</template>
