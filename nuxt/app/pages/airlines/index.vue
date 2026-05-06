<script setup lang="ts">
const { data } = await useFetch('/api/airlines')

const airlinesData = data?.value?.airlines;
</script>

<template>
    <header class="mb-8">
        <div class="d-flex justify-content-between align-items-start">
            <div>
                <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Airlines Information</h2>
                <p>Get to know some of the most well known airlines in the world</p>
            </div>
            <div class="ms-3">
                <a href="/" class="btn btn-secondary">Back</a>
            </div>
        </div>
    </header>
    <div class="row g-4">
        <div v-for="airline in airlinesData" :key="airline.id" class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
            <div class="card w-100">
                <img class="card-img-top" :src="airline.imageURL" :alt="airline.name">
                <div class="card-body">
                    <h5 class="card-title">{{ airline.name }}</h5>
                    <p class="card-text">{{ airline.country }}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Destinations: {{ airline.destinations.join(', ') }}</li>
                </ul>
                <div class="card-body">
                    <a :href="`/airlines/${airline.id}`" class="btn btn-primary">+ More Information</a>
                </div>
            </div>
        </div>
    </div>
</template> 
