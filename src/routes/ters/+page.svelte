<script lang="ts">
    import ChooseGroupPage from "$pages/forms/ChooseGroupPage.svelte";
    import * as Card from "$lib/components/ui/card/";
    import type { PageData } from "./$types.js";
    export let data: PageData;

    console.log("data de route : \n", data);
</script>

<ChooseGroupPage data={data}/>