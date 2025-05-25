<script lang="ts">
    import ChooseGroup from "$components/forms/ChooseGroup.svelte";
    import * as Card from "$lib/components/ui/card/";
    import type {PageData} from "../../routes/ters/$types"
    
    export let data:PageData;
    console.log("data de page : \n", data);
</script>

<Card.Root>
    <Card.Content class="text-center">
        <ChooseGroup data={data.form}/>
    </Card.Content>
    <Card.Footer>
        Card Footer
    </Card.Footer>
</Card.Root>