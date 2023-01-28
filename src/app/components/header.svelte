<script lang="ts">
  import R from './r.svelte'
  import MenuIcon from './menuIcon.svelte'

  import { page } from '$app/stores'
	import { paths } from '../constants/paths'

	$: targetPath = paths.find(o => o.path === $page.url.pathname && o.hidden !== true)
</script>

<div class="max-w-7xl mx-auto my-6 px-4 md:px-6">
	<nav class="navbar bg-base-100 rounded-2xl shadow-lg">
		<div class="navbar-start">
			<div class="dropdown">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<label for="#header-menu" tabindex="0" class="btn btn-ghost btn-circle">
					<MenuIcon class="w-6 h-6" />
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul id="header-menu" tabindex="0" class="menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 rounded-box w-52">
					{#each paths as path}
						<li>
							<a href={path.path} class="font-medium hover:text-blue-400 animate-rainbow text-base">
								{path.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="navbar-center space-x-2">
			<a class="btn btn-ghost normal-case text-xl px-2" href="/">
				<R class="w-9 h-9" />
			</a>
			{#if targetPath !== undefined}
				<h1 class="mr-4 font-bold text-lg">{targetPath.name}</h1>
			{/if}
		</div>
		<div class="navbar-end">
		</div>
	</nav>
</div>
