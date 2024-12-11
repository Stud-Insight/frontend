<script lang="ts">
    import InfoBubble from "$components/ui/InfoBubble.svelte";
    import InputField from "$components/forms/InputField.svelte";
    import SubmitButton from "$components/forms/SubmitButton.svelte";
    interface ValidationTokenProps {
        validationToken: string;
    }
    let { validationToken }: ValidationTokenProps = $props();
    let password = $state('');
    let passwordConfirmation = $state('');

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        if (!password || !passwordConfirmation) return;
        console.log('Password:', password);
        console.log('Password confirmation:', passwordConfirmation);
        if (password !== passwordConfirmation) {
            console.error('Passwords do not match.');
            return;
        }
        const response = await fetch('http://localhost:5173/api/activate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, validationToken })
        });
    };
</script>

<form onsubmit={handleSubmit} class="flex flex-col justify-center space-y-10">
    <InfoBubble text="Veuillez renseigner un mot de passe pour valider la création de votre compte." />
    <div class="flex flex-col space-y-4">
        <InputField label="Mot de passe" type="password" icon="fa-solid:lock" placeholder="Choisissez un mot de passe" iconSize={16} bind:value={password} />
        <InputField type="password" icon="fa-solid:lock" placeholder="Confirmation du mot de passe" iconSize={16} bind:value={passwordConfirmation} />
    </div>
    <SubmitButton type="account-validation" />
</form>
