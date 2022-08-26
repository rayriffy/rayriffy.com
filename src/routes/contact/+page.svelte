<script lang="ts">
  import { socials } from '../../modules/contact/constants/socials'
</script>

<section class="mt-12 mb-8 sm:flex gap-8">
  <div>
    <div
      class="w-52 aspect-square rounded-full bg-purple-200 overflow-hidden shrink-0 mx-auto sm:mx-0"
    >
      <img
        src="/memoji.png"
        alt="memoji"
        width="420"
        height="420"
        class="w-full aspect-square"
      />
    </div>
  </div>
  <div class="mt-6 sm:mt-0 divide-y-2 divide-gray-400 divide-dashed">
    <div class="pb-4">
      <h1 class="text-4xl font-medium">Phumrapee Limpianchop</h1>
      <h2 class="text-2xl my-4">Platform Engineer<br />BRIKL, Thailand</h2>
      <p class="text-xl">
        Work:
        <a href="mailto:phumrapee@brikl.com">phumrapee@brikl.com</a>
      </p>
      <p class="text-xl">
        Personal:
        <a href="mailto:mail@rayriffy.com">mail@rayriffy.com</a>
      </p>
    </div>
    <div class="pt-4">
      <h2 class="text-2xl">Follow me</h2>
      <div class="space-x-2">
        {#each socials as social}
          <a href={social.url} class="text-lg underline hover:text-gray-600">{social.label}</a>
        {/each}
      </div>
    </div>
  </div>
</section>
