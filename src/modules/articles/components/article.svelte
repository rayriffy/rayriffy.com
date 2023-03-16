<script lang="ts">
  import type { Blog } from '../@types/Blog'

  export let blog: Blog
</script>

<a href={`https://blog.rayriffy.com${blog.url}`} class="no-underline">
  <article class="bg-white rounded-xl overflow-hidden shadow-md border">
    <img
      class="w-full aspect-[1500/788]"
      src={blog.banner.url}
      alt={blog.title}
    />
    <div class="px-6 py-4">
      <h2 class="font-bold text-xl">{blog.title}</h2>
      <p class="text-gray-700">{blog.subtitle}</p>
    </div>
  </article>
</a>
