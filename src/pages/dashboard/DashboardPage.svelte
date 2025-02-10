<script lang="ts">
    import Sidenav from '$components/ui/nav/Sidenav.svelte';
    import type { User } from '$lib/interfaces/User';

    interface DashboardPageProps {
        user: User;
    }

    let { user }: DashboardPageProps = $props();
</script>

<div class="h-screen">
    <Sidenav {user} />
</div>
