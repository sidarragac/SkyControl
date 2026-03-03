<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
defineProps<{
  mainText: string;
  secondaryText: string;
  imageURL: string;
}>();

</script>

<template>
  <div class="flex items-center gap-3">
    <div class="w-12 h-12 rounded-lg bg-primary-900/10 flex items-center justify-center overflow-hidden">
      <img :src="imageURL" :alt="mainText" class="w-full h-full object-cover">
    </div>
    <div>
      <p class="font-semibold text-sm">{{ mainText }}</p>
      <p class="text-xs text-slate-500">{{ secondaryText }}</p>
    </div>
  </div>
</template>
