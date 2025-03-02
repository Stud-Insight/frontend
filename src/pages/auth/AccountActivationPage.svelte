<script lang="ts">
    import InfoBubble from "$components/ui/InfoBubble.svelte";
    import InputField from "$components/forms/InputField.svelte";
    import SubmitButton from "$components/forms/SubmitButton.svelte";
    import Alert from "$components/alert/Alert.svelte";

    interface ActivationTokenProps {
        activationToken: string;
    }

    let { activationToken }: ActivationTokenProps = $props();
    
    let activationStatus = $state({
        received: false,
        type: '',
        message: ''
    });
    let error = $state('');
    let isLoading = $state(false);
    let password = $state('');
    let passwordConfirmation = $state('');

    const handleActivation = async (event: SubmitEvent) => {
        event.preventDefault();
        if (!password || !passwordConfirmation) return;

        if (password !== passwordConfirmation) {
            console.error('Passwords do not match.');
            error = 'Les mots de passe ne correspondent pas.';
            return;
        }

        isLoading = true;
        error = '';

        console.log(window.location.origin);
        const response = await fetch(`${window.location.origin}/api/auth/activate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, activationToken })
        });

        await response.json().then((result) => {
            isLoading = false;
            activationStatus.received = true;
            activationStatus.type = result.success ? 'success' : 'error';
            activationStatus.message = result.success ? 
                'Votre compte a été activé avec succès. Vous pouvez maintenant vous connecter.' : 
                'Une erreur est survenue lors de l\'activation de votre compte. Veuillez réessayer plus tard.';
        });
    };
</script>

{#if activationStatus.received}
    <div class="mb-4">
        <Alert type={activationStatus.type as any}>
            <div class="flex flex-col justify-center items-center space-y-2">
                <p>{activationStatus.message}</p>
                <a href="/auth/login" class="underline font-bold">Aller à la page de connexion</a>
            </div>
        </Alert>
    </div>
{/if} 
{#if error}
    <div class="mb-4">
        <Alert type="error">{error}</Alert>
    </div>
{/if}
<form method="POST" onsubmit={handleActivation} class="flex flex-col justify-center space-y-10">
    <InfoBubble text="Veuillez renseigner un mot de passe pour valider la création de votre compte." />
    <div class="flex flex-col space-y-4">
        <InputField label="Mot de passe" type="password" icon="fa-solid:lock" placeholder="Choisissez un mot de passe" iconSize={16} bind:value={password} disabled={activationStatus.received || isLoading} fieldError={!!error} />
        <InputField type="password" icon="fa-solid:lock" placeholder="Confirmation du mot de passe" iconSize={16} bind:value={passwordConfirmation} disabled={activationStatus.received || isLoading} fieldError={!!error} />
    </div>
    <SubmitButton type="account-activation" loading={isLoading} disabled={activationStatus.received} />
</form>
