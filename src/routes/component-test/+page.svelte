<script lang="ts">
	import ChoiceForm from '$components/forms/ChoiceForm.svelte';
	import SummaryForm from '$components/forms/SummaryForm.svelte';

	import type { PageData } from "./$types.js";
	export let data: PageData;
	data = {
		id: '1',
		valid: true,
		posted: false,
		errors: [],
		data: { items: [], title: '' },
		...data
	};
</script>

<h1> Page de tests des Components</h1>
	<!-- <SummaryForm data={data} /> -->
	<!-- <ChoiceForm data={data} /> -->
<h3>Fin de la démo</h3>
