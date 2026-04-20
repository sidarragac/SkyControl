<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// Props (v-model:imageURL)
const props = withDefaults(
  defineProps<{
    imageURL: string;
    preview?: boolean;
  }>(),
  {
    preview: true,
  },
);

// Emits
const emit = defineEmits(['update:imageURL']);

function updateValue(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  emit('update:imageURL', value);
}
</script>

<template>
  <section class="bg-neutral-100 p-6 rounded-xl border border-neutral-100">
    <h3 class="text-lg text-primary-900 font-bold mb-6">Media & Documentation</h3>

    <div class="space-y-2">
      <label class="text-sm text-primary-700 font-semibold"> Image URL </label>

      <input
        type="text"
        :value="props.imageURL"
        @input="updateValue"
        class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
        placeholder="https://example.com/image.jpg"
      />

      <!-- Preview -->
      <div v-if="props.preview && props.imageURL" class="mt-4">
        <img :src="props.imageURL" class="w-32 h-32 object-cover rounded-lg border" />
      </div>
    </div>
  </section>
</template>
