<script lang="ts">
    import { goto } from '$app/navigation';
    import Alert from '$components/alert/Alert.svelte';

	import InputField from '$components/forms/InputField.svelte';
    import SubmitButton from '$components/forms/SubmitButton.svelte';

    let email = $state('');
    let error = $state('');
    let password = $state('');
    let isLoading = $state(false);

    const handleLogin = async (event: SubmitEvent) => {
        event.preventDefault();
        if (!email || !password) return;

        isLoading = true;
        const response = await fetch(window.location.origin + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            if (result.errorType && result.errorType === "INVALID_CREDENTIALS") {
                error = result.message;
                isLoading = false;
                return;
            }
            goto('/');
        } else {
            console.error('Login failed', result);
            error = "Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.";
            isLoading = false;
        }
    };
</script>

{#if error}
    <div class="mb-4">
        <Alert type="error">{error}</Alert>
    </div>
{/if}
<form method="POST" onsubmit={handleLogin} class="flex flex-col space-y-4 justify-center">
    <div class="mb-6 flex flex-col space-y-4">
        <InputField label="E-Mail" type="email" icon="ic:round-mail" iconSize={18} id="email" bind:value={email} fieldError={!!error} />
        <InputField label="Mot de passe" type="password" icon="fa-solid:lock" iconSize={16} id="password" bind:value={password} fieldError={!!error} />
        <a href="/auth/account-recovery" class="text-gray text-sm underline right-0 ml-auto">Mot de passe oublié ?</a>
    </div>
    
    <SubmitButton type="default" loading={isLoading} />

    <!-- Divider -->
    <div class="flex items-center space-x-2 mt-6">
        <div class="h-0.5 bg-light-gray w-full"></div>
        <span class="text-gray">ou</span>
        <div class="h-0.5 bg-light-gray w-full"></div>
    </div>

    <SubmitButton type="cas" />
</form>