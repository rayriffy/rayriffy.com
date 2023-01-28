<script lang="ts">
  import ArticleSkeleton from '../../modules/articles/components/articleSkeleton.svelte'
  import Article from '../../modules/articles/components/article.svelte'

  import type { Blog } from '../../modules/articles/@types/Blog'

  const getBlogs = async () => {
    const result: Blog[] = await fetch(
      'https://blog.rayriffy.com/data/latest/rayriffy.json'
    ).then(o => o.json())
    
    return result
  }
</script>

<section>
  <h1 class="text-xl">
    I usually love to share many stories from programming, and games to
    lifestyles on my blog. Here're the latest blogs that I wrote. If you want to
    learn more about articles that I wrote, please have a look at <a
      href="https://blog.rayriffy.com">Riffy Blog</a
    >.
  </h1>
</section>

<section
  class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center"
>
  {#await getBlogs()}
    {#each Array.from({ length: 12 }) as _}
      <ArticleSkeleton />
    {/each}
  {:then blogs}
    {#each blogs as blog}
      <Article {blog} />
    {/each}
  {/await}
</section>
