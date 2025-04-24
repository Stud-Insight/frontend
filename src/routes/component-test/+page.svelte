<script lang="ts">
	// import ChoiceForm from '$components/forms/ChoiceForm.svelte';
	// import SummaryForm from '$components/forms/SummaryForm.svelte';
	// import CreateUser from '$components/forms/CreateUser.svelte';

	import CrashTest from '$components/forms/CrashTest.svelte';

	import type { PageData } from "./$types.js";
	export let dataTest: PageData;
	dataTest = {
		id: '1',
		valid: true,
		posted: false,
		errors: [],
		data: { items: [], title: '' },
		...dataTest
	};
</script>

<h1> Page de tests des Components</h1>
	<!-- <SummaryForm data={dataTest} /> -->
	<!-- <ChoiceForm data={dataTest} /> -->
	<!-- <CreateUser data={dataTest} /> -->
	 <CrashTest data={dataTest} />
<h3>Fin de la démo</h3>