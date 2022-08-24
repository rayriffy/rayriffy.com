<script lang="ts">
	import '../app.css'

	import Header from '../app/components/header.svelte'
	import Footer from '../app/components/footer.svelte'
</script>

<Header />

<main class="max-w-7xl mx-auto mt-10 px-4 md:px-6">
	<slot />
</main>

<Footer />
