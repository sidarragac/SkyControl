<script setup lang="ts">
import { articles } from '@/data/articles'

const route = useRoute()
const id = String(route.params.id)
const article = articles.find((article) => article.id === id)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}
</script>

<template>
  <header class="mb-8">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">SkyControl Blog</h2>
        <p class="mb-0">{{ article.category }}</p>
      </div>
      <div class="ms-3">
        <a href="/blog" class="btn btn-secondary">Back</a>
      </div>
    </div>
  </header>

  <div class="row justify-content-center">
    <div class="col-12 col-lg-8">
      <div class="card">
        <div class="card-body">
          <span class="badge bg-primary mb-3">{{ article.category }}</span>
          <h3 class="card-title mb-1">{{ article.title }}</h3>
          <p class="text-muted mb-4">
            <small>By {{ article.author }} · {{ article.publishedAt }}</small>
          </p>
          <p class="lead mb-4">{{ article.summary }}</p>
          <hr />
          <p v-for="(paragraph, index) in article.content.split('\n\n')" :key="index" class="mb-3">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
