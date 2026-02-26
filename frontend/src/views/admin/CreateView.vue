<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('aircraft');
</script>

<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <header class="mb-8">
      <h2 class="text-3xl text-punch-50 font-black tracking-tight mb-2">Create New Entry</h2>
      <p class="text-punch-50">Add a new aircraft, airline, or manufacturer record to the global
        registry.</p>
    </header>

    <!-- Tabs Navigation -->
    <nav class="border-b border-punch-50 mb-8">
      <div class="flex gap-4">
        <button
          @click="activeTab = 'aircraft'"
          :class="['group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'aircraft' ? 'text-punch-50 bg-punch-900' : 'text-punch-800 bg-punch-50 hover:text-punch-900'
          ]"
        >
          <span>Aircraft</span>
        </button>

        <button
          @click="activeTab = 'airline'"
          :class="['group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'airline' ? 'text-punch-50 bg-punch-900' : 'text-punch-800 bg-punch-50 hover:text-punch-900'
          ]"
        >
          <span>Airline</span>
        </button>

        <button
          @click="activeTab = 'manufacturer'"
          :class="['group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'manufacturer' ? 'text-punch-50 bg-punch-900' : 'text-punch-800 bg-punch-50 hover:text-punch-900'
          ]"
        >
          <span>Manufacturer</span>
        </button>
      </div>
    </nav>

    <!-- Aircraft Form -->
    <form 
      :class="['space-y-8',
        activeTab === 'aircraft' ? 'block' : 'hidden'
      ]"
    >
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl boder">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Aircraft Registry</label>
            <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. N123AA" type="text" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Aircraft Model</label>
            <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. Boeing 737-800" type="text" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Manufacturer</label>
            <select
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary">
              <option>Boeing Commercial Airplanes</option>
              <option>Airbus</option>
              <option>Embraer</option>
              <option>Bombardier</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Airline</label>
            <select
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary">
              <option>Boeing Commercial Airplanes</option>
              <option>Airbus</option>
              <option>Embraer</option>
              <option>Bombardier</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Section: Media & Documentation -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Media &amp; Assets
        </h3>

        <div class="space-y-4">
          <label class="text-sm text-punch-50 font-semibold">Aircraft Photo</label>
          <div
            class="border-2 border-dashed border-deep-black rounded-xl p-10 flex flex-col items-center justify-center bg-punch-50 group cursor-pointer hover:border-punch-700 transition-colors">
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <i class="fas fa-file material-symbols-outlined text-deep-black text-3xl"></i>
            </div>
            <p class="text-sm text-deep-black font-bold mb-1">Click to upload or drag and drop</p>
            <p class="text-xs text-deep-black/80">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

          <!-- Upload Preview Placeholder -->
          <div class="flex items-center gap-4 p-3 bg-punch-50 rounded-lg">
            <div class="size-12 rounded bg-punch-50 bg-cover bg-center"
              data-alt="Small thumbnail preview of uploaded aircraft image">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-deep-black font-bold truncate">B738_Final_Render.jpg</p>
              <p class="text-[10px] text-deep-black/80">2.4 MB • Complete</p>
            </div>
            <button class="p-1 hover:text-punch-900 transition-colors cursor-pointer" type="button">
              <i class="fas fa-trash material-symbols-outlined text-xl"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Section: Specifications -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Additional Specifications
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Passenger Capacity</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="0" type="number" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">First Flight Date</label>
              <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
                type="date" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Status</label>
            <select
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary">
              <option>Active</option>
              <option>Maintenance</option>
              <option>Inactive</option>
              <option>Retired</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button">
          Discard Changes
        </button>
        <button
          class="px-8 py-3 text-sm font-bold text-deep-black bg-punch-50 hover:text-light-black/50 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
          type="submit">
          Save Aircraft Entry
        </button>
      </div>
    </form>

    <!-- Airline Form -->
    <form
      :class="['space-y-8',
        activeTab === 'airline' ? 'block' : 'hidden'
      ]"
    >
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl boder">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Airline
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Aircraft Name</label>
            <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. Boeing 737-800" type="text" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Model Number</label>
            <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. B738" type="text" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Manufacturer</label>
            <select
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary">
              <option>Boeing Commercial Airplanes</option>
              <option>Airbus</option>
              <option>Embraer</option>
              <option>Bombardier</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Registration Date</label>
              <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
                type="date" />
          </div>
        </div>
      </section>

      <!-- Section: Media & Documentation -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Media &amp; Assets
        </h3>

        <div class="space-y-4">
          <label class="text-sm text-punch-50 font-semibold">Aircraft Photo</label>
          <div
            class="border-2 border-dashed border-deep-black rounded-xl p-10 flex flex-col items-center justify-center bg-punch-50 group cursor-pointer hover:border-punch-700 transition-colors">
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <i class="fas fa-file material-symbols-outlined text-deep-black text-3xl"></i>
            </div>
            <p class="text-sm text-deep-black font-bold mb-1">Click to upload or drag and drop</p>
            <p class="text-xs text-deep-black/80">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

          <!-- Upload Preview Placeholder -->
          <div class="flex items-center gap-4 p-3 bg-punch-50 rounded-lg">
            <div class="size-12 rounded bg-punch-50 bg-cover bg-center"
              data-alt="Small thumbnail preview of uploaded aircraft image">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-deep-black font-bold truncate">B738_Final_Render.jpg</p>
              <p class="text-[10px] text-deep-black/80">2.4 MB • Complete</p>
            </div>
            <button class="p-1 hover:text-punch-900 transition-colors cursor-pointer" type="button">
              <i class="fas fa-trash material-symbols-outlined text-xl"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Section: Specifications -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Additional Specifications
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Passenger Capacity</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="0" type="number" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Max Range (km)</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="0" type="number" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Engine Type</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="Turbofan" type="text" />
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button">
          Discard Changes
        </button>
        <button
          class="px-8 py-3 text-sm font-bold text-deep-black bg-punch-50 hover:text-light-black/50 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
          type="submit">
          Save Aircraft Entry
        </button>
      </div>
    </form>

    <!-- Manufacturer Form -->
    <form
      :class="['space-y-8',
        activeTab === 'manufacturer' ? 'block' : 'hidden'
      ]"
    >
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl boder">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Manufacturer
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Aircraft Name</label>
            <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. Boeing 737-800" type="text" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Model Number</label>
            <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. B738" type="text" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Manufacturer</label>
            <select
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary">
              <option>Boeing Commercial Airplanes</option>
              <option>Airbus</option>
              <option>Embraer</option>
              <option>Bombardier</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Registration Date</label>
              <input class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
                type="date" />
          </div>
        </div>
      </section>

      <!-- Section: Media & Documentation -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Media &amp; Assets
        </h3>

        <div class="space-y-4">
          <label class="text-sm text-punch-50 font-semibold">Aircraft Photo</label>
          <div
            class="border-2 border-dashed border-deep-black rounded-xl p-10 flex flex-col items-center justify-center bg-punch-50 group cursor-pointer hover:border-punch-700 transition-colors">
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <i class="fas fa-file material-symbols-outlined text-deep-black text-3xl"></i>
            </div>
            <p class="text-sm text-deep-black font-bold mb-1">Click to upload or drag and drop</p>
            <p class="text-xs text-deep-black/80">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

          <!-- Upload Preview Placeholder -->
          <div class="flex items-center gap-4 p-3 bg-punch-50 rounded-lg">
            <div class="size-12 rounded bg-punch-50 bg-cover bg-center"
              data-alt="Small thumbnail preview of uploaded aircraft image">
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-deep-black font-bold truncate">B738_Final_Render.jpg</p>
              <p class="text-[10px] text-deep-black/80">2.4 MB • Complete</p>
            </div>
            <button class="p-1 hover:text-punch-900 transition-colors cursor-pointer" type="button">
              <i class="fas fa-trash material-symbols-outlined text-xl"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Section: Specifications -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Additional Specifications
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Passenger Capacity</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="0" type="number" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Max Range (km)</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="0" type="number" />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold">Engine Type</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="Turbofan" type="text" />
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button">
          Discard Changes
        </button>
        <button
          class="px-8 py-3 text-sm font-bold text-deep-black bg-punch-50 hover:text-light-black/50 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
          type="submit">
          Save Aircraft Entry
        </button>
      </div>
    </form>
  </div>
</template>