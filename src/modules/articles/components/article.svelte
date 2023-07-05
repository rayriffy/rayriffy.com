<script lang="ts">
  import type { Blog } from '../@types/Blog'

  export let blog: Blog
</script>

<a href={`https://blog.rayriffy.com${blog.url}`} class="no-underline">
  <article class="overflow-hidden rounded-xl border bg-white shadow-md">
    <img
      class="aspect-[1500/788] w-full"
      src={blog.banner.url}
      alt={blog.title}
    />
    <div class="px-6 py-4">
      <h2 class="text-xl font-bold">{blog.title}</h2>
      <p class="text-gray-700">{blog.subtitle}</p>
    </div>
  </article>
</a>
