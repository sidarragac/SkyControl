<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  imageURL: string;
}>();
const emit = defineEmits(['update:imageURL']);

const fileInput = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);
const isDragging = ref(false);

const imageUrl = computed(() =>
  imageFile.value ? URL.createObjectURL(imageFile.value) : props.imageURL,
);

const formattedSize = computed(() => {
  if (!imageFile.value) return '';
  return (imageFile.value.size / (1024 * 1024)).toFixed(2) + ' MB';
});

function openFileDialog(): void {
  fileInput.value?.click();
}

function handleFileSelect(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files?.length) {
    const file = input.files[0];

    if (file) {
      processFile(file);
    }
  }
}

function handleDrop(event: DragEvent): void {
  event.preventDefault();
  isDragging.value = false;

  const file = event.dataTransfer?.files[0];
  if (file) {
    processFile(file);
  }
}

function processFile(file: File): void {
  if (!file.type.startsWith('image/')) {
    alert('Only images allowed');
    return;
  }

  imageFile.value = file;
  emitImageUrl();
}

function emitImageUrl() {
  if (imageUrl.value) {
    emit('update:imageURL', imageUrl.value);
  }
}

function removeImage() {
  imageFile.value = null;
  emit('update:imageURL', '');
}

watch(
  () => props.imageURL,
  (newVal) => {
    if (!newVal) {
      imageFile.value = null;
    }
  },
);
</script>

<template>
  <section class="bg-neutral-100 p-6 rounded-xl border border-neutral-100">
    <h3 class="text-lg text-primary-900 font-bold mb-6 flex items-center gap-2">Media</h3>

    <div class="space-y-4">
      <span class="text-sm text-primary-700 font-semibold">Photo</span>

      <!-- Upload Area -->
      <div
        class="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center group cursor-pointer transition-colors"
        :class="
          isDragging
            ? 'border-accent-500 bg-accent-500/8'
            : 'border-primary-700 bg-white-100 hover:bg-accent-500/8 hover:border-accent-500'
        "
        @click="openFileDialog"
        @dragenter.prevent="isDragging = true"
        @dragover.prevent
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="p-4 rounded-full mb-4">
          <i class="fas fa-file material-symbols-outlined text-black-800 text-3xl"></i>
        </div>

        <p class="text-sm text-black-800 font-bold mb-1">Click to upload or drag and drop</p>
        <p class="text-xs text-black-800">Only image files (PNG, JPG)</p>

        <!-- Hidden Input -->
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
        />
      </div>

      <!-- Preview -->
      <div
        v-if="imageFile || props.imageURL"
        class="flex items-center gap-4 p-3 bg-primary-700/5 border-primary-700/10 rounded-lg"
      >
        <div
          class="size-12 rounded bg-cover bg-center"
          :style="{ backgroundImage: `url(${imageUrl})` }"
        ></div>

        <div class="flex-1 min-w-0">
          <p class="text-xs text-primary-900 font-semibold truncate">
            {{ imageFile?.name }}
          </p>
          <p class="text-[10px] text-black-800/70">
            {{ formattedSize }}
          </p>
        </div>

        <button
          class="p-1 text-black-800/60 hover:text-secondary-700 transition-colors cursor-pointer"
          type="button"
          @click="removeImage"
        >
          <i class="fas fa-trash material-symbols-outlined text-xl"></i>
        </button>
      </div>
    </div>
  </section>
</template>
