<script lang="ts">
  import type { Project } from '../@types/Project'

  export let project: Project
</script>

<div class="bg-white py-6 rounded-lg shadow-md divide-y-2 divide-dotted divide-gray-300">
  <div class="px-6 pb-3">
    <h1 class="font-bold text-xl leading-tight">{project.title}</h1>
    <div class="flex space-x-2 flex-wrap">
      <span class="my-1"
        >{project.year}{#if project.active}{' '}- Present{/if} ·
      </span>
      {#each project.links as link}
        <a href={link.url} class="my-1">{link.label}</a>
      {/each}
    </div>
  </div>
  <p class="text-sm pt-6 px-6">{project.description}</p>
</div>
