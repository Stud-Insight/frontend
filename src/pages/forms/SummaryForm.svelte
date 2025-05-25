<script lang="ts">
    import Summary from '$components/forms/SummaryForm.svelte';

	import type { PageData } from "./$types.js";
	export let data: PageData;
</script>

<Summary data={data.form}/>
