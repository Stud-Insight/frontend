<script>
    import { page } from "$app/stores";
    import Alert from "$components/alert/Alert.svelte";
    import AccountActivationPage from "$pages/auth/AccountActivationPage.svelte";

    const activationToken = $page.data.activationToken;
    
</script>

{#if activationToken != null}
    <AccountActivationPage {activationToken} />
{:else}
    <Alert type="error">
        <div class="flex flex-col justify-center items-center space-y-2">
            <p>Ce lien d'activation n'est pas correct. Si vous pensez que c'est une erreur veuillez contacter un administrateur.</p>
            <a href="/" class="underline font-bold">Retour à l'accueil</a>
        </div>
    </Alert>
{/if}