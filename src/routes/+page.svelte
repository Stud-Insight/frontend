<script lang="ts">
  import { logout } from '$lib/utils/authUtil';
  import { page } from '$app/stores';
  import type { User } from '$lib/types/User';

  const user = $page.data.user as User;

  const handleLogout = async () => {
    await logout();
  };
</script>

<h1>Bienvenue {user.firstName} !</h1>
<p>Ton email est : {user.email}</p>
<button on:click={handleLogout}>Déconnexion</button>