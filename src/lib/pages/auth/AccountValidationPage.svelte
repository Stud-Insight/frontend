<script lang="ts">
    import InfoBubble from "../ui/InfoBubble.svelte";
    import InputField from "./InputField.svelte";
    import SubmitButton from "./SubmitButton.svelte";

    let password = '';
    let passwordConfirmation = '';

    const handleSubmit = () => {
        if (!password || !passwordConfirmation) return;
        console.log('Password:', password);
        console.log('Password confirmation:', passwordConfirmation);
        if (password !== passwordConfirmation) {
            console.error('Passwords do not match.');
            return;
        }
    };
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col justify-center space-y-10">
    <InfoBubble text="Veuillez renseigner un mot de passe pour valider la création de votre compte." />
    <div class="flex flex-col space-y-4">
        <InputField label="Mot de passe" type="password" icon="fa-solid:lock" placeholder="Choisissez un mot de passe" iconSize={16} bind:value={password} />
        <InputField type="password" icon="fa-solid:lock" placeholder="Confirmation du mot de passe" iconSize={16} bind:value={passwordConfirmation} />
    </div>
    <SubmitButton type="account-validation" />
</form>
