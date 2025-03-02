<script lang="ts">
  import { logout } from '$utils/authUtil';
  import { page } from '$app/stores';
  import type { User } from '$lib/interfaces/User';
    import DashboardPage from '$pages/dashboard/DashboardPage.svelte';

  const user = $page.data.user as User;
</script>

<DashboardPage {user} />

<!--<h1>Bienvenue {user.firstName} !</h1>
<p>Ton email est : {user.email}</p>
<button on:click={handleLogout}>Déconnexion</button>-->