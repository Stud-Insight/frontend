<script lang="ts">
	import InputField from './InputField.svelte';
    import SubmitButton from './SubmitButton.svelte';
</script>

<div>
    <InputField label="E-Mail" type="text" icon="ic:round-mail" iconSize={18} />
	<InputField label="Mot de passe" type="password" icon="fa-solid:lock" iconSize={16} />
    
    <SubmitButton type="default" />

    <!-- Divider -->
    <div class="flex items-center space-x-2 mt-6">
        <div class="h-0.5 bg-light-gray w-full"></div>
        <span class="text-gray">ou</span>
        <div class="h-0.5 bg-light-gray w-full"></div>
    </div>

    <SubmitButton type="cas" />
</div>