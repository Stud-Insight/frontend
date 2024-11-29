<script lang="ts">
  import { logout } from '$lib/utils/authUtil';

  const handleLogout = async () => {
    await logout();
  };
</script>

<h1>Vous êtes authentifié !</h1>
<button on:click={handleLogout}>Déconnexion</button>