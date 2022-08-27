<script lang="ts">
  import { onMount } from 'svelte'

  import ArticleSkeleton from '../../modules/articles/components/articleSkeleton.svelte'
  import Article from '../../modules/articles/components/article.svelte'

  import type { Blog } from '../../modules/articles/@types/Blog'

  let blogs: Blog[] | null = null

  const fetchBlogs = async () => {
    const result: Blog[] = await fetch(
      'https://blog.rayriffy.com/data/latest/rayriffy.json'
    ).then(o => o.json())

    blogs = [
      ...(blogs ?? []),
      ...result,
    ]
  }

  onMount(async () => {
    await fetchBlogs()
  })
</script>

<section>
  <h1 class="text-xl">
    I usually loves to share many stories from programming, games to lifestyles
    on my personal blog. Here're my latest blogs that I wrote. If you want to
    learn more about articles that I wrote, please have a look at <a
      href="https://blog.rayriffy.com" class="underline hover:text-gray-500">Riffy Blog</a
    >
  </h1>
</section>

<section class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
  {#if blogs === null}
    {#each Array.from({ length: 3 }) as _}
      <ArticleSkeleton />
    {/each}
  {:else}
    {#each blogs as blog}
      <Article {blog} />
    {/each}
  {/if}
</section>
