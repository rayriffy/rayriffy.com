<script lang="ts">
  import Article from './article.svelte'
  import ArticleSkeleton from './articleSkeleton.svelte'

  import type { Blog } from '../@types/Blog'

  const getBlogs = async () => {
    const result: Blog[] = await fetch(
      'https://blog.rayriffy.com/data/latest/rayriffy.json'
    ).then(o => o.json())

    return result
  }
</script>


{#await getBlogs()}
  {#each Array.from({ length: 12 }) as _}
    <ArticleSkeleton />
  {/each}
  {:then blogs}
  {#each blogs as blog}
    <Article {blog} />
  {/each}
{/await}
