<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import { resolveRoute } from '$app/paths';
    import Alert from '$components/alert/Alert.svelte';

	import InputField from '$components/forms/InputField.svelte';
    import SubmitButton from '$components/forms/SubmitButton.svelte';
</script>
hello
<a href="admin/create-user" class="text-gray text-sm underline right-0 ml-auto">crée un nouvel utilisateur</a>