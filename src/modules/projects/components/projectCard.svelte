<script lang="ts">
  import type { Project } from '../@types/Project'

  export let project: Project
</script>

<div class="bg-white py-6 px-8 rounded-lg shadow-md">
  <h1 class="font-bold text-xl">{project.title}</h1>
  <div class="my-1 flex space-x-2 flex-wrap">
    <span class="my-1">{project.year}{#if project.active}{' '}- Present{/if} · </span>
    {#each project.links as link}
      <a href={link.url} class="underline hover:text-gray-500 my-1"
        >{link.label}</a
      >
    {/each}
  </div>
  <p class="text-sm">{project.description}</p>
</div>
