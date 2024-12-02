<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';

	import InputField from '$components/forms/InputField.svelte';
    import SubmitButton from '$components/forms/SubmitButton.svelte';

    let email = '';
    let password = '';

    const handleLogin = async () => {
        if (!email || !password) return;

        const response = await fetch('http://localhost:5173/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            goto('/');
        } else {
            console.error('Login failed. ' + result);
        }
    };

</script>

<form on:submit|preventDefault={handleLogin} class="flex flex-col space-y-4 justify-center">
    <div class="mb-6 flex flex-col space-y-4">
        <InputField label="E-Mail" type="email" icon="ic:round-mail" iconSize={18} id="email" bind:value={email} />
        <InputField label="Mot de passe" type="password" icon="fa-solid:lock" iconSize={16} id="password" bind:value={password} />
        <a href="/auth/account-recovery" class="text-gray text-sm underline right-0 ml-auto">Mot de passe oublié ?</a>
    </div>
    
    <SubmitButton type="default" />

    <!-- Divider -->
    <div class="flex items-center space-x-2 mt-6">
        <div class="h-0.5 bg-light-gray w-full"></div>
        <span class="text-gray">ou</span>
        <div class="h-0.5 bg-light-gray w-full"></div>
    </div>

    <SubmitButton type="cas" />
</form>