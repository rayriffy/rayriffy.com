<script lang="ts">
  import Image from 'svelte-image'
</script>

<div class="space-y-6 lg:space-y-0 lg:flex lg:gap-8 lg:flex-row-reverse">
  <div class="w-full lg:w-3/5 shrink-0">
    <section class="w-full aspect-[2000/1334]">
      <Image src="biography.jpg" width="2000" height="1334" />
    </section>
  
    <h1 class="font-medium text-xl lg:text-2xl mt-2">
      [<a href="/full-resume-20220825.pdf" class="mx-1 text-gray-600 hover:text-gray-400">Full resume</a>]
    </h1>
  </div>
  <div class="col-span-2 bg-purple-600 rounded-2xl text-white p-6 text-2xl space-y-4 w-full lg:w-2/5">
    <p>Riffy is a full-stack web developer who make a lot of cool stuff with modern web technologies. Moreover that, he is working hard on building maker skills for embed system and building complex cluster system with Raspberry Pi.</p>
    <p>Dispite that, he study web technologies for over 8 years already, and now he is looking for the next chapter.</p>
  </div>
</div>
