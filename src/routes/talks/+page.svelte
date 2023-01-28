<script lang="ts">
  import { talks } from '../../modules/talks/constants/talks'
</script>

<section class="my-8">
  <h1 class="text-xl">
    I am an experienced public speaker who is able to deliver keynote talks, as well as participate in panels and networking. Furthermore, I also joined the group of <a href="https://www.creatorsgarten.org/">Creatorsgarten</a> to help organize various events in the past, and future.
  </h1>
</section>

<section class="space-y-8 max-w-5xl mx-auto">
  {#each talks as talk}
    <div class="bg-white rounded-xl shadow-md divide-y-2 divide-dotted divide-gray-300 py-8">
      <div class="px-8 pb-6">
        <h1 class="font-bold text-2xl">{talk.title}</h1>
        <p class="text-gray-700 mt-1">
          {talk.event} · <span class="font-semibold">{talk.year}</span>
        </p>
        <div class="mt-1 space-x-2 flex flex-wrap">
          {#each talk.links as link}
            <a href={link.url} class="my-1"
              >{link.label}</a
            >
          {/each}
        </div>
      </div>
      <p class="pt-8 px-8">{talk.description}</p>
    </div>
  {/each}
</section>