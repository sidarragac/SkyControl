<script setup lang="ts">
import type Article from '@/interafces/ArticleInterface'

interface ArticlesResponse {
  articles: Article[]
}

const { data: response } = await useFetch<ArticlesResponse>('/api/articles')
const articles = response.value?.articles
</script>

<template>
  <header class="mb-8">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">SkyControl Blog</h2>
        <p class="mb-0">Insights, news and analysis from the world of aviation</p>
      </div>
      <div class="ms-3">
        <a href="/" class="btn btn-secondary">Back</a>
      </div>
    </div>
  </header>

  <div class="row g-4">
    <div v-for="article in articles" :key="article.id" class="col-12 col-sm-6 col-lg-4 d-flex">
      <div class="card w-100">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-primary mb-2 align-self-start">{{ article.category }}</span>
          <h5 class="card-title">{{ article.title }}</h5>
          <p class="card-text text-muted flex-grow-1">{{ article.summary }}</p>
          <small class="text-muted mt-3">{{ article.author }} · {{ article.publishedAt }}</small>
        </div>
        <div class="card-body pt-0">
          <NuxtLink :to="`/blog/${article.slug}`" class="btn btn-primary">Read Article</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>