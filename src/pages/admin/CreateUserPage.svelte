<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import { resolveRoute } from '$app/paths';
    import Alert from '$components/alert/Alert.svelte';

	import InputField from '$components/forms/InputField.svelte';
    import SubmitButton from '$components/forms/SubmitButton.svelte';
    let H = ''
    let email = $state('');
    let firstName = $state('');
    let lastName = $state('');
    const handleCreateUser = async (event: SubmitEvent) => {
        event.preventDefault();
        if (!email || !firstName || !lastName) return;

        const response = await fetch('http://localhost:5173/api/account/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, firstName, lastName })
            
        });
        console.log('bled')
        console.log(response.body);
        
        const result = await response.json();
    }
    
    let error = 'invalid'
</script>



<form method="POST" onsubmit={handleCreateUser} class="flex flex-col space-y-4 justify-center">
    <div class="mb-6 flex flex-col space-y-4">
        <InputField label="E-Mail" type="email" icon="ic:round-mail" iconSize={18} id="email" bind:value={email} fieldError={!!error}/>
        <InputField label="Prénom" type="firstName" icon="fa-solid:lock" iconSize={16} id="firstName" bind:value={firstName} fieldError={!!error} />
        <InputField label="Nom de famille" type="lastName" icon="fa-solid:lock" iconSize={16} id="lastName" bind:value={lastName} fieldError={!!error} />
    </div>
    
    <SubmitButton type="create-user"  />

   
</form>