<script lang="ts">
  import ProjectCard from '../../modules/projects/components/projectCard.svelte'
  import { projects } from '../../modules/projects/constants/projects'
</script>

<section class="my-8">
  <h1 class="text-xl">
    Since high school, I created lots projects to let myself learn new web
    technologies ... from browser Web APIs, libraries, to frameworks. Most of
    projects are open-sourced on <a
      href="https://github.com/rayriffy"
      class="underline hover:text-gray-500">my GitHub</a
    >, if you like what you see then consider following and maybe support me
    through sponsors as well.
  </h1>
</section>

<h2 class="text-3xl font-medium">Active projects</h2>
<section class="my-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
  {#each projects.filter(o => o.active) as project}
    <ProjectCard project={project} />
  {/each}
</section>

<h2 class="text-3xl font-medium">Archived projects</h2>
<section class="my-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
  {#each projects.filter(o => !o.active) as project}
    <ProjectCard project={project} />
  {/each}
</section>
