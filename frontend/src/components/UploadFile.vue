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
  <section class="bg-punch-900 p-6 rounded-xl border">
    <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">Media</h3>

    <div class="space-y-4">
      <span class="text-sm text-punch-50 font-semibold">Photo</span>

      <!-- Upload Area -->
      <div
        class="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center bg-punch-50 group cursor-pointer transition-colors"
        :class="
          isDragging ? 'border-punch-700 bg-punch-100' : 'border-deep-black hover:border-punch-700'
        "
        @click="openFileDialog"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop="handleDrop"
      >
        <div class="bg-primary/10 p-4 rounded-full mb-4">
          <i class="fas fa-file material-symbols-outlined text-deep-black text-3xl"></i>
        </div>

        <p class="text-sm text-deep-black font-bold mb-1">Click to upload or drag and drop</p>
        <p class="text-xs text-deep-black/80">Only image files (PNG, JPG)</p>

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
        class="flex items-center gap-4 p-3 bg-punch-50 rounded-lg"
      >
        <div
          class="size-12 rounded bg-cover bg-center"
          :style="{ backgroundImage: `url(${imageUrl})` }"
        ></div>

        <div class="flex-1 min-w-0">
          <p class="text-xs text-deep-black font-bold truncate">
            {{ imageFile?.name }}
          </p>
          <p class="text-[10px] text-deep-black/80">
            {{ formattedSize }}
          </p>
        </div>

        <button
          class="p-1 hover:text-punch-900 transition-colors cursor-pointer"
          type="button"
          @click="removeImage"
        >
          <i class="fas fa-trash material-symbols-outlined text-xl"></i>
        </button>
      </div>
    </div>
  </section>
</template>
