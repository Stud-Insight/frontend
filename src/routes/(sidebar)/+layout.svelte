<script lang="ts">
    import { page } from '$app/stores';
    import Sidenav from '$components/ui/nav/Sidenav.svelte';
    import type { User } from '$lib/interfaces/User';
	
	let { children } = $props();
	const user = $page.data.user as User;
</script>


<div class="h-screen flex flex-row">
    <Sidenav {user} />
    <div class="flex flex-col w-full h-full">
	    {@render children()}
    </div>
</div>