<script lang="ts">
    import InputField from '../../components/forms/InputField.svelte';
    import SubmitButton from '../../components/forms/SubmitButton.svelte';
    import InfoBubble from '../../components/ui/InfoBubble.svelte';

    let email = '';

    const handleSubmit = () => {
        if (!email) return;
        console.log('Email:', email);
    };
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col justify-center space-y-8">
    <InfoBubble text="Veuillez saisir votre adresse e-mail pour recevoir un lien de réinitialisation de votre mot de passe." />
    <div class="flex flex-col space-y-2">
        <InputField label="E-Mail" type="text" icon="ic:round-mail" iconSize={18} bind:value={email} />
        <a href="account-recovery" class="text-gray text-sm underline right-0 ml-auto">Pas reçu de mail ?</a>
    </div>
    <SubmitButton type="account-recovery" />
    <a href="/auth/login" class="text-sm text-gray underline w-full text-center">Retour à la page de connexion</a>
</form>
