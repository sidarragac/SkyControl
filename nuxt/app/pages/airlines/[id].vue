<script setup lang="ts">
const { data: response } = await useFetch('/api/airlines')
const airlinesData = response.value?.airlines

const route = useRoute()
const id = String(route.params.id)
const airline = airlinesData?.find((airline) => airline.id === id)

if (!airline) {
    throw createError({ statusCode: 404, statusMessage: 'Airline not found', fatal: true })
}
</script>
<template>
    <header class="mb-8">
        <div class="d-flex justify-content-between align-items-start">
            <div>
                <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Airlines Information</h2>
                <p class="mb-0">Get to know {{ airline.name }}</p>
            </div>
            <div class="ms-3">
                <a href="/airlines" class="btn btn-secondary">Back</a>
            </div>
        </div>
    </header>
    <div class="card mt-1 w-50 mx-auto">
        <img class="card-img-top" :src="airline.imageURL" :alt="airline.name">
        <div class="card-body">
            <h5 class="card-title">{{ airline.name }}</h5>
            <p class="card-text">{{ airline.country }}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Destinations: {{ airline.destinations.join(', ') }}</li>
            <li class="list-group-item">Aircrafts: {{ airline.aircrafts.join(', ') }}</li>
        </ul>
    </div>
</template>