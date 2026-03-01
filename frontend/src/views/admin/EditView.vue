<!-- Developed by Mateo Pineda -->
<template>
  <main class="flex-1 flex overflow-hidden">
    <!-- Left Sidebar: Aircraft List -->
    <aside
      class="w-80 border-r border-slate-200 dark:border-[#282e39] flex flex-col bg-white dark:bg-[#111318] flex-shrink-0">
      <div class="p-4 border-b border-slate-200 dark:border-[#282e39]">
        <div class="flex items-center justify-between mb-4 px-1">
          <h2 class="text-lg font-bold dark:text-white">Aircraft</h2>
          <button class="bg-primary/10 text-primary p-1 rounded-lg hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
        <label class="flex flex-col h-10 w-full">
          <div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-[#282e39]">
            <div class="text-slate-400 dark:text-[#9da6b9] flex items-center justify-center pl-3">
              <span class="material-symbols-outlined text-[18px]">search</span>
            </div>
            <input
              class="form-input bg-transparent border-none text-sm w-full focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-[#9da6b9]"
              placeholder="Filter by ID or model..." value="" />
          </div>
        </label>
      </div>
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <!-- List Items -->
        <div class="flex flex-col">
          <!-- Active Item -->
          <div class="p-4 flex gap-3 bg-primary/10 border-l-4 border-primary cursor-pointer">
            <div class="p-2 bg-primary rounded-lg text-white">
              <span class="material-symbols-outlined">flight</span>
            </div>
            <div class="flex flex-col">
              <p class="text-sm font-bold dark:text-white">Boeing 737-800</p>
              <p class="text-xs text-slate-500 dark:text-[#9da6b9]">ID: B738-9241</p>
            </div>
            <div class="ml-auto flex items-center">
              <span class="size-2 bg-green-500 rounded-full"></span>
            </div>
          </div>
          <!-- Regular Items -->
          <div
            class="p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-[#282e39] border-l-4 border-transparent transition-colors cursor-pointer">
            <div class="p-2 bg-slate-100 dark:bg-[#282e39] rounded-lg text-slate-600 dark:text-white">
              <span class="material-symbols-outlined">flight</span>
            </div>
            <div class="flex flex-col">
              <p class="text-sm font-semibold dark:text-white">Airbus A320neo</p>
              <p class="text-xs text-slate-500 dark:text-[#9da6b9]">ID: A320-1120</p>
            </div>
            <div class="ml-auto flex items-center">
              <span class="size-2 bg-green-500 rounded-full"></span>
            </div>
          </div>
          <div
            class="p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-[#282e39] border-l-4 border-transparent transition-colors cursor-pointer">
            <div class="p-2 bg-slate-100 dark:bg-[#282e39] rounded-lg text-slate-600 dark:text-white">
              <span class="material-symbols-outlined">flight</span>
            </div>
            <div class="flex flex-col">
              <p class="text-sm font-semibold dark:text-white">Boeing 787-9</p>
              <p class="text-xs text-slate-500 dark:text-[#9da6b9]">ID: B789-5501</p>
            </div>
            <div class="ml-auto flex items-center">
              <span class="size-2 bg-amber-500 rounded-full"></span>
            </div>
          </div>
          <div
            class="p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-[#282e39] border-l-4 border-transparent transition-colors cursor-pointer">
            <div class="p-2 bg-slate-100 dark:bg-[#282e39] rounded-lg text-slate-600 dark:text-white">
              <span class="material-symbols-outlined">flight</span>
            </div>
            <div class="flex flex-col">
              <p class="text-sm font-semibold dark:text-white">Embraer E195-E2</p>
              <p class="text-xs text-slate-500 dark:text-[#9da6b9]">ID: E195-0042</p>
            </div>
            <div class="ml-auto flex items-center">
              <span class="size-2 bg-green-500 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <!-- Right Content: Edit Form -->
    <section class="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar">
      <!-- Breadcrumbs -->
      <div class="flex flex-wrap items-center gap-2 px-8 pt-6">
        <a class="text-slate-500 dark:text-[#9da6b9] text-sm font-medium hover:text-primary transition-colors"
          href="#">Admin</a>
        <span class="text-slate-400 dark:text-[#9da6b9] text-sm">/</span>
        <a class="text-slate-500 dark:text-[#9da6b9] text-sm font-medium hover:text-primary transition-colors"
          href="#">Aircraft</a>
        <span class="text-slate-400 dark:text-[#9da6b9] text-sm">/</span>
        <span class="text-slate-900 dark:text-white text-sm font-semibold">Edit Information</span>
      </div>
      <!-- Header Section -->
      <div class="flex items-center justify-between px-8 py-6">
        <div>
          <h1 class="text-slate-900 dark:text-white tracking-light text-[28px] lg:text-[32px] font-bold leading-tight">
            Edit Aircraft: Boeing 737-800</h1>
          <p class="text-slate-500 dark:text-[#9da6b9] mt-1">Manage technical specifications and operational status for
            tail number N87241.</p>
        </div>
        <div class="flex gap-3">
          <button
            class="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-[#282e39] rounded-lg text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-[#282e39] transition-all">
            <span class="material-symbols-outlined text-lg">history</span>
            View History
          </button>
        </div>
      </div>
      <!-- Form Content -->
      <div class="px-8 pb-20">
        <div
          class="bg-white dark:bg-[#111318] rounded-xl border border-slate-200 dark:border-[#282e39] overflow-hidden">
          <!-- Section: General Information -->
          <div class="p-6 border-b border-slate-200 dark:border-[#282e39]">
            <h3 class="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">info</span>
              General Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Aircraft Model</label>
                <input
                  class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                  type="text" value="Boeing 737-800" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Tail Number / Registration</label>
                <input
                  class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                  type="text" value="N87241" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Manufacturer</label>
                <select
                  class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none">
                  <option>Boeing</option>
                  <option>Airbus</option>
                  <option>Embraer</option>
                  <option>Bombardier</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Owner Airline</label>
                <select
                  class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none">
                  <option>United Airlines</option>
                  <option>Delta Air Lines</option>
                  <option>American Airlines</option>
                  <option>Southwest Airlines</option>
                </select>
              </div>
            </div>
          </div>
          <!-- Section: Technical Specifications -->
          <div class="p-6 border-b border-slate-200 dark:border-[#282e39]">
            <h3 class="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">settings_suggest</span>
              Technical Specifications
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Max Passenger Capacity</label>
                <div class="relative">
                  <input
                    class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none pr-10"
                    type="number" value="189" />
                  <span class="absolute right-3 top-3 text-slate-400 text-sm">Seats</span>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Range (Full Load)</label>
                <div class="relative">
                  <input
                    class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none pr-10"
                    type="number" value="5435" />
                  <span class="absolute right-3 top-3 text-slate-400 text-sm">KM</span>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Engine Type</label>
                <input
                  class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                  type="text" value="CFM56-7B27" />
              </div>
            </div>
          </div>
          <!-- Section: Maintenance & Status -->
          <div class="p-6">
            <h3 class="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">build</span>
              Operational Status
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Current Status</label>
                <div class="flex gap-3">
                  <button
                    class="flex-1 py-3 px-4 rounded-lg border-2 border-primary bg-primary/10 text-primary font-bold transition-all">Active</button>
                  <button
                    class="flex-1 py-3 px-4 rounded-lg border-2 border-slate-200 dark:border-[#282e39] dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-[#282e39] transition-all">Maintenance</button>
                  <button
                    class="flex-1 py-3 px-4 rounded-lg border-2 border-slate-200 dark:border-[#282e39] dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-[#282e39] transition-all">Stored</button>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold dark:text-slate-300">Last Inspection Date</label>
                <div class="relative">
                  <input
                    class="w-full bg-slate-50 dark:bg-[#282e39] border-slate-200 dark:border-none rounded-lg text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    type="date" value="2023-11-15" />
                </div>
              </div>
            </div>
          </div>
          <!-- Actions Footer -->
          <div class="p-6 bg-slate-50 dark:bg-[#1c222d] flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all order-2 sm:order-1">
              <span class="material-symbols-outlined text-lg">delete</span>
              Delete Aircraft
            </button>
            <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button
                class="px-6 py-3 rounded-lg text-slate-500 dark:text-slate-400 font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">Discard
                Changes</button>
              <button
                class="px-8 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all">Save
                Changes</button>
            </div>
          </div>
        </div>
        <!-- Helper Tip -->
        <div class="mt-6 flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <span class="material-symbols-outlined text-primary">lightbulb</span>
          <p class="text-sm text-slate-600 dark:text-[#9da6b9]">
            <span class="font-bold">Pro Tip:</span> Updating the status to "Maintenance" will automatically trigger a
            notification to the engineering team and update the flight scheduling system.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>