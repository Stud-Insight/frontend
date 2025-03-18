<script lang="ts">
  import { page } from '$app/stores';
  import type { User } from '$lib/interfaces/User';
  import DashboardPage from '$pages/dashboard/DashboardPage.svelte';

  const user = $page.data.user as User;
</script>

<DashboardPage {user} />